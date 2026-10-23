import { NextRequest, NextResponse } from "next/server";
import { demoEnquirySchema } from "@/lib/validation/schemas";
import { SchoolDB } from "@/lib/db/store";
import { apiSuccess, apiError, toAppError, AppError } from "@/lib/errors";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = demoEnquirySchema.safeParse(body);

    if (!parsed.success) {
      throw new AppError("VALIDATION_ERROR", "Invalid demonstration enquiry", {
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const ipAddress =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const enquiryId = `ENQ-${Date.now().toString().slice(-6)}`;

    // Record audit event
    await SchoolDB.logAuditEvent({
      action: "public.demo_enquiry",
      actorEmail: parsed.data.email,
      targetType: "Enquiry",
      targetId: enquiryId,
      outcome: "success",
      metadata: {
        schoolName: parsed.data.schoolName,
        contactPerson: parsed.data.contactPerson,
        studentCount: parsed.data.studentCount,
      },
      ipAddress,
    });

    return NextResponse.json(
      apiSuccess({
        enquiryId,
        message:
          "Thank you for requesting a SIMPLEIN School demonstration. Our education technology consultants have received your enquiry and will contact you within 24 business hours.",
      }),
      { status: 201 }
    );
  } catch (error) {
    const appError = toAppError(error);
    return NextResponse.json(apiError(appError), {
      status: appError.statusCode,
    });
  }
}
