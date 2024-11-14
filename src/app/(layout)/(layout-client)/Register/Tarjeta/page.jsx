'use client'


// import { writeUserData, readUserData, updateUserData } from '@/supabase/utils'
// import { uploadStorage } from '@/supabase/storage'
import { useState } from 'react'
import { useUser } from '@/context/Context.js'
import Input from '@/components/Input'
import Select from '@/components/Select'
import Label from '@/components/Label'
import Checkbox from '@/components/Checkbox'
import { writeUserData } from '@/firebase/database'


import Button from '@/components/Button'
import { useMask } from '@react-input/mask';
import { useRouter } from 'next/navigation';
// import { WithAuth } from '@/HOCs/WithAuth'
import { WithAuth } from '@/HOCs/WithAuth'

function Home() {
    const router = useRouter()

    const { user, userDB, setUserData, setUserSuccess } = useUser()
    const [state, setState] = useState({})

    const [postImage, setPostImage] = useState(null)
    const [urlPostImage, setUrlPostImage] = useState(null)

    const [account, setAccount] = useState('dependiente')





    const inputRefCard = useMask({ mask: '____ ____ ____ ____', replacement: { _: /\d/ } });
    const inputRefDate = useMask({ mask: '__/__', replacement: { _: /\d/ } });
    const inputRefCVC = useMask({ mask: '___', replacement: { _: /\d/ } });
    const inputRefPhone = useMask({ mask: '+ 591 _ ___ ___', replacement: { _: /\d/ } });
    const inputRefWhatsApp = useMask({ mask: '+ 591 __ ___ ___', replacement: { _: /\d/ } });


    function manageInputIMG(e) {
        // const fileName = `${e.target.name}`
        const file = e.target.files[0]

        setPostImage(file)
        setUrlPostImage(URL.createObjectURL(file))

    }


    function onChangeHandler(e) {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    function onChangeHandlerCheck(e) {
        setState({ ...state, [e.target.name]: e.target.checked })
    }
    function onClickHandler(name, value) {
        setState({ ...state, [name]: value })
    }

    function save(e) {
        e.preventDefault()
        writeUserData(`users/${user.uid}/tarjeta`, state, setUserSuccess, )
        router.push('/Register/Destinatario')
        // e.preventDefault()
        // writeUserData('Clinica', { ...state, uuid: user.uuid }, user.uuid, userDB, setUserData, setUserSuccess, 'Se ha guardado correctamente', 'Perfil')
        // uploadStorage('Clinica', postImage, user.uuid, updateUserData)
        // router.push('/Clinica/Perfil')
    }
    return (
        <form className='space-y-6 py-5'>
            <div className='w-full flex justify-center'>
                <img src="/credit-card.png" className="h-[200px] lg:h-[100px]" alt="" />
            </div>
            <div>
                <h3 className='text-center pb-2 text-[yellow] text-[24px]'>hola, {userDB && userDB.profile && userDB.profile.nombre}.</h3>
                <h3 className='text-center pb-2 text-green-400'>Completa los datos de tu tarjeta</h3>
            </div>

            <div className=' space-y-5'>
                <Label htmlFor="">Número de tarjeta</Label>
                <Input type="text" name="tarjeta" onChange={onChangeHandler} reference={inputRefCard} require/>
            </div>
            <div className=' space-y-5'>
                <div className='w-full flex justify-between'>
                    <div className='w-5/12 space-y-5'>
                        <Label htmlFor="">Fecha</Label>
                        <Input reference={inputRefDate} name="fecha de tarjeta" styled={{ textAlign: 'center' }} onChange={onChangeHandler} require/>
                    </div>
                    <div className='w-5/12 space-y-5'>
                        <Label htmlFor="">CVC</Label>
                        <Input reference={inputRefCVC} name="cvc" styled={{ textAlign: 'center' }} onChange={onChangeHandler} require/>
                    </div>
                </div>
            </div>
            <div className='flex w-full justify-around'>
                <Button theme='Primary' click={save}>Guardar</Button>
            </div>
        </form>
    )
}

export default WithAuth(Home)