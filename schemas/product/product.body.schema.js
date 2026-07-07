const { z } = require("zod");

const productBodySchema = z.object({    
    title: z.string({ error: "El title debe ser de tipo string" }),
    description: z.string({ error: "El description debe ser de tipo string" }).max(400, { error: "La cadena debe ser menor a 400 caracteres" }),
    code: z.string({ error: "El code debe ser de tipo string" }),
    price: z.number({ error: "El price debe ser de tipo number" }),
    status: z.boolean({ error: "El status debe ser de tipo boolean" }),
    stock: z.int({ error: "El stock debe ser de tipo int" }),
    category: z.string({ error: "El category debe ser de tipo string" }),
    thumbnails: z.array(z.string({ error: "El dato debe ser de tipo string" }), { error: "El thumbnails debe ser de tipo array" }).min(0)
});

module.exports = productBodySchema;