
import ResearcherLogin from './ResearcherLogin';

import { supabase } from './supabaseClient';


import { useState } from "react";
import "./App.css";
import ResearchDashboard from "./ResearchDashboard";

import HypertensionQuestionnaire from "./HypertensionQuestionnaire";


import { Turnstile } from "@marsidev/react-turnstile";
import { jsPDF } from "jspdf";
import Chart from "chart.js/auto";








const hypertensionTranslations = {
  en: {
    title: "HYPERTENSION RESEARCH STUDY",
    heading: "Blood Pressure & Health Assessment",
    description: "Please answer based on your health history and recent blood pressure measurements.",
    select: "Select an answer",
    yes: "Yes",
    no: "No",
    unsure: "Not sure",
    q1: "1. Have you been diagnosed with hypertension?",
    q2: "2. Most recent systolic blood pressure (mmHg)",
    q3: "3. Most recent diastolic blood pressure (mmHg)",
    q4: "4. Which symptoms have you experienced recently?",
    q5: "5. How often do you monitor your blood pressure?",
    q6: "6. Are you currently taking medication for hypertension?",
    q7: "7. Which blood pressure medication are you taking?",
    q8: "8. How often have you missed your prescribed blood pressure medication in the past 7 days?",
    q9: "9. How long have you been receiving treatment?",
    q10: "10. How often do you eat high-salt foods?",
    q11: "11. On how many days per week do you exercise?",
    q12: "12. Do you have a family history of hypertension?",
    q13: "13. Have you been diagnosed with any of these conditions?",
    q14: "14. How much does your health affect your daily activities?",
    symptoms: ["Headache", "Dizziness", "Blurred vision", "Palpitations", "No symptoms"],
    symptomValues: ["Headache", "Dizziness", "Blurred vision", "Palpitations", "No symptoms"],
    monitoring: ["Daily", "Weekly", "Occasionally", "Never"],
    medications: ["Amlodipine", "Losartan", "Telmisartan", "Enalapril", "Metoprolol", "Other / Multiple medications", "Don't know"],
    missed: ["Never", "1–2 days", "3–4 days", "5–7 days"],
    duration: ["Less than 6 months", "6–12 months", "1–5 years", "More than 5 years"],
    salt: ["Daily", "Several times a week", "Rarely", "Never"],
    family: ["Yes", "No", "Not sure"],
    conditions: ["Diabetes", "Kidney disease", "Heart disease", "None"],
    activities: ["Not at all", "Slightly", "Moderately", "Severely"],
    disclaimer: "Research questionnaire only. Symptoms alone cannot diagnose hypertension. Blood pressure measurements and clinical assessment are required."
  },

  hi: {
    title: "उच्च रक्तचाप अनुसंधान अध्ययन",
    heading: "रक्तचाप और स्वास्थ्य मूल्यांकन",
    description: "कृपया अपने स्वास्थ्य इतिहास और हाल की रक्तचाप माप के आधार पर उत्तर दें।",
    select: "उत्तर चुनें",
    yes: "हाँ",
    no: "नहीं",
    unsure: "पता नहीं",
    q1: "1. क्या आपको उच्च रक्तचाप का निदान हुआ है?",
    q2: "2. हाल का सिस्टोलिक रक्तचाप (mmHg)",
    q3: "3. हाल का डायस्टोलिक रक्तचाप (mmHg)",
    q4: "4. हाल में आपको कौन से लक्षण हुए हैं?",
    q5: "5. आप कितनी बार अपना रक्तचाप मापते हैं?",
    q6: "6. क्या आप उच्च रक्तचाप की दवा ले रहे हैं?",
    q7: "7. आप रक्तचाप की कौन सी दवा लेते हैं?",
    q8: "8. पिछले 7 दिनों में आपने निर्धारित रक्तचाप की दवा कितने दिनों नहीं ली?",
    q9: "9. आपका उपचार कितने समय से चल रहा है?",
    q10: "10. आप अधिक नमक वाला भोजन कितनी बार खाते हैं?",
    q11: "11. आप सप्ताह में कितने दिन व्यायाम करते हैं?",
    q12: "12. क्या आपके परिवार में किसी को उच्च रक्तचाप है?",
    q13: "13. क्या आपको इनमें से किसी बीमारी का निदान हुआ है?",
    q14: "14. आपकी स्वास्थ्य स्थिति आपकी दैनिक गतिविधियों को कितना प्रभावित करती है?",
    symptoms: ["सिरदर्द", "चक्कर आना", "धुंधला दिखना", "दिल की धड़कन महसूस होना", "कोई लक्षण नहीं"],
    monitoring: ["रोज़", "हर सप्ताह", "कभी-कभी", "कभी नहीं"],
    medications: ["एम्लोडिपिन", "लोसार्टन", "टेल्मिसार्टन", "एनालाप्रिल", "मेटोप्रोलोल", "अन्य / कई दवाएँ", "पता नहीं"],
    missed: ["कभी नहीं", "1–2 दिन", "3–4 दिन", "5–7 दिन"],
    duration: ["6 महीने से कम", "6–12 महीने", "1–5 वर्ष", "5 वर्ष से अधिक"],
    salt: ["रोज़", "सप्ताह में कई बार", "कभी-कभार", "कभी नहीं"],
    family: ["हाँ", "नहीं", "पता नहीं"],
    conditions: ["मधुमेह", "गुर्दे की बीमारी", "हृदय रोग", "कोई नहीं"],
    activities: ["बिल्कुल नहीं", "थोड़ा", "मध्यम", "बहुत अधिक"],
    disclaimer: "यह केवल अनुसंधान प्रश्नावली है। केवल लक्षणों से उच्च रक्तचाप का निदान नहीं किया जा सकता। रक्तचाप माप और चिकित्सकीय मूल्यांकन आवश्यक हैं।"
  },

  gu: {
    title: "હાઈ બ્લડ પ્રેશર સંશોધન અભ્યાસ",
    heading: "બ્લડ પ્રેશર અને આરોગ્ય મૂલ્યાંકન",
    description: "કૃપા કરીને તમારા આરોગ્ય ઇતિહાસ અને તાજેતરના બ્લડ પ્રેશરના માપના આધારે જવાબ આપો.",
    select: "જવાબ પસંદ કરો",
    yes: "હા",
    no: "ના",
    unsure: "ખબર નથી",
    q1: "1. શું તમને હાઈ બ્લડ પ્રેશર હોવાનું નિદાન થયું છે?",
    q2: "2. તાજેતરનું સિસ્ટોલિક બ્લડ પ્રેશર (mmHg)",
    q3: "3. તાજેતરનું ડાયસ્ટોલિક બ્લડ પ્રેશર (mmHg)",
    q4: "4. તાજેતરમાં તમને કયા લક્ષણો અનુભવાયા છે?",
    q5: "5. તમે કેટલી વાર તમારું બ્લડ પ્રેશર માપો છો?",
    q6: "6. શું તમે હાઈ બ્લડ પ્રેશરની દવા લો છો?",
    q7: "7. તમે બ્લડ પ્રેશરની કઈ દવા લો છો?",
    q8: "8. છેલ્લા 7 દિવસમાં તમે સૂચવેલી બ્લડ પ્રેશરની દવા કેટલા દિવસ લીધી નથી?",
    q9: "9. તમારી સારવાર કેટલા સમયથી ચાલી રહી છે?",
    q10: "10. તમે વધુ મીઠાવાળો ખોરાક કેટલી વાર ખાઓ છો?",
    q11: "11. તમે અઠવાડિયામાં કેટલા દિવસ કસરત કરો છો?",
    q12: "12. શું તમારા પરિવારમાં કોઈને હાઈ બ્લડ પ્રેશર છે?",
    q13: "13. શું તમને આમાંથી કોઈ રોગનું નિદાન થયું છે?",
    q14: "14. તમારી આરોગ્યની સ્થિતિ તમારી રોજિંદી પ્રવૃત્તિઓને કેટલી અસર કરે છે?",
    symptoms: ["માથાનો દુખાવો", "ચક્કર આવવા", "ઝાંખું દેખાવું", "હૃદયના ધબકારા અનુભવાવા", "કોઈ લક્ષણ નથી"],
    monitoring: ["દરરોજ", "દર અઠવાડિયે", "ક્યારેક", "ક્યારેય નહીં"],
    medications: ["એમ્લોડિપિન", "લોસાર્ટન", "ટેલ્મિસાર્ટન", "એનાલાપ્રિલ", "મેટોપ્રોલોલ", "અન્ય / ઘણી દવાઓ", "ખબર નથી"],
    missed: ["ક્યારેય નહીં", "1–2 દિવસ", "3–4 દિવસ", "5–7 દિવસ"],
    duration: ["6 મહિનાથી ઓછો સમય", "6–12 મહિના", "1–5 વર્ષ", "5 વર્ષથી વધુ"],
    salt: ["દરરોજ", "અઠવાડિયામાં ઘણી વાર", "ભાગ્યે જ", "ક્યારેય નહીં"],
    family: ["હા", "ના", "ખબર નથી"],
    conditions: ["ડાયાબિટીસ", "કિડનીનો રોગ", "હૃદયરોગ", "કોઈ નહીં"],
    activities: ["બિલકુલ નહીં", "થોડી", "મધ્યમ", "ઘણી વધારે"],
    disclaimer: "આ ફક્ત સંશોધન પ્રશ્નાવલી છે. માત્ર લક્ષણોથી હાઈ બ્લડ પ્રેશરનું નિદાન થઈ શકતું નથી. બ્લડ પ્રેશરનું માપ અને તબીબી મૂલ્યાંકન જરૂરી છે."
  }
};

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [page, setPage] = useState("home");
  
