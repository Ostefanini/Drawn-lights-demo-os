import * as z from "zod";
import { userNicknameSchema } from "./user.js";

export const soundSchema = z.enum(["healing", "emerveille", "glossy", "none"]);

export const combinationStatusSchema = z.object({
    exist: z.boolean(),
    foundBy: userNicknameSchema.nullable(),
    isSecretCombinationFound: z.boolean(),
});

export const winningCombinationSchema = z.object({
    assetOne: z.string().min(1),
    assetTwo: z.string().min(1).nullable(),
    assetThree: z.string().min(1).nullable(),
    assetFour: z.string().min(1).nullable(),
    sound: z.string().min(1),
});

export const secretCombinationStatusSchema = z.object({
    found: z.boolean(),
    foundByNickname: userNicknameSchema.nullable(),
    winningCombination: winningCombinationSchema.nullable(),
});

export const emailSchema = z.string().email();

export const combinationAttributionBodySchema = z.object({
    userNickname: userNicknameSchema,
    email: emailSchema.optional(),
})

export type CombinationStatus = z.infer<typeof combinationStatusSchema>;
export type CombinationAttributionBody = z.infer<typeof combinationAttributionBodySchema>;
export type Sound = z.infer<typeof soundSchema>;
export type WinningCombination = z.infer<typeof winningCombinationSchema>;
export type SecretCombinationStatus = z.infer<typeof secretCombinationStatusSchema>;