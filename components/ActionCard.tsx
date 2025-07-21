"use client";
import { useState, useRef } from "react";
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
      <h2 className="text-lg text-[hsl(var(--cyan))]">Check-In</h2>
      <button
        onClick={handleCheckIn}
        className="button"
        aria-label="Check in to earn reward"
      >
        Check In
      </button>
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

export function VideoAction({
  onReward,
}: {
  onReward: (reward: Reward) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [rewardEarned, setRewardEarned] = useState(false);
  const handleTimeUpdate = async () => {
    if (
      videoRef.current &&
      videoRef.current.currentTime >= 15 &&
      !rewardEarned
    ) {
      const name = await generateRewardName("video");
      const icon = await generateRewardIcon(name);
      const reward = { type: name, time: new Date().toISOString(), icon };
      addReward(reward);
      onReward(reward);
      setRewardEarned(true);
      new Audio("/sounds/reward.mp3").play();
      videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
    }
  };
  return (
    <div className="action-card">
      <h2 className="text-lg text-[hsl(var(--cyan))]">Watch Video</h2>
      <video
        ref={videoRef}
        controls
        onTimeUpdate={handleTimeUpdate}
        className="w-full rounded-lg"
      >
        <source src="/sample-video.mp4" type="video/mp4" />
        <track kind="captions" srcLang="en" src="/captions.vtt" default />
      </video>
    </div>
  );
}

export function CodeAction({
  onReward,
}: {
  onReward: (reward: Reward) => void;
}) {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const validCodes = ["REWARD123", "CODE456"];
  const handleSubmit = async () => {
    if (validCodes.includes(code)) {
      const name = await generateRewardName("code");
      const icon = await generateRewardIcon(name);
      const reward = { type: name, time: new Date().toISOString(), icon };
      addReward(reward);
      onReward(reward);
      setCode("");
      setMessage("Reward earned!");
      new Audio("/sounds/reward.mp3").play();
    } else {
      setMessage("Invalid code!");
    }
  };
  return (
    <div className="action-card">
      <h2 className="text-lg text-[hsl(var(--cyan))]">Scan Code</h2>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter code"
        className="border border-[hsla(0,0%,100%,0.2)] bg-[hsla(0,0%,100%,0.05)] text-[hsl(var(--white))] p-2 rounded-lg w-full"
      />
      <button
        onClick={handleSubmit}
        className="button mt-2"
        aria-label="Submit code"
      >
        Submit
      </button>
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