const [turnstileToken, setTurnstileToken] = useState("");

  
const [researcherUser, setResearcherUser] = useState(null);

const [language, setLanguage] = useState("en");
const [surveyCode, setSurveyCode] = useState("");
const [symptom, setSymptom] = useState("");
const [severity, setSeverity] = useState("");

const [hypertension, setHypertension] = useState({
  diagnosed: "",
  systolic: "",
  diastolic: "",
  symptoms: [],
  monitoring: "",
  medication: "",
});

const [newQuestionnaireAnswers, setNewQuestionnaireAnswers] = useState({});

function updateHypertension(field, value) {
  setHypertension((previous) => ({
    ...previous,
    [field]: value,
  }));
}

function toggleHypertensionSymptom(symptom) {
  setHypertension((previous) => ({
    ...previous,
    symptoms: previous.symptoms.includes(symptom)
      ? previous.symptoms.filter((item) => item !== symptom)
      : symptom === "No symptoms"
        ? ["No symptoms"]
        : [
            ...previous.symptoms.filter(
              (item) => item !== "No symptoms"
            ),
            symptom,
          ],
  }));
}


const translations = {
  en: {
    title: "Patient Health Questionnaire",
    code: "Enrollment Code",
    symptom: "Which symptom are you experiencing?",
    severity: "How severe is your symptom?",
    choose: "Select an option",
    submit: "Submit Questionnaire",
    headache: "Headache",
    nausea: "Nausea",
    dizziness: "Dizziness",
    none: "No symptoms",
    mild: "Mild",
    moderate: "Moderate",
    severe: "Severe",
  },
  hi: {
    title: "रोगी स्वास्थ्य प्रश्नावली",
    code: "नामांकन कोड",
    symptom: "आपको कौन सा लक्षण महसूस हो रहा है?",
    severity: "आपका लक्षण कितना गंभीर है?",
    choose: "एक विकल्प चुनें",
    submit: "प्रश्नावली जमा करें",
    headache: "सिरदर्द",
    nausea: "मतली",
    dizziness: "चक्कर आना",
    none: "कोई लक्षण नहीं",
    mild: "हल्का",
    moderate: "मध्यम",
    severe: "गंभीर",
  },
  gu: {
    title: "દર્દી આરોગ્ય પ્રશ્નાવલી",
    code: "નોંધણી કોડ",
    symptom: "તમને કયું લક્ષણ અનુભવાય છે?",
    severity: "તમારું લક્ષણ કેટલું ગંભીર છે?",
    choose: "વિકલ્પ પસંદ કરો",
    submit: "પ્રશ્નાવલી સબમિટ કરો",
    headache: "માથાનો દુખાવો",
    nausea: "ઉબકા",
    dizziness: "ચક્કર આવવા",
    none: "કોઈ લક્ષણ નથી",
    mild: "હળવું",
    moderate: "મધ્યમ",
    severe: "ગંભીર",
  },
};

