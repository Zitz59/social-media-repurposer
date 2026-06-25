import {z} from "zod";

export const dataSchema = z.object({
    summary: z.string().min(10).max(1500),
    linkedinPost: z.string().min(10).max(5000),
    twitterPost: z.string().min(10).max(3000),
    youtubeDescription: z.string().min(10).max(5000),
})

export type GeneratedContent = z.infer<typeof dataSchema>