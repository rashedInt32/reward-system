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

  const fetchRewards = async () => {
    const response = await fetch("/api/rewards");
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    setIsMounted(true);
    setName(localStorage.getItem("walletName") || "");
    setAvatar(localStorage.getItem("avatar") || "😊");
    setRewards(getRewards());

    fetchRewards();

    const update = () => setRewards(getRewards());
    window.addEventListener("storage", update);
    return () => window.removeEventListener("storage", update);
  }, []);

  const progressWidth = isMounted
    ? Math.min((rewards.length / 5) * 100, 100)
    : 0;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[var(--primary)] mb-4 tracking-wide">
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
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>

      {isMounted && rewards.length >= 5 && (
        <p className="text-[var(--secondary)] mb-4">Super Badge Unlocked!</p>
      )}

      <div className="grid gap-4">
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
        {!isMounted && (
          <p className="text-[var(--text)] opacity-60">
            Loading wallet data...
          </p>
        )}
      </div>
    </div>
  );
}
