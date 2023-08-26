// 存储chatLogs
import { getItemFromLocalStorage, setItemInLocalStorage } from './storage'
import { ChatLogsStorageType, MessageList } from '@/types'

const CHAT_LOG_KEY = 'ai_chatLogs'
export const getChatLogsContainer = () => {
    let list = getItemFromLocalStorage<ChatLogsStorageType>(CHAT_LOG_KEY)
    if (!list) {
        list = {}
        setItemInLocalStorage(CHAT_LOG_KEY, list)
    }
    console.log('xxx list:', list)
    return list
}

export const getChatLogs = (id: string) => {
    const logs = getChatLogsContainer()
    console.log('xx1')
    return logs[id] || []
}

// 新增
export const updateChatLogs = (id: string, log: MessageList) => {
    const logs = getChatLogsContainer()
    logs[id] = log
    setItemInLocalStorage(CHAT_LOG_KEY, logs)
}

export const clearChatLogs = (id: string) => {
    const logs = getChatLogsContainer()
    if (logs[id]) {
        logs[id] = []
    }
    setItemInLocalStorage(CHAT_LOG_KEY, logs)
}