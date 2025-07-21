import {
  LocationCheckIn,
  VideoAction,
  CodeAction,
} from "../components/ActionCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] p-6">
      <h1 className="text-3xl font-bold text-[hsl(var(--cyan))] mb-6 tracking-wide">
        Earn & Collect
      </h1>
      <div className="grid gap-6 md:grid-cols-3">
        <LocationCheckIn onReward={() => {}} />
        <VideoAction onReward={() => {}} />
        <CodeAction onReward={() => {}} />
      </div>
    </div>
  );
}
