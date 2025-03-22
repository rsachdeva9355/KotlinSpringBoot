import { format } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PetEvent, EVENT_TYPE_CONFIG } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface EventDetailsDialogProps {
  event: PetEvent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: () => void;
}

export function EventDetailsDialog({
  event,
  open,
  onOpenChange,
  onEdit,
}: EventDetailsDialogProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!event) return;
      const response = await fetch(`/api/pets/events/${event.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pets/events"] });
      toast({
        title: "Event deleted",
        description: "The event has been deleted successfully",
      });
      onOpenChange(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete event. Please try again.",
        variant: "destructive",
      });
    },
  });

  const toggleCompleteMutation = useMutation({
    mutationFn: async () => {
      if (!event) return;
      const response = await fetch(`/api/pets/events/${event.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !event.completed }),
      });
      if (!response.ok) {
        throw new Error("Failed to update event");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pets/events"] });
      toast({
        title: "Event updated",
        description: "The event status has been updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update event. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (!event) return null;

  const eventConfig = EVENT_TYPE_CONFIG[event.type];
  const formattedDate = format(new Date(event.startDate), "PPP");
  const formattedTime = event.isAllDay
    ? "All day"
    : format(new Date(event.startDate), "p");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{event.title}</span>
            <Badge
              style={{
                backgroundColor: eventConfig.color,
                color: "white",
              }}
            >
              {eventConfig.label}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <h4 className="text-sm font-medium">Date & Time</h4>
            <p className="text-sm text-muted-foreground">
              {formattedDate} at {formattedTime}
            </p>
          </div>

          {event.description && (
            <div>
              <h4 className="text-sm font-medium">Description</h4>
              <p className="text-sm text-muted-foreground">{event.description}</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Completed</span>
            <Switch
              checked={event.completed}
              onCheckedChange={() => toggleCompleteMutation.mutate()}
              disabled={toggleCompleteMutation.isPending}
            />
          </div>

          {event.reminder && (
            <div>
              <Badge variant="outline">Reminder set</Badge>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Event</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this event? This action cannot be
                  undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteMutation.mutate()}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {onEdit && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                onOpenChange(false);
                onEdit();
              }}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 