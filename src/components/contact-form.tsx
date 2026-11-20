import { useRef, useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ContactField = "name" | "email" | "message";
type ContactErrors = Partial<Record<ContactField, string>>;
type FormStatus = {
  type: "configuration" | "error" | "success";
  message: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const accessKey = import.meta.env["VITE_WEB3FORMS_ACCESS_KEY"]?.trim();
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus | null>(() =>
    accessKey
      ? null
      : {
          type: "configuration",
          message:
            "Contact form isn't configured yet. Add VITE_WEB3FORMS_ACCESS_KEY to your local .env file.",
        },
  );
  const submissionInProgress = useRef(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submissionInProgress.current) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const nextErrors: ContactErrors = {};

    if (!name) nextErrors.name = "Please enter your name.";
    if (!email) {
      nextErrors.email = "Please enter your email address.";
    } else if (!emailPattern.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!message) nextErrors.message = "Please tell me a little about your idea.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!accessKey) {
      setStatus({
        type: "configuration",
        message:
          "Contact form isn't configured yet. Add VITE_WEB3FORMS_ACCESS_KEY to your local .env file.",
      });
      return;
    }

    submissionInProgress.current = true;
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          message,
          botcheck: formData.get("botcheck") ?? "",
        }),
      });
      const result: unknown = await response.json();
      const isSuccess =
        typeof result === "object" &&
        result !== null &&
        "success" in result &&
        result.success === true;
      const apiMessage =
        typeof result === "object" &&
        result !== null &&
        "message" in result &&
        typeof result.message === "string"
          ? result.message
          : undefined;

      if (!response.ok || !isSuccess) {
        setStatus({
          type: "error",
          message: apiMessage ?? "Your message couldn't be sent. Please try again.",
        });
        return;
      }

      form.reset();
      setErrors({});
      setStatus({
        type: "success",
        message: "Message sent successfully. I'll get back to you soon!",
      });
    } catch {
      setStatus({
        type: "error",
        message: "We couldn't send your message. Please check your connection and try again.",
      });
    } finally {
      submissionInProgress.current = false;
      setIsSubmitting(false);
    }
  };

  const clearError = (field: ContactField) => {
    setErrors((currentErrors) => {
      if (!currentErrors[field]) return currentErrors;
      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
  };

  return (
    <form
      className="contact-form"
      aria-label="Contact form"
      aria-busy={isSubmitting}
      noValidate
      onSubmit={handleSubmit}
    >
      <p className="form-heading">Start a conversation</p>
      <input type="checkbox" name="botcheck" tabIndex={-1} aria-hidden="true" hidden />
      <label htmlFor="contact-name">Your name</label>
      <Input
        id="contact-name"
        name="name"
        placeholder="Name"
        autoComplete="name"
        required
        aria-invalid={Boolean(errors.name)}
        aria-describedby={errors.name ? "contact-name-error" : undefined}
        onChange={() => clearError("name")}
      />
      {errors.name && (
        <span className="form-note field-error" id="contact-name-error" role="alert">
          {errors.name}
        </span>
      )}
      <label htmlFor="contact-email">Your email</label>
      <Input
        id="contact-email"
        name="email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        required
        aria-invalid={Boolean(errors.email)}
        aria-describedby={errors.email ? "contact-email-error" : undefined}
        onChange={() => clearError("email")}
      />
      {errors.email && (
        <span className="form-note field-error" id="contact-email-error" role="alert">
          {errors.email}
        </span>
      )}
      <label htmlFor="contact-message">A little about the idea</label>
      <Textarea
        id="contact-message"
        name="message"
        placeholder="What are you thinking about building?"
        required
        aria-invalid={Boolean(errors.message)}
        aria-describedby={errors.message ? "contact-message-error" : undefined}
        onChange={() => clearError("message")}
      />
      {errors.message && (
        <span className="form-note field-error" id="contact-message-error" role="alert">
          {errors.message}
        </span>
      )}
      <Button type="submit" className="form-submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"} <ArrowRight aria-hidden="true" />
      </Button>
      {status && (
        <span
          className="form-note"
          role={status.type === "success" ? "status" : "alert"}
          aria-live={status.type === "success" ? "polite" : "assertive"}
        >
          {status.message}
        </span>
      )}
    </form>
  );
}
