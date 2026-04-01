import type { AnalyzeResponse, ReportPayload } from '@shared/types/report';

const defaultHeaders = {
  'Content-Type': 'application/json'
};

const parseError = async (response: Response) => {
  const body = await response.text();
  return body || `Request failed with status ${response.status}`;
};

export const reportApi = {
  async analyze(payload: ReportPayload): Promise<AnalyzeResponse> {
    const response = await fetch('/analyze', {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(await parseError(response));
    }

    return (await response.json()) as AnalyzeResponse;
  },

  async generate(payload: ReportPayload): Promise<Blob> {
    const response = await fetch('/generate', {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(await parseError(response));
    }

    return await response.blob();
  }
};
