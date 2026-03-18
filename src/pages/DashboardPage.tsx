import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { supabase } from '../utils/supabase/client';
import DashboardLayout from '../components/DashboardLayout';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const isSupabaseConfigured = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (!isSupabaseConfigured) {
      // Demo mode - create a mock user
      setUser({
        id: 'demo-user',
        email: 'demo@pccoer.in',
        user_metadata: {
          full_name: 'Demo User',
          role: 'student'
        }
      });
      setLoading(false);
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      setUser(session.user);
      setLoading(false);
    } catch (error) {
      // If error, use demo mode
      setUser({
        id: 'demo-user',
        email: 'demo@pccoer.in',
        user_metadata: {
          full_name: 'Demo User',
          role: 'student'
        }
      });
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto"></div>
          <p className="text-lg font-medium text-muted-foreground">Loading MapMyCampus...</p>
        </div>
      </div>
    );
  }

  return <DashboardLayout user={user} />;
}