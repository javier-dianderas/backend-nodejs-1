import { z } from "zod";

const cartQuantityItemSchema = z.object({
    quantity: z.number().int().positive()
});

export default cartQuantityItemSchema;