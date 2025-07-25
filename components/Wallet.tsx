"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getRewards, resetWallet } from "@/lib/storage";
import { AvatarPicker } from "./AvatarPicker";
import { Button } from "./Button";

export function Wallet() {
  const [rewards, setRewards] = useState<
    { type: string; time: string; icon: string }[]
  >([]);
  const [name, setName] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("😊");
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    setName(localStorage.getItem("walletName") || "");
    setAvatar(localStorage.getItem("avatar") || "😊");
    setRewards(getRewards());

    const update = () => setRewards(getRewards());
    window.addEventListener("storage", update);
    return () => window.removeEventListener("storage", update);
  }, []);

  // Calculate progress width. Use a safe default for server render.
  // We apply the actual width only if mounted.
  const progressWidth = isMounted
    ? Math.min((rewards.length / 5) * 100, 100)
    : 0; // Default to 0% on server

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[var(--primary)] mb-4 tracking-wide">
        {/* Use client-side `name` and `avatar` if mounted, otherwise use default */}
        {(isMounted && name) || "My Wallet"} {(isMounted && avatar) || "😊"}
      </h1>
      <AvatarPicker />
      <Button
        onClick={() => {
          resetWallet();
          setRewards([]);
        }}
        className="button mb-6"
        aria-label="Reset wallet"
      >
        Reset Wallet
      </Button>

      <div className="progress-bar mb-6">
        <div
          className="progress-fill"
          // Apply the calculated width. On server, this will be 0%.
          // On client, after `useEffect`, it will update to actual value.
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>

      {isMounted &&
        rewards.length >= 5 && ( // Only show this text if mounted and condition met
          <p className="text-[var(--secondary)] mb-4">Super Badge Unlocked!</p>
        )}

      <div className="grid gap-4">
        {/* Conditionally render rewards only after mounting to avoid mismatch
            if rewards array is different between server and client */}
        {isMounted &&
          rewards.map(
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
        {/* Optional: Add a loading state or placeholder for rewards if not mounted */}
        {!isMounted && (
          <p className="text-[var(--text)] opacity-60">
            Loading wallet data...
          </p>
        )}
      </div>
    </div>
  );
}
