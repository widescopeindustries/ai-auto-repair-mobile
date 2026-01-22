 

export const maxDuration = 30; // Reduced from 60 to 30 for faster response
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import {
  decodeVin,
  getVehicleInfo,
  generateFullRepairGuide,
  createDiagnosticChat,
  sendDiagnosticMessage
} from '@/services/geminiService';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("SERVER ERROR: GEMINI_API_KEY is not set.");
}

const genAI = new GoogleGenAI({ apiKey: apiKey || '' });

export async function POST(req: NextRequest) {
  if (!process.env.GEMINI_API_KEY) {
    console.error("SERVER ERROR: GEMINI_API_KEY is not set.");
    return NextResponse.json({ error: 'Server configuration error: Missing API Key' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { action, payload, stream } = body;
 
    console.log(`API Request: ${action}, stream: ${stream}`);
 
    if (!action) {
      return NextResponse.json({ error: 'Missing action' }, { status: 400 });
    }

    let result;

    switch (action) {
      case 'decode-vin':
        result = await decodeVin(payload.vin);
        break;

      case 'vehicle-info':
        result = await getVehicleInfo(payload.vehicle, payload.task);
        break;

      case 'generate-guide':
        if (stream) {
          return await streamRepairGuide(payload.vehicle, payload.task);
        }
        result = await generateFullRepairGuide(payload.vehicle, payload.task);
        break;

      case 'diagnostic-chat':
        const chat = createDiagnosticChat(payload.vehicle);
        result = await sendDiagnosticMessage(chat, payload.message);
        break;

      case 'quick-preview':
        result = await generateQuickPreview(payload.vehicle, payload.task);
        break;

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json(result);

  } catch (error: any) {
    console.error('API Handler Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

async function generateQuickPreview(vehicle: any, task: string) {
  const { year, make, model } = vehicle;
  const prompt = `Give a quick overview for "${task}" on ${year} ${make} ${model}. 
Return JSON with: title, difficulty (1-5), estimatedTime, and a 2-sentence summary.`;

  const schema = {
    type: 'object',
    properties: {
      title: { type: 'string' },
      difficulty: { type: 'number' },
      estimatedTime: { type: 'string' },
      summary: { type: 'string' }
    },
    required: ['title', 'difficulty', 'estimatedTime', 'summary']
  };

  const response = await genAI.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: schema,
    },
  });

  const text = (response.text || "").trim().replace(/^```json\s*|```$/g, '');
  return JSON.parse(text);
}

async function streamRepairGuide(vehicle: any, task: string) {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      try {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ status: 'generating', progress: 0 })}\n\n`));

        const guide = await generateFullRepairGuide(vehicle, task);
        
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ status: 'complete', data: guide })}\n\n`));
        controller.close();
      } catch (error) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ status: 'error', error: (error as any).message })}\n\n`));
        controller.close();
      }
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
