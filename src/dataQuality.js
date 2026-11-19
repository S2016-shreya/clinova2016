
export function analyzeResponses(responses) {
  const seenCodes = new Set();

  return responses.map((response, index) => {
    const flags = [];
    const code = String(response.code || "")
      .trim()
      .toUpperCase();

    // Rule 1: Missing enrollment code
    if (!code) {
      flags.push("Missing enrollment code");
    }

    // Rule 2: Repeated enrollment code
    if (code && seenCodes.has(code)) {
      flags.push("Duplicate enrollment code");
    }
    if (code) seenCodes.add(code);

    // Rule 3: Missing questionnaire answers
    if (!response.symptom || !response.severity) {
      flags.push("Incomplete questionnaire");
    }

    // Rule 4: Invalid severity value
    if (
      response.severity &&
      !["mild", "moderate", "severe"].includes(
        response.severity
      )
    ) {
      flags.push("Invalid severity value");
    }

    // Rule 5: Check for conflicting answers
    // This is only a demo rule, not a clinical judgment.
    if (
      response.symptom === "none" &&
      response.severity === "severe"
    ) {
      flags.push("Possible answer inconsistency");
    }

    return {
      ...response,
      recordNumber: index + 1,
      flags,
      status: flags.length > 0 ? "Review Required" : "No Flags",
    };
  });
}
