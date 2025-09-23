import { NextResponse } from "next/server";
import db from "src/db";

interface IParams {
  params: { id: string };
}

// 删除
export async function DELETE(request: Request, { params }: IParams) {
  await db.update(({ posts }) => {
    const idx = posts.findIndex((p) => p.id === params.id);
    if (idx > -1) {
      posts.splice(idx, 1);
    }
  });
  return NextResponse.json({ code: 0, message: `删除成功` });
}

// 修改
export async function PATCH(request: Request, { params }: IParams) {
  const data = await request.json();
  let idx = -1;
  await db.update(({ posts }) => {
    idx = posts.findIndex((p) => p.id === params.id);
    if (idx > -1) {
      posts[idx] = { ...posts[idx], ...data };
    }
  });
  if (idx > -1) {
    return NextResponse.json({ code: 0, data: db.data.posts[idx], message: `成功` });
  } else {
    return NextResponse.json({ code: 404, message: "文章不存在" }, { status: 404 });
  }
}
// 查找
export async function GET(request: Request, { params }: IParams) {
  const idx: number = db.data.posts.findIndex((p) => p.id === params.id);
  if (idx > -1) {
    return NextResponse.json({ code: 0, data: db.data.posts[idx], message: `成功` });
  } else {
    return NextResponse.json({ code: 404, message: "文章不存在" }, { status: 404 });
  }
}
