
import { z } from "zod"
export const SignupValidation = z.object({
    username: z.string().min(2,{ message: "Too Short" }).max(50),
    name: z.string().min(2,{ message: "Too Short" }).max(50, ),
    email: z.string().min(2,{message: "Too short"}).max(50),
    password: z.string().min(2,{}).max(30,{})
})
export const SigninValidation = z.object({
    email: z.string().min(2,{message: "Too short"}).max(50),
    password: z.string().min(2,{}).max(30,{})
})