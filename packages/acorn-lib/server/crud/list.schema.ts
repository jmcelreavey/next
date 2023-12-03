import { z } from "zod";

export function makeListRequestSchema<T extends z.ZodTypeAny>(
  criteriaSchema: T
) {
  return z
    .object({
      cursor: z.number().nullish(),
      criteria: criteriaSchema,
      range: z
        .object({
          pageIndex: z.number().optional(),
          pageSize: z.number().optional(),
        })
        .optional(),
    })
    .optional();
}
