export type Reward = { type: string; time: string; icon: string };

export const getRewards = (): Reward[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("rewards") || "[]");
};

export const addReward = (reward: Reward) => {
  if (typeof window === "undefined") return;
  const rewards = getRewards();
  rewards.push(reward);
  localStorage.setItem("rewards", JSON.stringify(rewards));
  window.dispatchEvent(new Event("storage"));
};

export const resetWallet = () => {
  if (typeof window === "undefined") return;
  localStorage.setItem("rewards", "[]");
  localStorage.setItem("lastCheckIn", "");
  localStorage.setItem("walletName", "");
  window.dispatchEvent(new Event("storage"));
};
