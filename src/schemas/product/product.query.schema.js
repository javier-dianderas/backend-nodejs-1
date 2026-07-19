import { z } from "zod";

const productQuerySchema = z.object({    
    category: z.string().optional(),
    isAvailable: z.enum(["true", "false"]).optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10),
    sort: z.enum(["1", "-1"]).optional(),
});

export default productQuerySchema;