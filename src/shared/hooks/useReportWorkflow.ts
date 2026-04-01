import { useEffect, useState } from 'react';
import { reportApi } from '@shared/api/reportApi';
import type { AnalyzeResponse, ReportPayload } from '@shared/types/report';

export const useReportWorkflow = () => {
  const [analysis, setAnalysis] = useState<AnalyzeResponse | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isAnalyzing, setAnalyzing] = useState(false);
  const [isGenerating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  const analyze = async (payload: ReportPayload) => {
    setError(null);
    setAnalyzing(true);
    try {
      const result = await reportApi.analyze(payload);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analyze request failed');
    } finally {
      setAnalyzing(false);
    }
  };

  const generate = async (payload: ReportPayload) => {
    setError(null);
    setGenerating(true);
    try {
      const blob = await reportApi.generate(payload);
      setPdfUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generate request failed');
    } finally {
      setGenerating(false);
    }
  };

  return { analysis, pdfUrl, error, isAnalyzing, isGenerating, analyze, generate };
};
