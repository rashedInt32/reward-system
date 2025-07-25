"use client";
import { useState, useEffect } from "react";
import { generateRewardName } from "@/lib/rewards";

export function AvatarPicker() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("😊");
  const [suggestedName, setSuggestedName] = useState("");
  useEffect(() => {
    generateRewardName("wallet").then(setSuggestedName);
  }, []);
  const save = () => {
    localStorage.setItem("walletName", name);
    localStorage.setItem("avatar", avatar);
  };
  return (
    <div className="mb-6 flex flex-wrap gap-4 items-center">
      <input
        name="walletName"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={suggestedName || "Wallet Name"}
        className="border border-white/80 text-[var(--text)] p-2 px-4 rounded-lg flex-1"
      />
      <select
        name="avatar"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        className="border border-white/80 text-[var(--text)] p-2 px-4 rounded-lg flex-1"
      >
        <option value="😊">😊</option>
        <option value="🔥">🔥</option>
        <option value="🚀">🚀</option>
      </select>
      <button
        onClick={save}
        className="button h-10"
        aria-label="Save wallet settings"
      >
        Save
      </button>
    </div>
  );
}
