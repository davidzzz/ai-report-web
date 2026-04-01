import { CreateReportForm } from '@features/create-report/CreateReportForm';
import { useReportWorkflow } from '@shared/hooks/useReportWorkflow';
import { AppShell } from '@widgets/app-shell/AppShell';
import { InsightsPanel } from '@widgets/insights-panel/InsightsPanel';
import { ReportEditor } from '@widgets/report-editor/ReportEditor';

export const DashboardPage = () => {
  const { analysis, pdfUrl, error, isAnalyzing, isGenerating, analyze, generate } = useReportWorkflow();

  return (
    <AppShell>
      <section className="grid grid--two">
        <CreateReportForm onAnalyze={analyze} onGenerate={generate} isAnalyzing={isAnalyzing} isGenerating={isGenerating} />
        <ReportEditor analysis={analysis} error={error} />
        <InsightsPanel analysis={analysis} pdfUrl={pdfUrl} />
      </section>
    </AppShell>
  );
};
