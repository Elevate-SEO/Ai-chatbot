import { OpenAI } from 'openai';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from a .env file
dotenv.config();

const app = express();
const port = 5173;

app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI({
    apiKey: "",
});

app.post('/', async (req, res) => {
  try {
    const { chats } = req.body;

    if (!Array.isArray(chats) || chats.length === 0) {
      return res.status(400).json({ error: 'Invalid input: "chats" should be a non-empty array.' });
    }
    
    const result = await  openai.chat.completions.create({
      model: 'gpt-4.0-turbo',
      messages: [
        {
          role: 'system',
          content: "You are my chatbot" ,
        },
        ...chats,
      ],
    });

    res.json({
      output: result.data.choices[0].message.content, // Correctly access the content of the message
    });
  } catch (error) {
    console.error('Error creating chat completion:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
