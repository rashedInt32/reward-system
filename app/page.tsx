"use client";
import {
  LocationCheckIn,
  VideoAction,
  CodeAction,
} from "@/components/action-card";

export default function Home() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] p-6">
      <h1 className="text-3xl font-bold text-[hsl(var(--cyan))] mb-6 tracking-wide">
        Earn & Collect
      </h1>
      <div className="gap-6 flex flex-col">
        <LocationCheckIn onReward={() => {}} />
        <VideoAction onReward={() => {}} />
        <CodeAction onReward={() => {}} />
      </div>
    </div>
  );
}
