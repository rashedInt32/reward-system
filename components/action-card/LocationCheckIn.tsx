"use client";
import { Button } from "../Button";
import { useActionCard } from "./useActionCard";
import { Loader } from "../Loader";

export type Reward = { type: string; time: string; icon: string };

export function LocationCheckIn() {
  const { loading, handleCheckIn } = useActionCard();

  return (
    <div className="action-card">
      <div className="card-content">
        <div className="max-w-[75%]">
          <h2 className="card-title">Check-In</h2>
          <p className="card-description">
            Check in at designated locations to earn exclusive digital rewards.
          </p>
        </div>
        {!loading ? (
          <Button onClick={() => handleCheckIn()}>Claim</Button>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
