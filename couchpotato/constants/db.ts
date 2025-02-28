import { neonDbUrl } from '@/env.config';
import { drizzle } from 'drizzle-orm/neon-http';

export const db = drizzle(neonDbUrl.apiKey);
