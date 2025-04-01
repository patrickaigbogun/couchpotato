CREATE TYPE "public"."user_role" AS ENUM('user', 'mod', 'star', 'admin', 'superadmin');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "user_role" DEFAULT 'user' NOT NULL;