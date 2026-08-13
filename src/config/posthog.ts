import PostHog from 'posthog-react-native'
import Constants from 'expo-constants'

// Configuration loaded from app.config.js extras via expo-constants.
// POSTHOG_PROJECT_TOKEN and POSTHOG_HOST are read from .env at build time
// and embedded via the extras field in app.config.js.
const projectToken = Constants.expoConfig?.extra?.posthogProjectToken as string | undefined
const host = (Constants.expoConfig?.extra?.posthogHost as string) || 'https://us.i.posthog.com'
const isPostHogConfigured = Boolean(projectToken)

if (__DEV__ && !isPostHogConfigured) {
  console.warn(
    'POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, ' +
      'this causes events to be silently missed. ' +
      'This error stops appearing once POSTHOG_PROJECT_TOKEN is configured.'
  )
}

/**
 * PostHog client instance for Linguista (Expo / React Native).
 *
 * Wrap your root component with <PostHogProvider client={posthog} />.
 * Use usePostHog() inside PostHogProvider to access the client in screens.
 *
 * @see https://posthog.com/docs/libraries/react-native
 */
export const posthog = new PostHog(projectToken || 'placeholder_key', {
  host,

  // Disable analytics when the project token is not configured.
  disabled: !isPostHogConfigured,

  // Capture app lifecycle events (opened, backgrounded, installed, updated).
  captureAppLifecycleEvents: true,

  // Batching — optimises battery by queuing events before sending.
  flushAt: 20,
  flushInterval: 10000,
  maxBatchSize: 100,
  maxQueueSize: 1000,

  // Feature flags.
  preloadFeatureFlags: true,
  sendFeatureFlagEvent: true,

  // Network resilience.
  requestTimeout: 10000,
  fetchRetryCount: 3,
  fetchRetryDelay: 3000,
})

export const isPostHogEnabled = isPostHogConfigured
