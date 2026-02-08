'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../lib/auth-context';
import {
  BookOpen,
  FileText,
  Video,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  GraduationCap,
} from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const navigation = isAuthenticated
    ? [
        { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
        { name: 'Behaviours', href: '/behaviours', icon: BookOpen },
        { name: 'Practice Tests', href: '/tests', icon: FileText },
        { name: 'Statement Builder', href: '/statement-builder', icon: FileText },
        { name: 'Mock Interview', href: '/mock-interview', icon: Video },
      ]
    : [];

  const isAdmin = user?.role === 'ADMIN';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-[var(--navy-900)] border-b border-[var(--navy-800)] sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-[var(--teal-600)] rounded-lg p-1.5 group-hover:bg-[var(--teal-500)] transition-colors">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="text-white font-semibold text-base hidden sm:inline">Civil Service Prep</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {isAuthenticated ? (
                <>
                  {navigation.map((item) => {
                    const isActive = pathname?.startsWith(item.href);
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`px-3 py-2 text-sm rounded-md transition-colors ${
                          isActive ? 'text-white bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-md flex items-center gap-1.5 transition-colors"
                    >
                      <Shield className="h-4 w-4" />
                      Admin
                    </Link>
                  )}
                  <div className="ml-2 flex items-center gap-1 pl-2 border-l border-white/20">
                    <button
                      onClick={() => router.push('/profile')}
                      className="p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                      aria-label="Settings"
                    >
                      <Settings className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleLogout}
                      className="p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                      aria-label="Sign out"
                    >
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/login" className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors">
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    className="ml-2 px-4 py-2 bg-[var(--teal-600)] text-white text-sm rounded-lg hover:bg-[var(--teal-700)] transition-colors"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </nav>

            <button
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="md:hidden text-white p-2 hover:bg-white/5 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[var(--navy-900)] border-t border-white/10">
            <nav className="px-4 py-4 space-y-1 max-w-7xl mx-auto">
              {isAuthenticated ? (
                <>
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname?.startsWith(item.href);
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                          isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    );
                  })}
                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Shield className="h-5 w-5" />
                      Admin
                    </Link>
                  )}
                  <div className="pt-3 mt-3 border-t border-white/10 space-y-1">
                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Settings className="h-5 w-5" />
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors w-full text-left"
                    >
                      <LogOut className="h-5 w-5" />
                      Sign out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 bg-[var(--teal-600)] text-white rounded-lg hover:bg-[var(--teal-700)] transition-colors text-sm"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
