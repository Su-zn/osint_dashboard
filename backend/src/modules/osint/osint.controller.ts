import { Request, Response } from "express";
import { analyzeDomain } from "./osint.service.js";
import { isValidDomain, normalizeDomain } from "./osint.utils.js";

function getDomainFromRequest(req: Request): string | undefined {
    const fromBody = (req.body as { domain?: unknown })?.domain;
    if (typeof fromBody === "string" && fromBody.trim()) {
        return fromBody;
    }

    const fromQuery = req.query.domain;
    if (typeof fromQuery === "string" && fromQuery.trim()) {
        return fromQuery;
    }

    return undefined;
}

export async function analyzeHandler(req: Request, res: Response): Promise<void> {
    try {
        const rawDomain = getDomainFromRequest(req);
        if (!rawDomain) {
            res.status(400).json({
                error: "Invalid Domain",
                message:
                    "Domain is required. Send JSON {\"domain\":\"example.com\"} with Content-Type: application/json, or use ?domain=example.com",
            });
            return;
        }

        const domain = normalizeDomain(rawDomain);
        if (!isValidDomain(domain)) {
            res.status(400).json({ error: "Invalid Domain", message: "Provide a valid domain name" });
            return;
        }

        const result = await analyzeDomain(domain);
        res.status(200).json(result);
    } catch {
        res.status(500).json({ error: "Analysis Failed", message: "Unable to analyze domain" });
    }
}