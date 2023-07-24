import { ChatLogsType } from '@/types'
import { getCompletion } from '@/utils/getCompletion'
import { Button, Textarea } from '@mantine/core'
import { useState } from 'react'


export const Chat = () => { 
    const [ prompt, setPrompt ] = useState('')

    const [ completion, setCompletion ] = useState<string>('')
    const [ chatList, setChatList ] = useState<ChatLogsType>([])


    const getAIResp = async () => {
        const list = [
            ...chatList,
            {
                role: 'user',
                content: prompt
            }
        ]
        setChatList(list)
        const resp = await getCompletion({
            prompt: prompt
        })
        setCompletion(resp.content)
        setChatList([
            ...list,
            {
                role: 'assistant',
                content: resp.content
            }
        ])
    }
    return (
        <div className = 'w-full p-10 flex justify-center items-center' >
            <div className='h-[50vh] overflow-y-auto'>
                {chatList.map((item, idx) => (
                    <div key={`${item.role}-${idx}`}>
                        <div>{item.role}</div>
                        <div>{item.content}</div>
                    </div>
                ))}
            </div>
            <Textarea
                className='w-3/5'
                placeholder='enter your prompt'
                value={prompt}
                onChange={(evt) => setPrompt(evt.target.value)}
            ></Textarea>
            <Button
                onClick={() => getAIResp()}
            >Send</Button>
        </div>
    )
}