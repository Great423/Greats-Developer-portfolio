/**
 * The scene core's methods that the page controller may call, by name. Kept
 * apart from heroSceneCore.js so the controller can use the list without
 * pulling Three.js into its own chunk; the worker accepts only these.
 */
export const CORE_METHODS = ["resize", "setActive", "setPointer", "setScroll", "dragStart", "dragBy", "dragEnd", "pulse"];
