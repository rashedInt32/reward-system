import { useState, RefObject } from "react";
import { toast } from "react-hot-toast";
import { addReward } from "@/lib/storage";
import { generateRewardName, generateRewardIcon } from "@/lib/rewards";
import { checkIn, canCheckIn, recordCheckIn } from "@/lib/geolocation";

interface Reward {
  type: string;
  time: string;
  icon: string;
}

export const useActionCard = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [secondsWatched, setSecondsWatched] = useState(0);
  const [targetCoord, setTargetCoord] = useState({
    lat: 23.769778495411554,
    lng: 90.35551889664085,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const validCodes = ["REWARD123", "CODE456"];

  // Play sound when a reward is earned
  const playSound = () => {
    try {
      new Audio("/sounds/reward.mp3").play();
    } catch (error) {}
  };

  // Generate a reward object
  const generateReward = async (name: string): Promise<Reward> => {
    const rewardName = await generateRewardName(name);
    const icon = await generateRewardIcon();
    return {
      type: rewardName,
      time: new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }),
      icon,
    };
  };

  // Handle video reward logic
  const handleVideoReward = async () => {
    if (secondsWatched >= 15) {
      try {
        const reward = await generateReward("video");
        addReward(reward);
        playSound();
        toast.success("Video reward earned!");
      } catch (error) {
        toast.error("Failed to earn video reward");
      }
    } else {
      toast.error("You didn't watch until 15 seconds");
    }
  };

  // Utility to create video event handler and cleanup
  const setupVideoRewardListener = (
    videoRef: RefObject<HTMLVideoElement | null>,
  ) => {
    const handler = () => {
      if (videoRef.current) {
        const currentTime = videoRef.current.currentTime;
        if (currentTime > secondsWatched) {
          setSecondsWatched(currentTime);
        }
      }
    };
    const cleanup = () => {
      const video = videoRef.current;
      if (video) {
        video.removeEventListener("timeupdate", handler);
      }
    };
    return { handler, cleanup };
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
            toast.error("You are too far from location!");
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
    secondsWatched,
    setSecondsWatched,
    handleVideoReward,
    setupVideoRewardListener,
  };
};
