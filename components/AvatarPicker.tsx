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
        className="border border-[hsla(0,0%,100%,0.2)] bg-[hsla(0,0%,100%,0.05)] text-[hsl(var(--white))] p-2 rounded-lg w-full"
      />
      <select
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        className="border border-[hsla(0,0%,100%,0.2)] bg-[hsla(0,0%,100%,0.05)] text-[hsl(var(--white))] p-2 rounded-lg mt-2"
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
