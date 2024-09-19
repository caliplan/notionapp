const { Client } = require('@notionhq/client');
require('dotenv').config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });

exports.handler = async (event, context) => {
  // Handle GET request for initial connection test
  if (event.httpMethod === 'GET') {
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
  }

  // Handle POST request for adding test text
  if (event.httpMethod === 'POST' && event.path === '/api/add-test-text') {
    try {
      const response = await notion.blocks.children.append({
        block_id: process.env.NOTION_PAGE_ID,
        children: [
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: "This is a test entry from the React app.",
                  },
                },
              ],
            },
          },
        ],
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Test text added to Notion page", blockId: response.results[0].id })
      };
    } catch (error) {
      console.error('Error adding test text to Notion:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to add test text to Notion" })
      };
    }
  }

  // If no matching route is found
  return {
    statusCode: 404,
    body: JSON.stringify({ error: "Not Found" })
  };
};