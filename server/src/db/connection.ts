import mysql from "mysql";
import { ENV } from "../config";

const connection = mysql.createConnection({
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  user: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
});

connection.connect((error) => {
  if (error) {
    console.log("Error connection: " + error.stack);
    return;
  }
  console.log("Connected to database");
});

export async function mutate(query: string): Promise<string | null> {
  const promise = new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });

  try {
    const result: any = await promise;
    return result.affectedRows + " Affected Row(s)";
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function query<T>(query: string): Promise<T[]> {
  const promise = new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });

  try {
    const data = (await promise) as T[];
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
