"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "../Button";
import { Modal } from "../Modal";
import { useActionCard } from "./useActionCard";

export type Reward = { type: string; time: string; icon: string };

export function VideoAction() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showModal, setShowModal] = useState(false);
  const { setupVideoRewardListener, setSecondsWatched, handleVideoReward } =
    useActionCard();

  // Set up video listener when modal is open
  useEffect(() => {
    if (showModal && videoRef.current) {
      const { handler, cleanup } = setupVideoRewardListener(videoRef);
      videoRef.current.addEventListener("timeupdate", handler);
      return () => {
        cleanup();
      };
    }
  }, [showModal, setupVideoRewardListener]);

  // Reset video and state when modal opens
  useEffect(() => {
    if (showModal && videoRef.current) {
      videoRef.current.currentTime = 0;
      setSecondsWatched(0);
    }
  }, [showModal, setSecondsWatched]);

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    handleVideoReward();
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
        <Button onClick={() => setShowModal(true)}>Claim</Button>
      </div>

      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <video
          ref={videoRef}
          controls
          className="w-full rounded-lg aspect-ratio"
        >
          <source src="/videos/video-reward.mp4" type="video/mp4" />
          <track kind="captions" srcLang="en" src="/captions.vtt" default />
        </video>
      </Modal>
    </div>
  );
}
