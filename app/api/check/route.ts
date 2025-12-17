import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { url } = (await req.json()) as { url?: string };
    if (!url) {
      return NextResponse.json(
        {
          online: false,
          status: null,
          responseTime: null,
          timestamp: new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }),
          error: "URLが指定されていません。",
        },
        { status: 400 }
      );
    }

    const start = Date.now();
    const res = await fetch(url, { method: "GET", redirect: "follow" });
    const ms = Date.now() - start;

    return NextResponse.json({
      online: res.ok,
      status: res.status,
      responseTime: ms,
      timestamp: new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }),
      checkedUrl: url,
    });
  } catch (e) {
    return NextResponse.json(
      {
        online: false,
        status: null,
        responseTime: null,
        timestamp: new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }),
        error: "チェック中にエラーが発生しました。",
      },
      { status: 200 }
    );
  }
}
