import { pgTable, uuid, varchar, pgEnum } from "drizzle-orm/pg-core";

// Create a user role enum type
export const userRoleEnum = pgEnum("user_role", [
	"user",
	"mod",
	"star",
	"admin",
	"superadmin",
]);

export const users = pgTable("users", {
	id: uuid("id").primaryKey().defaultRandom(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	password: varchar("password", { length: 255 }).notNull(),
	username: varchar("username", { length: 50 }).notNull().unique(),
	// Add role field with default value of 'user'
	role: userRoleEnum("role").notNull().default("user"),
});
