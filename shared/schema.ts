import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const lenses = pgTable("lenses", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  incolor: boolean("incolor").notNull(),
  antireflexo: boolean("antireflexo").notNull(),
  fotosensivel: boolean("fotosensivel").notNull(),
  blueCut: boolean("blue_cut").notNull(),
  medidas: text("medidas").notNull(),
  espessura: text("espessura").notNull(),
  precoVista: text("preco_vista").notNull(),
  parcela3x: text("parcela_3x").notNull(),
  parcela6x: text("parcela_6x").notNull(),
  parcela10x: text("parcela_10x").notNull(),
});

export const insertLensSchema = createInsertSchema(lenses);

export type InsertLens = z.infer<typeof insertLensSchema>;
export type Lens = typeof lenses.$inferSelect;

export interface LensFilter {
  incolor?: boolean;
  antireflexo?: boolean;
  fotosensivel?: boolean;
  blueCut?: boolean;
  medidas?: string;
  espessura?: string;
}

export interface QuestionnaireAnswer {
  question: string;
  key: keyof LensFilter;
  answer: string | boolean;
}

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
