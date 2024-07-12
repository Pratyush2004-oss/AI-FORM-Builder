const { pgTable, serial, text, varchar, integer, boolean } = require("drizzle-orm/pg-core");

export const JsonForms = pgTable('JSON-Forms',
    {
        id: serial('ID').primaryKey(),
        jsonform: text('JSON Form').notNull(),
        theme: varchar("theme"),
        background: varchar("background"),
        style: varchar("style"),
        createdBy: varchar('Created By').notNull(),
        createdAt: varchar('Created At').notNull(),
        enableSignIn: boolean("enableSignIn").default(false)
    }
)

export const userResponse = pgTable('userResponses',
    {
        id: serial('ID').primaryKey(),
        jsonResponse: text('jsonResponse').notNull(),
        createdBy: varchar('Created By').default('anonymus'),
        createdAt: varchar('Created At').notNull(),
        formRef: integer('formRef').references(() => JsonForms.id)
    }
)