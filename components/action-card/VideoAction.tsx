"use client";
import { useState, useRef } from "react";
import { Button } from "../Button";
import { Modal } from "../Modal";
import { useActionCard } from "./useActionCard";

export function VideoAction() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showModal, setShowModal] = useState(false);
  const { handleVideoReward, setupVideoRewardListener, setVideoRewardEarned } =
    useActionCard();

  const cleanupVideoListener = setupVideoRewardListener(videoRef);
  const handleTimeUpdate = () => {
    handleVideoReward(videoRef);
  };

  // Handle modal close with cleanup
  const handleCloseModal = () => {
    setShowModal(false);
    setVideoRewardEarned(false); // Reset reward state
    cleanupVideoListener(); // Remove listener
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
          onTimeUpdate={handleTimeUpdate}
          className="w-full rounded-lg aspect-ratio"
        >
          <source src="/videos/video-reward.mp4" type="video/mp4" />
          <track kind="captions" srcLang="en" src="/captions.vtt" default />
        </video>
      </Modal>
    </div>
  );
}
