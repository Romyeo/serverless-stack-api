import uuid from 'uuid';

import { call } from './libs/dynamo.lib';
import { success, failed } from './libs/response.lib';

export async function main(event) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };

  try {
    await call('put', params);
    return success(params.Item);
  } catch (err) {
    // Not the best approach to log an error
    console.log(err);
    return failed({ status: false });
  }
}
