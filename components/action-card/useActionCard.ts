import { useState } from "react";
import { addReward } from "@/lib/storage";
import { generateRewardName, generateRewardIcon } from "@/lib/rewards";

export const useActionCard = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const validCodes = ["REWARD123", "CODE456"];

  const handleReward = async (name: string) => {
    if (validCodes.includes(code)) {
      const rewardName = await generateRewardName(name);
      const icon = await generateRewardIcon(rewardName);
      const reward = { type: name, time: new Date().toISOString(), icon };
      addReward(reward);
      setCode("");
      setMessage("Reward earned!");
      new Audio("/sounds/reward.mp3").play();
    } else {
      setMessage("Invalid code!");
    }
  };

  return {
    validCodes,
    code,
    setCode,
    message,
    handleReward,
  };
};
