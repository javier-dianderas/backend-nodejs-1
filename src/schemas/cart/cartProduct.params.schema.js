import { z } from "zod";
import { objectIdSchema } from "../base/id.schema.js";

const cartProductParamsSchema = z.object({
    cid: objectIdSchema("cid"),
    pid: objectIdSchema("pid")
});

export default cartProductParamsSchema;