import { motivationalMessages } from "@/src/components/motivationalMessages/motivationalMessages";
import { getProgressLevel } from "../progress/progress";


export function getMotivation(progress: number) {
  const level = getProgressLevel(progress);

  const messages =
    motivationalMessages[level as keyof typeof motivationalMessages];

  return messages[
    Math.floor(Math.random() * messages.length)
  ];
}
