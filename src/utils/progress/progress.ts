export function getProgressLevel(progress: number) {
  if (progress === 0) return "start";
  if (progress < 0.5) return "low";
  if (progress < 0.8) return "medium";
  if (progress < 1) return "high";
  return "done";
}
