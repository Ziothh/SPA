import type * as Sentry from "@sentry/nextjs";

const SENTRY_SHARED_CONFIG = {
    dsn: "https://afdcad242dc4e4e433eb1f5bebd5e84c@o4507542413312000.ingest.de.sentry.io/4508127485231184",

    // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
    tracesSampleRate: 1,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
} as const satisfies Parameters<typeof Sentry.init>[0];

export default SENTRY_SHARED_CONFIG;