const t = translations[language];
const ht = hypertensionTranslations[language] || hypertensionTranslations.en;

async function submitSurvey(e) {
  e.preventDefault();

  const code = surveyCode.trim().toUpperCase();

  const participants = JSON.parse(
    localStorage.getItem("clinova_participants") || "[]"
  );

  const responses = JSON.parse(
    localStorage.getItem("clinova_responses") || "[]"
  );

  if (!participants.includes(code)) {
    alert("Please register this enrollment code first.");
    return;
  }

  if (responses.some((response) => response.code === code)) {
    alert("A questionnaire has already been submitted for this code.");
    return;
  }

 
const newResponse = {
  code,
  symptom,
  severity,
  language,
  disease: "Hypertension",
  
hypertension: {
  ...hypertension,
  ...newQuestionnaireAnswers,
},

  

    submittedAt: new Date().toISOString(),
  };
async function saveResponseOnline(response) {
  const { error } = await supabase
    .from('research_responses')
    .insert({
      enrollment_code: response.code,
      language: response.language,
      disease: response.disease,
      symptom: response.symptom || null,
      severity: response.severity || null,
      hypertension: response.hypertension
    });

  if (error) {
    throw error;
  }
}
console.log("Questionnaire prepared for online submission:", {
  code: newResponse.code,
  language: newResponse.language,
  disease: newResponse.disease,
});
  localStorage.setItem(
    "clinova_responses",
    JSON.stringify([...responses, newResponse])
  );
const participantName =
  localStorage.getItem("clinova_participant_name_" + code) ||
  "Participant";

const doc = new jsPDF();
// CLINOVA AI - Premium Report Header
doc.setFillColor(20, 45, 90);
doc.rect(0, 0, 210, 38, "F");

doc.setFillColor(20, 184, 166);
doc.rect(0, 38, 210, 3, "F");

doc.setTextColor(255, 255, 255);
doc.setFont("helvetica", "bold");
doc.setFontSize(24);
doc.text("CLINOVA AI", 20, 19);

doc.setFont("helvetica", "normal");
doc.setFontSize(11);
doc.text("Personalized Hypertension Research Report", 20, 29);

// Reset text colour
doc.setTextColor(35, 50, 70);
const systolic = Number(newResponse.hypertension.systolic);
const diastolic = Number(newResponse.hypertension.diastolic);

if (
  Number.isFinite(systolic) &&
  Number.isFinite(diastolic) &&
  systolic > 0 &&
  diastolic > 0
) {
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 450;

  const chart = new Chart(canvas, {
    type: "bar",
    data: {
      labels: ["Systolic BP", "Diastolic BP"],
      datasets: [
        {
          label: "Blood Pressure (mmHg)",
          data: [systolic, diastolic],
          backgroundColor: ["#14B8A6", "#6366F1"],
          borderRadius: 12,
          barThickness: 90,
        },
      ],
    },
    options: {
      responsive: false,
      animation: false,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: "Blood Pressure Measurements",
          font: { size: 22 },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "mmHg",
          },
        },
      },
    },
  });

  chart.update();

  const graphImage = canvas.toDataURL("image/png");

  doc.addPage();
  doc.setFontSize(16);
  doc.setTextColor(20, 80, 110);
  doc.text("Blood Pressure Bar Graph", 20, 25);
  doc.addImage(graphImage, "PNG", 15, 40, 180, 105);

  chart.destroy();
}
doc.setPage(1); 


