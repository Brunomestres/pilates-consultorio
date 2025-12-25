"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Calendar, ChevronUp, User2 } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
const items = [
  {
    title: "Paciente",
    url: "/pacientes",
    icon: User2,
  },
  {
    title: "Agendamento",
    url: "/agendamentos",
    icon: Calendar,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data } = authClient.useSession();
  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
        },
      },
    });
  };

  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      className="bg-linear-to-b from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold text-blue-700 dark:text-blue-300">
            Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem className="my-1" key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`hover:bg-blue-100 dark:hover:bg-blue-900 data-[active=true]:bg-blue-200 dark:data-[active=true]:bg-blue-800 h-12 text-base ${
                      pathname === item.url
                        ? "bg-blue-200 dark:bg-blue-800"
                        : ""
                    }`}
                  >
                    <Link href={item.url}>
                      <item.icon className="text-blue-600 dark:text-blue-400 h-5 w-5" />
                      <span className="text-slate-700 dark:text-slate-200">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-blue-100/50 dark:bg-blue-900/30">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="hover:bg-blue-100 dark:hover:bg-blue-900 h-10 text-base">
                  <User2 className=" h-5 w-5" />
                  <span className="text-slate-700 dark:text-slate-200">
                    {data?.user.name || "Não informado"}
                  </span>
                  <ChevronUp className="ml-auto h-5 w-5" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onClick={() => signOut()}>
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
