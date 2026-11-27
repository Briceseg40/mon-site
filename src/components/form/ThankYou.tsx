"use client";

import { useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "motion/react";

export function ThankYou() {
  const name = useSyncExternalStore(
    () => () => {},
    () => sessionStorage.getItem("project-request-name"),
    () => null,
  );
  const reduce = useReducedMotion();
  return (
    <>
      <motion.div
        initial={reduce ? false : { scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
        className="mx-auto mb-10 grid size-20 place-items-center rounded-full border border-foam/40 bg-foam/10"
      >
        <svg viewBox="0 0 24 24" className="size-8 text-foam" aria-hidden>
          <motion.path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.6 }} />
        </svg>
      </motion.div>
      <h1 className="display mx-auto max-w-4xl text-[clamp(3rem,8vw,6.5rem)]">
        Merci{name ? ` ${name}` : ""}, <em>c&apos;est bien reçu</em>.
      </h1>
      <p className="mx-auto mt-8 max-w-lg text-[18px] leading-relaxed text-mute">
        Je lis votre demande avec attention et je reviens vers vous très vite. Un e-mail de confirmation vient de partir, pensez à jeter un œil dans vos
        indésirables si vous ne le voyez pas.
      </p>
    </>
  );
}
