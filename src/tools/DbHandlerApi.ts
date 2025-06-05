import 'dotenv/config';
import mysql from 'mysql2/promise';
import { join } from 'path';


const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };
  
const getDb = async() => {
    return mysql.createConnection(dbConfig);
  };


  
export async function getDataBaseSchema () : Promise<string> {
    const conn = await getDb();
    try {
      const [tables] = await conn.execute(`
        SELECT TABLE_NAME AS name 
        FROM information_schema.tables 
        WHERE table_schema = ? AND table_type = 'BASE TABLE'
      `, [dbConfig.database]);
  
      const tableInfo = [];
      for (const table of tables as any[]) {
        const [createStmt] : any[] = await conn.query(`SHOW CREATE TABLE \`${table.name}\``);
        tableInfo.push({
          name: table.name,
          sql: createStmt[0]["Create Table"]
        });
      }

      return JSON.stringify({
            description: "Schema definition for all tables in the database",
            tableCount: tableInfo.length,
            tableNames: tableInfo.map(t => t.name),
            tableShema: tableInfo.map(t => t.sql).join("\n\n"),
      });

    } finally {
        await conn.end();
      }
}

export async function query(args:any) :Promise<string> {
  const conn = await getDb();
  try {
    const [results] = await conn.query(args.sql);
    return  JSON.stringify(results, null, 2)  
  } catch (err: unknown) {
    return `Error: ${(err as Error).message}`  
  } finally {
    await conn.end();
  }
}