doc.setFontSize(11);
// Participant information
doc.setFont("helvetica", "bold");
doc.setFontSize(13);
doc.setTextColor(20, 45, 90);
doc.text("PARTICIPANT INFORMATION", 20, 54);

doc.setFillColor(238, 247, 252);
doc.roundedRect(15, 60, 180, 37, 4, 4, "F");

doc.setFont("helvetica", "normal");
doc.setFontSize(11);
doc.setTextColor(35, 50, 70);

doc.text(`Participant Name: ${participantName}`, 22, 70);
doc.text(`Enrollment Code: ${code}`, 22, 80);
doc.text(`Date: ${new Date().toLocaleDateString()}`, 22, 90);

let y = 110;
// Blood Pressure Summary
doc.setFont("helvetica", "bold");
doc.setFontSize(13);
doc.setTextColor(20, 45, 90);
doc.text("BLOOD PRESSURE SUMMARY", 20, 110);

// Systolic BP card
doc.setFillColor(225, 248, 245);
doc.roundedRect(15, 118, 85, 34, 5, 5, "F");

doc.setTextColor(15, 118, 110);
doc.setFontSize(11);
doc.text("SYSTOLIC BP", 22, 128);

doc.setFontSize(19);
doc.text(`${systolic} mmHg`, 22, 143);

