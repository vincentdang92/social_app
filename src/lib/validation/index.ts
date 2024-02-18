
import { z } from "zod"
export const SignupValidation = z.object({
    username: z.string().min(2,{ message: "Too Short" }).max(50),
    name: z.string().min(2,{ message: "Too Short" }).max(50, ),
})