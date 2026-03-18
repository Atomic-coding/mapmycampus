import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, Edit, Save, Target, QrCode, Calendar, Shield, CheckCircle } from 'lucide-react';
import { supabase } from '../utils/supabase/client';
import { toast } from 'sonner@2.0.3';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    studentId: '',
    address: '',
    role: 'student'
  });
  const isSupabaseConfigured = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (!isSupabaseConfigured) {
      // Demo mode
      const demoUser = {
        id: 'demo-user',
        email: 'demo@pccoer.in',
        user_metadata: {
          full_name: 'Demo User',
          phone: '+91 98765 43210',
          department: 'Computer Science',
          student_id: 'STU12345',
          address: 'Ravet, Pune 412101',
          role: 'student'
        }
      };
      setUser(demoUser);
      setProfile({
        fullName: demoUser.user_metadata?.full_name || '',
        email: demoUser.email || '',
        phone: demoUser.user_metadata?.phone || '',
        department: demoUser.user_metadata?.department || '',
        studentId: demoUser.user_metadata?.student_id || 'STU' + Math.floor(Math.random() * 100000),
        address: demoUser.user_metadata?.address || '',
        role: demoUser.user_metadata?.role || 'student'
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
      setProfile({
        fullName: session.user.user_metadata?.full_name || '',
        email: session.user.email || '',
        phone: session.user.user_metadata?.phone || '',
        department: session.user.user_metadata?.department || '',
        studentId: session.user.user_metadata?.student_id || 'STU' + Math.floor(Math.random() * 100000),
        address: session.user.user_metadata?.address || '',
        role: session.user.user_metadata?.role || 'student'
      });
      
      setLoading(false);
    } catch (error) {
      navigate('/auth');
    }
  };

  const handleSave = async () => {
    if (!isSupabaseConfigured) {
      toast.success('Demo mode: Profile updated (changes not persisted)');
      setEditing(false);
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: profile.fullName,
        phone: profile.phone,
        department: profile.department,
        student_id: profile.studentId,
        address: profile.address,
        role: profile.role
      }
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Profile updated successfully!');
      setEditing(false);
    }
  };

  const handleSignOut = async () => {
    if (!isSupabaseConfigured) {
      toast.success('Signed out successfully!');
      navigate('/auth');
      return;
    }

    await supabase.auth.signOut();
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const initials = profile.fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-4">
      <div className="max-w-4xl mx-auto py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">User Profile</h1>
            <p className="text-sm text-muted-foreground">Manage your account settings and preferences</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Profile Card */}
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <Badge 
                      className="absolute -bottom-1 -right-1 capitalize bg-secondary"
                    >
                      {profile.role}
                    </Badge>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{profile.fullName || 'User'}</h2>
                    <p className="text-sm text-muted-foreground">{profile.email}</p>
                  </div>
                </div>
                <Button
                  variant={editing ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => editing ? handleSave() : setEditing(true)}
                  disabled={loading}
                >
                  {editing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="pt-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
                  <Input
                    id="fullName"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    disabled={!editing}
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <Input
                    id="email"
                    value={profile.email}
                    disabled
                    className="h-10 bg-muted/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    disabled={!editing}
                    placeholder="+91 12345 67890"
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department" className="text-sm font-medium">Department</Label>
                  <Input
                    id="department"
                    value={profile.department}
                    onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                    disabled={!editing}
                    placeholder="Computer Science"
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentId" className="text-sm font-medium">Student ID</Label>
                  <Input
                    id="studentId"
                    value={profile.studentId}
                    disabled
                    className="h-10 bg-muted/50"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address" className="text-sm font-medium">Address</Label>
                  <Input
                    id="address"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    disabled={!editing}
                    placeholder="123 Street, City, State"
                    className="h-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sidebar Cards */}
          <div className="space-y-6">
            {/* Usage Statistics */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Usage Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Rooms Visited</span>
                  <span className="text-xl font-bold text-primary">45</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">QR Scans</span>
                  <span className="text-xl font-bold text-secondary">23</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Days Active</span>
                  <span className="text-xl font-bold text-success">89</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start hover:bg-primary/10"
                  onClick={() => navigate('/')}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
                <Button
                  variant="destructive"
                  className="w-full justify-start"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </CardContent>
            </Card>

            {/* Account Status */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Account Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Account Type</span>
                  <Badge variant="outline" className="capitalize">{profile.role}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge className="bg-success">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Verified</span>
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}