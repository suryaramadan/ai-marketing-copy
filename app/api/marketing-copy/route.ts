import { configuration } from "@/utils/constants"
import { NextResponse } from "next/server"
import { OpenAIApi } from "openai/dist/api"

export async function GET() {
  return NextResponse.json({ response: 'Marketing Copy, Next.js!'})
}

const openai = new OpenAIApi(configuration)

export async function POST(request: Request) {
  const input = await request.json()
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: 'Kamu seorang ahli marketing dan sales, pelangganmu datang minta kalimat marketing singkat dan sangat menarik untuk topik '+ input+'.',
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })
  const suggestion = response.data?.choices[0].text
  if(suggestion === undefined) throw new Error('Tidak ditemukan')
  return NextResponse.json({ result: suggestion })
}