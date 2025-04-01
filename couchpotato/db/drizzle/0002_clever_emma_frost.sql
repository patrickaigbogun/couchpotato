CREATE TYPE "public"."media_type" AS ENUM('movie', 'TVShow', 'anime');--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"username" varchar(50) NOT NULL,
	"profile_photo" varchar(255),
	"bio" text
);
--> statement-breakpoint
CREATE TABLE "watch_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"media_id" integer NOT NULL,
	"media_type" "media_type" NOT NULL,
	"progress" integer DEFAULT 0,
	"completed" boolean DEFAULT false,
	"last_watched" timestamp DEFAULT now(),
	"in_watch_list" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "watch_metrics" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"total_watch_time" integer DEFAULT 0,
	"most_watched_genres" jsonb DEFAULT '[]'::jsonb,
	"favorite_actors" jsonb DEFAULT '[]'::jsonb,
	"favorite_directors" jsonb DEFAULT '[]'::jsonb,
	"most_watched_media" uuid,
	"watch_streak" integer DEFAULT 0,
	"watch_times" jsonb DEFAULT '{}'::jsonb,
	"rewatch_frequency" jsonb DEFAULT '{}'::jsonb
);
--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "watch_history" ADD CONSTRAINT "watch_history_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "watch_metrics" ADD CONSTRAINT "watch_metrics_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;