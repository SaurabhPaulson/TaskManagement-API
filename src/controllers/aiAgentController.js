require('dotenv').config();
const axios = require('axios');

// Use environment variables for AI config
const OPENROUTER_API_URL = process.env.OPENROUTER_API_URL;
const MODEL = process.env.OPENROUTER_MODEL;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// (Optional) OpenAI config for future use
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL;

// (Optional) Python microservice config
const AI_MICROSERVICE_URL = process.env.AI_MICROSERVICE_URL;

async function callOpenRouter(messages) {
    try {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (OPENROUTER_API_KEY) {
            headers['Authorization'] = `Bearer ${OPENROUTER_API_KEY}`;
        }
        const response = await axios.post(
            OPENROUTER_API_URL,
            {
                model: MODEL,
                messages,
                max_tokens: 150,
                temperature: 0.7,
            },
            { headers }
        );
        // Defensive: check if choices exist
        if (
            response.data &&
            Array.isArray(response.data.choices) &&
            response.data.choices.length > 0 &&
            response.data.choices[0].message &&
            response.data.choices[0].message.content
        ) {
            return response.data.choices[0].message.content.trim();
        }
        return "AI service did not return a valid response.";
    } catch (e) {
        if (e.response && e.response.status === 401) {
            return "AI service is currently unavailable (401 Unauthorized). Please try again later or use a different model.";
        }
        return "AI service error: " + (e.message || "Unknown error");
    }
}

exports.assignmentSuggestion = async (req, res) => {
    try {
        const { title, description } = req.body;
        const prompt = `Given the following task, suggest the best employee to assign it to and explain why.\nTask Title: ${title}\nTask Description: ${description}\nRespond with only the employee name and a short reason.`;
        const aiResponse = await callOpenRouter([
            { role: "system", content: "You are an expert task manager AI." },
            { role: "user", content: prompt }
        ]);
        res.json({ suggestion: aiResponse });
    } catch (e) {
        res.status(500).json({ message: 'AI service error', error: e.message });
    }
};

exports.prioritySuggestion = async (req, res) => {
    try {
        const { tasks } = req.body;
        const prompt = `Given the following tasks, suggest the optimal order to complete them based on priority. Respond with a list of task titles in order of priority.\nTasks:\n${tasks.map(t => `- ${t.title}: ${t.description}`).join('\n')}`;
        const aiResponse = await callOpenRouter([
            { role: "system", content: "You are an expert productivity AI." },
            { role: "user", content: prompt }
        ]);
        res.json({ priorityOrder: aiResponse });
    } catch (e) {
        res.status(500).json({ message: 'AI service error', error: e.message });
    }
};

exports.summaryReport = async (req, res) => {
    try {
        const { userId } = req.params;
        const prompt = `Summarize today's activity for user with ID ${userId}. Include completed tasks, pending tasks, and any important deadlines.`;
        const aiResponse = await callOpenRouter([
            { role: "system", content: "You are an expert assistant for task management." },
            { role: "user", content: prompt }
        ]);
        res.json({ summary: aiResponse });
    } catch (e) {
        res.status(500).json({ message: 'AI service error', error: e.message });
    }
};
