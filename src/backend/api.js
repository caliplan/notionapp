const { Client } = require('@notionhq/client');
const { handler: authMiddleware } = require('./authMiddleware');

require('dotenv').config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });

exports.handler = async (event, context) => {
  // First, run the auth middleware
  const authResult = await authMiddleware(event, context);
  if (authResult.statusCode === 401) {
    return authResult;
  }

  try {
    // Basic test query
    const response = await notion.search({
      query: '',
      filter: {
        property: 'object',
        value: 'database'
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Connected to Notion API", databases: response.results.length })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to connect to Notion API" })
    };
  }
};