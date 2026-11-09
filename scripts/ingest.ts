import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { pipeline } from '@xenova/transformers';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

const KNOWLEDGE_BASE_DIR = path.join(process.cwd(), 'knowledge-base');

// Simple chunking function
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
  console.log('🚀 Starting local ingestion (No API limits)...');

  // Load the local embedding model (downloads once, then cached)
  console.log('⏳ Loading local embedding model...');
  const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  console.log('✅ Model loaded!\n');

  const files = fs.readdirSync(KNOWLEDGE_BASE_DIR).filter(f => f.endsWith('.md') || f.endsWith('.txt'));

  for (const file of files) {
    const filePath = path.join(KNOWLEDGE_BASE_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const chunks = chunkText(content);

    console.log(`📄 Processing ${file} (${chunks.length} chunks)...`);

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];

      try {
        // Generate the 384-dimension embedding locally
        const output = await extractor(chunk, { pooling: 'mean', normalize: true });
        const embedding = Array.from(output.data);

        // Save to Supabase
        const { error } = await supabase.from('documents').insert({
          content: chunk,
          metadata: { source: file },
          embedding,
        });

        if (error) {
          console.error(`❌ Error inserting from ${file}:`, error);
        } else {
          console.log(`✅ Inserted chunk ${i + 1}/${chunks.length}`);
        }
      } catch (err) {
        console.error(`❌ Failed to embed chunk ${i + 1} from ${file}:`, err);
      }
    }
  }

  console.log('\n🎉 Ingestion complete!');
}

ingest().catch(console.error);