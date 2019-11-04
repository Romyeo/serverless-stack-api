import { remove } from './libs/service.lib';

export async function main(event) {
  return await remove(event.pathParameters.id, event.requestContext);
}
