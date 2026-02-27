"use client";

import Image from "next/image";
import {
  Linkedin,
  Mail,
  Bot,
  User,
  ArrowUpRight,
  Music,
  Pause,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { useState, useEffect, useMemo, useRef } from "react";
import { ThemeToggle } from "./components/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { getMarkdownContent } from "./data/content";
import { PomodoroTimer } from "./components/PomodoroTimer";

/* ═══════════════════════════ PAGE ═══════════════════════════ */

export default function Home() {
  /* ── state ── */
  const [time, setTime] = useState<string>("");
  const [timezone, setTimezone] = useState<string>("");
  const [mode, setMode] = useState<"human" | "agent">("human");
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isLofiPlaying, setIsLofiPlaying] = useState(false);
  const [lofiVolume, setLofiVolume] = useState(1);
  const lofiRef = useRef<HTMLAudioElement | null>(null);

  /* ── clock — auto-detects visitor timezone ── */
  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString(undefined, {
          timeZone: tz,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
      // get short timezone abbreviation
      const parts = new Intl.DateTimeFormat(undefined, {
        timeZone: tz,
        timeZoneName: "short",
      }).formatToParts(now);
      const tzPart = parts.find((p) => p.type === "timeZoneName");
      setTimezone(tzPart?.value || tz.split("/").pop()?.replace("_", " ") || "");
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  /* ── lofi ── */
  useEffect(() => {
    if (lofiRef.current) lofiRef.current.volume = lofiVolume;
  }, [lofiVolume]);

  useEffect(() => {
    return () => {
      if (lofiRef.current) {
        lofiRef.current.pause();
        lofiRef.current = null;
      }
    };
  }, []);

  const toggleLofi = () => {
    if (!lofiRef.current) {
      lofiRef.current = new Audio("/lofi.mp3");
      lofiRef.current.loop = true;
      lofiRef.current.volume = lofiVolume;
    }
    if (isLofiPlaying) {
      lofiRef.current.pause();
    } else {
      lofiRef.current.play().catch((e) => console.error("Lofi play failed:", e));
    }
    setIsLofiPlaying(!isLofiPlaying);
  };

  const markdownContent = getMarkdownContent(time, timezone);

  /* ── easter egg stars ── */
  const starPositions = useMemo(() => {
    return [...Array(50)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 5,
    }));
  }, []);

  /* ── data ── */
  const companies = [
    {
      name: "LeadSend",
      desc: "Cold email infrastructure. Campaigns across niches, at scale.",
    },
    {
      name: "GrowthBeam",
      desc: "Growth consulting. Helped clients add millions in revenue — 30-40% increases within months.",
    },
    {
      name: "RootedHires",
      url: "https://rootedhires.com/",
      desc: "Hiring agency and ATS. Matching talent to companies that actually deserve them.",
    },
    {
      name: "Dragonfruit Studio",
      url: "https://dragonfruitstudio.com/",
      desc: "End-to-end design and media. Branding, websites, creative — built for top 100 US MNCs.",
    },
  ];

  const products = [
    {
      name: "BuzzedInbox",
      url: "http://buzzedinbox.com/",
      desc: "Microsoft email infrastructure platform for outreach at scale.",
    },
    {
      name: "Artha",
      url: "https://artha.sh/",
      desc: "Three functions. Zero webhooks. Stripe billing as easy as a config file.",
    },
    {
      name: "NihongoBee",
      desc: "A-to-Z Japanese learning — interactive, comprehensive, under active development.",
      badge: "Building",
    },
    {
      name: "Leadraft",
      desc: "B2B lead database. Find the right people, fast.",
      badge: "Building",
    },
    {
      name: "DevBuddy",
      url: "https://chromewebstore.google.com/detail/devbuddy-pro-all-in-one-e/kjopehkeickfkidhnmhooibpagkodlnc",
      desc: "Chrome extension for developers who like their workflow clean.",
    },
    {
      name: "True Humanizer",
      desc: "Turns AI-written text into something no detector can flag.",
      badge: "Building",
    },
  ];

  const timeline = [
    { age: "17", event: "Started messing around online. Didn't know what I was doing, but something clicked." },
    { age: "19", event: "First real money. Not a lot, but enough to know this was the path." },
    { age: "21", event: "80+ active clients. The chaos was real, but so were the systems I built to tame it." },
    { age: "22", event: "Multiple companies running. Products shipping. Still early." },
  ];

  const philosophy = [
    "Systems over hustle.",
    "Clarity over motivation.",
    "Leverage over effort.",
    "Structure creates freedom.",
    "Long game. Always.",
  ];

  return (
    <div
      className={`relative flex min-h-screen flex-col items-center bg-white dark:bg-black px-3 pt-16 text-black dark:text-white selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black pb-32 sm:px-4 sm:pt-24 sm:pb-40 overflow-x-hidden transition-colors duration-300`}
    >
      {/* Easter Egg Effects */}
      <AnimatePresence>
        {showEasterEgg && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] pointer-events-none shadow-[inset_0_0_150px_rgba(29,78,216,0.5)] dark:shadow-[inset_0_0_150px_rgba(59,130,246,0.4)] transition-opacity duration-1000"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
            >
              {starPositions.map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute h-[2px] w-[2px] bg-blue-500 dark:bg-white rounded-full shadow-[0_0_4px_rgba(59,130,246,0.8)] dark:shadow-[0_0_3px_white]"
                  style={{ top: pos.top, left: pos.left }}
                  animate={{
                    opacity: [0.2, 1, 0.2],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: pos.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: pos.delay,
                  }}
                />
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <AnimatePresence mode="wait">
        {mode === "agent" ? (
          /* ── AGENT MODE ── */
          <motion.main
            key="agent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" as const }}
            className="flex w-full max-w-2xl flex-col items-start text-left px-4 sm:px-0"
          >
            <pre
              className="w-full whitespace-pre-wrap font-mono text-sm leading-relaxed text-black dark:text-gray-300 selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black antialiased"
              style={{
                fontFamily:
                  '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Console", monospace',
              }}
            >
              {markdownContent}
            </pre>
          </motion.main>
        ) : (
          /* ── HUMAN MODE ── */
          <motion.main
            key="human"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" as const }}
            className="flex w-full max-w-2xl flex-col items-center text-center"
          >
            {/* ── HERO ── */}
            <button
              onClick={() => setShowEasterEgg(!showEasterEgg)}
              className="group relative mb-2 h-40 w-40 grayscale filter sm:h-56 sm:w-56 overflow-hidden cursor-pointer transition-all duration-500 hover:grayscale-0 active:scale-95"
              aria-label="Toggle Aura Mode"
            >
              <Image
                src="/me.png"
                alt="Vishnu — Founder, operator, and product builder specializing in lead generation and AI systems"
                fill
                className={`object-contain transition-all duration-700 ${showEasterEgg ? "grayscale-0 scale-105" : "grayscale"
                  }`}
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/60 to-transparent dark:from-black dark:via-black/60 backdrop-blur-[1px]" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_20px_rgba(59,130,246,0.3)] rounded-full pointer-events-none" />
            </button>

            <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-7xl">
              Vishnu
            </h1>

            {/* Phonetic + Time + Lofi */}
            <div className="mb-8 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-500 sm:text-sm">
              <span>/ˈvɪʃnuː/</span>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <span>noun</span>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="tabular-nums text-xs sm:text-sm">
                    {time || "00:00:00"}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider sm:text-xs">
                    {timezone || "..."}
                  </span>
                </div>

                <span className="text-gray-300 dark:text-gray-700">•</span>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-tight text-gray-400">
                    lofi
                  </span>
                  <button
                    onClick={toggleLofi}
                    className="flex h-5 w-5 items-center justify-center rounded-full transition-all hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-black dark:hover:text-white"
                    aria-label={isLofiPlaying ? "Pause Lofi" : "Play Lofi"}
                  >
                    {isLofiPlaying ? (
                      <Pause size={10} fill="currentColor" />
                    ) : (
                      <Music size={10} />
                    )}
                  </button>
                  <AnimatePresence>
                    {isLofiPlaying && (
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 40, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="flex h-5 items-center overflow-hidden"
                      >
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={lofiVolume}
                          onChange={(e) =>
                            setLofiVolume(parseFloat(e.target.value))
                          }
                          className="h-[2px] w-8 cursor-pointer appearance-none rounded-full bg-gray-200 dark:bg-zinc-800 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-400 dark:[&::-webkit-slider-thumb]:bg-zinc-500 hover:[&::-webkit-slider-thumb]:bg-black dark:hover:[&::-webkit-slider-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:h-2 [&::-moz-range-thumb]:w-2 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gray-400 dark:[&::-moz-range-thumb]:bg-zinc-500 hover:[&::-moz-range-thumb]:bg-black dark:hover:[&::-moz-range-thumb]:bg-white transition-all"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* ── Identity hook ── */}
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500 sm:text-base">
              Founder · Operator · Product Builder
            </p>
            <div className="w-full space-y-4 text-left text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg md:text-xl">
              <p>
                I build companies, ship products, and design the systems that
                hold everything together. Most of what I do runs quietly in the
                background — that&apos;s by design.
              </p>
            </div>

            {/* ── WHO I AM — comes first, with breathing room ── */}
            <div className="mt-20" />
            <SectionBlock label="Who I Am">
              <div className="space-y-4 text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg">
                <p>
                  Started at 17 with no playbook. Just a laptop and the kind of
                  curiosity that doesn&apos;t let you sleep properly. Tried
                  everything — dropshipping, freelancing, content, services.
                  Most of it didn&apos;t work. Some of it did.
                </p>
                <p>
                  The thing that stuck was lead generation. Built the systems,
                  scaled the operations, ended up managing 80+ clients at once.
                  That mostly meant firefighting chaos at 2am. So I did what
                  made sense — built the infrastructure to replace the chaos.
                  SOPs, automations, process architecture. Slowly, things
                  stopped breaking.
                </p>
                <p>
                  That taught me what I actually care about: building things that
                  work without me in the room. Now it&apos;s products and SaaS —
                  solving problems I&apos;ve lived through, for people going
                  through the same thing.
                </p>
                <p className="text-black dark:text-white font-medium">
                  I&apos;m not trying to be everywhere.
                  <br />
                  I&apos;m building something that doesn&apos;t need me in every
                  room.
                </p>
              </div>
            </SectionBlock>

            {/* ── COMPANIES ── */}
            <SectionBlock label="Companies" id="companies">
              <div className="space-y-8">
                {companies.map((c) => (
                  <div
                    key={c.name}
                    className="group border-l-2 border-gray-200 dark:border-gray-800 pl-6 transition-all hover:border-black dark:hover:border-white"
                  >
                    <h3 className="mb-1 text-base font-semibold text-black dark:text-white sm:text-lg">
                      {c.url ? (
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 underline underline-offset-4 decoration-gray-300 dark:decoration-gray-700 hover:decoration-black dark:hover:decoration-white transition-colors"
                        >
                          {c.name}
                          <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ) : (
                        c.name
                      )}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 sm:text-base">
                      {c.desc}
                    </p>
                  </div>
                ))}
              </div>
            </SectionBlock>

            {/* ── PRODUCTS / SAAS ── */}
            <SectionBlock label="Products & SaaS">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {products.map((p) => (
                  <div
                    key={p.name}
                    className="group rounded-xl border border-gray-200 dark:border-gray-800 p-5 transition-all hover:border-black dark:hover:border-white"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-black dark:text-white">
                        {p.url ? (
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 underline underline-offset-4 decoration-gray-300 dark:decoration-gray-700 hover:decoration-black dark:hover:decoration-white transition-colors"
                          >
                            {p.name}
                            <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        ) : (
                          p.name
                        )}
                      </h3>
                      {p.badge && (
                        <span className="rounded-full bg-gray-100 dark:bg-gray-900 px-2 py-0.5 text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400 sm:text-sm">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </SectionBlock>

            {/* ── JOURNEY ── */}
            <SectionBlock label="Journey">
              <div className="space-y-6">
                {timeline.map((t, i) => (
                  <motion.div
                    key={t.age}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: i * 0.08 }}
                    className="flex items-start gap-6"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 dark:border-gray-800 text-sm font-bold text-black dark:text-white">
                      {t.age}
                    </span>
                    <p className="pt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400 sm:text-base">
                      {t.event}
                    </p>
                  </motion.div>
                ))}
              </div>
            </SectionBlock>

            {/* ── PHILOSOPHY ── */}
            <SectionBlock label="Philosophy">
              <div className="space-y-3">
                {philosophy.map((s, i) => (
                  <motion.p
                    key={s}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="text-2xl font-bold tracking-tight text-black dark:text-white sm:text-3xl"
                  >
                    {s}
                  </motion.p>
                ))}
              </div>
            </SectionBlock>

            {/* ── LIFE OUTSIDE WORK ── */}
            <SectionBlock label="When I'm Not Working">
              <div className="space-y-4 text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg">
                <p>
                  Weights in the morning — not negotiable. Long walks with no
                  destination and no phone. Reading biographies of people who
                  built empires and then reading about why some of those empires
                  collapsed.
                </p>
                <p>
                  I write, mostly for myself. Sometimes I share it, sometimes I
                  don&apos;t. I study how great operators think — not the
                  Twitter-famous ones, the ones you&apos;ve never heard of who
                  run things that actually work.
                </p>
                <p>
                  Occasionally I forget to eat because I&apos;m three hours
                  deep into something. Working on that.
                </p>
              </div>
            </SectionBlock>

            {/* ── CURRENT FOCUS ── */}
            <SectionBlock label="Right Now">
              <ul className="space-y-3">
                {[
                  "Making onboarding fully hands-off",
                  "Shipping the AI assistant MVP",
                  "Building the team — slowly, deliberately",
                  "Getting better at saying no",
                  "Writing more, talking less",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-gray-500 dark:text-gray-400 sm:text-base"
                  >
                    <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-black dark:text-white" />
                    {item}
                  </li>
                ))}
              </ul>
            </SectionBlock>

            {/* ── CONTACT ── */}
            <SectionBlock label="Say Hello" id="contact">
              <div className="space-y-5">
                <p className="text-base text-gray-600 dark:text-gray-400 sm:text-lg">
                  I&apos;m easy to reach, hard to spam. If you have something
                  real to talk about, I&apos;ll make time.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                  <a
                    href="mailto:hello@vishnu.com"
                    className="inline-flex items-center gap-2 text-sm font-medium text-black dark:text-white underline underline-offset-4 decoration-gray-300 dark:decoration-gray-700 hover:decoration-black dark:hover:decoration-white transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    hello@vishnu.com
                  </a>
                  <a
                    href="https://linkedin.com/in/vishnu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-black dark:text-white underline underline-offset-4 decoration-gray-300 dark:decoration-gray-700 hover:decoration-black dark:hover:decoration-white transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                  <a
                    href="https://x.com/vishnu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-black dark:text-white underline underline-offset-4 decoration-gray-300 dark:decoration-gray-700 hover:decoration-black dark:hover:decoration-white transition-colors"
                  >
                    <FaXTwitter className="h-4 w-4" />
                    Twitter
                  </a>
                </div>
              </div>
            </SectionBlock>

            {/* ── POMODORO ── */}
            <PomodoroTimer />
          </motion.main>
        )}
      </AnimatePresence>

      {/* ── BOTTOM NAV ── */}
      <nav aria-label="Primary navigation and social links" className="fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-gray-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/80 px-4 py-3 shadow-sm backdrop-blur-md transition-all hover:bg-white/90 dark:hover:bg-zinc-900 sm:gap-6 sm:px-6">
        {/* Mode Toggle Switch */}
        <div className="flex items-center">
          <button
            onClick={() => setMode(mode === "human" ? "agent" : "human")}
            className="group relative flex h-7 w-12 cursor-pointer rounded-full bg-gray-200 dark:bg-zinc-700 p-1 transition-colors duration-200 ease-in-out hover:bg-gray-300 dark:hover:bg-zinc-600 focus:outline-none"
            role="switch"
            aria-checked={mode === "agent"}
            title={`Switch to ${mode === "human" ? "agent" : "human"} mode`}
          >
            <div
              className={`flex h-5 w-5 transform items-center justify-center rounded-full bg-white dark:bg-white shadow-sm transition duration-200 ease-in-out ${mode === "agent" ? "translate-x-5" : "translate-x-0"
                }`}
            >
              {mode === "human" ? (
                <User className="h-3 w-3 text-black" />
              ) : (
                <Bot className="h-3 w-3 text-black" />
              )}
            </div>
          </button>
        </div>
        <div className="h-6 w-px bg-gray-200 dark:bg-zinc-700" />
        <a
          href="mailto:hello@vishnu.com"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
          aria-label="Email"
        >
          <Mail className="h-5 w-5" />
        </a>
        <a
          href="https://linkedin.com/in/vishnu"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </a>
        <a
          href="https://x.com/vishnu"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
          aria-label="Twitter"
        >
          <FaXTwitter className="h-5 w-5" />
        </a>
      </nav>
    </div>
  );
}

/* ── Reusable section wrapper ── */
function SectionBlock({
  label,
  id,
  children,
}: {
  label: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-16 w-full text-left"
    >
      <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
        {label}
      </h2>
      {children}
    </motion.section>
  );
}
