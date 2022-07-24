import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {products} from "../../data.mock";

export const getProductById: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
  const id = (event.pathParameters.id).toString();

  const product = products.find(product => product.id === id);
  if (!product) return { statusCode: 404, body: null }

  return formatJSONResponse({
    product
  });
};

export const main = middyfy(getProductById);
