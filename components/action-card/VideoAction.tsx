"use client";
import { useState, useRef } from "react";
import { addReward } from "@/lib/storage";
import { generateRewardName, generateRewardIcon } from "@/lib/rewards";

export type Reward = { type: string; time: string; icon: string };

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
      <div className="card-content">
        <div className="max-w-[75%]">
          <h2 className="card-title">Watch Video</h2>
          <p className="card-description">
            Watch a 15-second video to collect a unique digital reward.
          </p>
        </div>
        <button
          onClick={() => {}}
          className="button"
          aria-label="Check in to earn reward"
        >
          Claim
        </button>
      </div>

      {/* <video */}
      {/*   ref={videoRef} */}
      {/*   controls */}
      {/*   onTimeUpdate={handleTimeUpdate} */}
      {/*   className="w-full rounded-lg" */}
      {/* > */}
      {/*   <source src="/sample-video.mp4" type="video/mp4" /> */}
      {/*   <track kind="captions" srcLang="en" src="/captions.vtt" default /> */}
      {/* </video> */}
    </div>
  );
}
