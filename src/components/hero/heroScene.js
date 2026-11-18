/*
 * Hero 3D scene: a geodesic "circuit lattice" that haloes the portrait.
 *
 * Nodes on an icosphere are joined like a circuit, a few signals travel along
 * the edges like current through a network, and a single tilted orbit ring
 * echoes the electrical background. Everything is lines and points with
 * additive blending: no lights, no textures, five draw calls.
 *
 * This module is only ever loaded with a dynamic import() so Three.js stays
 * out of the initial bundle.
 */
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Group,
  IcosahedronGeometry,
  LineLoop,
  LineSegments,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector3,
  WebGLRenderer,
} from "three";

const CAMERA_DISTANCE = 4.8;
const RING_RADIUS = 1.2;

// Brand colours as raw sRGB triples. The shaders output them unconverted.
const toVec3 = (hex) => new Vector3(((hex >> 16) & 255) / 255, ((hex >> 8) & 255) / 255, (hex & 255) / 255);
const BRAND = { c0: toVec3(0x406aff), c1: toVec3(0xb936ee), c2: toVec3(0xff56f6) };

const shared = /* glsl */ `
  uniform vec3 uC0;
  uniform vec3 uC1;
  uniform vec3 uC2;
  uniform float uOpacity;
  uniform float uFadeNear;
  uniform float uFadeFar;
  vec3 brand(float t) {
    return t < 0.5 ? mix(uC0, uC1, t * 2.0) : mix(uC1, uC2, (t - 0.5) * 2.0);
  }
  float depthFade(vec4 mv) {
    return clamp((uFadeFar + mv.z) / (uFadeFar - uFadeNear), 0.0, 1.0);
  }
`;

const lineMaterial = (opacity) =>
  new ShaderMaterial({
    uniforms: {
      uC0: { value: BRAND.c0 },
      uC1: { value: BRAND.c1 },
      uC2: { value: BRAND.c2 },
      uOpacity: { value: opacity },
      uFadeNear: { value: CAMERA_DISTANCE - 1.3 },
      uFadeFar: { value: CAMERA_DISTANCE + 1.3 },
    },
    vertexShader: /* glsl */ `
      ${shared}
      attribute float aMix;
      varying float vMix;
      varying float vFade;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vMix = aMix;
        vFade = depthFade(mv);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      ${shared}
      varying float vMix;
      varying float vFade;
      void main() {
        float alpha = mix(0.05, 1.0, pow(vFade, 1.7)) * uOpacity;
        gl_FragColor = vec4(brand(vMix), alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });

const pointMaterial = ({ opacity, hot, pixelRatio, twinkle }) =>
  new ShaderMaterial({
    uniforms: {
      uC0: { value: BRAND.c0 },
      uC1: { value: BRAND.c1 },
      uC2: { value: BRAND.c2 },
      uOpacity: { value: opacity },
      uFadeNear: { value: CAMERA_DISTANCE - 1.3 },
      uFadeFar: { value: CAMERA_DISTANCE + 1.3 },
      uTime: { value: 0 },
      uHot: { value: hot },
      uTwinkle: { value: twinkle },
      uPixelRatio: { value: pixelRatio },
    },
    vertexShader: /* glsl */ `
      ${shared}
      uniform float uTime;
      uniform float uPixelRatio;
      uniform float uTwinkle;
      attribute float aMix;
      attribute float aSize;
      attribute float aPhase;
      varying float vMix;
      varying float vFade;
      varying float vGlow;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vMix = aMix;
        vFade = depthFade(mv);
        vGlow = 1.0 - uTwinkle * (0.5 + 0.5 * sin(uTime * 1.4 + aPhase));
        gl_PointSize = aSize * uPixelRatio * ${CAMERA_DISTANCE.toFixed(1)} / -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      ${shared}
      uniform float uHot;
      varying float vMix;
      varying float vFade;
      varying float vGlow;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float core = smoothstep(0.5, 0.0, d);
        float alpha = pow(core, 1.6) * mix(0.12, 1.0, vFade) * vGlow * uOpacity;
        vec3 color = mix(brand(vMix), vec3(1.0), pow(core, 3.0) * uHot);
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });

