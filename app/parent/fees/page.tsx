import Link from "next/link";
import { requireRole } from "@/lib/auth/session";
import { AttachmentLink } from "@/app/components/AttachmentLink";
import { listStudentFees } from "@/lib/services/fees";
import { getParentScope, listChildren } from "@/lib/services/parents";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { EmptyState, PageHeader } from "@/app/admin/_components/ui";
import { Card3D } from "@/components/3d/Card3D";
import { StatCard3D } from "@/components/3d/StatCard3D";
import { Badge3D } from "@/components/3d/Badge3D";
import { Button3D } from "@/components/3d/Button3D";
import { Icon3D } from "@/components/3d/Icon3D";
import { ArrowLeft, CreditCard, Receipt, FileText, CheckCircle2, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

/** Parent view: child selector + fee summary + history + receipts (read-only, NO Pay Now). */
export default async function ParentFeesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const ctx = await requireRole("PARENT");
  const db = await createServerSupabaseClient();
  const scope = await getParentScope(db, ctx);
  const { children } =
    scope === null ? { children: [] } : await listChildren(db, ctx, scope.parentId);

  const requested = sp["studentId"];
  // Scope guard: only linked children are ever viewable (server-enforced).
  const selectedId =
    requested !== undefined && children.some((c) => c.id === requested)
      ? requested
      : (children[0]?.id ?? "");
  const selected = children.find((c) => c.id === selectedId);

  const { fees } =
    selectedId === "" ? { fees: [] } : await listStudentFees(db, ctx, selectedId);

  const grandTotal = fees.reduce((sum, f) => sum + f.total, 0);
  const grandPaid = fees.reduce((sum, f) => sum + f.paid, 0);
  const grandDue = grandTotal - grandPaid;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Institutional Fee Ledger"
        description={`${ctx.profile.fullName} · Official School Receipts & Accounts`}
        iconName="fees"
        iconTone="emerald"
      >
        <Link href="/parent">
          <Button3D variant="ghost" size="md" icon={<ArrowLeft className="size-4" />}>
            <span>Back to Family Portal</span>
          </Button3D>
        </Link>
      </PageHeader>

      {scope === null ? (
        <Card3D depth="flat" className="p-6 text-center text-muted-foreground text-sm">
          No parent profile is linked to your login yet. Please contact the school administrative desk.
        </Card3D>
      ) : children.length === 0 ? (
        <EmptyState message="No children are linked to your account yet." />
      ) : (
        <>
          {/* Child Selector */}
          <Card3D depth="raised" className="p-5">
            <form method="get" className="flex flex-wrap items-end gap-3">
              <label className="flex-1 min-w-[240px]">
                <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Select Enrolled Student
                </span>
                <select
                  name="studentId"
                  defaultValue={selectedId}
                  className="w-full bg-white border border-[#c5d2e1] text-foreground text-xs rounded-xl py-2 px-3 shadow-[var(--shadow-3d-recessed)] transition-all focus:outline-none focus:border-[#0b6fdb] focus:ring-2 focus:ring-[#0b6fdb]/20"
                >
                  {children.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.displayName}
                      {c.classes?.name ? ` · ${c.classes.name}` : ""}
                      {c.sections?.name ? ` ${c.sections.name}` : ""}
                    </option>
                  ))}
                </select>
              </label>
              <Button3D type="submit" variant="primary" size="md">
                <span>View Fee Status</span>
              </Button3D>
            </form>
          </Card3D>

          {fees.length === 0 ? (
            <EmptyState message="No fees assigned to this student yet." />
          ) : (
            <>
              {/* 3D KPI Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard3D
                  title="Total Assessed Fee"
                  value={`₹${grandTotal.toLocaleString("en-IN")}`}
                  iconName="fees"
                  tone="blue"
                  subtitle="Academic term invoice"
                />
                <StatCard3D
                  title="Total Fee Settled"
                  value={`₹${grandPaid.toLocaleString("en-IN")}`}
                  iconName="fees"
                  tone="emerald"
                  subtitle="Verified receipts on file"
                />
                <StatCard3D
                  title="Outstanding Dues"
                  value={`₹${grandDue.toLocaleString("en-IN")}`}
                  iconName="alert"
                  tone={grandDue > 0 ? "rose" : "slate"}
                  subtitle={grandDue > 0 ? "Payable at school cashier" : "All accounts clear"}
                />
              </div>

              {/* Fee Structures Breakdown */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                  Fee Schedules & Verified Receipts
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  {fees.map((f) => (
                    <Card3D key={f.id} depth="raised" className="p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e1e8f0]">
                        <div className="flex items-center gap-3">
                          <Icon3D name="fees" tone={f.status === "PAID" ? "emerald" : f.status === "PARTIAL" ? "amber" : "rose"} size="md" depth={true} />
                          <div>
                            <h4 className="text-base font-bold text-foreground">{f.structureName}</h4>
                            <p className="text-xs text-muted-foreground">
                              Assessed: ₹{f.total.toLocaleString("en-IN")} · Paid: ₹{f.paid.toLocaleString("en-IN")}
                              {f.dueDate !== null ? ` · Due date: ${f.dueDate}` : ""}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge3D
                            tone={f.status === "PAID" ? "emerald" : f.status === "PARTIAL" ? "amber" : "rose"}
                            size="md"
                            dot={true}
                          >
                            {f.status}
                            {f.overdue ? " · OVERDUE" : ""}
                          </Badge3D>
                        </div>
                      </div>

                      {/* Payment History Inside Fee */}
                      <div className="mt-4">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                          <Receipt className="size-3.5" />
                          <span>Transaction Log & Receipts</span>
                        </h5>

                        {f.records.length === 0 ? (
                          <p className="text-xs text-muted-foreground italic">No payments recorded against this schedule yet.</p>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs border-collapse">
                              <thead>
                                <tr className="border-b border-[#edf2f7] text-muted-foreground font-semibold font-mono">
                                  <th className="py-2 px-3">Date</th>
                                  <th className="py-2 px-3">Mode</th>
                                  <th className="py-2 px-3">Amount</th>
                                  <th className="py-2 px-3">Verification</th>
                                  <th className="py-2 px-3 text-right">Receipt</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-[#f1f5f9]">
                                {f.records.map((r) => (
                                  <tr key={r.id} className="hover:bg-zinc-50/50">
                                    <td className="py-2.5 px-3 font-mono">{r.paidOn}</td>
                                    <td className="py-2.5 px-3 font-semibold">{r.mode}</td>
                                    <td className="py-2.5 px-3 font-bold text-emerald-700">₹{r.amount.toLocaleString("en-IN")}</td>
                                    <td className="py-2.5 px-3">
                                      <Badge3D tone={r.verifiedBy !== null ? "emerald" : "amber"} size="sm">
                                        {r.verifiedBy !== null ? "Verified" : "Pending"}
                                      </Badge3D>
                                    </td>
                                    <td className="py-2.5 px-3 text-right">
                                      {r.receiptName !== null ? (
                                        <AttachmentLink
                                          homeworkId={r.id}
                                          attachmentId={r.id}
                                          label={`Receipt: ${r.receiptName}`}
                                          kind="receipt"
                                        />
                                      ) : (
                                        <span className="text-muted-foreground">—</span>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </Card3D>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground italic mt-3">
                  * All transactions reflect school-verified financial records. Official receipts are issued with digitally signed cryptographic links.
                </p>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
