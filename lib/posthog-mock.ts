const posthogMock = {
  capture: (event: string, properties?: Record<string, any>) => {
    console.log(`[PostHog Mock] capture:`, event, properties);
  },
  captureException: (error: any) => {
    console.error(`[PostHog Mock] captureException:`, error);
  },
  init: () => {},
  identify: () => {},
  reset: () => {},
};

export default posthogMock;
