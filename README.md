# Anthropic SDK:

## System Prompt

A prompt which gives the high level idea about the task that need to be done, we can pass this prompt for every request to Anthropic API request, so LLM will hold the context.

## Temparature:

Its the field which tells the LLM that how creative / deterministic it should be when generating the text. As we know while generating the text there are many steps where undergone, so during the contextualization the process of selecting the corresponding text or tokens (probability). Based on teh value of the temperature the LLM picks the token for generation <br>

The value of the temparature varies from 0 to 1. <br>

`0` -> Deterministic
`1` -> Creative

- If the value is `0.5` then there will be the balance of creative & deterministic.

## Streams

Ability to get the response in the form of streams, instead of waiting for complete time to get the final response. Here the streams is like splitiing the lerger response block by blocks called as `events`.

```ts
const streamedData = await anthropicClient.messages.create({
  model: 'claude-haiku-4-5-20251001',
  messages: conversationHistory,
  max_tokens: 100,
  system: systemPrompt,
  stream: true,
});

// * here for await ... of is the loop which iterate over the array of promises.
// This will hold untill we get the response.
for await (const data of streamedData) {
  console.log(data);
}
```

### Blocks of the Streamed data:

MessageStart - A new message is being sent
ContentBlockStart - Start of a new block containing text, tool use, or other content
ContentBlockDelta - Chunks of the actual generated text
ContentBlockStop - The current content block has been completed
MessageDelta - The current message is complete
MessageStop - End of information about the current message

The `ContentBlockDelta` events contain the actual generated text that you'll want to display to users.

## Prompt Evaluation:

A process of evaluating the prompt to determine on how well the prompt was constructed and how effectively we get best out of LLM models

- Testing against the expected output
- Testing with multiple version of prompt
- Review output errors

### Approach

- We can evaluate the prompts by sending the prompts into the evluation pipeline and getting the benchmark score
