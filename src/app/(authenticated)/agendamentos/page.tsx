import { AgendamentoPage } from "@/features/agendamentos/agendamentoPage";
import { getResumeAppoimntments } from "./action";

export default async function Page() {
  const appointments = await getResumeAppoimntments();
  return <AgendamentoPage appointments={appointments} />;
}
