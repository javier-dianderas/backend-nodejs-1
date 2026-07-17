import { z } from "zod";
import { objectIdSchema } from "../base/id.schema.js";

const cartParamsSchema = z.object({
    cid: objectIdSchema("cid")
});

export default cartParamsSchema;