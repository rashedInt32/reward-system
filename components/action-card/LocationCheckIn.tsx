"use client";
import { useState } from "react";
import { checkIn, canCheckIn, recordCheckIn } from "@/lib/geolocation";
import { addReward } from "@/lib/storage";
import { generateRewardName, generateRewardIcon } from "@/lib/rewards";

export type Reward = { type: string; time: string; icon: string };

export function LocationCheckIn({
  onReward,
}: {
  onReward: (reward: Reward) => void;
}) {
  const [message, setMessage] = useState("");
  const handleCheckIn = async () => {
    if (!canCheckIn()) {
      setMessage("You already checked in today!");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        if (checkIn(coords.latitude, coords.longitude)) {
          const name = await generateRewardName("checkin");
          const icon = await generateRewardIcon(name);
          const reward = { type: name, time: new Date().toISOString(), icon };
          addReward(reward);
          onReward(reward);
          recordCheckIn();
          setMessage("Reward earned!");
          new Audio("/sounds/reward.mp3").play();
        } else {
          setMessage("Too far from location!");
        }
      },
      () => setMessage("Geolocation permission denied"),
    );
  };
  return (
    <div className="action-card">
      <div className="card-content">
        <div className="max-w-[75%]">
          <h2 className="card-title">Check-In</h2>
          <p className="card-description">
            Check in at designated locations to earn exclusive digital rewards.
          </p>
        </div>
        <button
          onClick={handleCheckIn}
          className="button"
          aria-label="Check in to earn reward"
        >
          Claim
        </button>
      </div>
      {message && (
        <p
          className={`alert ${message.includes("earned") ? "alert-success" : "alert-error"} mt-2`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
