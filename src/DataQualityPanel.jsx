
import { useEffect, useState } from "react";
import { analyzeResponses } from "./dataQuality";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";





export default function DataQualityPanel() {
  const [responses, setResponses] = useState([]);
  const [demoMode, setDemoMode] = useState(false);
  
const [reviewDecisions, setReviewDecisions] = useState(() => {
  try {
    return JSON.parse(
      localStorage.getItem("clinova_review_decisions") || "{}"
    );
  } catch {
    return {};
  }
});

function updateReviewDecision(recordKey, decision) {
  const updated = {
    ...reviewDecisions,
    [recordKey]: decision,
  };

  setReviewDecisions(updated);

  localStorage.setItem(
    "clinova_review_decisions",
    JSON.stringify(updated)
  );
}

  
function createDemoData() {
  const demoResponses = [
    { code: "DEMO-001", symptom: "headache", severity: "moderate", language: "en" },
    { code: "DEMO-001", symptom: "nausea", severity: "mild", language: "hi" },
    { code: "DEMO-002", symptom: "none", severity: "severe", language: "gu" },
    { code: "DEMO-003", symptom: "", severity: "mild", language: "en" },
  ];

  localStorage.setItem(
    "clinova_test_responses",
    JSON.stringify(demoResponses)
  );

  setDemoMode(true);
  setResponses(demoResponses);
}


  
function loadResponses(useDemo = demoMode) {
  try {
    const key = useDemo
      ? "clinova_test_responses"
      : "clinova_responses";

    const saved = JSON.parse(
      localStorage.getItem(key) || "[]"
    );

    setResponses(Array.isArray(saved) ? saved : []);
  } catch {
    setResponses([]);
  }


  }

 
useEffect(() => {
  loadResponses(demoMode);
}, [demoMode]);


  const analyzed = analyzeResponses(responses);
  
const reviewStats = analyzed.reduce(
  (stats, response, index) => {
    const recordKey =
      `${demoMode ? "demo" : "original"}-${index}`;

    const decision =
      reviewDecisions[recordKey] || "pending";

    if (decision === "verified") {
      stats.verified += 1;
    } else if (decision === "excluded") {
      stats.excluded += 1;
    } else {
      stats.pending += 1;
    }

    return stats;
  },
  { pending: 0, verified: 0, excluded: 0 }
);


const reviewChartData = [
  { name: "Pending Review", value: reviewStats.pending },
  { name: "Verified", value: reviewStats.verified },
  { name: "Excluded", value: reviewStats.excluded },
];


const reviewChartColors = [
  "#f59e0b",
  "#078c92",
  "#ef4444",
];

const totalResponses = analyzed.length;

const reviewCompletionPercentage =
  totalResponses > 0
    ? (
        ((reviewStats.verified + reviewStats.excluded) /
          totalResponses) *
        100
      ).toFixed(1)
    : "0.0";

const flaggedPercentage =
  totalResponses > 0
    ? (
        (analyzed.filter((response) =>
          response.flags.length > 0
        ).length /
          totalResponses) *
        100
      ).toFixed(1)
    : "0.0";


function downloadResearchReport() {
  const headers = [
    "Enrollment Code",
    "Symptom",
    "Severity",
    "Quality Status",
    "Flag Reasons",
    "Review Decision",
  ];
  




  const rows = analyzed.map((response, index) => {
    const key = `${demoMode ? "demo" : "original"}-${index}`;
    const decision = reviewDecisions[key] || "pending";

    return [
      response.code || "Missing",
      response.symptom || "Missing",
      response.severity || "Missing",
      response.flags.length > 0 ? "Review Required" : "No Flags",
      response.flags.join("; ") || "None",
      decision,
    ];
  });

  const escapeCSV = (value) => {
    const text = String(value ?? "");
    const safe = /^[\s]*[=+\-@]/.test(text) ? "'" + text : text;
    return '"' + safe.replace(/"/g, '""') + '"';
  };

  const csv = [headers, ...rows]
    .map((row) => row.map(escapeCSV).join(","))
    .join("\r\n");

  const blob = new Blob(["\uFEFF", csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = demoMode
    ? "clinova-demo-research-report.csv"
    : "clinova-research-report.csv";

  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
function downloadPDFReport() {
  const doc = new jsPDF();

  const total = analyzed.length;
  const flagged = analyzed.filter(
    (response) => response.flags.length > 0
  ).length;

  const completion =
    total > 0
      ? (
          ((reviewStats.verified + reviewStats.excluded) /
            total) *
          100
        ).toFixed(1)
      : "0.0";

  // Report heading
  doc.setFontSize(20);
  doc.setTextColor(7, 140, 146);
  doc.text("CLINOVA AI", 14, 20);

  doc.setFontSize(14);
  doc.setTextColor(40, 50, 60);
  doc.text("Clinical Research Quality Report", 14, 30);

  doc.setFontSize(10);
  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    14,
    39
  );

  doc.text(
    `Dataset: ${demoMode ? "Synthetic Demo Data" : "Original Responses"}`,
    14,
    46
  );

  // Research statistics
  doc.setFontSize(12);
  doc.setTextColor(7, 140, 146);
  doc.text("Research Summary", 14, 59);

  doc.setFontSize(10);
  doc.setTextColor(40, 50, 60);

  doc.text(`Total Submissions: ${total}`, 14, 68);
  doc.text(`Flagged Responses: ${flagged}`, 14, 75);
  doc.text(`Review Completion: ${completion}%`, 14, 82);
  doc.text(`Pending Review: ${reviewStats.pending}`, 14, 89);
  doc.text(`Verified: ${reviewStats.verified}`, 14, 96);
  doc.text(`Excluded: ${reviewStats.excluded}`, 14, 103);

  // Researcher review table
  const tableRows = analyzed.map((response, index) => {
    const recordKey =
      `${demoMode ? "demo" : "original"}-${index}`;

    const decision =
      reviewDecisions[recordKey] || "pending";

    return [
      response.code || "Missing",
      response.symptom || "Missing",
      response.severity || "Missing",
      response.flags.length ? "Flagged" : "No Flags",
      response.flags.join("; ") || "None",
      decision,
    ];
  });

  autoTable(doc, {
    startY: 115,
    head: [[
      "Code",
      "Symptom",
      "Severity",
      "Quality",
      "Flag Reasons",
      "Review Decision",
    ]],
    body: tableRows,
    theme: "grid",
    styles: {
      fontSize: 8,
      cellPadding: 3,
      overflow: "linebreak",
    },
    headStyles: {
      fillColor: [7, 140, 146],
      textColor: 255,
    },
  });

  // Footer
  const pageCount = doc.getNumberOfPages();

  for (let page = 1; page <= pageCount; page++) {
    doc.setPage(page);
    doc.setFontSize(8);
    doc.setTextColor(110, 110, 110);
    doc.text(
      "Clinova AI | Research prototype - not a validated clinical report",
      14,
      doc.internal.pageSize.getHeight() - 12
    );
  }

  doc.save(
    demoMode
      ? "clinova-demo-research-report.pdf"
      : "clinova-research-report.pdf"
  );
}




  const flagged = analyzed.filter(
    (response) => response.flags.length > 0
  );

  const percentage = analyzed.length
    ? ((flagged.length / analyzed.length) * 100).toFixed(1)
    : "0.0";

  return (
    <section className="quality-panel">
      <h2>🛡️ Data Quality Monitoring</h2>
      <p>
        Rule-based checks identify records requiring
        researcher review.
      </p>
<button
  type="button"
  className="refresh-quality-btn"
  onClick={() => loadResponses()}
  >
  Refresh Quality Checks
</button>

<button
  type="button"
  onClick={() => setDemoMode(false)}
  >
  View Original Responses
</button>

<button 
  type="button" 
  onClick={createDemoData}
>
  Load Synthetic Test Data
</button>

<button
  type="button"
  className="download-report-btn"
  onClick={downloadResearchReport}
>
  📥 Download Research Report
</button>

<button
  type="button"
  className="download-report-btn"
  onClick={downloadPDFReport}
>
  📄 Download PDF Report
</button>




      <div className="quality-stats">
        <article>
          <h3>{analyzed.length}</h3>
          <p>Total Responses</p>
        </article>

        <article>
          <h3>{flagged.length}</h3>
          <p>Flagged Responses</p>
        </article>

        <article>
          <h3>{percentage}%</h3>
          <p>Requires Review</p>
        </article>
      </div>

      
<div className="review-chart-card">
  <h3>Researcher Review Progress</h3>
  <p>Distribution of researcher review decisions</p>

 
<p>
  Chart data:
  {reviewChartData.map((item) => (
    <span key={item.name}>
      {" "}{item.name}: {item.value} |
    </span>
  ))}
</p>

{reviewChartData.some((item) => item.value > 0) ? (

<>


<div style={{ width: "100%", height: 300 }}>
  <ResponsiveContainer width={300} height={300}>

        <PieChart>
          

          
<Pie
  data={reviewChartData.filter((item) => item.value > 0)}
  dataKey="value"
  nameKey="name"

           
cx="50%"
cy="45%"
innerRadius={0}
outerRadius={70}
paddingAngle={0}

          >
           
{reviewChartData
  .map((entry, index) => ({ ...entry, color: reviewChartColors[index] }))
  .filter((entry) => entry.value > 0)
  .map((entry) => (
    <Cell key={entry.name} fill={entry.color} />
  ))}

          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
    </> 

  ) : (
    <p>No review data available yet.</p>
  )}
</div>

<div className="research-summary">
  <h2>📋 Clinical Research Summary</h2>
  <p>Overview of questionnaire quality and researcher review progress</p>

  <div className="summary-grid">
    <article>
      <h3>{totalResponses}</h3>
      <p>Total Submissions</p>
    </article>

    <article>
      <h3>{flaggedPercentage}%</h3>
      <p>Flagged Responses</p>
    </article>

    <article>
      <h3>{reviewCompletionPercentage}%</h3>
      <p>Review Completion</p>
    </article>
  </div>

 

  <p>
    {reviewStats.verified} Verified ·{" "}
    {reviewStats.excluded} Excluded ·{" "}
    {reviewStats.pending} Pending
  </p>

  <p className="summary-note">
    Summary generated: {new Date().toLocaleString()}
  </p>

</div>
      <h3>Researcher Review Table</h3>
      
<div className="quality-stats review-stats">
  <article>
    <h3>{reviewStats.pending}</h3>
    <p>⏳ Pending Review</p>
  </article>

  <article>
    <h3>{reviewStats.verified}</h3>
    <p>✓ Verified</p>
  </article>

  <article>
    <h3>{reviewStats.excluded}</h3>
    <p>✕ Excluded</p>
  </article>
</div>


      <div className="quality-table-wrapper">
        <table className="quality-table">
          <thead>
            <tr>
              <th>Enrollment Code</th>
              <th>Symptom</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Review Decision</th>
            </tr>
          </thead>

          <tbody>
            {analyzed.map((response, index) => (
              <tr key={index}>
                <td>{response.code || "Missing"}</td>
                <td>{response.symptom || "Missing"}</td>
                <td>{response.severity || "Missing"}</td>
                <td>
                  {response.flags.length > 0
                    ? "⚠️ Review Required"
                    : "✓ No Flags"}
                </td>
                <td>
                  {response.flags.length > 0
                    ? response.flags.join(", ")
                    : "None"}
</td>
<td>
  <select
    value={
      reviewDecisions[
        `${demoMode ? "demo" : "original"}-${index}`
      ] || "pending"
    }
    onChange={(e) =>
      updateReviewDecision(
        `${demoMode ? "demo" : "original"}-${index}`,
        e.target.value
      )
    }
  >
    <option value="pending">Pending Review</option>
    <option value="verified">Verified</option>
    <option value="excluded">Excluded</option>
  </select>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {analyzed.length === 0 && (
        <p>No questionnaire responses found yet.</p>
      )}

      <p className="quality-note">
        A flag does not prove that a response is fabricated.
        All flagged submissions require human review.
      </p>
    </section>
  );
}
