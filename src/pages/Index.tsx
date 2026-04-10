import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import DocumentPreview from '@/components/DocumentPreview';
import AuthForm from '@/components/AuthForm';
import DocumentViewer from '@/components/DocumentViewer';

type View = 'preview' | 'auth' | 'document';

const Index = () => {
  const { user, loading } = useAuth();
  const [view, setView] = useState<View>('preview');

  useEffect(() => {
    if (!loading && user) {
      setView('document');
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-doc-surface flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground text-sm">Loading...</div>
      </div>
    );
  }

  if (view === 'document' && user) {
    return <DocumentViewer />;
  }

  if (view === 'auth') {
    return <AuthForm onSuccess={() => setView('document')} onBack={() => setView('preview')} />;
  }

  return <DocumentPreview blurred onOpenClick={() => setView('auth')} />;
};

export default Index;
