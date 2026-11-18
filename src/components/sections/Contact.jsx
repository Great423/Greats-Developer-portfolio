/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck, FiCopy, FiLoader, FiMail, FiMapPin, FiSend } from "react-icons/fi";
import { contactIntro, person } from "../../data/site";
import { ease } from "../../lib/motion";
import Button from "../ui/Button";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import SocialLinks from "../ui/SocialLinks";
import GeoAccent from "../ui/GeoAccent";

// EmailJS identifiers are public by design (the public key is meant for the browser).
const EMAILJS = {
  serviceId: "service_0u3blq8",
  templateId: "template_o39t5hp",
  publicKey: "9BVJWOTFoUTVqQNr-",
};

const messages = {
  sent: "Message sent successfully!",
  error: "Failed to send message. Please try again, or email me directly.",
};

const fieldClass =
  "peer w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-[17px] text-white placeholder:text-white/30 transition-[border-color,background-color,box-shadow] duration-300 hover:border-white/20 focus:border-brand-pink/60 focus:bg-white/[0.05] focus:outline-none focus:ring-4 focus:ring-brand-pink/10";

function Field({ id, label, children }) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-2.5 block text-white/60">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (status !== "sent") return undefined;
    const timer = setTimeout(() => setStatus("idle"), 7000);
    return () => clearTimeout(timer);
  }, [status]);

  const sendEmail = async (event) => {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      await emailjs.sendForm(EMAILJS.serviceId, EMAILJS.templateId, formRef.current, {
        publicKey: EMAILJS.publicKey,
      });
      formRef.current.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${person.email}`;
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-24 md:py-28">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 h-[70%] w-[min(1100px,120%)] -translate-x-1/2 rounded-full opacity-70"
        style={{ background: "radial-gradient(closest-side, rgba(185,54,238,0.16), transparent)" }}
      />
      <div className="container grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <RevealGroup>
            <RevealItem as="p" className="eyebrow flex items-center gap-3">
              <span>
                <span aria-hidden="true" className="text-brand-pink">&lt;</span>
                get in touch
                <span aria-hidden="true" className="text-brand-pink"> /&gt;</span>
              </span>
            </RevealItem>
            <RevealItem as="h2" id="contact-title" className="mt-5 font-secondary text-display-sm font-bold text-white">
              Let&apos;s build <span className="text-gradient">something solid.</span>
            </RevealItem>
            <RevealItem as="p" className="mt-7 max-w-xl text-lead text-white/70">
              {contactIntro}
            </RevealItem>
          </RevealGroup>

          <Reveal as="dl" className="mt-10 grid gap-px overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2">
            <div className="bg-ink-900 p-5">
              <dt className="eyebrow flex items-center gap-2">
                <FiMail aria-hidden="true" /> Email
              </dt>
              <dd className="mt-3 flex items-center justify-between gap-3">
                <a href={`mailto:${person.email}`} className="inline-flex min-h-[44px] items-center break-all font-semibold text-white transition-colors hover:text-brand-pink">
                  {person.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={copied ? "Email address copied" : "Copy email address"}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-white/25 hover:text-white"
                >
                  {copied ? <FiCheck aria-hidden="true" className="text-brand-pink" /> : <FiCopy aria-hidden="true" />}
                </button>
              </dd>
            </div>
            <div className="bg-ink-900 p-5">
              <dt className="eyebrow flex items-center gap-2">
                <FiMapPin aria-hidden="true" /> Location
              </dt>
              <dd className="mt-3 font-semibold text-white">
                {person.location}
                <span className="mt-1 block font-medium text-white/55">{person.remote}</span>
              </dd>
            </div>
          </Reveal>
          <span aria-live="polite" className="sr-only">
            {copied ? "Email address copied to clipboard" : ""}
          </span>

          <Reveal className="mt-8">
            <SocialLinks />
          </Reveal>
        </div>

        <Reveal className="relative lg:col-span-6" delay={0.1}>
          <GeoAccent id="contact" className="absolute -right-10 -top-16 -z-10 hidden h-64 w-64 opacity-70 md:block" />
          <form
            ref={formRef}
            onSubmit={sendEmail}
            className="relative rounded-[24px] border border-white/10 bg-ink-850/80 p-6 shadow-frame backdrop-blur-xl sm:p-8"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="contact-name" label="Your name">
                <input id="contact-name" type="text" name="name" autoComplete="name" required placeholder="Jane Doe" className={fieldClass} />
              </Field>
              <Field id="contact-email" label="Your email">
                <input id="contact-email" type="email" name="email" autoComplete="email" required placeholder="jane@company.com" className={fieldClass} />
              </Field>
            </div>
            <div className="mt-6">
              <Field id="contact-message" label="Your message">
                <textarea
                  id="contact-message"
                  name="message"
                  rows="6"
                  required
                  placeholder="Tell me about the role or the project."
                  className={`${fieldClass} resize-y`}
                />
              </Field>
            </div>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit" magnetic disabled={status === "sending"} icon={status === "sending" ? FiLoader : FiSend} className="w-full sm:w-auto">
                {status === "sending" ? "Sending..." : "Send message"}
              </Button>
              <div aria-live="polite" role="status" className="min-h-[1.5rem] text-[15px]">
                <AnimatePresence mode="wait">
                  {(status === "sent" || status === "error") && (
                    <motion.p
                      key={status}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.35, ease: ease.out }}
                      className={status === "sent" ? "text-brand-sky" : "text-brand-pink"}
                    >
                      {messages[status]}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
