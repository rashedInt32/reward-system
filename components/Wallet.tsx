"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getRewards, resetWallet } from "@/lib/storage";
import { AvatarPicker } from "./AvatarPicker";

export function Wallet() {
  const [rewards, setRewards] = useState(getRewards());
  const [name, setName] = useState(
    window.localStorage.getItem("walletName") || "",
  );
  const [avatar, setAvatar] = useState(
    window.localStorage.getItem("avatar") || "😊",
  );
  useEffect(() => {
    setName(localStorage.getItem("walletName") || "");
    setAvatar(localStorage.getItem("avatar") || "😊");
    const update = () => setRewards(getRewards());
    window.addEventListener("storage", update);
    return () => window.removeEventListener("storage", update);
  }, []);
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[var(--primary)] mb-4 tracking-wide">
        {name || "My Wallet"} {avatar}
      </h1>
      <AvatarPicker />
      <button
        onClick={() => {
          resetWallet();
          setRewards([]);
        }}
        className="button bg-[var(--error)] hover:bg-[var(--secondary)] hover:text-[#002829] hover:shadow-[0_0_15px_rgba(45,121,109,0.5)] hover:outline hover:outline-1 hover:outline-[rgba(45,121,109,0.2)] mb-6"
        aria-label="Reset wallet"
      >
        Reset Wallet
      </button>
      <div className="progress-bar mb-6">
        <div
          className="progress-fill"
          style={{ width: `${Math.min((rewards.length / 5) * 100, 100)}%` }}
        ></div>
      </div>
      {rewards.length >= 5 && (
        <p className="text-[var(--secondary)] mb-4">Super Badge Unlocked!</p>
      )}
      <div className="grid gap-4">
        {rewards.map(
          (
            reward: { type: string; time: string; icon: string },
            index: number,
          ) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="reward-card"
            >
              <img
                src={reward.icon}
                alt={reward.type}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold text-[var(--primary)]">
                  {reward.type}
                </p>
                <p className="text-sm text-[var(--text)] opacity-80">
                  Earned: {new Date(reward.time).toLocaleString()}
                </p>
              </div>
            </motion.div>
          ),
        )}
      </div>
    </div>
  );
}
