// import { DATABASE } from '@/env.config';
import sql from '@/lib/db';
import { drizzle } from 'drizzle-orm/neon-http';


// export const neonDbUrl =  DATABASE.url;


export const db = drizzle({client:sql});

