'use client'
import { useUser } from '@/context/Context'
import Navbar from '@/components/Navbar'
import { onAuth, handleSignOut } from '@/firebase/utils'
import { useRouter } from 'next/navigation';
import Particles from '@/components/Particles'

import { useEffect } from 'react'
import { getSpecificData } from '@/firebase/database'

export default function RootLayout({ children }) {

    const { user, userDB, setUserProfile, nav, setNav, userNav, setUserNav, state, setState, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, divisas, setDivisas, setCountries } = useUser()
    const router = useRouter()

    useEffect(() => {
        user === null && router.replace('/')
        userDB && userDB !== undefined && userDB.rol === 'Cliente' && router.replace('/')
    }, [user, userDB])

    return (
        user !== undefined && userDB !== undefined && divisas !== undefined && <>
                {children}
        </>
    )
}

