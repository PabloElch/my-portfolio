import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { embedMany } from 'ai';
import { google } from '@ai-sdk/google';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const KNOWLEDGE_BASE_DIR = path.join(process.cwd(), 'knowledge-base');

function chunkText(text: string, maxLength = 1000): string[] {
  const paragraphs = text.split('\n\n');
  const chunks: string[] = [];
  let currentChunk = '';

  for (const paragraph of paragraphs) {
    if (currentChunk.length + paragraph.length > maxLength) {
      if (currentChunk) chunks.push(currentChunk.trim());
      currentChunk = paragraph;
    } else {
      currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
    }
  }
  if (currentChunk) chunks.push(currentChunk.trim());
  return chunks;
}

async function ingest() {
  console.log('🚀 Starting ingestion with Google gemini-embedding-001...');

  const files = fs.readdirSync(KNOWLEDGE_BASE_DIR).filter(f => f.endsWith('.md') || f.endsWith('.txt'));

  for (const file of files) {
    const filePath = path.join(KNOWLEDGE_BASE_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const chunks = chunkText(content);

    console.log(`\n📄 Processing ${file} (${chunks.length} chunks)...`);

    // ✅ FIX: Using the current, supported model
    const { embeddings } = await embedMany({
      model: google.textEmbeddingModel('gemini-embedding-001'),
      values: chunks,
    });

    for (let i = 0; i < chunks.length; i++) {
      const { error } = await supabase.from('documents').insert({
        content: chunks[i],
        metadata: { source: file },
        embedding: embeddings[i],
      });

      if (error) {
        console.error(`❌ Error inserting from ${file}:`, error);
      } else {
        console.log(`✅ Inserted chunk ${i + 1}/${chunks.length}`);
      }
    }
  }

  console.log('\n🎉 Ingestion complete!');
}

ingest().catch(console.error);