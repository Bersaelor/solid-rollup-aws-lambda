import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import renderHtml from './ssg/lib/index.js';

function makeHeader(content: string, maxAge = 60) {
  return {
    'Cache-Control': `max-age=${maxAge},must-revalidate`,
    'Content-Type': content
  };
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
  }
  // All log statements are written to CloudWatch
  console.info('received:', event);

  const id = event.queryStringParameters && event.queryStringParameters.id;

  // in production we would run some AWS functions here to get data from our database

  try {
    const html = await renderHtml({
      id: id,
    })

    return {
      statusCode: 200,
      headers: makeHeader('text/html; charset=utf-8'),
      body: html,
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'some error happened',
      }),
    };
  }
};
