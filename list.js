import { list } from './libs/service.lib';

export async function main(event) {
  return await list(event.requestContext);
}
