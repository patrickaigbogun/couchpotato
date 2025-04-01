ALTER TABLE "profiles" DROP CONSTRAINT "profiles_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN "username";