"use client";

import { useState } from "react";

import { sendInquiry } from "@/lib/api";
import type { Country } from "@/lib/types";

export default function InquiryForm({
  countries,
  compact = false,
}: {
  countries?: Country[];
  compact?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const fieldClass =
    "w-full h-11 px-3.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 text-[0.875rem] outline-none transition-all";
  const labelClass = "block text-[0.875rem] font-semibold text-on-surface mb-1.5";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    const form = new FormData(e.currentTarget);
    try {
      await sendInquiry({
        full_name: String(form.get("full_name") ?? ""),
        phone: String(form.get("phone") ?? ""),
        email: String(form.get("email") ?? ""),
        preferred_country: String(form.get("preferred_country") ?? ""),
        current_qualification: String(form.get("current_qualification") ?? ""),
        message: String(form.get("message") ?? ""),
      });
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again or contact us directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-surface-container-lowest p-10 rounded-2xl border border-outline-variant/60 shadow-lg text-center">
        <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/15 text-secondary mb-4">
          <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            task_alt
          </span>
        </span>
        <h3 className="font-display text-[1.5rem] font-semibold text-on-surface">Request received!</h3>
        <p className="text-[0.875rem] text-on-surface-variant mt-2 max-w-md mx-auto">
          Thank you for reaching out to Bristi Educational Consultancy. A counsellor will contact you within 24
          business hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-4" : "space-y-4"}>
      <div className={`grid grid-cols-1 ${!compact ? "md:grid-cols-2" : ""} gap-4`}>
        <div>
          <label className={labelClass} htmlFor="full_name">Full Name *</label>
          <input id="full_name" name="full_name" className={fieldClass} placeholder="e.g. Binod Karki" required type="text" />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">Phone Number *</label>
          <input id="phone" name="phone" className={fieldClass} placeholder="+977 98XXXXXXXX" required type="tel" />
        </div>
      </div>
      <div className={`grid grid-cols-1 ${!compact ? "md:grid-cols-2" : ""} gap-4`}>
        <div>
          <label className={labelClass} htmlFor="email">Email Address *</label>
          <input id="email" name="email" className={fieldClass} placeholder="youremail@example.com" required type="email" />
        </div>
        <div>
          <label className={labelClass} htmlFor="preferred_country">Preferred Destination</label>
          <select id="preferred_country" name="preferred_country" className={fieldClass} defaultValue="">
            <option value="">Select a country</option>
            {countries?.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="current_qualification">Current Academic Qualification</label>
        <input
          id="current_qualification"
          name="current_qualification"
          className={fieldClass}
          placeholder="+2 High School / Bachelor's / Master's (Degree and GPA)"
          type="text"
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="message">Your Message or Questions</label>
        <textarea
          id="message"
          name="message"
          className="w-full p-3.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 text-[0.875rem] outline-none transition-all"
          placeholder="Tell us about the courses you're interested in, test scores (IELTS/PTE), or any specific questions..."
          rows={4}
        />
      </div>
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full h-12 rounded-xl bg-primary-container text-on-primary hover:bg-primary font-semibold shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-60"
        >
          <span>{status === "submitting" ? "Sending..." : "Send Free Counselling Request"}</span>
          <span className="material-symbols-outlined text-[20px]">send</span>
        </button>
      </div>
      {status === "error" ? (
        <p className="text-[0.875rem] text-error text-center">{error}</p>
      ) : null}
      <p className="text-[12px] text-on-surface-variant text-center pt-2">
        Your personal information is protected and used solely for university advisory purposes.
      </p>
    </form>
  );
}