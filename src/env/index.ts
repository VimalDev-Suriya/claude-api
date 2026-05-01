import * as env from 'env-var';

export const ANTHROPIC_API_KEY = env
  .get('ANTHROPIC_API_KEY')
  .required()
  .asString();
export const PORT = env.get('PORT').required().asPortNumber();
