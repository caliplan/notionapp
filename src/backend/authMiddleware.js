exports.handler = async (event, context) => {
  const apiKey = event.headers['x-api-key'];
  console.log('Received API Key:', apiKey);
  console.log('Expected API Key:', process.env.API_KEY);
  
  if (!apiKey || apiKey !== process.env.API_KEY) {
    console.log('API Key authentication failed');
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }
  
  console.log('API Key authentication successful');
  // If the API key is valid, continue to the next function
  return await context.next();
};
