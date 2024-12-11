import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Cambodian Handicrafts',
  description: 'Discover authentic Cambodian handicrafts',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">Cambodian Handicrafts</Link>
            <div>
              <Link href="/" className="mr-4">Home</Link>
              <Link href="/favorites" className="mr-4">Favorites</Link>
              <Link href="/admin" className="mr-4">Admin</Link>
              <Link href="/login" className="mr-4">Login</Link>
              <Link href="/register">Register</Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}

