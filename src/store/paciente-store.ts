import { Pacientes } from "@/app/(authenticated)/pacientes/action";
import { create } from "zustand";

type PacienteState = {
  pacienteEditar: Pacientes;
};

type PacienteActions = {
  setPacienteEditar: (paciente: Pacientes) => void;
  clearPacienteEditar: () => void;
};
export const usePacienteStore = create<PacienteState & PacienteActions>(
  (set) => ({
    pacienteEditar: {} as Pacientes,
    setPacienteEditar: (paciente: Pacientes) =>
      set(() => ({ pacienteEditar: paciente })),
    clearPacienteEditar: () => set(() => ({ pacienteEditar: {} as Pacientes })),
  })
);
