// 存储chatLogs
import { getItemFromLocalStorage, setItemInLocalStorage } from './storage'
import { ChatLogsStorageType } from '@/types'

const CHAT_LOG_KEY = 'ai_chatLogs'
export const getChatLogsContainer = () => {
    let list = getItemFromLocalStorage<ChatLogsStorageType>(CHAT_LOG_KEY)
    if (!list) {
        list = {}
        setItemInLocalStorage(CHAT_LOG_KEY, list)
    }
    return list
}