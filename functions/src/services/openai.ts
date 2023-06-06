import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: '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',
});

export const openai = new OpenAIApi(configuration);
