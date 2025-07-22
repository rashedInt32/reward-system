"use client";
import { useState } from "react";

import { Button } from "@/components/Button";
import { useActionCard } from "./useActionCard";

export type Reward = { type: string; time: string; icon: string };

export function CodeAction() {
  const [showInput, setShowInput] = useState(false);
  const { code, setCode, validCodes, handleReward, message } = useActionCard();

  const handleClaimCode = async () => {
    setShowInput(true);
  };

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
          <Button onClick={handleClaimCode} className="button">
            Claim
          </Button>
        )}
      </div>

      {showInput && (
        <div className="pt-6">
          <div className="flex items-center justify-between">
            <h3 className="mb-4">
              Submit QR code and get the rewards.{" "}
              <pre className="text-black text-sm">
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
          <div className="flex gap-6">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter code"
              className="border border-[rgba(230,230,230,0.2)] bg-[rgba(0,68,69,0.05)] text-[var(--text)] p-2 rounded-lg flex-1"
            />
            <Button onClick={() => handleReward("code")}>Submit Code</Button>
            {message && (
              <p
                className={`alert ${message.includes("earned") ? "alert-success" : "alert-error"} mt-2`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
