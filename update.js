import { call } from './libs/dynamo.lib';
import { success, failed } from './libs/response.lib';

export async function main(event) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    },
    UpdateExpression: 'SET Content = :content, attachment = :attachment',
    ExpressionAttributeValues: {
      ':attachment': data.attachment || null,
      ':content': data.content || null
    },
    ReturnValues: 'ALL_NEW'
  };

  try {
    await call('update', params);
    return success({ status: true });
  } catch (err) {
    return failed({ status: false });
  }
}
