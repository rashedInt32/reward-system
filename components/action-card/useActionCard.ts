import { useState, useEffect, RefObject } from "react";
import { toast } from "react-hot-toast";
import { addReward } from "@/lib/storage";
import { generateRewardName, generateRewardIcon } from "@/lib/rewards";

import { checkIn, canCheckIn, recordCheckIn } from "@/lib/geolocation";

interface VideoRewardParams {
  videoRef: RefObject<HTMLVideoElement>;
}

export const useActionCard = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [videoRewardEarned, setVideoRewardEarned] = useState(false);
  const [targetCoord, setTargetCoord] = useState({
    lat: 23.769778495411554,
    lng: 90.35551889664085,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const validCodes = ["REWARD123", "CODE456"];

  // Play sound when a reward is earned
  const playSound = () => new Audio("/sounds/reward.mp3").play();

  const generateReward = async (name: string) => {
    const rewardName = await generateRewardName(name);
    const icon = await generateRewardIcon(rewardName);
    return { type: rewardName, time: new Date().toISOString(), icon };
  };

  // Handle video reward logic
  const handleVideoReward = async (
    videoRef: RefObject<HTMLVideoElement | null>,
  ) => {
    if (
      videoRef.current &&
      videoRef.current.currentTime >= 15 &&
      !videoRewardEarned
    ) {
      const reward = await generateReward("video");
      addReward(reward);
      setVideoRewardEarned(true);
      playSound();
      toast.success("Video reward earned!");
    }
  };

  // Optional: Helper to set up video event listener
  const setupVideoRewardListener = (
    videoRef: RefObject<HTMLVideoElement | null>,
  ) => {
    useEffect(() => {
      const video = videoRef.current;
      if (video) {
        video.addEventListener("timeupdate", () => handleVideoReward(videoRef));
        return () => {
          video.removeEventListener("timeupdate", () =>
            handleVideoReward(videoRef),
          );
        };
      }
    }, [videoRef, videoRewardEarned]);

    // Return a cleanup function to remove listener manually if needed
    return () => {
      const video = videoRef.current;
      if (video) {
        const handler = () => handleVideoReward(videoRef);
        video.removeEventListener("timeupdate", handler);
      }
    };
  };

  const getTargetCoordinates = async () => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        setTargetCoord({ lat: coords.latitude, lng: coords.longitude });
        toast.success(`Successfully set Target coordinates`);
      },
      () => toast.error("Geolocation permission denied"),
    );
  };

  const handleCheckIn = async () => {
    setLoading(true);
    if (!canCheckIn()) {
      setLoading(false);
      return toast.error("You already checked in today!");
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        if (
          checkIn(
            coords.latitude,
            coords.longitude,
            targetCoord.lat,
            targetCoord.lng,
          )
        ) {
          const reward = await generateReward("checkin");
          addReward(reward);
          recordCheckIn();
          toast.success("Checkin reward earned!");
          playSound();
          setLoading(false);
        } else {
          setTimeout(() => {
            toast.error("Too far from location!");
            setLoading(false);
          }, 1000);
        }
      },
      () => {
        toast.error("Geolocation permission denied");
        setLoading(false);
      },
    );
  };

  const handleScanCode = async () => {
    setLoading(true);
    if (code.trim() === "") return toast.error("Please enter a code.");
    if (validCodes.includes(code)) {
      const reward = await generateReward("code");
      addReward(reward);
      toast.success("Scan code reward earned!");
      setCode("");
      playSound();
    } else {
      toast.error("Invalid code!");
    }
    setLoading(false);
  };

  return {
    validCodes,
    code,
    setCode,
    message,
    setMessage,
    handleScanCode,
    handleCheckIn,
    loading,
    getTargetCoordinates,
    videoRewardEarned,
    setVideoRewardEarned,
    handleVideoReward,
    setupVideoRewardListener,
  };
};
