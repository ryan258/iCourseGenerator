# Interdisciplinary Course Generator

This project is an AI-powered tool that creates customized educational content by combining insights from different fields of study. It uses local AI models to generate interdisciplinary course outlines and retrieve current information on given topics.

## Features

- Generates interdisciplinary course outlines based on user-provided topics
- Retrieves current information related to the course topics
- Streams responses for real-time feedback
- Logs generated courses for future reference
- Provides a web-based GUI for easy interaction

## Prerequisites

- Node.js (v12 or later)
- npm (comes with Node.js)
- [Ollama](https://ollama.ai/) running locally with the "llama3.1:latest" model

## Project Structure

```
interdisciplinary-course-generator/
├── src/
│   ├── agents/
│   │   ├── contentRetrieverAgent.js
│   │   └── courseGeneratorAgent.js
│   ├── routes/
│   │   └── courseRoutes.js
│   ├── utils/
│   │   └── logger.js
│   └── server.js
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── script.js
│   └── index.html
├── .env
├── package.json
└── README.md
```

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/ryan258/iCourseGenerator.git
   cd iCourseGenerator
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
   For development with auto-restart on file changes:
   ```
   npm run dev
   ```

2. Open a web browser and navigate to `http://localhost:3000`.

3. Enter comma-separated topics in the input field and click "Generate Course".

4. The generated course content will be displayed in real-time.

5. Check the `courses.log` file in the project root for a record of all generated courses.

## API Endpoint

- `POST /api/generate-course`
  - Request body: `{ "topics": ["topic1", "topic2", "topic3"] }`
  - Response: Streamed plain text content of the generated course

## Development

### Adding New Agents

1. Create a new file in the `src/agents` directory.
2. Define the agent object with a name, description, and tools.
3. Export the agent object.
4. Import and use the new agent in `src/routes/courseRoutes.js`.

### Modifying the Web Interface

- HTML: Edit `public/index.html`
- CSS: Modify `public/css/styles.css`
- JavaScript: Update `public/js/script.js`

### Adding New Routes

1. Create a new file in the `src/routes` directory.
2. Define your routes using Express Router.
3. Import and use the new routes in `src/server.js`.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
