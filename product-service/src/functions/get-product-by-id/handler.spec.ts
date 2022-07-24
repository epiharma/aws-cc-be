import { getProductById } from './handler'
import {products} from "../../data.mock";

describe('getProductById handler', () => {
    it('should return successful response', async () => {
        const event = {pathParameters: {id: '1'}};
        // @ts-ignore
        const result: any = await getProductById(event);

        expect(result.statusCode).toEqual(200);
        expect(JSON.parse(result.body)).toEqual({product: products[0]});
    })
    it('should return 404 not found response', async () => {
        // @ts-ignore
        const result: any = await getProductById({pathParameters: {id: 'unknown'}});
        expect(result.statusCode).toEqual(404);
    })
});