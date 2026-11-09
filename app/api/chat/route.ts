import { createClient } from '@supabase/supabase-js';
import { streamText, convertToModelMessages, UIMessage } from 'ai';
import { google } from '@ai-sdk/google';
import { pipeline } from '@xenova/transformers';

export const maxDuration = 30;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

let extractor: any = null;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();
    
    const lastMessage = messages[messages.length - 1];
    const latestText = lastMessage.parts
      ?.filter((p: any) => p.type === 'text')
      .map((p: any) => p.text)
      .join('') || '';

    if (!extractor) {
      extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    }

    // 1. Embed the question
    const output = await extractor(latestText, { pooling: 'mean', normalize: true });
    const queryEmbedding = Array.from(output.data);

    // 2. Search Supabase
    const { data: documents, error } = await supabase.rpc('match_documents', {
      query_embedding: queryEmbedding,
      match_threshold: 0.2,
      match_count: 4,
    });

    if (error) throw error;

    const context = (documents || []).map((doc: any) => doc.content).join('\n\n');

    // 3. Generate the response
    const result = streamText({
      model: google('gemini-2.5-flash'), 
      system: `You are the AI assistant for Lencho Lemessa's portfolio. 
You must answer questions about Lencho using ONLY the context provided below. 
If the answer is not in the context, you MUST say: "I don't have that information in my knowledge base, but you can contact Lencho directly at lencholemessa@gmail.com". 
Do NOT use outside knowledge. Do NOT invent facts. Be concise and professional.

CONTEXT:
${context}`,
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse({
      // FIX: Safely cast the error so TypeScript doesn't complain
      onError: (error: unknown) => {
        console.error("🔥 Stream Error:", error);
        const message = error instanceof Error ? error.message : "Unknown error";
        return message;
      },
    });
    
  } catch (error: any) {
    console.error('❌ FATAL API ERROR:', error);
    return new Response(JSON.stringify({ error: error.message || "Unknown error" }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}