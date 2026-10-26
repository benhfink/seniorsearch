import Anthropic from "@anthropic-ai/sdk";
import { readFile } from "fs/promises";
import path from "path";

const client = new Anthropic();

const SYSTEM_PROMPT = "You have just received a JSON file of services and a question. You must look through each service and score it on how well it is a fit as a solution to that question. Then, take the top 6 ranked services. For each one, generate a one-sentence description of how the person asking the question can utilize that service to solve their problem. Return just a JSON file that is organized like this: [{\"id\": \"\", \"name\": \"\", \"organization\": \"\", \"category\": \"\", \"description\": \"\", \"eligibility\": \"\", \"cost\": \"\", \"hours\": \"\", \"address\": \"\", \"phone\": \"\", \"website\": \"\", \"how_to_use\": \"\", \"emergency: \"\"}]. The array must contain up to 6 objects ordered from best fit to worst fit. Do not include objects that do not fit the question. If no objects fit the question, return an empty file. Copy every field except how_to_use exactly as it appears in the services file, and put your one-sentence description in how_to_use. If you believe that the question indicates an emergency, set the emergency boolean to true, otherwise set it false. Questions might not necessarily have the name of the program or result in them. You need to think critically about which fir the answer best.";

const fields = ["id", "name", "organization", "category", "description", "eligibility", "cost", "hours", "address", "phone", "website", "how_to_use"];

const RESULTS_SCHEMA = {
    type: "object",
    properties: {
        results: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    ...Object.fromEntries(fields.map((field) => [field, { type: "string" }])),
                    emergency: { type: "boolean" },
                },
                required: [...fields, "emergency"],
                additionalProperties: false,
            },
        },
    },
    required: ["results"],
    additionalProperties: false,
};

export async function POST(request: Request) {
    const { query } = await request.json();
    const services = await readFile(path.join(process.cwd(), "public/data/master_senior_services.json"), "utf-8");

    const response = await client.messages.create({
        model: "claude-sonnet-5-5",
        max_tokens: 16000,
        system: [
            ...(SYSTEM_PROMPT ? [{ type: "text" as const, text: SYSTEM_PROMPT }] : []),
            { type: "text", text: services, cache_control: { type: "ephemeral" } },
        ],
        messages: [{ role: "user", content: query }],
        output_config: { format: { type: "json_schema", schema: RESULTS_SCHEMA } },
    });

    const text = response.content.find((block) => block.type === "text")?.text ?? "{}";
    let results = [];
    try {
        results = JSON.parse(text).results ?? [];
    } catch {}
    //verfiy that the services the model returned actuallye xist, if not get rid of tehm and get rid of emergency banner
    const servicesList = JSON.parse(services);
    const verifiedResults = results
        .map((result: any) => {
            const service = servicesList.find((service: any) => service.id === result.id);
            return service && { ...service, how_to_use: result.how_to_use, emergency: result.emergency };
        })
        .filter(Boolean);

    return Response.json({ results: verifiedResults });
}