/** Unique vertices, edges and adjacency of a subdivided icosahedron. */
function buildLattice(detail) {
  const source = new IcosahedronGeometry(1, detail).getAttribute("position");
  const vertices = [];
  const lookup = new Map();
  const indexOf = (i) => {
    const x = source.getX(i);
    const y = source.getY(i);
    const z = source.getZ(i);
    const key = `${x.toFixed(4)},${y.toFixed(4)},${z.toFixed(4)}`;
    if (!lookup.has(key)) {
      lookup.set(key, vertices.length);
      vertices.push(new Vector3(x, y, z).normalize());
    }
    return lookup.get(key);
  };

  const edgeKeys = new Set();
  const edges = [];
  for (let i = 0; i < source.count; i += 3) {
    const tri = [indexOf(i), indexOf(i + 1), indexOf(i + 2)];
    for (const [a, b] of [[tri[0], tri[1]], [tri[1], tri[2]], [tri[2], tri[0]]]) {
      const key = a < b ? `${a}-${b}` : `${b}-${a}`;
      if (!edgeKeys.has(key)) {
        edgeKeys.add(key);
        edges.push([a, b]);
      }
    }
  }

  const neighbours = vertices.map(() => []);
  edges.forEach(([a, b]) => {
    neighbours[a].push(b);
    neighbours[b].push(a);
  });
  return { vertices, edges, neighbours };
}

// Diagonal gradient: blue lower left through violet to pink upper right.
const gradientMix = (v) => Math.min(1, Math.max(0, 0.5 + 0.42 * (v.x * 0.55 + v.y * 0.85)));

/**
 * Creates the scene on `canvas`. Returns { dispose }.
 * Options: reducedMotion (render one still frame), lite (phones and coarse
 * pointers: fewer nodes and signals, lower pixel ratio, 30 fps while idle),
 * interactionTarget (element that receives drag-to-spin and tap-to-pulse;
 * vertical swipes on it still scroll the page), onReady, onFail.
 */
