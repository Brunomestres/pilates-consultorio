"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Lógica de login será adicionada aqui
    console.log("Login:", { email, password });
    setTimeout(() => setIsLoading(false), 1000);
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
          <p className="text-muted-foreground">Bem-vindo de volta</p>
        </div>

        {/* Login Card */}
        <Card className="p-8 shadow-lg border-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                E-mail
              </label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Senha
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border bg-input"
                  defaultChecked
                />
                <span className="text-muted-foreground">Lembrar-me</span>
              </label>
              <a
                href="#"
                className="text-accent hover:text-primary font-medium transition-colors"
              >
                Esqueceu a senha?
              </a>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-accent text-primary-foreground font-medium py-6 text-base transition-all duration-200"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
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
