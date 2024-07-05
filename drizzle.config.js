import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: './config/schema.js',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://neondb_owner:JjXVaRv26PKB@ep-jolly-bread-a5hdf74l.us-east-2.aws.neon.tech/AI-FORM-Builder?sslmode=require',
    }
})