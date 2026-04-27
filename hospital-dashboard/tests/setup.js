import { beforeAll, afterAll, afterEach, vi } from "vitest";
import "@testing-library/jest-dom";
import "whatwg-fetch";

// ✅ Mock fetch globally
beforeAll(() => {
  global.fetch = vi.fn((url, options) => {
    if (url === "/api/login") {
      const body = JSON.parse(options.body);

      if (body.email === "admin@hospital.com") {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              name: "Admin User",
              token: "123"
            })
        });
      }

      return Promise.resolve({
        ok: false
      });
    }
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

afterAll(() => {
  vi.restoreAllMocks();
});
