"use client";

import { Pacientes } from "@/app/(authenticated)/pacientes/action";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Pacientes>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Telefone",
  },
  {
    accessorKey: "cpf_cnpj",
    header: "CPF/CNPJ",
  },
];
