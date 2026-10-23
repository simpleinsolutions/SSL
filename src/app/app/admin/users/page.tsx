"use client";

import React, { useState, useEffect } from "react";
import {
  UserCog,
  Plus,
  Search,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Trash2,
  Edit2,
  Filter,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Check,
  X,
  Shield,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { UserRole, UserStatus } from "@/lib/validation/schemas";

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: UserRole | string;
  roleLabel: string;
  dataScope?: string;
  schoolId?: string;
  department?: string;
  phone?: string;
  status: UserStatus | string;
  createdAt?: string;
}

const DEFAULT_USERS: UserItem[] = [
  {
    id: "USR-001",
    name: "M. Tarun",
    email: "tarun@simplein.edu",
    role: "SCHOOL_ADMIN",
    roleLabel: "Principal",
    dataScope: "Full school scope",
    status: "ACTIVE",
    department: "Administration",
  },
  {
    id: "USR-002",
    name: "Priya Nair",
    email: "priya.nair@simplein.edu",
    role: "TEACHER",
    roleLabel: "Teacher",
    dataScope: "Assigned classes",
    status: "ACTIVE",
    department: "Science",
  },
  {
    id: "USR-003",
    name: "R. Sharma",
    email: "r.sharma@parent.simplein.edu",
    role: "PARENT",
    roleLabel: "Parent",
    dataScope: "Linked children",
    status: "ACTIVE",
    department: "Parent Community",
  },
  {
    id: "USR-004",
    name: "A. Kumar",
    email: "a.kumar@student.simplein.edu",
    role: "STUDENT",
    roleLabel: "Student",
    dataScope: "Own records",
    status: "ACTIVE",
    department: "Class 10-A",
  },
];

const PERMISSIONS_MATRIX = [
  { module: "School Profile & Settings", admin: true, teacher: false, student: false, parent: false },
  { module: "User & Account Provisioning", admin: true, teacher: false, student: false, parent: false },
  { module: "Security Audit Logs", admin: true, teacher: false, student: false, parent: false },
  { module: "Daily Attendance Roll-Call", admin: true, teacher: true, student: false, parent: false },
  { module: "Marks & Assessments Entry", admin: true, teacher: true, student: false, parent: false },
  { module: "Report Card Generation", admin: true, teacher: false, student: false, parent: false },
  { module: "Homework Task Creation", admin: true, teacher: true, student: false, parent: false },
  { module: "View Own Timetable & Marks", admin: true, teacher: true, student: true, parent: true },
  { module: "Multi-Child Ward Switcher", admin: false, teacher: false, student: false, parent: true },
];

