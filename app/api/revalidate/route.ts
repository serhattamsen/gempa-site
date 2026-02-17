import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function checkSecret(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  return !!secret && secret === process.env.REVALIDATE_SECRET;
}

// Tarayıcıdan test edebilmek için GET
export async function GET(req: NextRequest) {
  if (!checkSecret(req)) {
    return NextResponse.json({ ok: false, message: "Invalid secret" }, { status: 401 });
  }

  return NextResponse.json({
    ok: true,
    method: "GET",
    message: "Endpoint alive. Use POST to revalidate.",
    envHasSecret: !!process.env.REVALIDATE_SECRET,
  });
}

export async function POST(req: NextRequest) {
  if (!checkSecret(req)) {
    return NextResponse.json({ ok: false, message: "Invalid secret" }, { status: 401 });
  }

  let body: any = {};
  try {
    body = await req.json();
  } catch {}

  // Senin sayfalar /home, /hakkimizda, /iletisim diye çalışıyor.
  revalidatePath("/home");
  revalidatePath("/hakkimizda");
  revalidatePath("/iletisim");

  // Eğer body’den slug gelirse (opsiyonel)
  const slug = body?.slug?.current || body?.slug;
  if (slug) revalidatePath(`/${slug}`);

  return NextResponse.json({
    ok: true,
    method: "POST",
    revalidated: true,
    now: Date.now(),
    receivedSlug: slug ?? null,
  });
}