// Diastolic BP card
doc.setFillColor(238, 235, 255);
doc.roundedRect(110, 118, 85, 34, 5, 5, "F");

doc.setTextColor(95, 75, 190);
doc.setFontSize(11);
doc.text("DIASTOLIC BP", 117, 128);

doc.setFontSize(19);
doc.text(`${diastolic} mmHg`, 117, 143);

// Start questionnaire answers below the cards
doc.setTextColor(35, 50, 70);
doc.setFont("helvetica", "normal");
y = 165;

  // Questionnaire responses heading
doc.setFont("helvetica", "bold");
doc.setFontSize(13);
doc.setTextColor(20, 45, 90);
doc.text("QUESTIONNAIRE RESPONSES", 20, y);

doc.setFont("helvetica", "normal");
doc.setFontSize(10);
doc.setTextColor(35, 50, 70);

y += 12;
const answers = {
  ...newResponse.hypertension,
  Symptom: newResponse.symptom || "Not provided",
  Severity: newResponse.severity || "Not provided",
};

Object.entries(answers).forEach(([question, answer], index) => {
  const value = Array.isArray(answer)
    ? answer.join(", ")
    : String(answer ?? "Not provided");

  const questionLines = doc.splitTextToSize(
    String(question).replace(/([a-z])([A-Z])/g, "$1 $2"),
    155
  );

  const answerLines = doc.splitTextToSize(value, 155);

  const cardHeight =
    14 + questionLines.length * 5 + answerLines.length * 5;

  // Create a new page when necessary
  if (y + cardHeight > 270) {
    doc.addPage();
    y = 20;
  }

  // Alternating pastel card backgrounds
  if (index % 2 === 0) {
    doc.setFillColor(235, 247, 252);
  } else {
    doc.setFillColor(242, 238, 255);
  }

  doc.roundedRect(15, y, 180, cardHeight, 4, 4, "F");

  // Question title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(20, 45, 90);
  doc.text(questionLines, 22, y + 9);

  // Participant's answer
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(65, 75, 95);
  doc.text(
    answerLines,
    22,
    y + 11 + questionLines.length * 5
  );

  y += cardHeight + 5;
});

// Add a new page if the disclaimer will not fit
if (y + 22 > 280) {
  doc.addPage();
  y = 20;
}

