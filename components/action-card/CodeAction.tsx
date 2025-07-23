"use client";
import { useRef, useState, useEffect } from "react";

import { Button } from "@/components/Button";
import { useActionCard } from "./useActionCard";
import { Loader } from "../Loader";

export type Reward = { type: string; time: string; icon: string };

export function CodeAction() {
  const [showInput, setShowInput] = useState<boolean>(false);
  const { code, setCode, validCodes, handleScanCode, loading } =
    useActionCard();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setCode("");
  }, [showInput]);

  return (
    <div className="action-card">
      <div className="card-content">
        <div className="max-w-[70%]">
          <h2 className="card-title">Scan Code</h2>
          <p className="card-description">
            Scan or enter a valid code to unlock special digital rewards.
          </p>
        </div>

        {!showInput && (
          <Button onClick={() => setShowInput(true)} className="button">
            Claim
          </Button>
        )}
      </div>

      {showInput && (
        <div className="pt-6">
          <div className="flex items-center justify-between">
            <h3 className="mb-4 text-white/70">
              Submit QR code and get the rewards.{" "}
              <pre className="text-white text-sm">
                ValidCodes: {validCodes.map((code) => `${code} `)}
              </pre>
            </h3>
            <Button
              onClick={() => setShowInput(false)}
              className="rounded-md border-[var(--error)] border-2 h-8 w-8 cursor-pointer text-[var(--error)] text-2xl flex items-center justify-center hover:bg-[var(--error)] hover:text-white transition-colors"
            >
              &times;
            </Button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleScanCode();
            }}
            className="flex gap-4"
          >
            <input
              id="code-input"
              ref={inputRef}
              name="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter code"
              className="border border-[var(--primary)] bg-[var(--primary)]/70 text-[var(--text)] outline-none py-2 p-3 rounded-md flex-1"
            />
            <Button
              type="submit"
              className="button flex items-center justify-center min-w-[94px]"
            >
              {loading ? <Loader /> : "Submit"}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
