import { call } from './libs/dynamo.lib';
import { failed, success } from './libs/response.lib';

export async function main(event) {
  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': event.requestContext.identity.cognitoIdentityId
    }
  };

  try {
    const { Items } = await call('query', params);
    return success(Items);
  } catch (err) {
    // Not the best approach to log an error
    console.log(err);
    return failed({ status: false });
  }
}
