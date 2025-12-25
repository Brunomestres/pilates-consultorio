"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { PacienteTable } from "./components/table/paciente-table";
import { Pacientes } from "@/app/(authenticated)/pacientes/action";
import { columns } from "./components/table/paciente-columns";
import { CreatePacienteModal } from "./components/modal/create-paciente-modal";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function PacientePage({
  pacientes,
}: {
  pacientes: Pacientes[];
}) {
  const [open, setOpen] = useState(false);
  const table = useReactTable({
    data: pacientes || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="flex flex-col w-full gap-3 m-5">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Pacientes</h1>
          <p>Gerencie os pacientes cadastrados no sistema.</p>
          <Button
            className="w-44 cursor-pointer bg-blue-500 hover:bg-blue-400 text-gray-50 font-medium"
            onClick={() => setOpen(true)}
          >
            Adicionar Paciente
          </Button>
        </div>
        <PacienteTable table={table} />
      </div>
      <CreatePacienteModal open={open} setOpen={setOpen} />
    </>
  );
}
