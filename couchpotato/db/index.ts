import { neonDbUrl } from '@/env.config';
import { drizzle } from 'drizzle-orm/neon-http';

const db = drizzle(neonDbUrl.apiKey);
