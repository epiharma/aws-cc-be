import { getProducts } from './handler'
import {products} from "../../data.mock";

describe('getProducts handler', () => {
    it('should return successful response', async () => {
        // @ts-ignore
        const result: any = await getProducts();

        expect(result.statusCode).toEqual(200);
        expect(JSON.parse(result.body)).toEqual(products);
    });
});