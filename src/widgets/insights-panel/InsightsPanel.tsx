import type { AnalyzeResponse } from '@shared/types/report';

interface InsightsPanelProps {
  analysis: AnalyzeResponse | null;
  pdfUrl: string | null;
}

export const InsightsPanel = ({ analysis, pdfUrl }: InsightsPanelProps) => (
  <section className="card insights">
    <header>
      <h3>Insights & Export</h3>
      <p>AI findings from /analyze and downloadable PDF from /generate.</p>
    </header>
    <div className="insights__content">
      {analysis?.insights?.length ? (
        analysis.insights.map((insight) => <article key={insight}>{insight}</article>)
      ) : (
        <p>No insights yet.</p>
      )}
      {pdfUrl && (
        <a className="button" href={pdfUrl} download="ai-report.pdf">
          Download PDF
        </a>
      )}
    </div>
  </section>
);
