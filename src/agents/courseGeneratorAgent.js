// src/agents/courseGeneratorAgent.js
const axios = require('axios');

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

module.exports = courseGeneratorAgent;