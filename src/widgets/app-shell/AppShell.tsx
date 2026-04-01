import type { PropsWithChildren } from 'react';

export const AppShell = ({ children }: PropsWithChildren) => (
  <main className="layout">
    <section className="hero">
      <h1>AI Report Studio</h1>
      <p>Build, analyze, and iterate on actionable business reports with modular AI workflows.</p>
    </section>
    {children}
  </main>
);
