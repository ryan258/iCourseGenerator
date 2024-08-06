const axios = require('axios');
const marked = require('marked');

const contentRetrieverAgent = {
  name: 'Content Retriever',
  description: 'Retrieves current information from the internet',
  tools: [
    {
      name: 'searchWeb',
      description: 'Searches the web for current information',
      async function(query, res, convertToHtml = false) {
        const response = await axios.post(process.env.API_URL, {
          model: process.env.MODEL_NAME,
          prompt: `Search the web for: ${query}\nProvide a summary of the most relevant and current information.`,
          stream: true
        }, {
          responseType: 'stream'
        });

        let fullResponse = '';
        for await (const chunk of response.data) {
          const lines = chunk.toString().split('\n').filter(line => line.trim() !== '');
          for (const line of lines) {
            const json = JSON.parse(line);
            if (json.response) {
              fullResponse += json.response;
            }
          }
        }
        
        if (convertToHtml) {
          const htmlContent = marked.parse(fullResponse);
          res.write(htmlContent);
        } else {
          res.write(fullResponse);
        }
        
        return fullResponse;
      }
    }
  ]
};

module.exports = contentRetrieverAgent;