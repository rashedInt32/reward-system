"use client";
import {
  LocationCheckIn,
  VideoAction,
  CodeAction,
} from "@/components/action-card";

export default function Home() {
  return (
    <div className="min-h-screen p-4 pt-8 z-10 relative">
      <h1 className="text-3xl font-bold text-white mb-3 tracking-wide">
        Earn & Collect
      </h1>
      <p className="text-[var(--text)]/80 text-lg mb-8">
        Earn unique digital rewards by checking in at locations, watching
        videos, or scanning codes.
      </p>
      <div className="gap-6 flex flex-col">
        <LocationCheckIn onReward={() => {}} />
        <VideoAction onReward={() => {}} />
        <CodeAction onReward={() => {}} />
      </div>
    </div>
  );
}