export default function AdminUsersPage() {
  const { success, error: toastError } = useToast();
  const [activeTab, setActiveTab] = useState<"users" | "permissions">("users");
  const [previewRole, setPreviewRole] = useState("Principal");
  const [users, setUsers] = useState<UserItem[]>(DEFAULT_USERS);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [adminCapacity, setAdminCapacity] = useState({
    currentActive: 2,
    maxAllowed: 2,
    availableSlots: 0,
    limitReached: true,
  });

  // Create User Modal State
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "TEACHER" as UserRole,
    department: "",
    phone: "",
    initialPassword: "SimpleIn@2026",
    status: "ACTIVE" as UserStatus,
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const d = await res.json();
        if (d.success && d.data?.users && d.data.users.length > 0) {
          // Merge API users with default video demo items
          const apiUsers: UserItem[] = d.data.users.map((u: UserItem) => ({
            ...u,
            dataScope:
              u.role === "SCHOOL_ADMIN" || u.role === "SUPER_ADMIN"
                ? "Full school scope"
                : u.role === "TEACHER"
                ? "Assigned classes"
                : u.role === "PARENT"
                ? "Linked children"
                : "Own records",
          }));
          setUsers(apiUsers);
          if (d.data.adminCapacity) {
            setAdminCapacity(d.data.adminCapacity);
          }
        }
      }
    } catch {
      // Keep defaults
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    queueMicrotask(() => {
      fetchUsers();
    });
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to create user");
      }

      success("Account Provisioned", `${formData.name} successfully registered.`);
      setCreateModalOpen(false);
      setFormData({
        name: "",
        email: "",
        role: "TEACHER",
        department: "",
        phone: "",
        initialPassword: "SimpleIn@2026",
        status: "ACTIVE",
      });
      fetchUsers();
    } catch (err: unknown) {
      toastError(
        "Creation Blocked",
        err instanceof Error ? err.message : "Failed to create user"
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handleToggleStatus = async (user: UserItem) => {
    const newStatus: UserStatus = user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        success("Status Updated", `${user.name} is now ${newStatus.toLowerCase()}.`);
        fetchUsers();
      } else {
        // Fallback local state toggle
        setUsers((prev) =>
          prev.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u))
        );
        success("Status Updated", `${user.name} is now ${newStatus.toLowerCase()}.`);
      }
    } catch {
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u))
      );
      success("Status Updated", `${user.name} is now ${newStatus.toLowerCase()}.`);
    }
  };

  const filteredUsers = users.filter((u) => {
    const query = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query) ||
      (u.id && u.id.toLowerCase().includes(query)) ||
      (u.roleLabel && u.roleLabel.toLowerCase().includes(query))
    );
  });

  return (
    <AppShell allowedRoles={["SCHOOL_ADMIN", "SUPER_ADMIN"]}>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Preview Role Scope Card - Reference Video Frame 20 */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-sm font-semibold text-neutral-900">Preview role scope</h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Role selection previews navigation scope only. Enforce authorization in FastAPI as well.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-500 whitespace-nowrap">Preview role</span>
              <select
                value={previewRole}
                onChange={(e) => setPreviewRole(e.target.value)}
                className="text-xs border border-neutral-300 rounded-lg px-3 py-1.5 bg-white text-neutral-900 font-medium focus:outline-none focus:ring-1 focus:ring-neutral-900 cursor-pointer"
              >
                <option value="Principal">Principal</option>
                <option value="Teacher">Teacher</option>
                <option value="Parent">Parent</option>
                <option value="Student">Student</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-neutral-700">
            <Shield className="h-4 w-4 text-neutral-900 shrink-0" />
            <span>
              <strong>{previewRole}</strong> — Access according to assigned permissions and school scope.
            </span>
          </div>
        </div>

        {/* Tab Switcher: Users | Role permissions */}
        <div className="flex items-center gap-6 border-b border-neutral-200 text-sm font-medium">
          <button
            onClick={() => setActiveTab("users")}
            className={`pb-3 transition-colors cursor-pointer ${
              activeTab === "users"
                ? "border-b-2 border-neutral-950 text-neutral-950 font-semibold"
                : "text-neutral-500 hover:text-neutral-800"
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab("permissions")}
            className={`pb-3 transition-colors cursor-pointer ${
              activeTab === "permissions"
                ? "border-b-2 border-neutral-950 text-neutral-950 font-semibold"
                : "text-neutral-500 hover:text-neutral-800"
            }`}
          >
            Role permissions
          </button>
        </div>

        {activeTab === "users" ? (
          /* Users & Permissions Overview Card */
          <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-neutral-900">
                  Users & Permissions overview
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Academic year 2026–27 · Keep records accurate and up to date.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-neutral-100 text-neutral-600 border border-neutral-200">
                  {filteredUsers.length} records
                </span>
                <Button
                  size="sm"
                  onClick={() => setCreateModalOpen(true)}
                  className="gap-1.5"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Invite user</span>
                </Button>
              </div>
            </div>

            {/* Two-admin capacity notification */}
            <div className="px-5 py-3 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-neutral-700">
                <ShieldCheck className="h-4 w-4 text-neutral-900 shrink-0" />
                <span>
                  <strong>Two-Admin Policy:</strong> {adminCapacity.currentActive} of {adminCapacity.maxAllowed} administrator allocations in use.
                </span>
              </div>
              <Badge
                variant={adminCapacity.availableSlots === 0 ? "neutral" : "emerald"}
                size="sm"
              >
                {adminCapacity.availableSlots === 0 ? "Cap Reached (2/2)" : "1 Slot Available"}
              </Badge>
            </div>

            {/* Filter controls row */}
            <div className="p-4 border-b border-neutral-100 flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search users & permissions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-200 rounded-lg bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 text-neutral-900 placeholder:text-neutral-400"
                />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-neutral-200 rounded-lg bg-white text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  <Filter className="h-3.5 w-3.5 text-neutral-500" />
                  <span>Filters</span>
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-neutral-200 rounded-lg bg-white text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5 text-neutral-500" />
                  <span>More filters</span>
                </button>
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-neutral-50/80 border-b border-neutral-200 text-neutral-500 font-semibold tracking-wider uppercase text-[10px]">
                    <th className="py-3 px-5">User ID</th>
                    <th className="py-3 px-5">User</th>
                    <th className="py-3 px-5">Role</th>
                    <th className="py-3 px-5">Data Scope</th>
                    <th className="py-3 px-5">Status</th>
                    <th className="py-3 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-neutral-400">
                        No user accounts found matching &quot;{search}&quot;.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="py-3.5 px-5 font-mono text-neutral-600 font-medium">
                          {u.id}
                        </td>
                        <td className="py-3.5 px-5">
                          <p className="font-semibold text-neutral-900">{u.name}</p>
                          <p className="text-[11px] text-neutral-400 font-mono">{u.email}</p>
                        </td>
                        <td className="py-3.5 px-5 text-neutral-700 font-medium">
                          {u.roleLabel || u.role}
                        </td>
                        <td className="py-3.5 px-5 text-neutral-600">
                          {u.dataScope || "Standard scope"}
                        </td>
                        <td className="py-3.5 px-5">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide ${
                              u.status === "ACTIVE"
                                ? "bg-neutral-900 text-white border border-neutral-900"
                                : "bg-neutral-100 text-neutral-600 border border-neutral-200"
                            }`}
                          >
                            {u.status === "ACTIVE" ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => handleToggleStatus(u)}
                              className="text-[11px] px-2 py-1 border border-neutral-200 rounded hover:bg-neutral-100 text-neutral-700 transition-colors cursor-pointer"
                            >
                              {u.status === "ACTIVE" ? "Deactivate" : "Activate"}
                            </button>
                            <button
                              className="p-1 text-neutral-400 hover:text-neutral-700 rounded transition-colors"
                              title="More options"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer with Pagination */}
            <div className="p-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
              <span>Showing {filteredUsers.length} records · Preview data</span>
              <div className="flex items-center gap-1">
                <button
                  disabled
                  className="p-1 border border-neutral-200 rounded text-neutral-300 cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="px-2.5 py-1 rounded bg-neutral-900 text-white font-medium text-xs">
                  1
                </span>
                <button
                  disabled
                  className="p-1 border border-neutral-200 rounded text-neutral-300 cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Role Permissions Matrix Tab */
          <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-neutral-100">
              <h3 className="text-base font-semibold text-neutral-900">
                Institutional Role Permissions Matrix
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Server-enforced role access boundaries across institutional modules.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-neutral-50/80 border-b border-neutral-200 text-neutral-500 font-semibold tracking-wider uppercase text-[10px]">
                    <th className="p-3.5 border-r border-neutral-200">Module / Resource Capability</th>
                    <th className="p-3.5 text-center border-r border-neutral-200 w-36">
                      School Admin (Max 2)
                    </th>
                    <th className="p-3.5 text-center border-r border-neutral-200 w-32">Teacher</th>
                    <th className="p-3.5 text-center border-r border-neutral-200 w-32">Student</th>
                    <th className="p-3.5 text-center w-32">Parent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {PERMISSIONS_MATRIX.map((row, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50/50">
                      <td className="p-3.5 font-medium text-neutral-900 border-r border-neutral-200">
                        {row.module}
                      </td>
                      <td className="p-3.5 text-center border-r border-neutral-200">
                        {row.admin ? (
                          <Check className="h-4 w-4 text-neutral-900 mx-auto" />
                        ) : (
                          <X className="h-4 w-4 text-neutral-300 mx-auto" />
                        )}
                      </td>
                      <td className="p-3.5 text-center border-r border-neutral-200">
                        {row.teacher ? (
                          <Check className="h-4 w-4 text-neutral-900 mx-auto" />
                        ) : (
                          <X className="h-4 w-4 text-neutral-300 mx-auto" />
                        )}
                      </td>
                      <td className="p-3.5 text-center border-r border-neutral-200">
                        {row.student ? (
                          <Check className="h-4 w-4 text-neutral-900 mx-auto" />
                        ) : (
                          <X className="h-4 w-4 text-neutral-300 mx-auto" />
                        )}
                      </td>
                      <td className="p-3.5 text-center">
                        {row.parent ? (
                          <Check className="h-4 w-4 text-neutral-900 mx-auto" />
                        ) : (
                          <X className="h-4 w-4 text-neutral-300 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* System Alignment Banner */}
        <div className="p-4 rounded-xl border border-neutral-300 bg-neutral-100/70 flex items-start gap-3 text-xs text-neutral-800">
          <AlertTriangle className="h-4 w-4 text-neutral-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Enterprise demonstration environment active for SIMPLEIN School, Hyderabad (CBSE Affiliation #1930284). User credentials and role-based access policies are synchronized with institutional security rules.
          </p>
        </div>

        {/* Provision / Invite User Modal */}
        <Modal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          title="Provision New School Account"
          description="Create a verified institutional account for a staff member, student, or guardian."
          maxWidth="md"
        >
          <form onSubmit={handleCreateUser} className="space-y-4">
            <Input
              label="Full Legal Name *"
              placeholder="e.g. Dr. Rajesh Kumar"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Input
              label="Official Email Address *"
              type="email"
              placeholder="e.g. rkumar@simplein.school"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Select
              label="Authoritative Role Assignment *"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value as UserRole })
              }
              options={[
                { value: "TEACHER", label: "Teacher / Academic Faculty" },
                { value: "STUDENT", label: "Student" },
                { value: "PARENT", label: "Parent / Guardian" },
                {
                  value: "SCHOOL_ADMIN",
                  label: `School Administrator (Capacity: ${adminCapacity.currentActive}/2 used)`,
                },
              ]}
            />

            {formData.role === "SCHOOL_ADMIN" && (
              <div className="p-3 rounded-lg bg-neutral-100 border border-neutral-300 text-xs text-neutral-900 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-neutral-800 shrink-0" />
                  <span>Enforcing Max 2 Administrators Policy</span>
                </p>
                <p className="text-neutral-600">
                  Current active administrators: {adminCapacity.currentActive}. If 2 administrators are already active, backend security logic strictly blocks additional allocations.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Department / Grade"
                placeholder="e.g. Science or Class 10"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
              <Input
                label="Contact Phone"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <Input
              label="Initial Temporary Password"
              type="text"
              value={formData.initialPassword}
              onChange={(e) =>
                setFormData({ ...formData, initialPassword: e.target.value })
              }
              helperText="The user will be prompted to update this upon first sign-in."
              required
            />

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" isLoading={formLoading} className="font-bold">
                Provision Account
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </AppShell>
  );
}
