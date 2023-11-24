import './globals.css'
import '@vidstack/react/player/styles/base.css'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html>
            <body>{children}</body>
        </html>
    )
}
