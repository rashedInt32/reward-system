"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import Image from "next/image";
import relativeTime from "dayjs/plugin/relativeTime";
import { getRewards, resetWallet } from "@/lib/storage";
import { generateRewardName } from "@/lib/rewards";
import { AvatarPicker } from "./AvatarPicker";
import { Button } from "./Button";

dayjs.extend(relativeTime);

type Reward = {
  type: string;
  time: string;
  icon: string;
};

export function Wallet() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [name, setName] = useState("");
  const [showNameEdit, setShowNameEdit] = useState<boolean>(false);
  const [suggestedName, setSuggestedName] = useState("");
  const [avatar, setAvatar] = useState("😊");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setName(localStorage.getItem("walletName") || "My Wallet");
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

  const handleShowEditWalletForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowNameEdit(!showNameEdit);
    if (name.trim() === "") {
      setName(localStorage.getItem("walletName") || "My Wallet");
    }
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
        <span>
          {isMounted && name} {isMounted && avatar}
        </span>
        <a
          href=""
          className="text-[var(--link)] text-sm underline"
          onClick={(e) => handleShowEditWalletForm(e)}
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

      <div className="flex items-center w-full gap-4 mb-4 pt-6">
        <div className="progress-bar ">
          <div
            className="progress-fill"
            style={{ width: `${progressWidth}%` }}
          />
        </div>
        <Button
          onClick={() => {
            resetWallet();
            setRewards([]);
          }}
          className="button-danger  min-w-[140px]"
          aria-label="Reset wallet"
          disabled={rewards.length === 0}
        >
          Reset Wallet
        </Button>
      </div>

      {isMounted && rewards.length >= 5 && (
        <p className="text-white mb-4">Super Badge Unlocked!</p>
      )}

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-2">
        {isMounted &&
          rewards.map((reward, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="reward-card"
            >
              <Image
                src={reward.icon}
                alt={reward.type}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold text-[var(--text)] pb-1">
                  {reward.type}
                </p>
                <p className="text-sm text-[var(--text)] opacity-80">
                  Earned:{" "}
                  <span className="font-bold">
                    {dayjs(new Date(reward.time).toLocaleString()).fromNow()}
                  </span>
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
