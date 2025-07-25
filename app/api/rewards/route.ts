// This route is just server/db api call showcase, not doing anything with current form of the api
// because it is using browser storage
import { NextResponse } from "next/server";
import { generateRewardName, generateRewardIcon } from "@/lib/rewards";
import { addReward, getRewards } from "@/lib/storage";

export async function GET() {
  try {
    const rewards = getRewards();
    return NextResponse.json(rewards, { status: 200 });
  } catch (error) {
    console.error("GET /api/rewards failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch rewards" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const { actionType } = body;
    const validActions = ["checkin", "video", "code", "wallet"];
    if (!validActions.includes(actionType)) {
      return NextResponse.json(
        { error: "Invalid action type" },
        { status: 400 },
      );
    }

    const name = await generateRewardName(actionType);
    const icon = await generateRewardIcon();
    const reward = {
      type: name,
      time: new Date().toISOString(),
      icon,
    };

    addReward(reward);
    return NextResponse.json(reward, { status: 201 });
  } catch (error) {
    console.error("POST /api/rewards failed:", error);
    return NextResponse.json(
      { error: "Failed to generate reward" },
      { status: 500 },
    );
  }
}
