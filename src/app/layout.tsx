import './globals.css'
import '@vidstack/react/player/styles/base.css'
import { Toaster } from 'react-hot-toast'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html>
            <body>{children}</body>

            <Toaster position='top-right' />
        </html>
    )
}
