import { FileText, Download, Share2, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

interface DocumentPreviewProps {
  blurred?: boolean;
  onOpenClick?: () => void;
}

const DocumentPreview = ({ blurred = true, onOpenClick }: DocumentPreviewProps) => {
  return (
    <div className="min-h-screen bg-doc-surface">
      {/* Top bar */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-sm font-semibold text-foreground">Q4_Financial_Report_2024.pdf</h1>
            <p className="text-xs text-muted-foreground">2.4 MB · Shared by admin@company.com</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-muted transition-colors">
            <Download className="h-4 w-4 text-muted-foreground" />
          </button>
          <button className="p-2 rounded-lg hover:bg-muted transition-colors">
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </button>
          <button className="p-2 rounded-lg hover:bg-muted transition-colors">
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Document body */}
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="relative">
          <motion.div
            className={`bg-card rounded-xl shadow-lg border border-border p-8 md:p-12 space-y-6 transition-all duration-500 ${blurred ? 'blur-sm select-none pointer-events-none' : ''}`}
          >
            <div className="border-b border-border pb-6">
              <h2 className="text-2xl font-bold text-foreground mb-1">Quarterly Financial Report</h2>
              <p className="text-sm text-muted-foreground">Fiscal Year 2024 · Q4 Summary</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Executive Summary</h3>
              <p className="text-sm leading-relaxed text-doc-text">
                This report provides a comprehensive overview of the company's financial performance during the fourth quarter of fiscal year 2024. Revenue growth exceeded projections by 12%, driven primarily by expansion in the enterprise segment and successful product launches in Q3.
              </p>
              <p className="text-sm leading-relaxed text-doc-text">
                Operating margins improved to 28.4%, reflecting ongoing cost optimization initiatives and favorable market conditions. The company maintained strong cash flow generation, ending the quarter with $142M in available liquidity.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Key Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Revenue', value: '$48.2M', change: '+12%' },
                  { label: 'Net Income', value: '$13.7M', change: '+8%' },
                  { label: 'Users', value: '2.1M', change: '+24%' },
                  { label: 'Retention', value: '94.2%', change: '+1.8%' },
                ].map((m) => (
                  <div key={m.label} className="bg-muted rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">{m.label}</p>
                    <p className="text-lg font-bold text-foreground">{m.value}</p>
                    <p className="text-xs text-success font-medium">{m.change}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Revenue Breakdown</h3>
              <div className="space-y-2">
                {[
                  { name: 'Enterprise Solutions', pct: 45 },
                  { name: 'SaaS Subscriptions', pct: 30 },
                  { name: 'Professional Services', pct: 15 },
                  { name: 'Other', pct: 10 },
                ].map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <span className="text-sm text-doc-text w-40">{item.name}</span>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div className="bg-primary rounded-full h-2" style={{ width: `${item.pct}%` }} />
                    </div>
                    <span className="text-sm font-medium text-foreground w-10 text-right">{item.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Overlay when blurred */}
          {blurred && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-card/60 backdrop-blur-sm rounded-xl"
            >
              <FileText className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Document Access Required</h3>
              <p className="text-sm text-muted-foreground mb-6 text-center max-w-xs">
                Please sign in to view this shared document
              </p>
              <button
                onClick={onOpenClick}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-md"
              >
                Open Document
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;
