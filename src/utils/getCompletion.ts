import { ChatLogType } from '@/types'

type Props = {
    prompt: string;
    history?: ChatLogType[];
    options?: {
        temperature?: number;
        max_tokens?: number;
        top_p?: number;
        frequency_penalty?: number;
        presence_penalty?: number;
    }
}

export const getCompletion = async (params: Props) => {
    const resp = await fetch('/api/chat', {
        headers: {
            'Content-Type': 'applicatin/json'
        },
        method: 'POST',
        body: JSON.stringify(params)
    })
    // fetch的response有ok属性（返回200-299之间）
    if (!resp.ok) {
        throw new Error(resp.statusText)
    }
    return await resp.json()
}