// File: index.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Content Retriever Agent
const contentRetrieverAgent = {
  name: 'Content Retriever',
  description: 'Retrieves current information from the internet',
  tools: [
    {
      name: 'searchWeb',
      description: 'Searches the web for current information',
      async function(query) {
        // Simulated web search using the local LLM
        const response = await axios.post(process.env.API_URL, {
          model: process.env.MODEL_NAME,
          prompt: `Search the web for: ${query}\nProvide a summary of the most relevant and current information.`,
          stream: false
        });
        return response.data.response;
      }
    }
  ]
};

// Course Generator Agent
const courseGeneratorAgent = {
  name: 'Course Generator',
  description: 'Generates interdisciplinary course content',
  tools: [
    {
      name: 'createCourseOutline',
      description: 'Creates a course outline based on given topics',
      async function(topics) {
        const response = await axios.post(process.env.API_URL, {
          model: process.env.MODEL_NAME,
          prompt: `Create a course outline for an interdisciplinary course covering the following topics: ${topics.join(', ')}. Provide a structured outline with main sections and subsections.`,
          stream: false
        });
        return response.data.response;
      }
    }
  ]
};

app.use(express.json());

app.post('/generate-course', async (req, res) => {
  const { topics } = req.body;

  try {
    // Use Content Retriever to get current information
    const currentInfo = await contentRetrieverAgent.tools[0].function(topics.join(' '));

    // Use Course Generator to create course outline
    const courseOutline = await courseGeneratorAgent.tools[0].function(topics);

    res.json({
      currentInfo,
      courseOutline
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while generating the course' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});