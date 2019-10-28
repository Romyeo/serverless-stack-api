import { call } from './libs/dynamo.lib';
import { failed, success } from './libs/response.lib';

export async function main(event) {
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  };

  try {
    await call('delete', params);
    return success({ status: true });
  } catch (err) {
    // Not the best approach to log an error
    console.log(err);
    return failed({ status: false });
  }
}
