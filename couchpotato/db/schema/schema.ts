import { pgTable, uuid, varchar, pgEnum, text, serial, integer, boolean, check, timestamp, jsonb} from "drizzle-orm/pg-core";

// Create a user role enum type
export const userRoleEnum = pgEnum("user_role", [
	"user",
	"mod",
	"star",
	"admin",
	"superadmin",
]);

export const mediaTypeEnum = pgEnum("media_type", [
	"movie",
	"TVShow",
	"anime",
  ]);

export const users = pgTable("users", {
	id: uuid("id").primaryKey().defaultRandom(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	password: varchar("password", { length: 255 }).notNull(),
	username: varchar("username", { length: 50 }).notNull().unique(),
	// Add role field with default value of 'user'
	role: userRoleEnum("role").notNull().default("user"),
});

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  profilePhoto: varchar("profile_photo", { length: 255 }),
  bio: text("bio"),
});

// Watch History Table
export const watchHistory = pgTable("watch_history", {
    id: serial("id").primaryKey(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
    mediaId: integer("media_id").notNull(), // Changed to integer for TMDB ID without reference
    
    mediaType: mediaTypeEnum("media_type").notNull(),
    progress: integer("progress").default(0),
    completed: boolean("completed").default(false),
    lastWatched: timestamp("last_watched").defaultNow(),

    inWatchList: boolean("in_watch_list").default(true)
});

// Watch Metrics Table
export const watchMetrics = pgTable("watch_metrics", {
    userId: uuid("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),

    totalWatchTime: integer("total_watch_time").default(0),
    mostWatchedGenres: jsonb("most_watched_genres").default([]),
    favoriteActors: jsonb("favorite_actors").default([]),
    favoriteDirectors: jsonb("favorite_directors").default([]),
    mostWatchedMedia: uuid("most_watched_media"),
    watchStreak: integer("watch_streak").default(0),
    watchTimes: jsonb("watch_times").default({}),
    rewatchFrequency: jsonb("rewatch_frequency").default({})
});