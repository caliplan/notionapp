exports.handler = async (event, context) => {
  console.log('Auth middleware invoked');
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
  // If the API key is valid, we don't call context.next(), 
  // instead we just return null to indicate success
  return null;
};
