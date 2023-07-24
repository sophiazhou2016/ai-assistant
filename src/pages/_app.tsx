import "@/styles/globals.css";
import { useState } from 'react'
import {
    MantineProvider,
    ColorSchemeProvider,
    ColorScheme
} from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
    const toggleColorScheme = (value?: ColorScheme) => {
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
    }
    return <ColorSchemeProvider colorScheme='dark' toggleColorScheme={toggleColorScheme}>
        <MantineProvider
            theme={{ colorScheme, primaryColor: 'green' }}
            withNormalizeCSS
            withGlobalStyles
        >
            <Notifications position='top-right' zIndex={2088}></Notifications>
                <Component {...pageProps} />
        </MantineProvider>
    </ColorSchemeProvider>
}
