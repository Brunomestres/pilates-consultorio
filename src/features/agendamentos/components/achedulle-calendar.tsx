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

const CLASS_TYPES = [
  { id: 1, name: "Mat Pilates", color: "bg-primary", instructor: "Ana Silva" },
  { id: 2, name: "Reformer", color: "bg-accent", instructor: "Carlos Santos" },
  {
    id: 3,
    name: "Pilates Avançado",
    color: "bg-chart-3",
    instructor: "Maria Costa",
  },
];

// Mock data para demonstração
const MOCK_SCHEDULE = {
  15: [
    {
      time: "08:00",
      type: 1,
      patient: "Maria Santos",
      phone: "(11) 98765-4321",
    },
    { time: "10:00", type: 2, patient: "Ana Costa", phone: "(11) 97654-3210" },
    {
      time: "16:00",
      type: 1,
      patient: "Julia Oliveira",
      phone: "(11) 96543-2109",
    },
  ],
  16: [
    {
      time: "09:00",
      type: 3,
      patient: "Carla Silva",
      phone: "(11) 95432-1098",
    },
    {
      time: "14:00",
      type: 1,
      patient: "Beatriz Lima",
      phone: "(11) 94321-0987",
    },
  ],
  18: [
    {
      time: "07:00",
      type: 2,
      patient: "Fernanda Souza",
      phone: "(11) 93210-9876",
    },
    {
      time: "11:00",
      type: 1,
      patient: "Patricia Rocha",
      phone: "(11) 92109-8765",
    },
    {
      time: "17:00",
      type: 3,
      patient: "Luciana Alves",
      phone: "(11) 91098-7654",
    },
  ],
  20: [
    {
      time: "08:30",
      type: 1,
      patient: "Roberta Martins",
      phone: "(11) 90987-6543",
    },
    {
      time: "15:00",
      type: 2,
      patient: "Simone Dias",
      phone: "(11) 89876-5432",
    },
  ],
  22: [
    {
      time: "09:30",
      type: 3,
      patient: "Claudia Ferreira",
      phone: "(11) 88765-4321",
    },
    {
      time: "13:00",
      type: 1,
      patient: "Renata Gomes",
      phone: "(11) 87654-3210",
    },
    {
      time: "18:00",
      type: 2,
      patient: "Vanessa Cardoso",
      phone: "(11) 86543-2109",
    },
  ],
};

export function ScheduleCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

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

  const hasClasses = (day: number) => {
    return MOCK_SCHEDULE[day as keyof typeof MOCK_SCHEDULE];
  };

  const selectedClasses = selectedDate
    ? MOCK_SCHEDULE[selectedDate as keyof typeof MOCK_SCHEDULE] || []
    : [];

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
              const classes = hasClasses(day);
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
                  {classes && (
                    <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-0.5">
                      {classes.slice(0, 3).map((_, i) => (
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

      <Card>
        <CardHeader>
          <CardTitle>
            {selectedDate
              ? `Agendamentos - ${selectedDate} de ${MONTHS[month]}`
              : "Selecione uma data"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedDate ? (
            selectedClasses.length > 0 ? (
              <div className="space-y-4">
                {selectedClasses.map((appointment, idx) => {
                  const classType = CLASS_TYPES.find(
                    (t) => t.id === appointment.type
                  )!;
                  return (
                    <div
                      key={idx}
                      className="flex flex-col gap-3 rounded-lg border border-border bg-muted/50 p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold">
                              {appointment.time}
                            </span>
                          </div>
                          <h4 className="font-medium">{classType.name}</h4>
                        </div>
                        <Badge
                          variant="secondary"
                          className={cn(classType.color, "text-white")}
                        >
                          Agendado
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {appointment.patient}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span>Instrutor: {classType.instructor}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span>{appointment.phone}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Nenhum agendamento nesta data
                </p>
                <Button className="mt-4 bg-transparent" variant="outline">
                  Adicionar Agendamento
                </Button>
              </div>
            )
          ) : (
            <div className="space-y-6 py-4">
              <div>
                <h4 className="mb-3 text-sm font-medium">
                  Tipos de Aulas Disponíveis
                </h4>
                <div className="space-y-3">
                  {CLASS_TYPES.map((type) => (
                    <div
                      key={type.id}
                      className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-3"
                    >
                      <div className={cn("h-3 w-3 rounded-full", type.color)} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{type.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {type.instructor}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Clique em uma data no calendário para ver os horários
                disponíveis
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
