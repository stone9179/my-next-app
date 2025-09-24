import { NextRequest, NextResponse } from "next/server";
import db from "src/db";

// 使用 Next.js 兼容的接口定义
interface IContext {
  params: Promise<{
    id: string;
  }>;
}

// 删除
export async function DELETE(_request: Request, context: IContext) {
  const { id } = await context.params; // 等待 params 解析

  await db.update(({ posts }) => {
    const idx = posts.findIndex((p) => p.id === id);
    if (idx > -1) {
      posts.splice(idx, 1);
    }
  });
  return NextResponse.json({ code: 0, message: `删除成功` });
}

// 修改
export async function PATCH(request: NextRequest, context: IContext) {
  try {
    const { id } = await context.params; // 等待 params 解析
    const data = await request.json();
    let idx = -1;
    await db.update(({ posts }) => {
      idx = posts.findIndex((p) => p.id === id);
      if (idx > -1) {
        posts[idx] = { ...posts[idx], ...data };
      }
    });
    if (idx > -1) {
      return NextResponse.json({ code: 0, data: db.data.posts[idx], message: `更新成功` });
    } else {
      return NextResponse.json({ code: 404, message: "文章不存在" }, { status: 404 });
    }
  } catch {
    return NextResponse.json({ code: 500, message: "服务器内部错误" }, { status: 500 });
  }
}

// 查找
export async function GET(_request: NextRequest, context: IContext) {
  try {
    await db.read(); // 确保读取最新数据
    const { id } = await context.params; // 等待 params 解析
    const post = db.data.posts.find((p) => p.id === id);
    if (post) {
      return NextResponse.json({ code: 0, data: post, message: `获取成功` });
    } else {
      return NextResponse.json({ code: 404, message: "文章不存在" }, { status: 404 });
    }
  } catch {
    return NextResponse.json({ code: 500, message: "服务器内部错误" }, { status: 500 });
  }
}
