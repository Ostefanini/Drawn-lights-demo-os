import * as z from "zod";
import { userNicknameSchema } from "./user.js";

export const soundSchema = z.enum(["healing", "emerveille", "glossy", "none"]);

export const combinationStatusSchema = z.object({
    exist: z.boolean(),
    foundBy: userNicknameSchema.nullable(),
    isSecretCombinationFound: z.boolean(),
});

export const emailSchema = z.string().email();

export const combinationAttributionBodySchema = z.object({
    userNickname: userNicknameSchema,
    email: emailSchema.optional(),
})

export type CombinationStatus = z.infer<typeof combinationStatusSchema>;
export type CombinationAttributionBody = z.infer<typeof combinationAttributionBodySchema>;
export type Sound = z.infer<typeof soundSchema>;