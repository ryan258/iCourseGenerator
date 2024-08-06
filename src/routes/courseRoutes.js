const express = require('express');
const router = express.Router();
const contentRetrieverAgent = require('../agents/contentRetrieverAgent');
const courseGeneratorAgent = require('../agents/courseGeneratorAgent');
const logger = require('../utils/logger');
const marked = require('marked');

router.post('/generate-course', async (req, res) => {
  const { topics } = req.body;

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Transfer-Encoding', 'chunked');

  try {
    const timestamp = new Date().toISOString();
    let logContent = `${timestamp}\nTopics: ${topics.join(', ')}\n\n`;
    let htmlContent = '<div class="course-content">';

    // Use Content Retriever to get current information (streaming)
    htmlContent += "<h2>Current Information:</h2>";
    res.write(htmlContent);
    logContent += "Current Information:\n";
    const currentInfo = await contentRetrieverAgent.tools[0].function(topics.join(' '), res, true);
    logContent += currentInfo + "\n\n";
    
    htmlContent = "<h2>Course Outline:</h2>";
    res.write(htmlContent);
    logContent += "Course Outline:\n";

    // Use Course Generator to create course outline
    const courseOutline = await courseGeneratorAgent.tools[0].function(topics);
    const htmlOutline = marked.parse(courseOutline);
    res.write(htmlOutline);
    logContent += courseOutline;

    res.write('</div>');
    res.end();

    // Log the entire content to the file
    await logger.logToFile(logContent);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).end('<p class="error">An error occurred while generating the course</p>');
    await logger.logToFile(`Error occurred: ${error.message}`);
  }
});

module.exports = router;