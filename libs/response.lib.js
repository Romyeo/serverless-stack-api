const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true
};

const buildResponse = (statusCode, body) => ({
  statusCode,
  headers: HEADERS,
  body: JSON.stringify(body)
});

export const success = body => buildResponse(200, body);
export const failed = body => buildResponse(500, body);
