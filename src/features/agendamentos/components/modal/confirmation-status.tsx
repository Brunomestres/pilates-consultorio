"use client";
import { canceledAppointmentStatus } from "@/app/(authenticated)/agendamentos/action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { toast } from "sonner";

type ConfirmationStatusProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointmentId: string;
};

export function ConfirmationStatus({
  open,
  onOpenChange,
  appointmentId,
}: ConfirmationStatusProps) {
  const [isLoading, setIsLoading] = useState(false);
  const onCancel = async () => {
    try {
      setIsLoading(true);
      await canceledAppointmentStatus(appointmentId);
      setIsLoading(false);

      toast.success("Agendamento cancelado com sucesso.");
      onOpenChange(false);
    } catch (error) {
      console.log("Error canceling appointment:", error);
      toast.error("Erro ao cancelar o agendamento. Tente novamente.");
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-destructive"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M5.07 19h13.86A2 2 0 0021 17.07l-7.07-12.14a2 2 0 00-3.86 0L3 17.07A2 2 0 005.07 19z"
              />
            </svg>
            Confirmar cancelamento
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Tem certeza que deseja cancelar este agendamento? Esta ação não pode
            ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end mt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Fechar
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            onClick={onCancel}
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "Sim, cancelar agendamento"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
