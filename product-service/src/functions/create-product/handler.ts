import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/api-gateway';
import {formatJSONResponse} from '@libs/api-gateway';
import {middyfy} from '@libs/lambda';
import {DB} from "@libs/db";
import {Product} from "../../models/product";

export const createProduct: ValidatedEventAPIGatewayProxyEvent<any> = async (event: any) => {
    try {
        const payload = event?.body as Product;
        const product = await DB.createProduct(payload);
        return formatJSONResponse(201, product);
    } catch (error) {
        return formatJSONResponse(500, {
            message: error.message
        });
    }
};

export const main = middyfy(createProduct);
