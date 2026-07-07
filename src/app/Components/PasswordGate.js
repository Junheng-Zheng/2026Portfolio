"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { VALID_PASSWORDS } from "../data/passwords";
import {
  isProcessUnlocked,
  isValidPassword,
  setProcessUnlocked,
} from "../lib/passwordAuth";

const BUTTON_CLASS =
  "inline-flex shrink-0 cursor-pointer items-center justify-center bg-[#262424] rounded px-4 text-[14px] text-white hover:opacity-90 transition-opacity h-9";

const TAP_SCALE = {
  whileTap: { scale: 0.96 },
  transition: { type: "spring", stiffness: 400, damping: 25 },
};

export default function PasswordGate({ children }) {
  const [unlocked, setUnlocked] = useState(() => isProcessUnlocked());
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  function handleSubmit(event) {
    event.preventDefault();

    if (isValidPassword(password, VALID_PASSWORDS)) {
      setProcessUnlocked();
      setUnlocked(true);
      setError(false);
      return;
    }

    setError(true);
  }

  if (unlocked) {
    return children;
  }

  return (
    <div className="font-body text-white min-h-dvh flex flex-col items-center justify-center px-5 py-12 sm:px-8 md:px-12 md:py-24 bg-[#141414]">
      <div className="flex flex-col gap-6 items-start w-full max-w-[600px]">
        <div className="flex flex-col gap-1 w-full">
          <p className="text-[20px] leading-normal text-white">
            This process is password protected.
          </p>
          <p className="text-[14px] leading-normal text-white/80">
            Enter the password to continue reading.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
          <div className="flex gap-2 w-full items-stretch">
            <div
              className={`flex flex-1 min-w-0 h-9 items-center justify-between gap-2 bg-[#262424] rounded px-4 border transition-colors ${
                error
                  ? "border-red-500 focus-within:ring-1 focus-within:ring-red-500/50"
                  : "border-transparent focus-within:ring-1 focus-within:ring-white/20"
              }`}
            >
              <input
                type={visible ? "text" : "password"}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (error) setError(false);
                }}
                placeholder="Password"
                autoComplete="current-password"
                className="min-w-0 flex-1 bg-transparent text-[14px] text-white placeholder:text-white/40 outline-none"
              />

              <button
                type="button"
                onClick={() => setVisible((current) => !current)}
                aria-label={visible ? "Hide password" : "Show password"}
                className="shrink-0 text-white/50 transition-colors hover:text-white/80"
              >
                {visible ? (
                  <Eye strokeWidth={1.5} size={16} />
                ) : (
                  <EyeOff strokeWidth={1.5} size={16} />
                )}
              </button>
            </div>

            <motion.button
              type="submit"
              className={BUTTON_CLASS}
              {...TAP_SCALE}
            >
              Read Process
            </motion.button>
          </div>

          {error ? (
            <p className="text-[14px] text-red-500">
              Incorrect password. Please try again.
            </p>
          ) : null}
        </form>

        <Link
          href="/"
          className="text-[14px] text-white/60 hover:text-white transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
