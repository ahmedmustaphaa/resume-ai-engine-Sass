import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.OPEN_API_KEY)

export const ai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});