import { z } from "zod";

const productQuerySchema = z.object({    
    category: z.string().optional(),
    isAvailable: z.coerce().boolean(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10),
    sort: z.coerce.number().refine(v => v === 1 || v === -1).default(1)
});

export default productQuerySchema;