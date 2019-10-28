import AWS from 'aws-sdk';

let dynamoDb = null;

export const call = (action, params) => {
  if (!dynamoDb) dynamoDb = new AWS.DynamoDB.DocumentClient();
  return dynamoDb[action](params).promise();
};
