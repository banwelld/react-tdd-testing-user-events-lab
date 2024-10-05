import { render, screen, within, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';

import App from "../App";

// Portfolio Elements
test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);

  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  });

  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);

  const image = screen.getByAltText("My profile pic");

  expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
});

test("displays second-level heading with the text `About Me`", () => {
  render(<App />);

  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });

  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);

  const bio = screen.getByText(/lorem ipsum/i);

  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);

  const githubLink = screen.getByRole("link", {
    name: /github/i,
  });
  const linkedinLink = screen.getByRole("link", {
    name: /linkedin/i,
  });

  expect(githubLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://github.com")
  );

  expect(linkedinLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://linkedin.com")
  );
});

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  render(<App />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);

  const form = screen.getByRole("form");
  const interestLabel = within(form).getByText(/interest/i);
  const checkboxes = within(form).getAllByRole("checkbox");

  expect(interestLabel).toBeInTheDocument();
  expect(checkboxes.length).toBeGreaterThanOrEqual(3);
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);

  const form = screen.getByRole("form");
  const checkboxes = within(form).getAllByRole("checkbox", {checked: false});
  const checked = within(form).getAllByRole("checkbox");

  expect(checkboxes.length).toBe(checked.length);
});

// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", () => {
  render(<App />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });

  fireEvent.change(nameInput, { target: { value: "John Doe" } });
  fireEvent.change(emailInput, { target: { value: "johndoe@example.com" } });

  expect(nameInput).toHaveValue("John Doe");
  expect(emailInput).toHaveValue("johndoe@example.com");
});

test("checked status of checkboxes changes when user clicks them", () => {
  render(<App />);

  const form = screen.getByRole("form");
  const checkboxes = within(form).getAllByRole("checkbox");

  checkboxes.forEach(box => {
    fireEvent.click(box);
    expect(box).toBeChecked();
    fireEvent.click(box);
    expect(box).not.toBeChecked();
  });
});

test("a message is displayed when the user clicks the Submit button", () => {
  render(<App />);
  expect(screen.queryByText(/success/i)).toBeFalsy();

  const btn = screen.getByRole("button", { name: /submit/i });
  const first = screen.getByRole("textbox", { name: /first/i });
  const last = screen.getByRole("textbox", { name: /last/i });
  const email = screen.getByRole("textbox", { name: /email/i });
  const boxes = screen.getAllByRole("checkbox");

  fireEvent.change(first, { target: { value: "John" } });
  fireEvent.change(last, { target: { value: "Doe" } });
  fireEvent.change(email, { target: { value: "johndoe@example.com" } });
  boxes.forEach(box => {
    fireEvent.click(box);
  });

  fireEvent.click(btn);
  expect(screen.getByText(/success/i)).toBeTruthy();
});
