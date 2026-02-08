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
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, GraduationCap } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      await register(name, email, password);
      router.push('/grade-selector');
    } catch {
      setError('Registration failed. Please try again.');
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
          <h1 className="text-3xl mb-2 text-[var(--navy-900)]">Get started</h1>
          <p className="text-[var(--navy-600)]">Create your account to begin preparation</p>
        </div>

        <Card className="border border-[var(--sand-300)] shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-[var(--navy-900)]">Create your account</CardTitle>
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
                <Label htmlFor="name" className="text-[var(--navy-900)]">
                  Full name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  className="border-[var(--sand-300)] focus-visible:ring-[var(--teal-500)] focus-visible:border-[var(--teal-500)] rounded-lg"
                  placeholder="John Smith"
                />
              </div>

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
                <Label htmlFor="password" className="text-[var(--navy-900)]">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="border-[var(--sand-300)] focus-visible:ring-[var(--teal-500)] focus-visible:border-[var(--teal-500)] rounded-lg"
                  placeholder="••••••••"
                />
                <p className="text-xs text-[var(--navy-600)]">Minimum 8 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[var(--navy-900)]">
                  Confirm password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                  className="border-[var(--sand-300)] focus-visible:ring-[var(--teal-500)] focus-visible:border-[var(--teal-500)] rounded-lg"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-start gap-3 py-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-[var(--navy-700)] leading-relaxed cursor-pointer">
                  I agree to the{' '}
                  <span className="text-[var(--teal-600)] hover:text-[var(--teal-700)] font-medium">
                    terms and conditions
                  </span>{' '}
                  and{' '}
                  <span className="text-[var(--teal-600)] hover:text-[var(--teal-700)] font-medium">
                    privacy policy
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--navy-800)] hover:bg-[var(--navy-900)] text-white py-6 rounded-lg"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-[var(--navy-600)]">Already have an account? </span>
              <Link href="/login" className="text-[var(--teal-600)] hover:text-[var(--teal-700)] font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
