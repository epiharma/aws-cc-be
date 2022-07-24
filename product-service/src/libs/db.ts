import { Client } from 'pg';
import {Product} from "../models/product";

const { DB_HOST, DB_PORT, DB_NAME, DB_PASSWORD, DB_USERNAME } = process.env;

export class DB {
    static async getProducts(): Promise<Product[]> {
        return await DB.openConnection(async (client) => {
            const { rows: productsList } = await client.query(
                'select id,title,description,price,count from products join stocks on id=product_id order by id'
            );
            return productsList;
        });
    }

    static async getProductById(productId: string): Promise<Product> {
        return await DB.openConnection(async (client) => {
            const { rows: [product] } = await client.query(
                'select id,title,description,price,count from products join stocks on id=product_id where id=$1',
                [productId]
            );
            return product;
        });
    }

    static async createProduct(payload: Omit<Product, 'id'>) {
        const id = await DB.openConnection(async (client) => {
            const { title, description, price, count } = payload;
            const { rows } = await client.query<{ id: string }>('insert into products(title,description,price) values ($1,$2,$3) returning id', [title, description, price]);
            const { id } = rows[0];

            await client.query('insert into stocks(product_id,count) values ($1,$2)', [id, count]);
            return id;
        });

        return await DB.getProductById(id);
    }

    private static async openConnection<T>(handler: (client: Client) => Promise<T>) {
        const client = DB.getClient();
        try {
            await client.connect();
            return await handler(client);
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            await client.end();
        }
    }

    private static getClient(): Client {
        return new Client({
            user: DB_USERNAME,
            host: DB_HOST,
            port: +DB_PORT,
            database: DB_NAME,
            password: DB_PASSWORD,
            connectionTimeoutMillis: 5000,
            ssl: {
                rejectUnauthorized: false,
            }
        });
    }
}