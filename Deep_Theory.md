#  Day 28 – Full Real Deep Content (React Testing – Detailed Notes)

---

#  1. React Testing Library (RTL) Philosophy

###   RTL -
React Testing Library is a testing utility that helps you test React components by focusing on **how users actually use your application**, rather than how it is implemented internally.

---

###  Core Philosophy:
-  Test the **UI behavior**, not internal code
-  Do NOT test:
  - component state
  - private methods
  - implementation details
-  Focus on what the **user sees and does**

---

###  Why This Matters:
Traditional testing checks:
```js
expect(component.state.isOpen).toBe(true);

RTL approach:

expect(screen.getByText("Modal Content")).toBeInTheDocument();

 This ensures your app works even if internal code changes.

🔹 Example:
screen.getByRole("button", { name: /login/i });
🔹 Key Concepts:
Accessibility-first testing
Mimics real browser behavior
Encourages better UI design



 2. Unit Testing User Interactions 
Testing how a single component reacts to user actions

🔹 Tools:
userEvent  (recommended)
fireEvent  (basic, less realistic)

🔹 Why userEvent -
Simulates real typing speed
Handles async behavior
Closer to real user interaction

🔹 Common Actions:
Click → userEvent.click()
Type → userEvent.type()
Clear → userEvent.clear()
Hover → userEvent.hover()

🔹 Example:
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("user can type and submit form", async () => {
  render(<Login />);

  await userEvent.type(screen.getByLabelText(/email/i), "test@gmail.com");
  await userEvent.type(screen.getByLabelText(/password/i), "123456");

  await userEvent.click(screen.getByRole("button", { name: /login/i }));

  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
});

🔹 Important Points:
Always use await with userEvent
Test what changes in UI
Avoid testing internal function calls



 3. Mocking API Calls
🔹  Mocking -
Replacing real API calls with fake responses during testing.

🔹  Need -
1) Faster tests
2) No dependency on backend
3) Predictable results

🔹 Common Approaches:
jest.mock()
Mock fetch
Mock axios

🔹 Example: Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ name: "Anjali" }),
  })
);

test("displays fetched data", async () => {
  render(<Profile />);

  const text = await screen.findByText(/anjali/i);
  expect(text).toBeInTheDocument();
});

🔹 Example: Mock axios
import axios from "axios";
jest.mock("axios");

axios.get.mockResolvedValue({
  data: { name: "Anjali" }
});

🔹 Async Queries:
Query	Use
findByText	Wait for async UI
waitFor	Custom waiting

🔹 Error Case Testing:
axios.get.mockRejectedValue(new Error("API Error"));



 4. Integration Testing (Forms & Modals)
🔹  Integration Testing -

Testing multiple components working together

🔹 Real Scenarios:
Form → Input → Submit → API → UI update
Modal → Open → Close → State change

🔹 Example: Form Testing
test("form submission flow", async () => {
  render(<Register />);

  await userEvent.type(screen.getByLabelText(/name/i), "Anjali");
  await userEvent.type(screen.getByLabelText(/email/i), "anjali@gmail.com");

  await userEvent.click(screen.getByRole("button", { name: /submit/i }));

  expect(screen.getByText(/success/i)).toBeInTheDocument();
});

🔹 Example: Modal Testing
test("modal open and close", async () => {
  render(<Modal />);

  await userEvent.click(screen.getByText(/open/i));
  expect(screen.getByText(/modal content/i)).toBeInTheDocument();

  await userEvent.click(screen.getByText(/close/i));
  expect(screen.queryByText(/modal content/i)).not.toBeInTheDocument();
});



 5. Jest Mocking Techniques (Advanced)
🔹 1. Mock Function
const mockFn = jest.fn();
mockFn("hello");

expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledWith("hello");
🔹 2. Mock Module
jest.mock("./api");
🔹 3. Mock Return Values
mockFn.mockReturnValue("Data");
🔹 4. Mock Async Functions
mockFn.mockResolvedValue("Success");
mockFn.mockRejectedValue("Error");
🔹 5. Spy on Existing Functions
const spy = jest.spyOn(console, "log");

console.log("test");
expect(spy).toHaveBeenCalled();
🔹 6. Reset / Clear Mocks
afterEach(() => {
  jest.clearAllMocks();   // clears usage
  jest.resetAllMocks();   // resets implementation
});
🔹 7. Partial Mocking
jest.mock("./utils", () => ({
  ...jest.requireActual("./utils"),
  myFunction: jest.fn(),
}));
