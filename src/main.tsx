import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import * as Sentry from "@sentry/react";
// 아래 코드를 추가하세요.
// - https://medium.com/hcleedev/web-%EB%B2%84%EA%B7%B8-%EB%A6%AC%ED%8F%AC%ED%8C%85%EC%9D%84-%EC%9C%84%ED%95%9C-sentry-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0-react-webpack-b9690b8f5b45

Sentry.init({
  dsn: import.meta.env.VITE_APP_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // 성능 모니터링 -- Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

// Sentry.captureException({code: 999, message: 'test'});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
