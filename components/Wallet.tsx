"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getRewards, resetWallet } from "@/lib/storage";
import { generateRewardName } from "@/lib/rewards";
import { AvatarPicker } from "./AvatarPicker";
import { Button } from "./Button";

type Reward = {
  type: string;
  time: string;
  icon: string;
};

export function Wallet() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [name, setName] = useState("");
  const [showNameEdit, setShowNameEdit] = useState<boolean>(false);
  const [avatar, setAvatar] = useState("😊");
  const [suggestedName, setSuggestedName] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setName(localStorage.getItem("walletName") || "");
    setAvatar(localStorage.getItem("avatar") || "😊");
    setRewards(getRewards());

    generateRewardName("wallet").then(setSuggestedName);

    const update = () => setRewards(getRewards());
    window.addEventListener("storage", update);
    return () => window.removeEventListener("storage", update);
  }, []);

  const handleChange = (newName: string, newAvatar: string) => {
    setName(newName);
    setAvatar(newAvatar);
  };

  const handleSave = () => {
    const finalName = name || suggestedName;
    setName(finalName);
    setShowNameEdit(false);
    localStorage.setItem("walletName", finalName);
    localStorage.setItem("avatar", avatar);
  };

  const progressWidth = isMounted
    ? Math.min((rewards.length / 5) * 100, 100)
    : 0;

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-white mb-4 tracking-wide flex items-end justify-between">
        {(isMounted && (name || suggestedName)) || "My Wallet"}{" "}
        {(isMounted && avatar) || "😊"}
        <a
          href=""
          className="text-[var(--link)] text-sm underline"
          onClick={(e) => {
            e.preventDefault();
            setShowNameEdit(!showNameEdit);
          }}
        >
          Edit wallet name
        </a>
      </h1>

      {showNameEdit && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="pt-4"
        >
          <AvatarPicker
            name={name}
            avatar={avatar}
            suggestedName={suggestedName}
            onChange={handleChange}
            onSave={handleSave}
          />
        </motion.div>
      )}

      <Button
        onClick={() => {
          resetWallet();
          setRewards([]);
        }}
        className="button mb-6 mt-6"
        aria-label="Reset wallet"
      >
        Reset Wallet
      </Button>

      <div className="progress-bar mb-6">
        <div className="progress-fill" style={{ width: `${progressWidth}%` }} />
      </div>

      {isMounted && rewards.length >= 5 && (
        <p className="text-[var(--secondary)] mb-4">Super Badge Unlocked!</p>
      )}

      <div className="grid gap-4">
        {isMounted &&
          rewards.map((reward, index) => (
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
          ))}
        {!isMounted && (
          <p className="text-[var(--text)] opacity-60">
            Loading wallet data...
          </p>
        )}
      </div>
    </div>
  );
}
