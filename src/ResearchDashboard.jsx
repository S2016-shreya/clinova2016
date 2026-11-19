import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import './ResearchDashboard.css';

import { analyzeResponses } from "./dataQuality";
import DataQualityPanel from "./DataQualityPanel";

import { supabase } from './supabaseClient';


const SYMPTOMS = ['headache', 'nausea', 'dizziness', 'none'];
const SEVERITIES = ['mild', 'moderate', 'severe'];
const COLORS = ['#0c929a', '#5d7be8', '#f2a65a', '#9da9bb'];
const titleCase = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function readResponses() {
  try {
    const saved = JSON.parse(localStorage.getItem('clinova_responses') || '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
    
async function fetchOnlineResponses() {
  const { data, error } = await supabase
    .from('research_responses')
    .select('*')
    .order('submitted_at', { ascending: false });

  if (error) {
    console.error('Unable to load research responses:', error.message);
    return null;
  }

  return data ?? [];
}

  }
}

export default function ResearchDashboard() {
  const [responses, setResponses] = useState(readResponses);
  const refresh = () => setResponses(readResponses());
  
  // Hypertension Research Analytics
  const hypertensionResponses = responses.filter(
    (response) =>
      response.disease === "Hypertension" &&
      response.hypertension
  );

  const hypertensionCount = hypertensionResponses.length;

  const bpReadings = hypertensionResponses
    .map((response) => ({
      systolic: Number(response.hypertension.systolic),
      diastolic: Number(response.hypertension.diastolic),
    }))
    .filter(
      (bp) =>
        bp.systolic > 0 &&
        bp.diastolic > 0 &&
        bp.systolic > bp.diastolic
    );

  const averageSystolic = bpReadings.length
    ? Math.round(
        bpReadings.reduce((sum, bp) => sum + bp.systolic, 0) /
          bpReadings.length
      )
    : null;

  const averageDiastolic = bpReadings.length
    ? Math.round(
        bpReadings.reduce((sum, bp) => sum + bp.diastolic, 0) /
          bpReadings.length
      )
    : null;

  const takingMedication = hypertensionResponses.filter(
    (response) => response.hypertension.medication === "Yes"
  ).length;

  const medicationPercentage = hypertensionCount
    ? Math.round((takingMedication / hypertensionCount) * 100)
    : 0;

  const hypertensionSymptoms = [
    "Headache",
    "Dizziness",
    "Blurred vision",
    "Palpitations",
    "No symptoms",
  ].map((symptom) => ({
    name: symptom,
    count: hypertensionResponses.filter((response) =>
      (response.hypertension.symptoms || []).includes(symptom)
    ).length,
  }));


  useEffect(() => {
    // Cross-tab updates; use Refresh Dashboard for submissions made in this tab.
    window.addEventListener('storage', refresh);
    return () => window.removeEventListener('storage', refresh);
  }, []);

  const total = responses.length;
  const symptomData = SYMPTOMS.map((name) => ({ name: titleCase(name), count: responses.filter((r) => r.symptom === name).length }));
  const severityData = SEVERITIES.map((name) => ({ name: titleCase(name), count: responses.filter((r) => r.severity === name).length }));
  const percent = (count) => total ? `${(count / total * 100).toFixed(1)}%` : '0%';
  const mild = severityData[0].count;
  const moderate = severityData[1].count;
  const severe = severityData[2].count;

  const exportCsv = () => {
    const escapeCsv = (v) => `"${String(v ?? '').replaceAll('"', '""')}"`;
    const rows = [['Enrollment Code', 'Symptom', 'Severity', 'Language', 'Submitted At'], ...responses.map((r) => [r.code, r.symptom, r.severity, r.language, r.submittedAt])];
    const csv = rows.map((row) => row.map(escapeCsv).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clinova-demo-responses.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="research-dashboard">
      <div className="dashboard-heading">
        <div><p className="dashboard-kicker">CLINOVA AI / RESEARCHER PORTAL</p><h1>Research Analytics Dashboard</h1><p>Live summaries of your browser's synthetic questionnaire data.</p></div>
        <div className="dashboard-actions"><button onClick={refresh}>↻ Refresh Dashboard</button><button onClick={exportCsv} disabled={!total}>↓ Export CSV</button></div>
      </div>
      <div className="metric-grid">
        <div className="metric-card"><span>Total submissions</span><strong>{total}</strong><small>Saved demo questionnaires</small></div>
        <div className="metric-card"><span>Mild</span><strong>{percent(mild)}</strong><small>{mild} responses</small></div>
        <div className="metric-card"><span>Moderate</span><strong>{percent(moderate)}</strong><small>{moderate} responses</small></div>
        <div className="metric-card"><span>Severe</span><strong>{percent(severe)}</strong><small>{severe} responses</small></div>
      </div>
      {total === 0 ? <div className="dashboard-empty">No responses yet. Register a fictional participant and submit a questionnaire, then return here.</div> : null}
      <div className="chart-grid">
        <section className="chart-card"><h2>Symptoms reported</h2><p>Number of responses by symptom</p>
<div className="chart-area" style={{ width: "100%", minWidth: 0 }}>
  <ResponsiveContainer width={350} height={300}>

<BarChart data={symptomData} margin={{ top: 15, right: 15, left: -20, bottom: 10 }}><CartesianGrid strokeDasharray="3 3" stroke="#e7eef4" /><XAxis dataKey="name" tick={{ fontSize: 12 }} /><YAxis allowDecimals={false} /><Tooltip /><Bar dataKey="count" fill="#0c929a" radius={[8, 8, 0, 0]} /></BarChart></ResponsiveContainer></div></section>
        <section className="chart-card"><h2>Symptom severity</h2><p>Distribution of severity ratings</p><div className="chart-area">
<ResponsiveContainer width={350} height={300}>
<PieChart><Pie data={severityData.filter((d) => d.count > 0)} 
        dataKey="count" nameKey="name" 
innerRadius="35%"
outerRadius="65%"
paddingAngle={0}
label={false}
>
  {severityData.filter((d) => d.count > 0).map((entry, index) => <Cell key={entry.name} fill={COLORS[index]} />)}</Pie><Tooltip /><Legend /></PieChart></ResponsiveContainer></div></section>
      </div>
      <section className="chart-card dashboard-summary"><h2>Research summary</h2><p>{total} questionnaire{total === 1 ? '' : 's'} submitted. Most frequently reported symptom: {total ? symptomData.reduce((a, b) => a.count >= b.count ? a : b).name : 'N/A'}. Severe responses: {severe} ({percent(severe)}).</p><small>Descriptive statistics only. These counts do not establish causation, clinical significance, or verified participant identity.</small></section>
    
{/* HYPERTENSION RESEARCH ANALYTICS */}
<section className="hypertension-analytics">
  <div className="hypertension-analytics-header">
    <span>CLINOVA AI / DISEASE-SPECIFIC RESEARCH</span>
    <h2>Hypertension Research Analytics</h2>
    <p>
      Blood pressure measurements, medication use,
      and patient-reported symptoms.
    </p>
  </div>

  <div className="hypertension-metric-grid">
    <div className="hypertension-metric-card">
      <span>Hypertension Participants</span>
      <strong>{hypertensionCount}</strong>
      <small>Submitted study questionnaires</small>
    </div>

    <div className="hypertension-metric-card">
      <span>Average Systolic BP</span>
      <strong>
        {averageSystolic === null ? "—" : averageSystolic}
      </strong>
      <small>mmHg</small>
    </div>

    <div className="hypertension-metric-card">
      <span>Average Diastolic BP</span>
      <strong>
        {averageDiastolic === null ? "—" : averageDiastolic}
      </strong>
      <small>mmHg</small>
    </div>

    <div className="hypertension-metric-card">
      <span>Taking Medication</span>
      <strong>{medicationPercentage}%</strong>
      <small>{takingMedication} participants reported Yes</small>
    </div>
  </div>

  <div className="hypertension-chart-card">
    <h3>Reported Hypertension Symptoms</h3>
    <p>Number of participants reporting each symptom</p>

    {hypertensionCount === 0 ? (
      <p>No hypertension study responses yet.</p>
    ) : (
      <div style={{ width: "100%", height: 300 }}>
       
<ResponsiveContainer width={300} height={300}>

          <BarChart data={hypertensionSymptoms}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11 }}
              interval={0}
            />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar
              dataKey="count"
              fill="#0e929a"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )}
  </div>
</section>

    <DataQualityPanel />
    </main>
  );
}
