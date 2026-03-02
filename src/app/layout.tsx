import type { ReactNode } from 'react'

export const metadata = {
  title: 'Parasite — Visual Rhetoric',
  description: 'A visual analysis of class identity in Bong Joon-ho\'s Parasite',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
