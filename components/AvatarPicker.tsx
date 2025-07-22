"use client";
import { useState, useEffect } from "react";
import { generateRewardName } from "@/lib/rewards";

export function AvatarPicker() {
  const [name, setName] = useState(localStorage.getItem("walletName") || "");
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || "😊");
  const [suggestedName, setSuggestedName] = useState("");
  useEffect(() => {
    generateRewardName("wallet").then(setSuggestedName);
  }, []);
  const save = () => {
    localStorage.setItem("walletName", name);
    localStorage.setItem("avatar", avatar);
  };
  return (
    <div className="action-card mb-6">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={suggestedName || "Wallet Name"}
        className="border border-[rgba(230,230,230,0.2)] bg-[rgba(0,68,69,0.05)] text-[var(--text)] p-2 rounded-lg w-full"
      />
      <select
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        className="border border-[rgba(230,230,230,0.2)] bg-[rgba(0,68,69,0.05)] text-[var(--text)] p-2 rounded-lg mt-2"
      >
        <option value="😊">😊</option>
        <option value="🔥">🔥</option>
        <option value="🚀">🚀</option>
      </select>
      <button
        onClick={save}
        className="button mt-2"
        aria-label="Save wallet settings"
      >
        Save
      </button>
    </div>
  );
}
