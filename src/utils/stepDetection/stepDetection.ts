export type StepDetectionParams = {
  magnitude: number;
  previousMagnitude: number;
  lastStepTime: number;
  now: number;
};

export function detectStep({
  magnitude,
  previousMagnitude,
  lastStepTime,
  now,
}: StepDetectionParams) {
  const filtered = magnitude - 1;

  const detected =
    filtered > 0.2 &&
    previousMagnitude <= 0.2 &&
    now - lastStepTime > 400;

  return {
    detected,
    filtered,
  };
}