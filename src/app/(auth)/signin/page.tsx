"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

const signinSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
  rememberMe: z.boolean(),
});

type SigninFormValues = z.infer<typeof signinSchema>;

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = async (data: SigninFormValues) => {
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true,
    });
    if (!error) {
      router.push("/");
    }
  };

  const register = async () => {
    await authClient.signUp.email({
      name: "Admin Test", // required
      email: "admin@test.com", // required
      password: "Test1234", // required
      image: "https://example.com/image.png",
      studio_id: "ed31a110-12af-471d-8b44-ab928d725687",

      // callbackURL: "https://example.com/callback",
    });
  };

  return (
    <div className="min-h-screen from-secondary to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-6">
            <div className="text-2xl font-bold text-primary-foreground">✨</div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Pilates Studio
          </h1>
        </div>

        {/* Login Card */}
        <Card className="p-8 shadow-lg border-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="bg-input border-border text-foreground placeholder:text-muted-foreground pr-10"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full bg-primary hover:bg-accent text-primary-foreground font-medium py-6 text-base transition-all duration-200"
              >
                {form.formState.isSubmitting ? <Spinner /> : "Entrar"}
              </Button>
            </form>
          </Form>

          {/* <button
            type="button"
            onClick={register}
            className="mt-4 w-full bg-secondary hover:bg-secondary/80 text-primary-foreground font-medium py-6 text-base transition-all duration-200"
          >
            Criar conta de teste
          </button> */}
          {/* Signup Link */}
        </Card>

        {/* Footer Info */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Pilates Studio. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
