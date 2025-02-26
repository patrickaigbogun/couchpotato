import { defineConfig } from 'drizzle-kit';
import { neonDbUrl } from './env.config';
export default defineConfig({
	out: './db/drizzle',
	schema: './db/schema/schema.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: neonDbUrl.apiKey,
	},
});
