import { z } from "zod";

export const scheduleFormSchema = z.object({
  id: z.string().optional(),
  serviceId: z.string().optional(),
  scheduleDate: z.string().min(1, "Data é obrigatória"),
});

export type ScheduleFormValues = z.infer<typeof scheduleFormSchema>;
