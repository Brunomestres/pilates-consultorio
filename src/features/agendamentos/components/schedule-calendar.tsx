"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Trash2,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ResumeAppointments } from "@/app/(authenticated)/agendamentos/action";
import { StatusEnum } from "@/enum/status-enum";
import { ConfirmationStatus } from "./modal/confirmation-status";

const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export function ScheduleCalendar({
  appointments,
}: {
  appointments: ResumeAppointments[];
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] =
    useState<string>("");
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
    setSelectedDate(null);
  };

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  // Função para verificar se há appointments no dia
  const getAppointmentsForDay = (day: number) => {
    return appointments.filter((appt) => {
      const apptDate = new Date(appt.hour);
      return (
        apptDate.getFullYear() === year &&
        apptDate.getMonth() === month &&
        apptDate.getDate() === day
      );
    });
  };

  const selectedAppointments = selectedDate
    ? getAppointmentsForDay(selectedDate)
    : [];

  const StatusLabel: Record<StatusEnum, string> = {
    [StatusEnum.Agendado]: "Agendado",
    [StatusEnum.Cancelado]: "Cancelado",
  };
  const onOpenConfirmation = (appointmentId: string) => {
    setSelectedAppointmentId(appointmentId);
    setIsConfirmationOpen(true);
  };
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-semibold">
              {MONTHS[month]} {year}
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-muted-foreground"
              >
                {day}
              </div>
            ))}
            {emptyDays.map((i) => (
              <div key={`empty-${i}`} />
            ))}
            {daysArray.map((day) => {
              const appts = getAppointmentsForDay(day);
              const isSelected = selectedDate === day;
              const isToday =
                day === new Date().getDate() &&
                month === new Date().getMonth() &&
                year === new Date().getFullYear();

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={cn(
                    "relative aspect-square rounded-lg p-2 text-center transition-colors hover:bg-muted",
                    isSelected && "bg-primary text-primary-foreground",
                    isToday &&
                      !isSelected &&
                      "border-2 border-primary font-semibold"
                  )}
                >
                  <span className="text-sm">{day}</span>
                  {appts.length > 0 && (
                    <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-0.5">
                      {appts.slice(0, 3).map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "h-1 w-1 rounded-full",
                            isSelected ? "bg-primary-foreground" : "bg-primary"
                          )}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="w-sm">
        <CardHeader>
          <CardTitle>
            {selectedDate
              ? `Agendamentos - ${selectedDate} de ${MONTHS[month]}`
              : "Selecione uma data"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedDate ? (
            selectedAppointments.length > 0 ? (
              <div className="space-y-4">
                {selectedAppointments.map((appointment, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-3 rounded-lg border border-border bg-muted/50 p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold">
                            {appointment.hour
                              ? new Date(appointment.hour).toLocaleTimeString(
                                  [],
                                  { hour: "2-digit", minute: "2-digit" }
                                )
                              : ""}
                          </span>
                        </div>
                        {/* Se quiser exibir mais informações, adicione aqui */}
                      </div>
                      <Badge
                        variant="default"
                        className={cn(
                          appointment.status === StatusEnum.Agendado &&
                            "bg-green-100 text-green-800",
                          appointment.status === StatusEnum.Cancelado &&
                            "bg-red-100 text-red-800"
                        )}
                      >
                        {StatusLabel[appointment.status as StatusEnum]}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {appointment.client_name}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent cursor-pointer"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-destructive hover:bg-destructive hover:text-white bg-transparent cursor-pointer"
                        onClick={() => onOpenConfirmation(appointment.id)}
                        disabled={appointment.status === StatusEnum.Cancelado}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Nenhum agendamento nesta data
                </p>
              </div>
            )
          ) : (
            <div className="space-y-6 py-4">
              <div></div>
              <p className="text-center text-sm text-muted-foreground">
                Clique em uma data no calendário para ver os horários
                disponíveis
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      <ConfirmationStatus
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        appointmentId={selectedAppointmentId}
      />
    </div>
  );
}