// Professional disclaimer footer
doc.setDrawColor(20, 184, 166);
doc.setLineWidth(0.6);
doc.line(20, y + 2, 190, y + 2);

doc.setFont("helvetica", "italic");
doc.setFontSize(9);
doc.setTextColor(100, 110, 125);

doc.text(
  "Research questionnaire summary only. Not a medical diagnosis.",
  20,
  y + 12
);

doc.save(`Clinova_Hypertension_Report_${code}.pdf`);
  alert("Questionnaire submitted successfully!");
  setSurveyCode("");
  setSymptom("");
  setSeverity("");
}


  return (
    <div className="app"> 
{showWelcome ? (
  <div className="clinova-welcome-screen">
    <div className="clinova-welcome-content">
      <h1>CLINOVA AI</h1>
      <p>THE FUTURE OF HEALTHCARE</p>

      <button
        type="button"
        className="clinova-welcome-fingerprint"
        onClick={() => {
          setPage("home");
          setShowWelcome(false);
        }}
        aria-label="Open patient registration"
      >
        <svg
          width="110"
          height="110"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 11a2 2 0 0 0-2 2c0 3-.4 5.5-1.5 8" />
          <path d="M14 13c0 3-.2 5.5-1 8" />
          <path d="M8 16c-.1 1.7-.4 3.4-1 5" />
          <path d="M16 16c0 1.7-.1 3.4-.5 5" />
          <path d="M6 13a6 6 0 0 1 12 0v2" />
          <path d="M4 15v-2a8 8 0 0 1 16 0v2" />
          <path d="M12 7a6 6 0 0 1 6 6" />
        </svg>
        <span className="clinova-welcome-scanline" />
      </button>

      <p className="clinova-welcome-hint">
        TOUCH TO ENTER
      </p>
    </div>
  </div>
) : (
  <>


{page === "home" && (
  <section className="clinova-heart-section">
  <h2>Explore the Human Heart</h2>
  <p>Interactive 3D cardiovascular experience</p>

  <div className="clinova-heart-viewer">
    <iframe
      title="Animated Human Heart"
      src="https://sketchfab.com/models/775d6629622740de8a5ed61a959c7506/embed?autostart=1"
      width="100%"
      height="450"
      style={{ border: "none", borderRadius: "20px" }}
      allow="autoplay; fullscreen; xr-spatial-tracking"
      allowFullScreen
    />
  </div>
</section>
)}


      <header className="navbar">
        <div className="logo">
  <span className="logo-icon">✚</span>
  <span className="logo-name">
    clinova<span className="logo-accent">.ai</span>
  </span>
</div>
        <nav>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("patient")}>Patient Portal</button>
          
<button onClick={() => setPage("survey")}>
  Questionnaire
</button>

          <button onClick={() => setPage("researcher")}>Researcher</button>
        </nav>
      </header>

      {page === "home" && (
        <main className="hero">
          <div className="eyebrow">AI-POWERED CLINICAL RESEARCH</div>
          <h1>Smarter Data. Stronger Research.</h1>
          <p>
            A platform for secure participant enrollment,
            multilingual clinical surveys, research data
            quality monitoring, and intelligent analytics.
          </p>

          <div className="actions">
            <button onClick={() => setPage("patient")}>
              Patient Portal
            </button>
            <button onClick={() => setPage("researcher")}>
              Researcher Dashboard
            </button>
          </div>

          <div className="features">
            <article>
              🔐
              <h3>Secure Enrollment</h3>
              <p>Study-specific participant access.</p>
            </article>
            <article>
              🌐
              <h3>Multilingual Surveys</h3>
              <p>English, Hindi and Gujarati.</p>
            </article>
            <article>
              🛡️
              <h3>Data Integrity</h3>
              <p>Flag suspicious submissions for review.</p>
            </article>
            <article>
              📊
              <h3>Smart Analytics</h3>
              <p>Visualize clinical research trends.</p>
            </article>
          </div>
        </main>
      )}

      
{page === "patient" && (
  <main className="panel">
    <h1>Patient Registration</h1>
    <p>Welcome to the Clinova AI Participant Portal.</p>

    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const code = e.target.elements.studyCode.value
          .trim()
          .toUpperCase();
          const participantName = e.target.elements.participantName.value.trim();

if (!participantName) {
  alert("Please enter your full name.");
  return;
}

        
if (!turnstileToken) {
  alert("Please complete the security verification first.");
  return;
}

try {
  const { data, error } = await supabase.functions.invoke(
    "register-participant",
    {
      body: {
        enrollment_code: code,
        turnstile_token: turnstileToken,
      },
    }
  );

 
if (error) {
  console.error("Registration error:", error);

  if (error.context?.status === 409) {
    alert("This enrollment code is already registered.");
  } else {
    alert("Registration failed. Please try again.");
  }

  return;
}

  

  if (data?.error) {
    alert(data.error);
    return;
  }

  if (data?.registered !== true) {
    alert("Registration could not be confirmed.");
    return;
  }

  // Keep the existing questionnaire working locally for now.
  const existing = JSON.parse(
    localStorage.getItem("clinova_participants") || "[]"
  );

  if (!existing.includes(code)) {
    localStorage.setItem(
      "clinova_participants",
      JSON.stringify([...existing, code])
    );
  }
localStorage.setItem(
  "clinova_participant_name_" + code,
  participantName
);
  alert("Participant registered successfully!");
  e.target.reset();
  setTurnstileToken("");
} catch (err) {
  console.error("Registration error:", err);
  alert("Unable to register. Please try again.");
}

      }}
    >
      <label htmlFor="participantName">Full Name</label>
<input
  type="text"
  id="participantName"
  name="participantName"
  placeholder="Enter your full name"
  maxLength={100}
  required
/>
      <input
        name="studyCode"
        placeholder="Enter study enrollment code"
        required
      />

      <p>
        <label>
          <input type="checkbox" required />
          I agree to participate in this demo research study.
        </label>
      </p>

<Turnstile
  siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
  onSuccess={(token) => {
    console.log("Turnstile token received:", Boolean(token));
    setTurnstileToken(token);
     }}
  onExpire={() => setTurnstileToken("")}
  onError={() => setTurnstileToken("")}
/>

      <button type="submit">Register Participant</button>
    </form>
  </main>
)}

      

