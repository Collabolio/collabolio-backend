import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: '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',
});

export const openai = new OpenAIApi(configuration);
