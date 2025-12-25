"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { pacienteSchema } from "../paciente-schema";
import { createPaciente } from "@/app/(authenticated)/pacientes/action";
import { Form } from "@/components/ui/form";
export function CreatePacienteModal({ open }: { open: boolean }) {
  const form = useForm<z.infer<typeof pacienteSchema>>({
    resolver: zodResolver(pacienteSchema),
    defaultValues: {
      birth_date: "",
      cpf_cnpj: "",
      email: "",
      name: "",
      phone: "",
      active: true,
    },
  });

  async function onSubmit(values: z.infer<typeof pacienteSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await createPaciente(values);
  }
  return (
    <Dialog open={open} modal={true}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar um novo paciente</DialogTitle>
              <DialogDescription>
                Adicione as informações do novo paciente aqui. Clique em salvar
                quando terminar.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Name</Label>
                <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Username</Label>
                <Input
                  id="username-1"
                  name="username"
                  defaultValue="@peduarte"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
}
