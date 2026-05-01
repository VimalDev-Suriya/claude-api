import Anthropic from '@anthropic-ai/sdk';
import { ANTHROPIC_API_KEY } from '../env';

export const anthropicClient = new Anthropic({
  apiKey: ANTHROPIC_API_KEY,
});
