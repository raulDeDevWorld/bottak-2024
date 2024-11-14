'use client'
import { useUser } from '@/context/Context'
import { onAuth, signInWithEmail } from '@/firebase/utils'
import { getSpecificData } from '@/firebase/database'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Msg from '@/components/Msg'
import NavInit from '@/components/NavInit'



import SelectWithFlag from '@/components/SelectWithFlag'
import { useRouter } from 'next/navigation';
import style from '@/app/(layout)/style.module.css'

export default function Home({children}) {
  const { user, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, transferencia } = useUser()
  const router = useRouter()

  


  useEffect(() => {
    // console.log(user)
    // if (user) {
    //   transferencia ? router.push('/') : router.push('/Register')
    // }
  }, [user]);

  return (
    <main className='relative w-full h-full flex flex-col items-center justify-center ' >

      <div className={`lg:grid lg:grid-cols-2 w-full lg:w-full lg:px-[5vw] lg:h-auto  lg:min-h-full flex flex-col justify-between h-[750px] pb-5`} style={{ gridTemplateColumns: '40% 60%' }}>
        <div className={`flex flex-col justify-center items-center h-[300px] lg:h-auto  `}>
          <img src="/logo.svg" className={`h-[200px] w-[200px] ${style.logo}`} alt="User" />
          <h1 className='text-[#FFF500] text-[14px] font-light'>Bottak</h1>
          <h3 className='text-white text-[14px] font-light'>Tus transferencias mas faciles y seguras</h3>
          <div className='py-12 hidden lg:block'>
            <NavInit mobile={false} />
            <br /> <br />
            <p className='text-white underline text-[14px] font-light text-center'>Politicas De Servicio</p>
          </div>
        </div>
        <div className='relative md:h-full lg:py-12 w-full flex flex-col justify-between items-center h-[350px]'>
          {children}
        </div>
        <p className='text-white underline text-[14px] font-light text-center lg:hidden'>Politicas De Servicio</p>

        {success == 'Intente' && <Msg>Cuenta inexistente</Msg>}
        {success == 'Existe' && <Msg>Cuenta ya registrada</Msg>}
        {success == 'Complete' && <Msg>Llene todo el formulario</Msg>}
        {success == 'La cuenta ya esta en uso' && <Msg>La cuenta ya esta en uso</Msg>}
        {success == 'Datos Incorrectos' && <Msg>Datos Incorrectos</Msg>}

      </div>
    </main>
  )}