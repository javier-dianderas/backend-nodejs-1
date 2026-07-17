import { z } from "zod";
import { objectIdSchema } from "../base/id.schema.js";

const productParamsSchema = z.object({
    id: objectIdSchema("id")
});

export default productParamsSchema;