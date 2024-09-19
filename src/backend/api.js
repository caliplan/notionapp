const { Client } = require('@notionhq/client');
const { handler: authMiddleware } = require('./authMiddleware');

require('dotenv').config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });

exports.handler = async (event, context) => {
  console.log('Function invoked');
  try {
    // First, run the auth middleware
    console.log('Running auth middleware');
    const authResult = await authMiddleware(event, context);
    if (authResult && authResult.statusCode === 401) {
      console.log('Authentication failed');
      return authResult;
    }

    console.log('Authentication successful');

    // Basic test query
    console.log('Querying Notion API');
    const response = await notion.search({
      query: '',
      filter: {
        property: 'object',
        value: 'database'
      }
    });

    console.log('Notion API response:', JSON.stringify(response));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Connected to Notion API", databases: response.results.length })
    };
  } catch (error) {
    console.error('Error in API function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to connect to Notion API", details: error.message })
    };
  }
};