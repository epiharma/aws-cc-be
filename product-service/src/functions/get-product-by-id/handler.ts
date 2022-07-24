import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/api-gateway';
import {formatJSONResponse} from '@libs/api-gateway';
import {middyfy} from '@libs/lambda';
import {DB} from "@libs/db";

export const getProductById: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
    try {
        const id = (event?.pathParameters?.id).toString();
        if (!id) return formatJSONResponse(400, {message: 'Bad request'});

        const product = await DB.getProductById(id);
        if (!product) return formatJSONResponse(404, {message: 'Product not found'});

        return formatJSONResponse(200, {
            product
        });
    } catch (error) {
        return formatJSONResponse(500, {
            message: error.message
        });
    }
};

export const main = middyfy(getProductById);
