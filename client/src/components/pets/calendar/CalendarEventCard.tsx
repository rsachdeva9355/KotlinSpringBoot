import { format } from "date-fns";
import { PetEvent, EVENT_TYPE_CONFIG } from "@shared/schema";
import { cn } from "@/lib/utils";
import {
  Stethoscope,
  Scissors,
  Pill,
  Syringe,
  Target,
  Activity,
  UtensilsCrossed,
  MoreHorizontal,
} from "lucide-react";

const iconMap = {
  stethoscope: Stethoscope,
  scissors: Scissors,
  pill: Pill,
  syringe: Syringe,
  target: Target,
  activity: Activity,
  bowl: UtensilsCrossed,
  'more-horizontal': MoreHorizontal,
};

interface CalendarEventCardProps {
  event: PetEvent;
  onClick?: () => void;
}

export function CalendarEventCard({ event, onClick }: CalendarEventCardProps) {
  const config = EVENT_TYPE_CONFIG[event.type];
  const Icon = iconMap[config.icon as keyof typeof iconMap];

  return (
    <div
      className={cn(
        "flex items-center gap-2 p-1 rounded text-xs truncate cursor-pointer hover:opacity-80",
        "transition-colors duration-200"
      )}
      style={{ backgroundColor: `${config.color}20`, color: config.color }}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      <Icon className="h-3 w-3" />
      <span className="truncate">{event.title}</span>
      {!event.isAllDay && (
        <span className="ml-auto shrink-0">
          {format(new Date(event.startDate), "HH:mm")}
        </span>
      )}
    </div>
  );
} 