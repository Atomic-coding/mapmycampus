import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader } from './ui/card';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app would validate credentials
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23004080' fill-opacity='0.3'%3E%3Crect x='5' y='5' width='50' height='50' rx='5'/%3E%3Crect x='15' y='15' width='10' height='10' rx='2'/%3E%3Crect x='35' y='15' width='10' height='10' rx='2'/%3E%3Crect x='15' y='35' width='10' height='10' rx='2'/%3E%3Crect x='35' y='35' width='10' height='10' rx='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <Card className="w-full max-w-md mx-4 shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-6 text-center pb-6">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-3">
            <div className="w-12 h-12 bg-[#004080] rounded-xl flex items-center justify-center">
              <div className="w-7 h-7 text-white flex items-center justify-center">
                🏛️
              </div>
            </div>
            <div>
              <h1 className="text-2xl text-[#004080]">MapMyCampus</h1>
              <p className="text-sm text-[#4A90E2]">Navigation System</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#004080]">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl border-2 border-gray-200 focus:border-[#4A90E2] transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#004080]">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl border-2 border-gray-200 focus:border-[#4A90E2] transition-colors"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#004080] hover:bg-[#003366] text-white rounded-xl py-3 transition-colors"
            >
              Login
            </Button>
          </form>
          
          <div className="text-center">
            <button 
              type="button"
              className="text-[#4A90E2] hover:text-[#004080] transition-colors underline"
            >
              Forgot Password?
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}