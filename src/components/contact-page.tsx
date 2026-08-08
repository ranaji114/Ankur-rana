"use client";

import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { SiteShell } from "@/components/site-shell";
import { author } from "@/data/content";

type FormState = "idle" | "submitting" | "success" | "error";

type FormData = {
  name: string;
  email: string;
  reason: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required.";
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.reason) errors.reason = "Please select a reason.";
  if (!data.subject.trim()) errors.subject = "Subject is required.";
  if (!data.message.trim()) {
    errors.message = "Message is required.";
  } else if (data.message.trim().length < 20) {
    errors.message = "Message must be at least 20 characters.";
  }
  return errors;
}

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ID
  ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`
  : "https://formspree.io/f/xyegkepz";

const reasons = [
  "Project / Freelance",
  "Job / Internship",
  "Collaboration",
  "Research",
  "Writing / Books",
  "Other",
];

export function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    reason: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [formState, setFormState] = useState<FormState>("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setFormState("submitting");
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          reason: formData.reason,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        setFormState("success");
        setFormData({ name: "", email: "", reason: "", subject: "", message: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  return (
    <SiteShell>
      <section className="page-hero">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h1 className="page-title mt-5">Get in touch.</h1>
            <p className="body-large mt-6" style={{ maxWidth: "580px" }}>
              I&apos;m interested in building software, exploring language systems, researching ideas,
              and having thoughtful conversations about how things work. If any of this resonates,
              write to me.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="split-grid" style={{ alignItems: "start" }}>

            {/* ── Form ── */}
            <Reveal>
              <div className="contact-form">
                <p className="eyebrow" style={{ marginBottom: "1.5rem" }}>Send a message</p>

                {formState === "success" && (
                  <div className="form-success" style={{ marginBottom: "1.5rem" }}>
                    <strong>Message sent.</strong> I&apos;ll get back to you as soon as I can.
                  </div>
                )}

                {formState === "error" && (
                  <div className="form-error-banner">
                    Something went wrong. Please try again or email me directly at{" "}
                    <a href={`mailto:${author.email}`} style={{ fontWeight: 700 }}>
                      {author.email}
                    </a>
                    .
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-field">
                    <label htmlFor="contact-name" className="form-label">
                      Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      className="form-input"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      aria-required="true"
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="form-error" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-email" className="form-label">
                      Email <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      className="form-input"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      aria-required="true"
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="form-error" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-reason" className="form-label">
                      Reason <span aria-hidden="true">*</span>
                    </label>
                    <select
                      id="contact-reason"
                      name="reason"
                      className="form-select"
                      value={formData.reason}
                      onChange={handleChange}
                      aria-required="true"
                      aria-describedby={errors.reason ? "reason-error" : undefined}
                    >
                      <option value="" disabled>
                        Select a reason
                      </option>
                      {reasons.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                    {errors.reason && (
                      <p id="reason-error" className="form-error" role="alert">
                        {errors.reason}
                      </p>
                    )}
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-subject" className="form-label">
                      Subject <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      className="form-input"
                      placeholder="What is it about?"
                      value={formData.subject}
                      onChange={handleChange}
                      aria-required="true"
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                    />
                    {errors.subject && (
                      <p id="subject-error" className="form-error" role="alert">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-message" className="form-label">
                      Message <span aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      className="form-textarea"
                      placeholder="Your message…"
                      value={formData.message}
                      onChange={handleChange}
                      aria-required="true"
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="form-error" role="alert">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="button-primary"
                    disabled={formState === "submitting"}
                    style={{ width: "100%", marginTop: "0.5rem" }}
                    aria-busy={formState === "submitting"}
                  >
                    {formState === "submitting" ? "Sending…" : "Send Message"}
                  </button>
                </form>
              </div>
            </Reveal>

            {/* ── Contact Info ── */}
            <Reveal delay={0.06}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className="surface-card" style={{ padding: "1.5rem" }}>
                  <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>Direct email</p>
                  <a
                    href={`mailto:${author.email}`}
                    style={{
                      fontFamily: "var(--font-display), Georgia, serif",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "var(--text)",
                      textDecoration: "none",
                      wordBreak: "break-all",
                    }}
                  >
                    {author.email}
                  </a>
                  <p className="body-copy mt-3">
                    For reader messages, collaboration ideas, and professional enquiries.
                    I reply to every thoughtful message.
                  </p>
                </div>

                {author.socialLinks.map((link) => (
                  <a
                    key={link.label}
                    className="surface-card"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      padding: "1.25rem",
                      display: "block",
                      textDecoration: "none",
                      color: "inherit",
                      transition: "background 160ms ease",
                    }}
                  >
                    <p className="eyebrow" style={{ marginBottom: "0.5rem" }}>{link.label}</p>
                    <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                      Follow on {link.label} →
                    </p>
                  </a>
                ))}

                <div className="surface-card" style={{ padding: "1.25rem" }}>
                  <p className="eyebrow" style={{ marginBottom: "0.5rem" }}>Location</p>
                  <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>{author.location}</p>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── Navigate ── */}
      <div className="work-end-strip" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container-page">
          <Reveal>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <p style={{ color: "var(--muted)", fontSize: "0.9rem", fontWeight: 500 }}>
                Explore the work
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <Link className="button-secondary" href="/work">Projects</Link>
                <Link className="button-secondary" href="/books">Books</Link>
                <Link className="button-secondary" href="/research">Research</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

    </SiteShell>
  );
}
