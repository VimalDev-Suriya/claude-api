import { Response, Request } from 'express';
import { getMessage, messageWithContext } from '../anthropic-client/getMessage';

const systemPrompt: string =
  'You are a passionate customer service assistant, need to assit with the task or query provided by the customer';

export const chat = async (req: Request, res: Response) => {
  getMessage('Hi');
  const response = await messageWithContext(req.body.message, systemPrompt);

  res.json({
    message: response,
  });
};
