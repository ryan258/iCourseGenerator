# Interdisciplinary Course Generator

This project is an AI-powered tool that creates customized educational content by combining insights from different fields of study. It uses local AI models to generate interdisciplinary course outlines and retrieve current information on given topics.

## Features

- Generates interdisciplinary course outlines based on user-provided topics
- Retrieves current information related to the course topics
- Streams responses for real-time feedback
- Logs generated courses for future reference

## Prerequisites

- Node.js (v12 or later)
- npm (comes with Node.js)
- [Ollama](https://ollama.ai/) running locally with the "llama3.1:latest" model

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/ryan258/interdisciplinary-course-generator.git
   cd interdisciplinary-course-generator
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the project root with the following content:
   ```
   API_URL=http://localhost:11434/api/generate
   MODEL_NAME=llama3.1:latest
   PORT=3000
   ```

4. Ensure Ollama is running with the "llama3.1:latest" model.

## Usage

1. Start the server:
   ```
   npm start
   ```

2. Send a POST request to `http://localhost:3000/generate-course` with a JSON body containing the topics:
   ```json
   {
     "topics": ["Artificial Intelligence", "Environmental Science", "Ethics"]
   }
   ```

3. The server will stream the response, providing real-time updates as the course is generated.

4. Check the `courses.log` file for a record of all generated courses.

## Project Structure

- `index.js`: Main application file containing the server setup and AI agents
- `package.json`: Project metadata and dependencies
- `.env`: Environment variables
- `courses.log`: Log file for generated courses

## Roadmap

Here are some ideas for future development of the Interdisciplinary Course Generator:

1. Enhanced Content Analysis
   - Implement more advanced NLP techniques for better topic modeling
   - Integrate sentiment analysis to gauge the tone and perspective of retrieved information

2. Improved Educational Theory Integration
   - Develop a machine learning model to suggest optimal teaching methods based on topic combinations
   - Incorporate learning style assessments to tailor course structure to individual learners

3. Advanced Personalization
   - Implement a recommendation system for suggesting related topics or courses
   - Develop adaptive learning paths that adjust based on user progress and feedback

4. Expanded Course Structure Generation
   - Create more detailed course structures including lesson plans, assignments, and assessments
   - Implement a knowledge graph to visualize connections between different topics and disciplines

5. Enhanced Content Retrieval and Synthesis
   - Integrate fact-checking mechanisms to ensure the accuracy of retrieved information
   - Implement multi-source information synthesis for a more comprehensive overview of topics

6. Improved User Interface
   - Develop a web-based GUI for easier interaction with the course generator
   - Create interactive visualizations of the generated course structure and topic relationships

7. Collaboration Features
   - Implement real-time collaboration tools for multiple users to work on course generation together
   - Add commenting and annotation features for peer review of generated courses

8. Integration with Learning Management Systems (LMS)
   - Develop plugins or APIs to integrate the generated courses with popular LMS platforms
   - Create export options for various LMS formats

9. Multilingual Support
   - Extend the system to generate courses in multiple languages
   - Implement cross-lingual information retrieval for a global perspective on topics

10. Evaluation and Feedback Loop
    - Develop mechanisms for users to provide feedback on generated courses
    - Implement machine learning models to continuously improve course generation based on user feedback

By pursuing these developments, the Interdisciplinary Course Generator can evolve into a more powerful, flexible, and user-friendly tool for creating innovative educational content.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.