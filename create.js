import { create } from './libs/service.lib';

export async function main(event) {
  const data = JSON.parse(event.body);
  return await create(data, event.requestContext);
}
