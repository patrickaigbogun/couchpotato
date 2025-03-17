import { DATABASE } from '@/env.config';
import { drizzle } from 'drizzle-orm/neon-http';


export const neonDbUrl =  DATABASE.url;


export const db = drizzle(neonDbUrl);

