import { MessageParam } from '@anthropic-ai/sdk/resources';
import { anthropicClient } from '.';

// * Below code perfectly works, but it is not maintaining the context of the conversation as we are sending the message and not maitaining the response
export const getMessage = async (message: string) => {
  return await anthropicClient.messages.create({
    max_tokens: 200,
    model: 'claude-sonnet-4-6',

    messages: [
      {
        role: 'user',
        content: message,
      },
    ],
  });
};

// *********** Conversation history **********
let conversationHistory: MessageParam[] = []; // this will track the list of messages
// To keep in track for all the conversation

export const messageWithContext = async (
  message: string,
  systemPrompt: string,
) => {
  // * Storing the user message
  conversationHistory.push({
    role: 'user',
    content: message,
  });

  const response = await anthropicClient.messages.create({
    max_tokens: 200,
    model: 'claude-sonnet-4-6',
    messages: conversationHistory,
    system: systemPrompt,
  });

  const assistanceMesage = response.type;

  // * SToring the llm response
  conversationHistory.push({
    role: 'assistant',
    content: assistanceMesage,
  });

  return response;
};
// *********** Conversation history **********

export const messageWithStreams = async (
  message: string,
  systemPrompt: string,
) => {
  conversationHistory.push({
    role: 'user',
    content: message,
  });

  // **************************** Way 1
  const streamedData = await anthropicClient.messages.create({
    model: 'claude-haiku-4-5-20251001',
    messages: conversationHistory,
    max_tokens: 100,
    system: systemPrompt,
    stream: true,
  });

  for await (const data of streamedData) {
    console.log(data);
  }

  // **************************** Way 2

  const stream = anthropicClient.messages
    .stream({
      model: 'claude-haiku-4-5-20251001',
      messages: conversationHistory,
      max_tokens: 100,
    })
    .on('text', (data) => {
      console.log(data);
    });

  const data = await stream.finalMessage();

  return data;
};