export function createHeroScene(
  canvas,
  { reducedMotion = false, lite = false, interactionTarget = null, onReady, onFail } = {}
) {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, lite ? 1.5 : 1.75);
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(pixelRatio);
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.set(0, 0, CAMERA_DISTANCE);

  const root = new Group();
  root.rotation.set(0.38, -0.5, 0.12);
  scene.add(root);

  // Lattice edges and nodes
  const { vertices, edges, neighbours } = buildLattice(lite ? 1 : 2);
  const edgePositions = new Float32Array(edges.length * 6);
  const edgeMix = new Float32Array(edges.length * 2);
  edges.forEach(([a, b], i) => {
    vertices[a].toArray(edgePositions, i * 6);
    vertices[b].toArray(edgePositions, i * 6 + 3);
    edgeMix[i * 2] = gradientMix(vertices[a]);
    edgeMix[i * 2 + 1] = gradientMix(vertices[b]);
  });
  const edgeGeometry = new BufferGeometry();
  edgeGeometry.setAttribute("position", new BufferAttribute(edgePositions, 3));
  edgeGeometry.setAttribute("aMix", new BufferAttribute(edgeMix, 1));
  const edgeMaterial = lineMaterial(0.55);
  root.add(new LineSegments(edgeGeometry, edgeMaterial));

  const nodeGeometry = new BufferGeometry();
  nodeGeometry.setAttribute("position", new BufferAttribute(new Float32Array(vertices.flatMap((v) => v.toArray())), 3));
  nodeGeometry.setAttribute("aMix", new BufferAttribute(new Float32Array(vertices.map(gradientMix)), 1));
  nodeGeometry.setAttribute("aSize", new BufferAttribute(new Float32Array(vertices.map(() => 3 + Math.random() * 3.5)), 1));
  nodeGeometry.setAttribute("aPhase", new BufferAttribute(new Float32Array(vertices.map(() => Math.random() * Math.PI * 2)), 1));
  const nodeMaterial = pointMaterial({ opacity: 0.85, hot: 0.25, pixelRatio, twinkle: reducedMotion ? 0 : 0.45 });
  root.add(new Points(nodeGeometry, nodeMaterial));

  // Signals travelling along the lattice, one random step at a time
  const signalCount = lite ? 5 : 10;
  const signals = Array.from({ length: signalCount }, () => {
    const from = Math.floor(Math.random() * vertices.length);
    const to = neighbours[from][Math.floor(Math.random() * neighbours[from].length)];
    return { from, to, t: Math.random(), speed: 0.45 + Math.random() * 0.5 };
  });
  const signalPositions = new Float32Array(signalCount * 3);
  const signalGeometry = new BufferGeometry();
  signalGeometry.setAttribute("position", new BufferAttribute(signalPositions, 3));
  signalGeometry.setAttribute("aMix", new BufferAttribute(new Float32Array(signalCount).fill(0.92), 1));
  signalGeometry.setAttribute("aSize", new BufferAttribute(new Float32Array(signalCount).fill(lite ? 11 : 12), 1));
  signalGeometry.setAttribute("aPhase", new BufferAttribute(new Float32Array(signalCount), 1));
  const signalMaterial = pointMaterial({ opacity: 1, hot: 0.7, pixelRatio, twinkle: 0 });
  const signalPoints = new Points(signalGeometry, signalMaterial);
  root.add(signalPoints);

  const scratch = new Vector3();
  const updateSignals = (dt) => {
    signals.forEach((signal, i) => {
      signal.t += dt * signal.speed;
      while (signal.t >= 1) {
        signal.t -= 1;
        const options = neighbours[signal.to].filter((n) => n !== signal.from);
        signal.from = signal.to;
        signal.to = options[Math.floor(Math.random() * options.length)];
      }
      scratch.lerpVectors(vertices[signal.from], vertices[signal.to], signal.t).toArray(signalPositions, i * 3);
    });
    signalGeometry.attributes.position.needsUpdate = true;
  };
  updateSignals(0);

  // One orbit ring, tilted, with its own travelling signal
  const ringSegments = 180;
  const ringPositions = new Float32Array(ringSegments * 3);
  const ringMix = new Float32Array(ringSegments);
  for (let i = 0; i < ringSegments; i += 1) {
    const angle = (i / ringSegments) * Math.PI * 2;
    ringPositions.set([Math.cos(angle) * RING_RADIUS, 0, Math.sin(angle) * RING_RADIUS], i * 3);
    ringMix[i] = 0.5 + 0.5 * Math.sin(angle);
  }
  const ringGeometry = new BufferGeometry();
  ringGeometry.setAttribute("position", new BufferAttribute(ringPositions, 3));
  ringGeometry.setAttribute("aMix", new BufferAttribute(ringMix, 1));
  const ringMaterial = lineMaterial(0.5);
  const ring = new LineLoop(ringGeometry, ringMaterial);
  const ringGroup = new Group();
  ringGroup.rotation.set(1.16, 0.2, -0.52);
  ringGroup.add(ring);
  scene.add(ringGroup);

  const orbitGeometry = new BufferGeometry();
  orbitGeometry.setAttribute("position", new BufferAttribute(new Float32Array(3), 3));
  orbitGeometry.setAttribute("aMix", new BufferAttribute(new Float32Array([0.1]), 1));
  orbitGeometry.setAttribute("aSize", new BufferAttribute(new Float32Array([13]), 1));
  orbitGeometry.setAttribute("aPhase", new BufferAttribute(new Float32Array(1), 1));
  const orbitMaterial = pointMaterial({ opacity: 1, hot: 0.7, pixelRatio, twinkle: 0 });
  ringGroup.add(new Points(orbitGeometry, orbitMaterial));
  let orbitAngle = 0.6;
  const updateOrbit = () => {
    orbitGeometry.attributes.position.array.set([Math.cos(orbitAngle) * RING_RADIUS, 0, Math.sin(orbitAngle) * RING_RADIUS]);
    orbitGeometry.attributes.position.needsUpdate = true;
  };
  updateOrbit();

  const materials = [edgeMaterial, nodeMaterial, signalMaterial, ringMaterial, orbitMaterial];
  const geometries = [edgeGeometry, nodeGeometry, signalGeometry, ringGeometry, orbitGeometry];

  // Pointer: the halo turns a little towards the cursor (fine pointers only)
  const pointer = { x: 0, y: 0 };
  const eased = { x: 0, y: 0 };
  const followPointer = !reducedMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const onPointerMove = (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = Math.max(-1, Math.min(1, (event.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2)));
    pointer.y = Math.max(-1, Math.min(1, (event.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2)));
  };
  if (followPointer) window.addEventListener("pointermove", onPointerMove, { passive: true });

  // Touch and drag: a horizontal drag spins the lattice (with inertia), a tap
  // sends a pulse through it. `touch-action: pan-y` hands vertical swipes to
  // the browser, which scrolls the page and cancels the gesture here.
  const drag = { id: null, startX: 0, startY: 0, lastX: 0, lastTime: 0, startTime: 0, horizontal: false };
  let spinVelocity = 0;
  let pulse = 0;
  const DRAG_GAIN = 0.009;
  const target = reducedMotion ? null : interactionTarget;
  const previousStyle = target ? { touchAction: target.style.touchAction, cursor: target.style.cursor } : null;

  const onPointerDown = (event) => {
    if (drag.id !== null || (event.pointerType === "mouse" && event.button !== 0)) return;
    // Mouse: stop the press from starting a text selection or an image drag.
    if (event.pointerType === "mouse") event.preventDefault();
    drag.id = event.pointerId;
    drag.startX = drag.lastX = event.clientX;
    drag.startY = event.clientY;
    drag.startTime = drag.lastTime = performance.now();
    drag.horizontal = false;
    spinVelocity *= 0.3;
    start();
  };
  const onPointerMoveDrag = (event) => {
    if (event.pointerId !== drag.id) return;
    const now = performance.now();
    if (!drag.horizontal) {
      const dx = Math.abs(event.clientX - drag.startX);
      const dy = Math.abs(event.clientY - drag.startY);
      if (dx < 6 || dx < dy) return;
      drag.horizontal = true;
      if (event.pointerType === "mouse") target.setPointerCapture?.(event.pointerId);
      target.style.cursor = "grabbing";
    }
    const delta = (event.clientX - drag.lastX) * DRAG_GAIN;
    const elapsedMove = Math.max(1, now - drag.lastTime) / 1000;
    spin += delta;
    spinVelocity = spinVelocity * 0.6 + (delta / elapsedMove) * 0.4;
    drag.lastX = event.clientX;
    drag.lastTime = now;
  };
  const endDrag = (event, cancelled) => {
    if (event.pointerId !== drag.id) return;
    const moved = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY);
    const quick = performance.now() - drag.startTime < 400;
    if (!cancelled && !drag.horizontal && moved < 8 && quick) pulse = 1;
    // A release after the pointer has rested keeps no momentum.
    if (performance.now() - drag.lastTime > 90) spinVelocity = 0;
    spinVelocity = Math.max(-4, Math.min(4, spinVelocity));
    drag.id = null;
    drag.horizontal = false;
    if (followPointer) target.style.cursor = "grab";
  };
  const onPointerUp = (event) => endDrag(event, false);
  const onPointerCancel = (event) => endDrag(event, true);

  if (target) {
    target.style.touchAction = "pan-y pinch-zoom";
    if (followPointer) target.style.cursor = "grab";
    target.addEventListener("pointerdown", onPointerDown);
    target.addEventListener("pointermove", onPointerMoveDrag, { passive: true });
    // Releases are heard on the window so a drag can end anywhere.
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerCancel);
  }

  // Sizing
  const resize = () => {
    const { clientWidth: width, clientHeight: height } = canvas;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  resize();

  // Rendering: continuous only while visible and animated
  let entrance = reducedMotion ? 1 : 0;
  let spin = 0;
  let elapsed = 0;
  let frame = 0;
  let last = 0;
  let running = false;
  let inView = true;

  const update = (dt) => {
    elapsed += dt;
    entrance = Math.min(1, entrance + dt / 1.6);
    const reveal = 1 - Math.pow(1 - entrance, 3);
    pulse = Math.max(0, pulse - dt / 1.2);
    const energy = pulse * pulse;
    edgeMaterial.uniforms.uOpacity.value = 0.55 * reveal * (1 + 0.9 * energy);
    ringMaterial.uniforms.uOpacity.value = 0.5 * reveal * (1 + 0.8 * energy);
    nodeMaterial.uniforms.uOpacity.value = Math.min(1, 0.85 * reveal * (1 + 0.4 * energy));
    signalMaterial.uniforms.uOpacity.value = reveal;
    orbitMaterial.uniforms.uOpacity.value = reveal;
    nodeMaterial.uniforms.uTime.value = elapsed;
    root.scale.setScalar(0.9 + 0.1 * reveal + 0.05 * energy);

    // Idle drift, plus momentum left over from a drag.
    spin += dt * 0.055 + spinVelocity * dt;
    if (drag.id === null) spinVelocity *= Math.exp(-dt * 2.2);
    if (Math.abs(spinVelocity) < 0.02) spinVelocity = 0;

    // The lattice tips back slightly as the hero scrolls away.
    const scrolled = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
    eased.x += (pointer.x - eased.x) * Math.min(1, dt * 2.4);
    eased.y += (pointer.y - eased.y) * Math.min(1, dt * 2.4);
    root.rotation.y = -0.5 + spin + eased.x * 0.38;
    root.rotation.x = 0.38 + eased.y * 0.24 + scrolled * 0.35;
    ringGroup.rotation.y = 0.2 + eased.x * 0.18;
    ringGroup.rotation.x = 1.16 + eased.y * 0.12 + scrolled * 0.2;

    updateSignals(dt * (1 + 3 * energy));
    orbitAngle += dt * 0.32 * (1 + 3 * energy);
    updateOrbit();
  };

  const render = () => renderer.render(scene, camera);

  // Phones render at 30 fps while idle and at full rate during a drag, its
  // momentum or a pulse, which keeps battery and heat down on 90/120 Hz panels.
  const IDLE_FRAME_MS = 1000 / 30 - 2;
  const interacting = () => drag.id !== null || spinVelocity !== 0 || pulse > 0;

  const tick = (now) => {
    frame = requestAnimationFrame(tick);
    if (lite && !interacting() && now - last < IDLE_FRAME_MS) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    update(dt);
    render();
  };

  const start = () => {
    if (running || reducedMotion || !inView || document.hidden) return;
    running = true;
    last = performance.now();
    frame = requestAnimationFrame(tick);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(frame);
  };

  const resizeObserver = new ResizeObserver(() => {
    resize();
    if (!running) render();
  });
  resizeObserver.observe(canvas);

  const intersection = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (inView) start();
    else stop();
  });
  intersection.observe(canvas);

  const onVisibility = () => (document.hidden ? stop() : start());
  document.addEventListener("visibilitychange", onVisibility);

  const onContextLost = (event) => {
    event.preventDefault();
    stop();
    onFail?.();
  };
  canvas.addEventListener("webglcontextlost", onContextLost);

  // First frame, then hand over to the loop (or stay still for reduced motion)
  update(0);
  render();
  onReady?.();
  start();

  return {
    dispose() {
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      if (target) {
        target.removeEventListener("pointerdown", onPointerDown);
        target.removeEventListener("pointermove", onPointerMoveDrag);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerCancel);
        Object.assign(target.style, previousStyle);
      }
      canvas.removeEventListener("webglcontextlost", onContextLost);
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderer.dispose();
    },
  };
}
