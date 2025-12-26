import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { getPacientes } from "@/app/(authenticated)/agendamentos/action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pacientes } from "@/app/(authenticated)/pacientes/action";
type MakeAppointmentModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MakeAppointmentModal({
  open,
  onOpenChange,
}: MakeAppointmentModalProps) {
  const [pacientes, setPacientes] = useState<Pacientes[]>([]);

  async function fetchData() {
    const response = await getPacientes();
    console.log("Pacientes:", response);
    setPacientes(response);
  }

  useEffect(() => {
    async function fetchAndSetPacientes() {
      await fetchData();
    }
    fetchAndSetPacientes();
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form className="space-y-4 p-1">
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Novo Agendamento</DialogTitle>
            <DialogDescription>
              Preencha os dados para agendar uma aula.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            {/* Paciente */}
            <div>
              <Label htmlFor="paciente">Paciente</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecionar o paciente" />
                </SelectTrigger>
                <SelectContent>
                  {pacientes.map((paciente) => (
                    <SelectItem key={paciente.id} value={paciente.name}>
                      {paciente.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Data */}
            <div className="grid gap-2">
              <Label htmlFor="data">Data</Label>
              <Input id="data" name="data" type="date" />
            </div>
            {/* Hora */}
            <div className="grid gap-2">
              <Label htmlFor="hora">Hora</Label>
              <Input id="hora" name="hora" type="time" />
            </div>
            {/* Duração */}
            <div className="grid gap-2">
              <Label htmlFor="duracao">Duração (minutos)</Label>
              <Input
                id="duracao"
                name="duracao"
                type="number"
                min="1"
                placeholder="50"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Agendar</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
