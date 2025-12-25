"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pacientes } from "@/app/(authenticated)/pacientes/action";
import { maskCpfCnpj } from "@/utils/mask-cnpj-cpj";
import { maskPhone } from "@/utils/mask-phone";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

type Props = {
  setPaciente: (paciente: Pacientes) => void;
};

export const getColumns = ({ setPaciente }: Props) => {
  const columns: ColumnDef<Pacientes>[] = [
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
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setPaciente(row.original)}>
                  Editar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
    },
  ];

  return columns;
};
