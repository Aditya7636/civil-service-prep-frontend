'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, GraduationCap } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/profession-selector');
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-[var(--sand-100)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-[var(--teal-600)] rounded-lg p-2">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
          </div>
          <h1 className="text-3xl mb-2 text-[var(--navy-900)]">Welcome back</h1>
          <p className="text-[var(--navy-600)]">Sign in to continue your preparation</p>
        </div>

        <Card className="border border-[var(--sand-300)] shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-[var(--navy-900)]">Sign in to your account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <Alert variant="destructive" className="bg-red-50 text-red-900 border-red-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[var(--navy-900)]">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="border-[var(--sand-300)] focus-visible:ring-[var(--teal-500)] focus-visible:border-[var(--teal-500)] rounded-lg"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-[var(--navy-900)]">
                    Password
                  </Label>
                  <span className="text-xs text-[var(--teal-600)] hover:text-[var(--teal-700)]">
                    Forgot password?
                  </span>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="border-[var(--sand-300)] focus-visible:ring-[var(--teal-500)] focus-visible:border-[var(--teal-500)] rounded-lg"
                  placeholder="••••••••"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--navy-800)] hover:bg-[var(--navy-900)] text-white py-6 rounded-lg"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-[var(--navy-600)]">Don&apos;t have an account? </span>
              <Link href="/register" className="text-[var(--teal-600)] hover:text-[var(--teal-700)] font-medium">
                Create one now
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4 bg-[var(--navy-900)] text-white border-0">
          <CardContent className="p-4 text-sm">
            <p className="font-semibold mb-2">Demo credentials:</p>
            <p className="text-white/80">Email: any@example.com</p>
            <p className="text-white/80">Password: any password</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
