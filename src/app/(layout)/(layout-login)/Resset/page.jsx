'use client'
import { useUser } from '@/context/Context'
import { onAuth, sendPasswordReset } from '@/firebase/utils'
import { getSpecificData } from '@/firebase/database'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Loader from '@/components/Loader'
import Error from '@/components/Error'
import SelectWithFlag from '@/components/SelectWithFlag'
import { useRouter } from 'next/navigation';
import style from '@/app/(layout)/style.module.css'

export default function Home() {
    const { user, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, transferencia, modal, setModal } = useUser()
    const router = useRouter()

    const signInHandler = (e) => {
        e.preventDefault()
        let email = e.target[0].value
        let email2 = e.target[1].value

        if (email.length == 0 || email2.length == 0) {
            return setUserSuccess('Complete')
        }
        if (email !== email2) {
            return setUserSuccess('Repeat')
        }
        setModal('Te enviamos un correo...')
        const callback = () => { setModal('') }
        sendPasswordReset(email, callback)
    }



    useEffect(() => {
        // console.log(user)
        // if (user) {
        //   transferencia ? router.push('/') : router.push('/Register')
        // }
    }, [user]);

    return (
        <form className="relative w-full max-w-[500px] h-full min-h-[300px] flex flex-col justify-between" onSubmit={signInHandler} >
            {modal === 'Te enviamos un correo...' && <Loader> {modal} </Loader>}
            <h5 className="text-[24px] font-medium text-white text-center">Restablecer Contraseña</h5>
            <div>
                <label htmlFor="email" className="block mb-2 text-[14px] font-light text-left  text-white">Ingresa tu email</label>
                <Input type="email" name="email" id="email" placeholder="name@company.com" required />
            </div>
            <div>
                <label htmlFor="email" className="block mb-2 text-[14px] font-light text-left  text-white">Ingresa nuevamente tu email</label>
                <Input type="email" name="email" id="email" placeholder="name@company.com" required />
            </div>
            <div className="flex items-start">
                <a href="#" className="ml-auto text-green-400 text-[14px] font-light hover:underline">Se te enviara un correo</a>
            </div>
            <div className="w-full flex justify-center">
                <Button type="submit" theme={"Primary"}>Restablecer</Button>
            </div>
            <div className="text-[14px] font-light  text-gray-500 dark:text-gray-300 text-center">No tienes una cuenta? <Link href="/SignUp" className="text-green-400 text-[14px] font-light  hover:underline">Registrate</Link ></div>
        </form>

    )
}


