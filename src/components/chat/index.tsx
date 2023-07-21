import { getCompletion } from '@/utils/getCompletion'
import { Button, Textarea } from '@mantine/core'
import { useState } from 'react'


export const Chat = () => { 
    const [ prompt, setPrompt ] = useState('')

    const [ completion, setCompletion ] = useState<string>('')

    const getAIResp = async () => {
        const resp = await getCompletion({
            prompt: prompt
        })
        setCompletion(resp.content)
    }
    return (
        <div className = 'w-full p-10 flex justify-center items-center' >
            <div>{ completion }</div>
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