{page === "survey" && (
  <main className="panel">
    <div className="survey-card">
      <h1>{t.title}</h1>

      <label htmlFor="language">Choose Language / भाषा / ભાષા</label>
      <select
        id="language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
        <option value="gu">ગુજરાતી</option>
      </select>

      <form onSubmit={submitSurvey}>
        <label htmlFor="surveyCode">{t.code}</label>
        <input
          id="surveyCode"
          value={surveyCode}
          onChange={(e) => setSurveyCode(e.target.value)}
          placeholder="CLN-1001"
          required
        />

        <label htmlFor="symptom">{t.symptom}</label>
        <select
          id="symptom"
          value={symptom}
          onChange={(e) => setSymptom(e.target.value)}
          required
        >
          <option value="">{t.choose}</option>
          <option value="headache">{t.headache}</option>
          <option value="nausea">{t.nausea}</option>
          <option value="dizziness">{t.dizziness}</option>
          <option value="none">{t.none}</option>
        </select>

        <label htmlFor="severity">{t.severity}</label>
        <select
          id="severity"
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          required
        >
          <option value="">{t.choose}</option>
          <option value="mild">{t.mild}</option>
          <option value="moderate">{t.moderate}</option>
          <option value="severe">{t.severe}</option>
        </select>


<HypertensionQuestionnaire
  language={language}
  answers={newQuestionnaireAnswers}
  onAnswersChange={setNewQuestionnaireAnswers}
/>


<section className="hypertension-section">
  
<div className="hypertension-heading">
  <span>♥ {ht.title}</span>
  <h2>{ht.heading}</h2>
  <p>{ht.description}</p>
</div>


  <div className="hypertension-field">
    
<label htmlFor="htn-diagnosis">
  {ht.q1}
</label>

    <select
      id="htn-diagnosis"
      value={hypertension.diagnosed}
      onChange={(e) =>
        updateHypertension("diagnosed", e.target.value)
      }
      required
    >
<option value="">{ht.select}</option>
<option value="Yes">{ht.yes}</option>
<option value="No">{ht.no}</option>
<option value="Not sure">{ht.unsure}</option>

    </select>
  </div>

  <div className="hypertension-field">
   
<label htmlFor="htn-systolic">
  {ht.q2}
</label>

    <input
      id="htn-systolic"
      type="number"
      min="50"
      max="300"
      placeholder={`${language === "gu" ? "ઉદાહરણ" : language === "hi" ? "उदाहरण" : "Example"}: 140`}
      value={hypertension.systolic}
      onChange={(e) =>
        updateHypertension("systolic", e.target.value)
      }
    />
  </div>

  <div className="hypertension-field">
    
<label htmlFor="htn-diastolic">
  {ht.q3}
</label>

    <input
      id="htn-diastolic"
      type="number"
      min="30"
      max="200"
      placeholder={`${language === "gu" ? "ઉદાહરણ" : language === "hi" ? "उदाहरण" : "Example"}: 90`}
      value={hypertension.diastolic}
      onChange={(e) =>
        updateHypertension("diastolic", e.target.value)
      }
    />
  </div>

  <div className="hypertension-field">
    
<label>
  {ht.q4}
</label>


    <div className="hypertension-checkboxes">
      {[
        "Headache",
        "Dizziness",
        "Blurred vision",
        "Palpitations",
        "No symptoms",
      ].map((symptom) => (
        <label key={symptom} className="htn-checkbox">
          <input
            type="checkbox"
            checked={hypertension.symptoms.includes(symptom)}
            onChange={() =>
              toggleHypertensionSymptom(symptom)
            }
          />
          
<span>
  {ht.symptoms[
    [
      "Headache",
      "Dizziness",
      "Blurred vision",
      "Palpitations",
      "No symptoms"
    ].indexOf(symptom)
  ]}
</span>

        </label>
      ))}
    </div>
  </div>

  <div className="hypertension-field">
    
<label htmlFor="htn-monitoring">
  {ht.q5}
</label>

    <select
      id="htn-monitoring"
      value={hypertension.monitoring}
      onChange={(e) =>
        updateHypertension("monitoring", e.target.value)
      }
    >
      
<option value="">{ht.select}</option>
<option value="Daily">{ht.monitoring[0]}</option>
<option value="Weekly">{ht.monitoring[1]}</option>
<option value="Occasionally">{ht.monitoring[2]}</option>
<option value="Never">{ht.monitoring[3]}</option>

    </select>
  </div>

  <div className="hypertension-field">
    
<label htmlFor="htn-medication">
  {ht.q6}
</label>

    <select
      id="htn-medication"
      value={hypertension.medication}
      onChange={(e) =>
        updateHypertension("medication", e.target.value)
      }
    >
      
<option value="">{ht.select}</option>
<option value="Yes">{ht.yes}</option>
<option value="No">{ht.no}</option>
<option value="Not sure">{ht.unsure}</option>

    </select>
  </div>

  <p className="hypertension-disclaimer">
    Research questionnaire only. Symptoms alone cannot
    diagnose hypertension. Blood pressure measurements
    and clinical assessment are required.
  </p>
</section>

       <button type="submit">{t.submit}</button>
      </form>
    </div>
  </main>
)}
{/* Researcher Dashboard */}
{page === "researcher" && (
  <ResearchDashboard />
)}

      




        
      

      <footer>
        Clinova AI • Research prototype • Not clinically certified
      </footer>
      </>
)}
    </div>
  );
}
