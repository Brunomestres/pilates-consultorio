"use client";

import { Pacientes } from "@/app/(authenticated)/pacientes/action";
import { maskCpfCnpj } from "@/utils/mask-cnpj-cpj";
import { maskPhone } from "@/utils/mask-phone";
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
    cell: ({ row }) => {
      return <span>{maskPhone(row.original.phone) || "--"}</span>;
    },
  },
  {
    accessorKey: "cpf_cnpj",
    header: "CPF/CNPJ",
    cell: ({ row }) => {
      return <span>{maskCpfCnpj(row.original.cpf_cnpj || "") || "--"}</span>;
    },
  },
];
