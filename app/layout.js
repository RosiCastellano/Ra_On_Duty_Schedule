import './globals.css'

export const metadata = {
  title: 'RA On Duty Schedule - Annexes',
  description: 'Residence Assistant duty schedule for Lady Eaton, Champlain, and Gzowski Annexes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
