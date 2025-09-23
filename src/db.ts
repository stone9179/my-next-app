import { JSONFilePreset } from "lowdb/node";

// read or create db.json
interface IDefaultData {
  posts: { id: string; title: string; content: string }[];
}
const defaultData: IDefaultData = { posts: [] };
const db = await JSONFilePreset("db.json", defaultData);

export default db;

// // update db.json
// await db.update(({ posts }) => posts.push("hello world!"));

// // alternatively you can call db.write() explicitly later
// // to write to db.json
// db.data.posts.push("hello world!");
// await db.write();
