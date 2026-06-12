import * as z from "zod";
import { userNicknameSchema } from "./user.js";

export const soundSchema = z.enum(["healing", "emerveille", "glossy", "none"]);

export const combinationStatusSchema = z.object({
    exist: z.boolean(),
    foundBy: userNicknameSchema.nullable(),
});

export const combinationAttributionBodySchema = z.object({
    userNickname: userNicknameSchema,
})

export const secretCombinationSchema = z.object({
    assetOne: z.string(),
    assetTwo: z.string().nullable(),
    assetThree: z.string().nullable(),
    assetFour: z.string().nullable(),
    sound: soundSchema,
});

export const secretStatusSchema = z.object({
    found: z.boolean(),
    foundBy: userNicknameSchema.nullable(),
    combination: secretCombinationSchema.nullable(),
});

export type CombinationStatus = z.infer<typeof combinationStatusSchema>;
export type CombinationAttributionBody = z.infer<typeof combinationAttributionBodySchema>;
export type Sound = z.infer<typeof soundSchema>;
export type SecretStatus = z.infer<typeof secretStatusSchema>;
export type SecretCombination = z.infer<typeof secretCombinationSchema>;