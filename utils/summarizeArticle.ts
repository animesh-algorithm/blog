import { OpenAI } from "langchain/llms";
import { loadSummarizationChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export const summarize = async (text: string) => {
  // In this example, we use a `MapReduceDocumentsChain` specifically prompted to summarize a set of documents.
  const model = new OpenAI({
    temperature: 0,
    openAIApiKey: process.env.OPENAI_API_KEY,
  });
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const docs = await textSplitter.createDocuments([text]);

  // This convenience function creates a document chain prompted to summarize a set of documents.
  const chain = loadSummarizationChain(model);
  const res = await chain.call({
    input_documents: docs,
  });
  return res.text;
};
