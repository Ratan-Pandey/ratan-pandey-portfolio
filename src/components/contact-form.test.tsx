import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ContactForm } from "@/components/contact-form";

function mockResponse(body: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    json: async () => body,
  } as Response;
}

function fillValidForm() {
  fireEvent.change(screen.getByLabelText("Your name"), { target: { value: "Ratan Pandey" } });
  fireEvent.change(screen.getByLabelText("Your email"), {
    target: { value: "ratan@example.com" },
  });
  fireEvent.change(screen.getByLabelText("A little about the idea"), {
    target: { value: "I have an idea for a project." },
  });
}

describe("ContactForm", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_WEB3FORMS_ACCESS_KEY", "test-access-key");
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("shows field validation errors and does not submit invalid values", () => {
    render(<ContactForm />);

    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    expect(screen.getByText("Please enter your name.")).toBeInTheDocument();
    expect(screen.getByText("Please enter your email address.")).toBeInTheDocument();
    expect(screen.getByText("Please tell me a little about your idea.")).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();

    fillValidForm();
    fireEvent.change(screen.getByLabelText("Your email"), {
      target: { value: "not-an-email" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("posts the form to Web3Forms, prevents duplicate submission, and clears on success", async () => {
    let resolveRequest!: (response: Response) => void;
    vi.mocked(fetch).mockReturnValue(
      new Promise((resolve) => {
        resolveRequest = resolve;
      }),
    );
    render(<ContactForm />);
    fillValidForm();

    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    const submitButton = screen.getByRole("button", { name: /Sending/ });
    expect(submitButton).toBeDisabled();
    expect(fetch).toHaveBeenCalledWith(
      "https://api.web3forms.com/submit",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          access_key: "test-access-key",
          name: "Ratan Pandey",
          email: "ratan@example.com",
          message: "I have an idea for a project.",
          botcheck: "",
        }),
      }),
    );

    resolveRequest(mockResponse({ success: true }));

    expect(
      await screen.findByText("Message sent successfully. I'll get back to you soon!"),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Your name")).toHaveValue("");
    expect(screen.getByLabelText("Your email")).toHaveValue("");
    expect(screen.getByLabelText("A little about the idea")).toHaveValue("");
    await waitFor(() => expect(screen.getByRole("button", { name: "Send Message" })).toBeEnabled());
  });

  it("shows a Web3Forms error response", async () => {
    vi.mocked(fetch).mockResolvedValue(
      mockResponse({ success: false, message: "Invalid access key." }, 400),
    );
    render(<ContactForm />);
    fillValidForm();

    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    expect(await screen.findByText("Invalid access key.")).toBeInTheDocument();
  });

  it("shows a helpful message when the network request fails", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("Network unavailable"));
    render(<ContactForm />);
    fillValidForm();

    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    expect(
      await screen.findByText(
        "We couldn't send your message. Please check your connection and try again.",
      ),
    ).toBeInTheDocument();
  });

  it("explains how to configure a missing access key", () => {
    vi.stubEnv("VITE_WEB3FORMS_ACCESS_KEY", "");
    render(<ContactForm />);
    fillValidForm();

    expect(
      screen.getByText(/Add VITE_WEB3FORMS_ACCESS_KEY to your local \.env file/),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    expect(fetch).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
