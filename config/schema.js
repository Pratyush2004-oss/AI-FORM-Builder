const { pgTable, serial, text, varchar } = require("drizzle-orm/pg-core");

export const JsonForms = pgTable('JSON-Forms',
    {
        id: serial('id').primaryKey(),
        jsonform: text('JSON Form').notNull(),
        createdBy: varchar('Created By').notNull(),
        createdAt: varchar('Created At').notNull(),
    }
)