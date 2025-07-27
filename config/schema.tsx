import { integer, json, jsonb, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { Session } from "inspector/promises";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  credits: integer()
});

export const chatTable =pgTable("chat",{
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  sessionId: varchar().notNull(),
  notes: text(),
  selectedDoctor: json(),
  conversation: json(),
  report: json(),
  createdBy: varchar().references(()=>usersTable.email),
  createdOn: varchar()  
})