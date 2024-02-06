import { z } from "zod";

export const jobFilteredSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type jobFilteredSchema = z.infer<typeof jobFilteredSchema>;
