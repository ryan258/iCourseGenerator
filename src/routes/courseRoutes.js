// src/routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const contentRetrieverAgent = require('../agents/contentRetrieverAgent');
const courseGeneratorAgent = require('../agents/courseGeneratorAgent');
const logger = require('../utils/logger');

router.post('/generate-course', async (req, res) => {
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
    await logger.logToFile(logContent);

    res.end();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).end('An error occurred while generating the course');
    await logger.logToFile(`Error occurred: ${error.message}`);
  }
});

module.exports = router;