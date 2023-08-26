// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextRequest } from 'next/server'

import { type MessageList } from '@/types'

import {createParser, ParsedEvent, ReconnectInterval} from 'eventsource-parser'

type StreamPayload = {
    model: string;
    message: MessageList;
    temperature: number;
    stream: boolean;
    max_tokens: number;
}

export default async function handler(
  req: NextRequest,
) {
    const { prompt, history = [], options = {} } = await req.json()
    const data = {
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: [
            {
                role: 'system',
                content: 'you are ai assistant'
            },
            ...history,
            {
                role: 'user',
                content: prompt
            }
        ],
        ...options
    }

    const stream = await requestStream(data)
    return new Response(stream)
}

const requestStream = async (payload: StreamPayload) => {
    const counter = 0
    const resp = await fetch(`${process.env.END_POINT}/v1/chat/completions`, {
        headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(payload)
    })
    return createStream(resp, counter)
}

// 解析response，返回一个stream
const createStream = (response: Response, counter: number) => {
    const decoder = new TextDecoder('utf-8')
    const encoder = new TextEncoder()

    return new ReadableStream({
        async start(controller) {
            const onParse = (event: ParsedEvent | ReconnectInterval) => {
                if (event.type === 'event') {
                  console.log('Received event!')
                  console.log('id: %s', event.id || '<none>')
                  console.log('name: %s', event.name || '<none>')
                  console.log('data: %s', event.data)
                    const data = event.data
                    if (data === '[DONE]') {
                        controller.close()
                        return
                    } 
                    try {
                        const json = JSON.parse(data)
                        const text = json.choices[0]?.delta?.content || ''
                        if (counter < 2 && (text.match(/\n/) || []).length) {
                            return
                        }
                        const q = encoder.encode(text)
                        controller.enqueue(q)
                        counter++
                    } catch(error) {

                    }
                } else if (event.type === 'reconnect-interval') {
                  console.log('We should set reconnect interval to %d milliseconds', event.value)
                }
            }

            const parser = createParser(onParse)

            for await(const chunk of response.body as any) {
                parser.feed('chunk:',decoder.decode(chunk))
            }

        }
    })
}

export const config = {
    runtime: 'edge'
}