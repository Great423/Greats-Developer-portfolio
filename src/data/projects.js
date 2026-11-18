/*
 * Project data for the portfolio.
 *
 * Each project has:
 *  - status:     badge label for projects without a public live site
 *  - caseStudy:  null, or { sections: [...] } rendered on /project-info/:slug.
 *                A section is { heading, paragraphs, bullets? }. A paragraph is
 *                either a string or { lead, text } for a bold lead-in.
 *
 * Writing rule: no em dashes or en dashes anywhere in this content.
 */
export const projects = [
  {
    title: "Fuelup Global",
    slug: "fuelup-global",
    role: "Lead Frontend Developer (Complete Frontend Development)",
    description:
      "Complete frontend for a Lagos fuel-delivery platform: the marketing website, a role-based customer and rider application, and a separate admin application. Migrated the customer platform from a Vite SPA to the Next.js App Router.",
    stack: ["Next.js", "React", "Tailwind CSS", "TanStack Query", "Zustand"],
    image: "/projects/fuelup-global.jpg",
    liveUrl: "https://fuelupglobal.ng/",
    repoUrl: "",
    featured: true,
    caseStudy: {
      sections: [
        {
          heading: "Context",
          paragraphs: [
            "FuelUp is a doorstep fuel delivery service operating across eleven areas of Lekki and Ajah in Lagos. Customers order petrol, diesel or kerosene from nearby filling stations and have it delivered. I handled frontend engineering across the whole product: the public marketing website, the customer and rider application, and the separate admin application used to run operations.",
          ],
        },
        {
          heading: "The problem",
          paragraphs: [
            "Buying fuel in Lagos means queues, and for a business running a generator it can cost someone their whole morning. FuelUp needed every part to work as one product: a public site that explains the service and converts visitors, an application where a customer orders from a real vendor at a real price and follows the delivery, a rider experience over the same orders, and an admin application where staff manage vendors, pricing, products, orders and users.",
          ],
        },
        {
          heading: "The three surfaces",
          paragraphs: [
            {
              lead: "Public marketing website.",
              text: "The site at fuelupglobal.ng, with the service explanation, a fuel-price ticker, delivery packages, coverage areas and FAQs. It ships from the same Next.js codebase as the application, as a route group with its own layout, so marketing pages and product screens share one component system and one deployment.",
            },
            {
              lead: "Customer and rider application.",
              text: "One Next.js application serving two role-based experiences, not two separate products. Customers get ordering, order history, delivery status, notifications, support and settings. Riders get their own dashboard, map view, notifications, support and settings over the same order data. Role-based routing and client-side guards decide which experience a user lands in, and a session with an unrecognised role is signed out instead of being sent round a redirect loop.",
            },
            {
              lead: "Admin application.",
              text: "A separate React and Vite codebase for operations. I took ownership of its frontend in April 2025 and became its sole frontend developer from that point, developing and expanding its core operational functionality: vendor management and pricing, order management, product management, user management, rider-assigned orders, and support tickets and notifications. I added the same three route guards used in the customer application (protected, public and role-based), so access control behaves the same way in both codebases.",
            },
          ],
        },
        {
          heading: "Frontend architecture",
          paragraphs: [
            "The customer platform is a Next.js App Router application, with route groups separating the public site, authentication, the customer dashboard and the rider dashboard. Server state is handled by TanStack Query, with a hook for each domain: orders, addresses, vendors, notifications and rider orders. Session and profile data live in Zustand stores persisted to localStorage. Page components live in src/views and the route tree stays thin, because a src/pages directory beside src/app would be read as the legacy Pages Router and collide on every shared path.",
          ],
        },
        {
          heading: "Migrating to Next.js",
          paragraphs: [
            "The customer platform began as a React single-page application built with Vite. I migrated it to the Next.js App Router: routing moved to a file-based tree, the surfaces were reorganised into route groups, route protection was rebuilt on Next's navigation, and an SEO pass added what the single-page version could not provide, including proper metadata, a sitemap and robots rules. The theme is applied by a blocking inline script before first paint so it doesn't flash, and cross-page scroll targets moved from router location state, which Next has no equivalent for, to hash and query parameters.",
          ],
        },
        {
          heading: "Ordering workflow",
          paragraphs: [
            "Ordering takes three steps: fuel and vendor, quantity, then review and pay. Dashboard cards link straight into the flow with the product and vendor already in the URL, so tapping a price takes the customer to step two with the choice carried over. Prices are held in kobo throughout to stay consistent with the admin application, and the night surcharge is shown in the order details. Delivery addresses are checked against the eleven covered areas before an order can proceed, and a failed check offers a way forward instead of a dead end.",
          ],
        },
        {
          heading: "API integration",
          paragraphs: [
            "The applications consume the platform's REST API, and I worked with the backend developer on the integration. On the customer platform I built the request layer: bearer-token authentication with an expiry check before a request leaves the browser, and an exception for the authentication endpoints themselves, because a stale token in storage had been cancelling the very login meant to replace it. When a session ends with a 401, the user is told why, and a wrong password is not treated as an expired session. Errors pass through one shared helper, and the client separates two failures that would otherwise look the same to a user: the service being down (server errors and timeouts) and the device being offline. The request timeout is fifteen seconds, because production answers in about two and a half.",
            "Where an endpoint was still in progress, I built the data layer against a mock and then aligned it with the real response schema. Payment is a frontend handoff: the order flow calls the payment initiation endpoint and redirects the customer to the payment provider.",
          ],
        },
        {
          heading: "Engineering challenges",
          paragraphs: [
            {
              lead: "Keeping orders flowing during downtime.",
              text: "When the API is unreachable, the app tells customers the service is briefly down and gives them a WhatsApp number to order through. In the same pass I removed a support form that showed a success message without submitting anything and replaced it with an honest WhatsApp handoff.",
            },
            {
              lead: "An unbounded retry loop in the auth guard.",
              text: "Session verification ran in an effect whose dependencies the verification itself kept updating, so a failed check retried without limit, at the full timeout each time when the backend was down. I moved it to a ref latch that verifies once per mount and holds up under React StrictMode's double invocation in development.",
            },
            {
              lead: "One pricing model across two codebases.",
              text: "Reworking the vendor and pricing model meant changing the customer platform and the admin application together, and keeping money handling identical in both.",
            },
          ],
        },
        {
          heading: "My role",
          paragraphs: [
            "Lead Frontend Developer. Complete frontend development of the marketing website and the customer and rider application, and sole frontend developer of the admin application from April 2025.",
          ],
        },
        {
          heading: "Scope boundary",
          paragraphs: [
            "Backend services, database infrastructure, payment processing and dispatch systems were built by the backend team. The admin application had an earlier implementation by another contributor before I took ownership of its frontend.",
          ],
        },
        {
          heading: "Stack",
          paragraphs: [
            {
              lead: "Customer platform:",
              text: "Next.js 16 (App Router) · React 19 · JavaScript · Tailwind CSS 4 · shadcn/ui · Radix UI · TanStack Query · Zustand · Axios · Framer Motion",
            },
            {
              lead: "Admin application:",
              text: "React · Vite · React Router · TanStack Query · Zustand · Recharts · React Hook Form · Zod",
            },
          ],
        },
      ],
    },
  },
  {
    title: "Dataflex HR Employee Management System",
    shortTitle: "Dataflex HR",
    slug: "dataflex",
    role: "Full-Stack Developer (Sole Developer)",
    description:
      "Internal HR management platform under development: directory, leave, attendance, assets, recruitment, onboarding and performance, with separation of duties enforced in PostgreSQL row-level security.",
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
    image: "",
    liveUrl: "",
    repoUrl: "",
    featured: true,
    status: "Internal · In development",
    caseStudy: {
      sections: [
        {
          heading: "Context",
          paragraphs: [
            "An internal HR platform for Dataflex covering the employee lifecycle: directory and organisation structure, leave, attendance, assets, documents, onboarding, probation, recruitment, performance and engagement. I designed and built it, including the Next.js application, the PostgreSQL schema and the authorisation model.",
          ],
        },
        {
          heading: "The problem",
          paragraphs: [
            "HR records kept across spreadsheets and chat threads are hard to keep consistent: who is on leave, who holds which laptop, whose probation is due, where last year's appraisals went. The platform puts the employee record at the centre and attaches every process to it.",
            "The harder problem is authorisation. An HR system is full of actions people must not take on their own records, such as approving their own leave, confirming their own probation or fulfilling their own equipment request. Hiding a button prevents none of them.",
          ],
        },
        {
          heading: "Architecture",
          paragraphs: [
            "Next.js App Router with TypeScript, and Supabase for PostgreSQL, authentication and storage. Data is fetched in Server Components; Client Components are used only where interaction requires them. Filter and search state lives in the URL, so a filtered view can be shared and the back button behaves as expected.",
            "Three roles (admin, HR and employee) are kept in their own table rather than on the employee record. Application permissions are not job titles, and reading the employees table inside a policy on that same table causes infinite recursion.",
            "Database types are generated from the live schema instead of being written by hand, so every query is checked at compile time and a schema change that breaks a query fails the build instead of failing in production.",
          ],
        },
        {
          heading: "Authorisation at the data layer",
          paragraphs: [
            "Row Level Security is the enforcement; the interface is a convenience. Staff can edit their own photo, phone number, skills and bio, and a trigger blocks any attempt to change employment fields. It raises a database error instead of failing silently, because an update refused by RLS matches zero rows and would otherwise look like success.",
            "Separation of duties is enforced in the database: nobody approves their own leave or confirms their own probation, a request handler cannot move their own request straight to fulfilled, a booked interviewer can see the candidate they are interviewing and nobody else in the pipeline, and onboarding task completion is computed on the server instead of being trusted from the request. Deleting an employee who has history is refused, and other deletions are logged.",
            "A verification script tests these rules directly against the API with a real employee-role token, proving what the database refuses rather than what the interface hides. It includes a regression check that tightening one policy doesn't quietly remove staff on leave from the directory.",
          ],
        },
        {
          heading: "Schema evolution",
          paragraphs: [
            "Every schema change after the baseline is a numbered migration, applied through a migration runner I wrote. Each migration runs in its own transaction with its history record, the run stops at the first failure, and the runner reads the applied history back from the database instead of trusting its own result. Applied migrations are never edited; a change is always a new file with the next number.",
          ],
        },
        {
          heading: "Modules",
          paragraphs: [
            "Employee directory, profiles and organisation chart · leave requests, approvals and entitlements · attendance with holiday handling · asset assignment · employee requests with category routing · document storage and downloads · probation tracking · recruitment across openings, candidates and interviews, with a hire generating a staff ID · onboarding tasks · performance reviews · in-app notifications and announcements · engagement surveys, recognition and feedback · HR reports with CSV export · bank and pension details",
          ],
        },
        {
          heading: "My role",
          paragraphs: [
            "Sole developer, covering the frontend, backend logic, database schema and authorisation model.",
          ],
        },
        {
          heading: "Status",
          paragraphs: [
            "An internal enterprise HR management platform under active development. It runs on fictional employee data for development and testing and has not been formally adopted as the company's HR management system.",
          ],
        },
        {
          heading: "Stack",
          paragraphs: [
            "Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Supabase (PostgreSQL, Auth, Storage) · PostgreSQL Row Level Security",
          ],
        },
      ],
    },
  },
  {
    title: "Viraleety",
    slug: "viraleety",
    role: "Frontend Developer (End-to-end Customer Application Development)",
    description:
      "Complete customer-facing frontend for a social media marketing platform: balance-funded ordering, a service catalogue spanning over twenty platforms, and order tracking.",
    stack: ["React", "Vite", "Tailwind CSS", "Radix UI"],
    image: "/projects/viraleety.jpg",
    liveUrl: "https://viraleety.com",
    repoUrl: "",
    featured: true,
    caseStudy: {
      sections: [
        {
          heading: "Context",
          paragraphs: [
            "Viraleety is a social media marketing platform where customers buy growth services such as followers, likes and views for Instagram, YouTube, TikTok and other networks, with over twenty platforms supported. Customers create an account, fund a balance, order services against it and follow their orders. I built the complete customer-facing frontend: the public marketing site and the authenticated customer application, from one codebase.",
          ],
        },
        {
          heading: "The problem",
          paragraphs: [
            "The platform makes buying growth services self-serve. Customers fund a balance, choose from a catalogue that spans many platforms and follow their orders without contacting anyone. For the frontend, that means presenting a large catalogue clearly, keeping the balance and order activity in view, and showing what happens to an order after it is placed.",
          ],
        },
        {
          heading: "The customer application",
          paragraphs: [
            {
              lead: "Account access.",
              text: "Sign-up and sign-in, with a password visibility toggle, a remember-me option, password recovery and reCAPTCHA bot protection on sign-in.",
            },
            {
              lead: "Dashboard.",
              text: "Account balance and order totals, popular services grouped by platform, a new-order form and recent orders.",
            },
            {
              lead: "Ordering options.",
              text: "The platform documents mass orders, drip-feed delivery and partially completed orders for its customers.",
            },
          ],
        },
        {
          heading: "Frontend architecture",
          paragraphs: [
            "A React single-page application built with Vite that serves the marketing surface and the customer product from one build. The application is split at route and component level, so the public landing page ships only its own code, and its chunks are preloaded rather than discovered one request at a time.",
            "Shared behaviour lives in a primitive component layer (buttons, cards, badges, tabs and form controls) built on accessible Radix primitives with a single class-merging utility, so variants are defined once and every screen inherits the same interaction and focus behaviour. Icons are imported individually, so each page ships only the icons it uses.",
          ],
        },
        {
          heading: "Responsive implementation",
          paragraphs: [
            "The public site adapts from desktop down to phone widths, and the sign-in screen pairs the form with a rotating promotional panel.",
          ],
        },
        {
          heading: "My role",
          paragraphs: [
            "Frontend Developer. End-to-end development of the customer-facing application, covering the marketing site and the authenticated customer product.",
          ],
        },
        {
          heading: "Scope boundary",
          paragraphs: [
            "The administrative interface was built by others. Backend services and payment processing were the backend team's.",
          ],
        },
        {
          heading: "Stack",
          paragraphs: ["React · Vite · Tailwind CSS · Radix UI · Lucide icons"],
        },
      ],
    },
  },
  {
    title: "Radio Church",
    slug: "radio-church",
    role: "Frontend Developer",
    description:
      "Frontend for a live church radio platform with giving, service times and comments, running as separate deployments for two church zones, with a dedicated phone layout.",
    stack: ["React", "Vite", "Tailwind CSS", "Radix UI"],
    image: "/projects/radio-church.jpg",
    liveUrl: "https://www.radiochurch.online/",
    repoUrl: "",
    featured: false,
    caseStudy: {
      sections: [
        {
          heading: "Context",
          paragraphs: [
            "An online radio platform for Christ Embassy that streams live church services to members who can't attend in person. It runs as separate deployments for different church zones, Kaduna and Bayelsa, each with its own branding, giving details and contact routes. I built the frontend.",
          ],
        },
        {
          heading: "The problem",
          paragraphs: [
            "A congregation spread across a region needs the service live, on whatever device is to hand, usually a phone on a mobile network. Around the stream sits everything that makes it a church rather than a radio station: service times, giving details, a way to comment during a service and a number to call in on.",
          ],
        },
        {
          heading: "Deployed today (radiochurch.online and radiochurch.net)",
          paragraphs: [
            "Both live deployments run a single-screen player. The audio element sits at the root of the application, independent of whichever section is on screen, so switching sections never interrupts the stream. Listeners get play, favourite and volume controls, and tabbed sections for giving, service times, comments and quick links. On phones, the Kaduna deployment uses a separate arrangement with a bottom tab bar and call-in and comment buttons beneath the player. The two deployments share the codebase and differ in branding, theme, giving details and contact routes.",
          ],
        },
        {
          heading: "Next version, in development",
          paragraphs: [
            "The codebase also contains a further version that is not part of the current live deployments:",
          ],
          bullets: [
            "Multi-page navigation: home, live, messages, favourites, search and profile.",
            "Separate mobile and desktop layout trees, chosen by a breakpoint hook, with the player logic hoisted to the application root and passed into whichever layout is active, so audio continues across page changes.",
            "A persisted player store that distinguishes the live stream from a recorded message, with the player resolving its source from it.",
            "Buffering and error states driven by the audio element's own events, and volume and mute controls that stay in sync.",
            "A persisted favourites store.",
          ],
        },
        {
          heading: "My role",
          paragraphs: [
            "Frontend Developer. I built the frontend, including the audio player, the deployed single-screen version and the multi-page version in development.",
          ],
        },
        {
          heading: "Scope boundary",
          paragraphs: [
            "The streaming server is a third-party service. Backend services, comment systems and administration were built by others, and a later UI rebrand of the in-development version was done by another contributor.",
          ],
        },
        {
          heading: "Stack",
          paragraphs: [
            {
              lead: "Deployed version:",
              text: "React · Vite · Tailwind CSS · Radix UI",
            },
            {
              lead: "The version in development adds:",
              text: "React Router · Zustand",
            },
          ],
        },
      ],
    },
  },
  {
    title: "Grandlife Pharmaceuticals",
    slug: "grandlife",
    role: "Frontend Developer",
    description: "Responsive company website for Grandlife Pharmaceuticals.",
    stack: [],
    image: "/projects/grandlife.jpg",
    liveUrl: "https://grandlifepharmaceuticals.com/",
    repoUrl: "",
    featured: false,
    caseStudy: null,
  },
  {
    title: "FHAPI",
    slug: "fhapi",
    role: "Frontend Developer",
    description:
      "Website for FHAPI, a Nigerian NGO improving healthcare through advocacy, research and training.",
    stack: [],
    image: "/projects/fhapi.jpg",
    liveUrl: "https://healthadvancement.ngo/",
    repoUrl: "",
    featured: false,
    caseStudy: null,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const getProjectBySlug = (slug) =>
  projects.find((project) => project.slug === slug);
