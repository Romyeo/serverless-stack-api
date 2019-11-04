import { update } from './libs/service.lib';

export async function main(event) {
  const data = JSON.parse(event.body);
  return await update(event.pathParameters.id, data, event.requestContext);
}
