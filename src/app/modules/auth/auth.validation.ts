import { z } from "zod";

export const loginValidation = z.object({
    body: z.object({
        id: z.string().min(1, "ID is required"),
        password: z.string().min(1, "Password is required"),
    })
})


