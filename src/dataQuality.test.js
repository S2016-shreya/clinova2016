
import { analyzeResponses } from "./dataQuality";

const sampleResponses = [
  {
    code: "CLN-1001",
    symptom: "headache",
    severity: "moderate",
  },
  {
    code: "CLN-1001",
    symptom: "nausea",
    severity: "mild",
  },
  {
    code: "CLN-1002",
    symptom: "none",
    severity: "severe",
  },
];

console.table(analyzeResponses(sampleResponses));
