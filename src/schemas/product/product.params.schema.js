import { z } from "zod";

const productParamsSchema = z.object({
    id: z.string({ error: "El id debe ser de tipo string" }).min(1, { error: "El id es obligatorio"})
});

export default productParamsSchema;