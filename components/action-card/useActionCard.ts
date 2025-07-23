import { useState } from "react";
import { toast } from "react-hot-toast";
import { addReward } from "@/lib/storage";
import { generateRewardName, generateRewardIcon } from "@/lib/rewards";

export const useActionCard = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const validCodes = ["REWARD123", "CODE456"];

  // Play sound when a reward is earned
  const playSound = () => new Audio("/sounds/reward.mp3").play();

  const generateReward = async (name: string) => {
    const rewardName = await generateRewardName(name);
    const icon = await generateRewardIcon(rewardName);
    return { type: rewardName, time: new Date().toISOString(), icon };
  };

  const handleReward = async (name: string) => {
    if (code.trim() === "") return toast.error("Please enter a code.");

    if (validCodes.includes(code)) {
      const reward = await generateReward(name);
      addReward(reward);
      setCode("");
      setMessage("Reward earned!");
      toast.success(message);
      playSound();
    } else {
      setMessage("Invalid code!");
      toast.error("Invalid code!");
    }
  };

  return {
    validCodes,
    code,
    setCode,
    message,
    setMessage,
    handleReward,
  };
};
