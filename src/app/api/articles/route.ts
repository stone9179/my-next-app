import { NextRequest, NextResponse } from "next/server";
import db from "src/db";

// 分页查询
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const pageNum = Number(searchParams.get("pageNum") || "1");
    const pageSize = Number(searchParams.get("pageSize") || "10");
    const titleParam = searchParams.get("title") || "";
    const contentParam = searchParams.get("content") || "";
    const idParam = searchParams.get("id") || "";
    const data = db.data.posts;

    let res = data;

    if (idParam) {
      res = res.filter((item) => String(item.id) === String(idParam));
    }

    if (titleParam) {
      res = res.filter((item) => item.title.toLowerCase().includes(titleParam.toLowerCase()));
    }

    if (contentParam) {
      res = res.filter((item) => item.content.toLowerCase().includes(contentParam.toLowerCase()));
    }

    const total = res.length;
    const startIndex = (pageNum - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, total);
    res = startIndex > total ? [] : res.slice(startIndex, endIndex);
    return NextResponse.json({ code: 0, data: { list: res, total }, message: `成功` });
  } catch {
    return NextResponse.json({ code: 500, message: "服务器错误" }, { status: 500 });
  }
}

// 添加数据
export async function POST(request: Request) {
  try {
    // 验证内容类型
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json({ code: 400, message: "Invalid content type" }, { status: 400 });
    }
    // 安全解析 JSON
    const data = await request.json();
    await db.update(({ posts }) =>
      posts.unshift({
        id: Math.random().toString(36).substring(-4),
        ...data,
      })
    );
    return NextResponse.json({ code: 0, data, message: "添加成功" });
  } catch {
    return NextResponse.json({ code: 500, message: "JSON parse error" }, { status: 500 });
  }
}
