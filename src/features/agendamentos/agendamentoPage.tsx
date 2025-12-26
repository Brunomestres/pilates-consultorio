"use client";
import { Button } from "@/components/ui/button";
import { ScheduleCalendar } from "./components/schedule-calendar";
import { Activity, Plus } from "lucide-react";
import { MakeAppointmentModal } from "./components/modal/make-appointment";
import { useState } from "react";

export function AgendamentoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="flex flex-col gap-2">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                  Pilates Studio
                </h1>
                <p className="text-sm text-muted-foreground">
                  Gerenciamento de Agendamentos
                </p>
              </div>
            </div>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer"
            >
              <Plus className="mr-2 h-4 w-4" />
              Novo Agendamento
            </Button>
          </div>
        </div>
      </header>
      <ScheduleCalendar />
      <MakeAppointmentModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  );
}
