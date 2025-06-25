# Task Management Portal Backend

## Overview
This backend service is part of the Task Management Portal, which provides a robust API for managing tasks and integrating AI agents for task optimization and insights.

## Technologies Used
- Node.js
- Express.js
- MongoDB (or PostgreSQL)
- Mongoose (or Sequelize)
- AI Libraries (for AI functionalities)

## Setup Instructions

### Prerequisites
- Node.js installed on your machine
- MongoDB or PostgreSQL database set up

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the backend directory:
   ```
   cd task-management-portal/backend
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Configuration

Create a `.env` file in the backend directory to store environment variables such as database connection strings and API keys.

### Required Environment Variables

```
# Database configuration
DB_USER=...
DB_PASSWORD=...
DB_HOST=...
DB_PORT=...
DB_NAME=...

# JWT secret
JWT_SECRET=...

# AI Agent API configuration
AI_AGENT_API_URL=http://localhost:3000/api/ai

# OpenRouter AI configuration
OPENROUTER_API_URL=https://openrouter.ai/api/v1/chat/completions
OPENROUTER_MODEL=mistralai/mixtral-8x7b-instruct
OPENROUTER_API_KEY=your-openrouter-api-key-here

# (Optional) OpenAI GPT configuration
OPENAI_API_KEY=your-openai-api-key-here
OPENAI_MODEL=gpt-3.5-turbo

# (Optional) LangChain/Python AI microservice config
AI_MICROSERVICE_URL=http://localhost:5000/api/ai
```

> **Note:** Never commit your `.env` file or secret keys to version control.

### Running the Application
To start the backend server, run:
```
npm start
```
The server will run on `http://localhost:3000` (or your specified port).

## API Endpoints
- **GET /api/tasks**: Retrieve all tasks
- **POST /api/tasks**: Create a new task
- **PUT /api/tasks/:id**: Update an existing task
- **DELETE /api/tasks/:id**: Delete a task

## AI Integration
The backend includes services that interact with AI agents to provide task optimization and suggestions. Refer to the `aiAgentService.js` for more details on available functionalities.

## Security & Secret Management

- **All secrets and sensitive configuration (DB credentials, API keys, JWT secrets, etc.) must be stored in a `.env` file.**
- **Never commit `.env` or any secret files to version control.**
- See [SECURITY.md](./SECURITY.md) for best practices.

## Contribution
Feel free to submit issues or pull requests for improvements and features.

## License
This project is licensed under the MIT License.