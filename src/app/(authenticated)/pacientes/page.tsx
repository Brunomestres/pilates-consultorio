import PacientePage from "@/features/paciente/pacientePage";
import { getPacientes } from "./action";

export default async function Page() {
  const pacientes = await getPacientes();
  return <PacientePage pacientes={pacientes} />;
}
