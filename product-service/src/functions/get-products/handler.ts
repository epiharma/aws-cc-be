import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {products} from "../../data.mock";

export const getProducts: ValidatedEventAPIGatewayProxyEvent<any> = async () => {
  return formatJSONResponse(products);
};

export const main = middyfy(getProducts);
