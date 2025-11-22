CREATE TABLE "clients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"studio_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"cpf_cnpj" varchar(20),
	"birth_date" date,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "clients_email_unique" UNIQUE("email"),
	CONSTRAINT "clients_cpf_cnpj_unique" UNIQUE("cpf_cnpj")
);
--> statement-breakpoint
CREATE TABLE "studios" (
	"studio_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "studios_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_d" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"cpf_cnpj" varchar(20),
	"birth_date" date,
	"studio_id" uuid NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_cpf_cnpj_unique" UNIQUE("cpf_cnpj")
);
--> statement-breakpoint
ALTER TABLE "clients" ADD CONSTRAINT "clients_studio_id_studios_studio_id_fk" FOREIGN KEY ("studio_id") REFERENCES "public"."studios"("studio_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_studio_id_studios_studio_id_fk" FOREIGN KEY ("studio_id") REFERENCES "public"."studios"("studio_id") ON DELETE no action ON UPDATE no action;