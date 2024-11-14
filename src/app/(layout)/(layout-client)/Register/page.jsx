'use client'

'use client'

import React, { useState, useEffect } from 'react'
import { useUser } from '@/context/Context.js'
import WebCamp from '@/components/WebCamp'
import Button from '@/components/Button'
import { useRouter } from 'next/navigation';
import { WithAuth } from '@/HOCs/WithAuth'
import Error from '@/components/Msg'

function Home() {
    const { user, userDB, setUserData, success, setUserSuccess, image1, setImage1, image2, setImage2, image3, setImage3, webcamRef1, webcamRef2, webcamRef3, } = useUser()
    const router = useRouter()

    function save(e) {
        e.preventDefault()
        image1 ? router.push('/Register/DNI') : setUserSuccess('Capture')
    }

    return (
        <div className='relative w-full h-full  flex flex-col items-center space-y-6'>
            <div className='w-full  lg:hidden'>
                <h3 className='text-center pb-3 text-white  '>Bienvenido {user ? user.email : 'Pepe'}</h3>
            </div>
            <Button theme="Primary">Sube una foto tuya sosteniendo tu DNI</Button>
            <WebCamp takePhoto='Capture1' />
            <div className='flex w-full justify-around py-2'>
                <Button theme={image1 ? 'Primary' : 'Disable'} click={save}>Continuar</Button>
            </div>
            {success == 'Capture' && <Error>ERROR: Debe tomar una foto</Error>}
        </div>
    )
}
export default WithAuth(Home)



