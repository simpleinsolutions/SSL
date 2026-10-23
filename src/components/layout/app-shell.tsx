"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { UserRole } from "@/lib/validation/schemas";
import { Drawer } from "@/components/ui/drawer";

export interface AppShellProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export interface UserSessionData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleLabel: string;
  schoolId: string;
  linkedChildIds?: string[];
  department?: string;
}

export interface AuthContextType {
  user: UserSessionData | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export const useAuth = () => React.useContext(AuthContext);

export const AppShell: React.FC<AppShellProps> = ({
  children,
  allowedRoles,
}) => {
  const router = useRouter();
  const [session, setSession] = useState<UserSessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/session");
        if (!res.ok) {
          throw new Error("Unauthenticated");
        }
        const data = await res.json();
        if (data.success && data.data?.user) {
          if (isMounted) {
            const user = data.data.user;
            // Check allowed roles if specified
            if (allowedRoles && !allowedRoles.includes(user.role)) {
              // Redirect to user's permitted destination
              if (user.role === "SUPER_ADMIN") {
                router.replace("/platform/dashboard");
              } else if (user.role === "PRINCIPAL") {
                router.replace("/principal/dashboard");
              } else if (user.role === "SCHOOL_ADMIN") {
                router.replace("/app/admin/dashboard");
              } else if (user.role === "TEACHER") {
                router.replace("/app/teacher/dashboard");
              } else if (user.role === "STUDENT") {
                router.replace("/app/student/dashboard");
              } else if (user.role === "PARENT") {
                router.replace("/app/parent/dashboard");
              }
              return;
            }
            setSession(user);
          }
        } else {
          throw new Error("No session");
        }
      } catch {
        if (isMounted) {
          // Unauthenticated fallback to teacher login
          router.replace("/login/teacher");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    checkAuth();
    return () => {
      isMounted = false;
    };
  }, [router, allowedRoles]);

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST" });
    } catch {
      // Ignore network fail
    } finally {
      router.replace("/login/teacher");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3">
          <svg
            className="animate-spin h-8 w-8 text-[#0D9488]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-xs font-semibold text-[#64748B]">
            Verifying SimpleIn School credentials...
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user: session, loading, signOut: handleSignOut }}>
      <div className="min-h-screen flex bg-[#F8FAFC]">
        {/* Desktop Persistent Sidebar */}
        <div className="hidden md:flex">
          <Sidebar
            role={session.role}
            userName={session.name}
            userEmail={session.email}
            onSignOut={handleSignOut}
          />
        </div>

        {/* Mobile Drawer Sidebar */}
        <Drawer
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          title="School Portal Navigation"
          side="left"
          size="md"
        >
          <Sidebar
            role={session.role}
            userName={session.name}
            userEmail={session.email}
            onSignOut={handleSignOut}
          />
        </Drawer>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header
            userName={session.name}
            userRole={session.role}
            userRoleLabel={session.roleLabel}
            onSignOut={handleSignOut}
            onToggleMobileMenu={() => setMobileMenuOpen(true)}
          />

          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </AuthContext.Provider>
  );
};
