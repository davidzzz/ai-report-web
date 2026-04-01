import { useState } from 'react';
import type { ReportPayload, SalesRecord } from '@shared/types/report';

interface CreateReportFormProps {
  onAnalyze: (payload: ReportPayload) => Promise<void>;
  onGenerate: (payload: ReportPayload) => Promise<void>;
  isAnalyzing: boolean;
  isGenerating: boolean;
}

const demoSales: SalesRecord[] = [
  { date: '2026-03-01', product: 'Pro Plan', region: 'NA', unitsSold: 120, unitPrice: 49 },
  { date: '2026-03-02', product: 'Enterprise Add-on', region: 'EU', unitsSold: 23, unitPrice: 199 }
];

export const CreateReportForm = ({ onAnalyze, onGenerate, isAnalyzing, isGenerating }: CreateReportFormProps) => {
  const [companyName, setCompanyName] = useState('Acme Corp');
  const [period, setPeriod] = useState('2026-Q1');
  const [salesJson, setSalesJson] = useState(JSON.stringify(demoSales, null, 2));
  const [localError, setLocalError] = useState<string | null>(null);

  const toPayload = (): ReportPayload | null => {
    try {
      const parsed = JSON.parse(salesJson) as SalesRecord[];
      setLocalError(null);
      return { companyName, period, sales: parsed };
    } catch {
      setLocalError('Sales data must be valid JSON array');
      return null;
    }
  };

  const handleAnalyze = async () => {
    const payload = toPayload();
    if (!payload) return;
    await onAnalyze(payload);
  };

  const handleGenerate = async () => {
    const payload = toPayload();
    if (!payload) return;
    await onGenerate(payload);
  };

  return (
    <section className="card form">
      <header>
        <h3>Report Input</h3>
        <p>Connects directly to backend endpoints: /analyze and /generate.</p>
      </header>
      <label>
        Company name
        <input className="input" value={companyName} onChange={(event) => setCompanyName(event.target.value)} />
      </label>
      <label>
        Period
        <input className="input" value={period} onChange={(event) => setPeriod(event.target.value)} />
      </label>
      <label>
        Sales JSON
        <textarea className="input textarea" value={salesJson} onChange={(event) => setSalesJson(event.target.value)} rows={12} />
      </label>
      {localError && <p className="error-text">{localError}</p>}
      <div className="button-row">
        <button className="button" type="button" onClick={handleAnalyze} disabled={isAnalyzing || isGenerating}>
          {isAnalyzing ? 'Analyzing...' : 'Analyze'}
        </button>
        <button className="button button--secondary" type="button" onClick={handleGenerate} disabled={isGenerating || isAnalyzing}>
          {isGenerating ? 'Generating PDF...' : 'Generate PDF'}
        </button>
      </div>
    </section>
  );
};
