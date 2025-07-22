"use client";
import { useState } from "react";
import { addReward } from "@/lib/storage";
import { generateRewardName, generateRewardIcon } from "@/lib/rewards";

export type Reward = { type: string; time: string; icon: string };

export function CodeAction({
  onReward,
}: {
  onReward: (reward: Reward) => void;
}) {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const validCodes = ["REWARD123", "CODE456"];
  const handleSubmit = async () => {
    if (validCodes.includes(code)) {
      const name = await generateRewardName("code");
      const icon = await generateRewardIcon(name);
      const reward = { type: name, time: new Date().toISOString(), icon };
      addReward(reward);
      onReward(reward);
      setCode("");
      setMessage("Reward earned!");
      new Audio("/sounds/reward.mp3").play();
    } else {
      setMessage("Invalid code!");
    }
  };
  return (
    <div className="action-card">
      <h2 className="text-lg text-[var(--primary)]">Scan Code</h2>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter code"
        className="border border-[rgba(230,230,230,0.2)] bg-[rgba(0,68,69,0.05)] text-[var(--text)] p-2 rounded-lg w-full"
      />
      <button
        onClick={handleSubmit}
        className="button mt-2"
        aria-label="Submit code"
      >
        Submit
      </button>
      {message && (
        <p
          className={`alert ${message.includes("earned") ? "alert-success" : "alert-error"} mt-2`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
