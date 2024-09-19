exports.handler = async (event, context) => {
  const apiKey = event.headers['x-api-key'];
  
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }
  
  // If the API key is valid, continue to the next function
  return await context.next();
};
