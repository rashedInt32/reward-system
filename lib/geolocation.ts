export const checkIn = (
  userLat: number,
  userLng: number,
  targetLat = 40.7128,
  targetLng = -74.006,
) => {
  const R = 6371e3; // Earth's radius in meters
  const dLat = ((targetLat - userLat) * Math.PI) / 180;
  const dLng = ((targetLng - userLng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((userLat * Math.PI) / 180) *
      Math.cos((targetLat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const distance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return distance <= 100;
};

export const canCheckIn = (): boolean => {
  if (typeof window === "undefined") return true;
  const lastCheckIn = localStorage.getItem("lastCheckIn");
  if (!lastCheckIn) return true;
  const now = new Date();
  const diff = now.getTime() - new Date(lastCheckIn).getTime();
  return diff > 24 * 60 * 60 * 1000; // 24 hours
};

export const recordCheckIn = () => {
  if (typeof window === "undefined") return;
  localStorage.setItem("lastCheckIn", new Date().toISOString());
};
