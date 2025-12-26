import { AgendamentoPage } from "@/features/agendamentos/agendamentoPage";
import { getResumeAppoimntments } from "./action";

export default async function Page() {
  await getResumeAppoimntments();
  return <AgendamentoPage />;
}
