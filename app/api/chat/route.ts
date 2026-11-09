import { createClient } from '@supabase/supabase-js';
import { streamText, convertToModelMessages, UIMessage, embed } from 'ai';
import { google } from '@ai-sdk/google';

export const maxDuration = 30;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();
    
    const lastMessage = messages[messages.length - 1];
    const latestText = lastMessage.parts
      ?.filter((p: any) => p.type === 'text')
      .map((p: any) => p.text)
      .join('') || '';

    // ✅ FIX: Using the same current, supported model for the search query
    const { embedding } = await embed({
      model: google.textEmbeddingModel('gemini-embedding-001'),
      value: latestText,
    });

    const { data: documents, error } = await supabase.rpc('match_documents', {
      query_embedding: embedding,
      match_threshold: 0.2,
      match_count: 4,
    });

    if (error) throw error;

    const context = (documents || []).map((doc: any) => doc.content).join('\n\n');

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
      onError: (error: unknown) => {
        console.error("🔥 Stream Error:", error);
        return error instanceof Error ? error.message : "Unknown error";
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