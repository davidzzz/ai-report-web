import type { AnalyzeResponse } from '@shared/types/report';

interface ReportEditorProps {
  analysis: AnalyzeResponse | null;
  error: string | null;
}

export const ReportEditor = ({ analysis, error }: ReportEditorProps) => {
  if (error) {
    return (
      <section className="card editor empty-state">
        <h3>Request failed</h3>
        <p>{error}</p>
      </section>
    );
  }

  if (!analysis) {
    return (
      <section className="card editor empty-state">
        <h3>Run analysis</h3>
        <p>Submit your payload to /analyze and the summary will appear here.</p>
      </section>
    );
  }

  return (
    <section className="card editor">
      <header className="editor__header">
        <div>
          <h2>Analysis Summary</h2>
          <p>{analysis.context}</p>
        </div>
      </header>
      <p className="editor__summary">{analysis.summary}</p>
    </section>
  );
};
