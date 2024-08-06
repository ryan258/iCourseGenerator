// File: index.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Utility function for logging
async function logToFile(content) {
  const logFile = path.join(__dirname, 'courses.log');
  await fs.appendFile(logFile, content + '\n\n');
}

// Content Retriever Agent
const contentRetrieverAgent = {
  name: 'Content Retriever',
  description: 'Retrieves current information from the internet',
  tools: [
    {
      name: 'searchWeb',
      description: 'Searches the web for current information',
      async function(query, res) {
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
              res.write(json.response);
            }
          }
        }
        return fullResponse;
      }
    }
  ]
};

// Course Generator Agent (unchanged)
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

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Transfer-Encoding', 'chunked');

  try {
    const timestamp = new Date().toISOString();
    let logContent = `${timestamp}\nTopics: ${topics.join(', ')}\n\n`;

    // Use Content Retriever to get current information (streaming)
    res.write("Current Information:\n");
    logContent += "Current Information:\n";
    const currentInfo = await contentRetrieverAgent.tools[0].function(topics.join(' '), res);
    logContent += currentInfo + "\n\n";
    
    res.write("\n\nCourse Outline:\n");
    logContent += "Course Outline:\n";

    // Use Course Generator to create course outline
    const courseOutline = await courseGeneratorAgent.tools[0].function(topics);
    res.write(courseOutline);
    logContent += courseOutline;

    // Log the entire content to the file
    await logToFile(logContent);

    res.end();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).end('An error occurred while generating the course');
    await logToFile(`Error occurred: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});