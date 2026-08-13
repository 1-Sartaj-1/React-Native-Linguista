# PostHog Self-driving Setup Report

Generated: 2026-08-13

## Summary

PostHog Self-driving (Signals) has been configured for Linguista. Session Replay, Error Tracking, and Support signal sources are now wired to the inbox, and a 5-scout troop is active watching product analytics, feature flags, observability gaps, and setup health. Findings will start appearing in your [Self-driving inbox](https://us.posthog.com/project/555437/inbox) within ~30 minutes as scouts run on their daily schedule.

---

## AI Data Processing

**Approved.** Organization-level AI data processing consent was enforced by the wizard before this run. All Signals features that rely on LLM analysis (session analysis, scout runs, Replay Vision) are authorized.

---

## GitHub

**Connected during this run.**

| Field | Value |
|---|---|
| Integration ID | 215954 |
| Account | 1-Sartaj-1 |
| Connected at | 2026-08-13T04:57:04Z |

GitHub access lets Self-driving investigate findings against your repo and open fix PRs. Grant it the repositories you want it to work with in [GitHub App settings](https://github.com/apps/posthog-self-driving/installations).

---

## Products Enabled

| Product | Status | Notes |
|---|---|---|
| Session Replay | **Enabled but inert** | `products-enable` tool unavailable in this deployment — see follow-ups. This is also a pure mobile (Expo/React Native) app: the server flip is on, but mobile session replay requires explicit SDK configuration (`recordScreen: true` in the PostHog React Native SDK) before sessions are captured. |
| Error Tracking | **Enabled but inert** | Same as above — server flip on, but exception autocapture on React Native needs `enableExceptionAutocapture: true` in the SDK init. The current `src/config/posthog.ts` has no `capture_exceptions: false` override, so it won't block this once the SDK flag is added. |
| Support (Conversations) | **Enabled but inert** | Conversations product turned on, but tickets only arrive once an inbound channel (email / inbox / Slack) is connected in PostHog. |

> **Note on `products-enable`:** The tool was not available in this PostHog deployment. To fully enable these products from the UI, go to: Settings → Session replay → "Record user sessions", Settings → Error tracking → "Enable exception autocapture", and Support via the product sidebar.

---

## Signal Sources

| source_product | source_type | Action | Config ID |
|---|---|---|---|
| `signals_scout` | `cross_source_issue` | **On by default** — no config row needed; creating one would opt out | — |
| `health_checks` | `health_issue` | **Created & enabled** | `019ff97c-1b47-7ac7-9901-23ca6dee1865` |
| `error_tracking` | `issue_created` | **Created & enabled** | `019ff97c-2093-78c7-8e3e-58ca6dfe790f` |
| `error_tracking` | `issue_reopened` | **Created & enabled** | `019ff97c-22bb-71c8-b483-849e91e35e82` |
| `error_tracking` | `issue_spiking` | **Created & enabled** | `019ff97c-2f1f-7d35-a1cf-dda756c3d559` |
| `session_replay` | `session_analysis_cluster` | **Created & enabled** (sample rate 0.1) | `019ff97c-3426-7b5f-aaec-b4a71c92c979` |
| `conversations` | `ticket` | **Created & enabled** (dormant until a channel is connected) | `019ff97c-3601-7abe-8cb8-cb290af2b770` |
| `llm_analytics` | — | **Skipped** — internal only, not a user-facing responder |
| `logs` | — | **Skipped** — not a v1 responder |
| `replay_vision` | — | **Skipped** — Replay Vision scanners are self-authorizing via `emits_signals`; no row needed |

---

## Connected Tools

User selected **none** from the issue-tracker prompt. No external tool warehouse sources were connected.

| Tool | Status |
|---|---|
| GitHub Issues | Not used (not selected) |
| Linear | Not used (not selected) |
| Jira | Not used (not selected) |
| Sentry | Not used (not selected) |
| Zendesk | Not used (not selected) |

---

## Scout Troop

**Run budget:** 100 runs/day (early access default). 0 runs used today. Banner: *"Scouts are in early access. Each project gets up to 100 scout runs a day. Contact team-self-driving@posthog.com if you need more."*

### Enabled (5 scouts)

| Scout | What it watches | Why enabled |
|---|---|---|
| `signals-scout-general` | Cross-product correlations and uncovered surfaces | Always on |
| `signals-scout-product-analytics` | Funnel/retention regressions against saved PostHog flows | Core product surface — onboarding, language selection, lesson engagement |
| `signals-scout-feature-flags` | Flag evaluation cliffs, ghost flags, distribution shifts | SDK explicitly configured: `preloadFeatureFlags: true`, `sendFeatureFlagEvent: true` |
| `signals-scout-observability-gaps` | Events with no insight, dashboard, or alert coverage | Fresh project — catches instrumented events that have no analysis yet |
| `signals-scout-health-checks` | PostHog setup health issues | New integration — catches SDK/proxy issues early |

### Disabled (22 scouts)

All other scouts were already in `paused_by_user` state and left disabled. Surface-specific notes:

| Scout | Reason disabled |
|---|---|
| `signals-scout-error-tracking` | Covered by native `error_tracking` source (3 rows enabled in step 4) |
| `signals-scout-session-replay` | Covered by native `session_replay` / `session_analysis_cluster` source |
| `signals-scout-web-analytics` | Pure mobile app — no web traffic surface |
| `signals-scout-web-vitals` | Pure mobile app — no Core Web Vitals |
| `signals-scout-csp-violations` | Pure mobile app — no CSP |
| `signals-scout-revenue-analytics` | No payment SDK detected |
| `signals-scout-ai-observability` | No `$ai_*` events or LLM SDK found |
| `signals-scout-surveys` | No PostHog surveys in use |
| `signals-scout-experiments` | No active A/B experiments detected |
| `signals-scout-customer-analytics` | No group/account analytics in use |
| `signals-scout-data-pipelines` | No CDP destinations, batch exports, or hog flows |
| `signals-scout-logs` | PostHog logs product not in use |
| `signals-scout-apm` | No OpenTelemetry span data |
| `signals-scout-conversations` | No Conversations product data yet |
| `signals-scout-data-warehouse` | No warehouse sources connected |
| `signals-scout-replay-vision` | No Replay Vision scanners running (mobile — not applicable) |
| `signals-scout-anomaly-detection` | Not among top 5 surfaces for this project currently |
| `signals-scout-inbox-validation` | Fresh setup — no resolved reports to validate |
| `signals-scout-insight-alerts` | No insight alerts configured |
| `signals-scout-mcp-tool-calls` | No MCP tool call telemetry |
| `signals-scout-skills-store` | Not relevant for product app |
| `signals-scout-tasks` | Not relevant at this stage |

To enable any of these later, go to your [Self-driving inbox](https://us.posthog.com/project/555437/inbox) → Scout settings.

---

## Custom Scouts

One candidate was identified from the gap analysis and proposed to the user:

- **Signup funnel conversion scout** (`signals-scout-signup-funnel`) — watches `get_started_tapped` → `sign_up_submitted` → `sign_up_completed` → `language_selected` step-by-step for conversion rate drops. Uncovered because `signals-scout-product-analytics` watches saved PostHog funnels, and none have been created yet.

**Outcome: proposed, declined.** The built-in troop is kept as-is.

**Surfaces considered and ruled out:**
- Daily learning engagement (`plan_item_toggled`, `continue_learning_tapped`) — will be covered by `signals-scout-product-analytics` once funnel insights are saved in PostHog. Not a gap.
- AI teacher engagement (`ai_teacher_opened`) — no success/failure pair tracked yet; surface not ready for a scout.
- Lesson completion — no `lesson_completed` event captured; not watchable.

**Noise escape hatch:** To put any scout into dry-run mode (runs but doesn't write to the inbox), set `emit: false` on its config in PostHog.

---

## Replay Vision Scanners

**Both skeletons skipped — pure mobile app.**

Linguista is an Expo/React Native mobile app with no web surface. Replay Vision scanners watch browser session recordings (URL-scoped via `$current_url`). Neither the "Broken experiences" nor "User frustration" scanner can target meaningful flows without a web recording surface.

If a web companion app is built in the future, create the two scanners at that time:
1. **Broken experiences** — scope to the signup/language-selection web flow with `$current_url icontains /sign-up` (and language selection path)
2. **User frustration** — gate on `$rageclick`, no URL scope

---

## Follow-ups

- [ ] **Enable Session Replay on mobile** — add `recordScreen: true` to the PostHog React Native SDK init in `src/config/posthog.ts`. See [posthog-react-native session replay docs](https://posthog.com/docs/session-replay/mobile).
- [ ] **Enable Exception Autocapture on mobile** — add `enableExceptionAutocapture: true` to the SDK init. This enables error tracking on native crashes and JS exceptions.
- [ ] **Enable products via UI** (if the above SDK changes don't suffice) — Settings → Session replay → "Record user sessions"; Settings → Error tracking → "Enable exception autocapture"; Support in the product sidebar.
- [ ] **Connect a Support channel** — go to PostHog → Support (Conversations) → connect an inbound channel (email / inbox / Slack) so the `conversations / ticket` source produces findings.
- [ ] **Create PostHog funnel insights** — once you capture enough events, create saved funnel insights in PostHog for the onboarding and language-selection flows. The `signals-scout-product-analytics` scout will then have saved flows to watch for regressions.
- [ ] **Set up Replay Vision scanners** — if a web companion app is built, create the two scanner skeletons (Broken experiences + User frustration) pointing at the web signup/onboarding flow.
- [ ] **Connect an issue tracker** — if you start using Linear, GitHub Issues, or Jira, run this setup again (or add a source manually via [PostHog data warehouse](https://us.posthog.com/project/555437/pipeline/new/source)) to feed those into the inbox.
- [ ] **Enable more scouts** — as the product grows (revenue, experiments, AI features), enable the relevant specialists (`signals-scout-revenue-analytics`, `signals-scout-experiments`, `signals-scout-ai-observability`) from the inbox.

---

## What Happens Next

The scout coordinator picks up fresh configs within **~30 minutes**. Each enabled scout runs once per day at its default cadence. Findings cluster into reports in the [Self-driving inbox](https://us.posthog.com/project/555437/inbox); immediately-actionable ones can kick off coding tasks.

Scout runs draw from the daily budget (100 runs/day during early access). With 5 enabled scouts, this project uses roughly 5 runs/day — well within budget.
