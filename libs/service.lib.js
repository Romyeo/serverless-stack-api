import uuid from 'uuid';

import { call } from './dynamo.lib';
import { success, failed } from './response.lib';

export const get = async (id, requestContext) => {
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: requestContext.identity.cognitoIdentityId,
      noteId: id
    }
  };

  try {
    const { Item } = await call('get', params);

    if (!Item) return failed({ status: false, error: 'Note not found!' });

    return success(Item);
  } catch (err) {
    // Not the best approach to log an error
    console.log(err);
    return failed({ status: false });
  }
};

export const list = async requestContext => {
  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': requestContext.identity.cognitoIdentityId
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
};

export const create = async (data, requestContext) => {
  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: requestContext.identity.cognitoIdentityId,
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
};

export const update = async (id, data, requestContext) => {
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: requestContext.identity.cognitoIdentityId,
      noteId: id
    },
    UpdateExpression: 'SET content = :content, attachment = :attachment',
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
    // Not the best approach to log an error
    console.log(err);
    return failed({ status: false });
  }
};

export const remove = async (id, requestContext) => {
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: requestContext.identity.cognitoIdentityId,
      noteId: id
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
};
