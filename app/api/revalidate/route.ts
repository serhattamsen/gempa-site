import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, message: "Invalid secret" }, { status: 401 });
  }

  // Sanity webhook body (istersen kullanırsın)
  let body: any = {};
  try {
    body = await req.json();
  } catch {}

  // En güvenlisi: en azından ana sayfaları revalidate et
  revalidatePath("/");
  revalidatePath("/hakkimizda");
  revalidatePath("/iletisim");

  // Eğer blog / slug sayfaların varsa ve tag kullandıysan:
  // revalidateTag("sanity");

  // Eğer body’den slug gelirse onu da revalidate edelim (opsiyonel)
  const slug = body?.slug?.current || body?.slug;
  if (slug) revalidatePath(`/${slug}`);

  return NextResponse.json({
    ok: true,
    revalidated: true,
    now: Date.now(),
    receivedSlug: slug ?? null,
  });
}