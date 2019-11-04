import { get } from './libs/service.lib';

export async function main(event) {
  return await get(event.pathParameters.id, event.requestContext);
}
