import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { test, expect } from "vitest";
import App from "../App";

test("Full Integration: User can login and see Dashboard", async () => {
  render(<App />);

  // ✅ Use label instead of placeholder
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "admin@hospital.com" }
  });

  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "password123" }
  });

  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  await waitFor(() => {
    expect(screen.getByText(/Dashboard Overview/i)).toBeInTheDocument();
  });

  expect(screen.getByText(/MediCare/i)).toBeInTheDocument();
});
