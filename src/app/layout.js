
import { UserProvider } from '../context/Context'
import './globals.css'
import { Montserrat } from 'next/font/google'
import Intro from '@/components/Intro'

const inter = Montserrat({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel='manifest' href='/manifest.json' />
        <link rel='apple-touch-icon' href='/favicon.png' />
        <meta name="theme-color" content="black" />
        <meta name="msapplication-navbutton-color" content="black" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="description" content="Remesas y cambios de divisas" />
        <meta name="keywords" content="Bottak, bottak.lat                                                        u  , Remesas y cambios de divisas" />
        <meta name="author" content="Bottak.lat" />
        <title>Bottak</title>
      </head>
      <body className={`${inter.className} relative w-screen min-h-screen`}
        style={{
          backgroundImage: 'url(/background.png)',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}>
        <UserProvider>
          <div className="relative w-screen  h-screen min-h-[500px]  overflow-x-hidden overflow-y-auto " style={{
            backgroundImage: 'linear-gradient(#000000c7, #000000c7)',
          }}>
            <Intro></Intro>
            {children}
          </div>
          {/* <Navbar /> */}

        </UserProvider>
      </body>
    </html>
  )
}


