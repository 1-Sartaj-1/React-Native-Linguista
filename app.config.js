// Dynamic Expo config that merges with app.json and injects PostHog env vars
// as extras accessible via expo-constants at runtime.
export default ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    posthogProjectToken: process.env.POSTHOG_PROJECT_TOKEN,
    posthogHost: process.env.POSTHOG_HOST || 'https://us.i.posthog.com',
  },
})
