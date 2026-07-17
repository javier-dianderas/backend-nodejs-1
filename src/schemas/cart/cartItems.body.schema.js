import { z } from "zod";
import { objectIdSchema } from "../base/id.schema.js";

const cartItemSchema = z.object({
    product: objectIdSchema("product"),
    quantity: z.number().int().positive()
});

const cartItemsBodySchema = z.object({
    items: z.array(cartItemSchema).min(1, "Se debe enviar al menos un producto")
});

export default cartItemsBodySchema;