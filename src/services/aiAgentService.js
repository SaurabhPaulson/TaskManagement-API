import axios from 'axios';

const AI_AGENT_API_URL = process.env.AI_AGENT_API_URL;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL;

export const getTaskSuggestions = async (taskData) => {
    try {
        const response = await axios.post(`${AI_AGENT_API_URL}/suggestions`, taskData);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching task suggestions from AI agent');
    }
};

export const optimizeTaskAssignments = async (tasks) => {
    try {
        const response = await axios.post(`${AI_AGENT_API_URL}/optimize`, { tasks });
        return response.data;
    } catch (error) {
        throw new Error('Error optimizing task assignments');
    }
};

export const generateTaskSummary = async (taskId) => {
    try {
        const response = await axios.get(`${AI_AGENT_API_URL}/summary/${taskId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error generating task summary');
    }
};