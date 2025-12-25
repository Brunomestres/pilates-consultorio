"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { PacienteTable } from "./components/table/paciente-table";
import { Pacientes } from "@/app/(authenticated)/pacientes/action";
import { columns } from "./components/table/paciente-columns";

export default function PacientePage({
  pacientes,
}: {
  pacientes: Pacientes[];
}) {
  const table = useReactTable({
    data: pacientes || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <PacienteTable table={table} />;
}
