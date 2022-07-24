import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/api-gateway';
import {formatJSONResponse} from '@libs/api-gateway';
import {middyfy} from '@libs/lambda';
import {DB} from "@libs/db";

export const getProducts: ValidatedEventAPIGatewayProxyEvent<any> = async () => {
    try {
        const products = await DB.getProducts();
        return formatJSONResponse(200, products);
    } catch (error) {
        return formatJSONResponse(500, {
            message: error.message
        });
    }
};

export const main = middyfy(getProducts);
