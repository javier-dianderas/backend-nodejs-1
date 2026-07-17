import mongoose from "mongoose";
import { z } from "zod";

export const objectIdSchema = (fieldName) => 
    z.string()
        .trim()
        .min(1, {
            message: `El ${fieldName} es obligatorio`
        })
        .refine(value => mongoose.Types.ObjectId.isValid(value), {
                message: `El ${fieldName} no es un ObjectId válido`
        });