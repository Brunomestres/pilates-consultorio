import { Pacientes } from "@/app/(authenticated)/pacientes/action";
import { DataTable } from "@/components/data-table";
import { Table } from "@tanstack/react-table";

export function PacienteTable({ table }: { table: Table<Pacientes> }) {
  return <DataTable table={table} />;
}
