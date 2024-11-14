'use client'


// import { writeUserData, readUserData, updateUserData } from '@/supabase/utils'
// import { uploadStorage } from '@/supabase/storage'
import { useState, useEffect } from 'react'
import { useUser } from '@/context/Context.js'
import Input from '@/components/Input'
import Select from '@/components/Select'
import Label from '@/components/Label'
import Checkbox from '@/components/Checkbox'
import WebCamp from '@/components/WebCamp'


import Button from '@/components/Button'
import { useMask } from '@react-input/mask';
import { useRouter } from 'next/navigation';
import { WithAuth } from '@/HOCs/WithAuth'


function Home() {
    const router = useRouter()

    const { user, userDB, setUserData, setUserSuccess } = useUser()
    const [state, setState] = useState({})

    const [postImage1, setPostImage1] = useState(null)
    const [postImage2, setPostImage2] = useState(null)

    const [postImage3, setPostImage3] = useState(null)

    const [urlPostImage1, setUrlPostImage1] = useState(null)
    const [urlPostImage2, setUrlPostImage2] = useState(null)
    const [urlPostImage3, setUrlPostImage3] = useState(null)

    const [account, setAccount] = useState('dependiente')





    const inputRefCard = useMask({ mask: '____ ____ ____ ____', replacement: { _: /\d/ } });
    const inputRefDate = useMask({ mask: '__/__', replacement: { _: /\d/ } });
    const inputRefCVC = useMask({ mask: '___', replacement: { _: /\d/ } });
    const inputRefPhone = useMask({ mask: '+ 591 _ ___ ___', replacement: { _: /\d/ } });
    const inputRefWhatsApp = useMask({ mask: '+ 591 __ ___ ___', replacement: { _: /\d/ } });


    function manageInputIMG1(e) {
        // const fileName = `${e.target.name}`
        const file = e.target.files[0]

        setPostImage1(file)
        setUrlPostImage1(URL.createObjectURL(file))

    }

    function manageInputIMG2(e) {
        // const fileName = `${e.target.name}`
        const file = e.target.files[0]

        setPostImage2(file)
        setUrlPostImage2(URL.createObjectURL(file))

    }
    function manageInputIMG3(e) {
        // const fileName = `${e.target.name}`
        const file = e.target.files[0]

        setPostImage3(file)
        setUrlPostImage3(URL.createObjectURL(file))

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
        router.push('/Register/Usuario')

        // e.preventDefault()
        // writeUserData('Clinica', { ...state, uuid: user.uuid }, user.uuid, userDB, setUserData, setUserSuccess, 'Se ha guardado correctamente', 'Perfil')
        // uploadStorage('Clinica', postImage, user.uuid, updateUserData)
        // router.push('/Clinica/Perfil')
    }
    useEffect(() => {

    }, []);
    console.log(user)
    return (
        <form className=' space-y-6'>
            <div className='w-full border-b-[2px] border-gray-100 '>
                <h3 className='text-center pb-3 text-white  text-right'>Bienvenido {user ? user.email : 'Pepe'}</h3>
            </div>
            <br/>
            <Button theme="Primary">Sube una foto tuya de tu DNI</Button>
            <br/>
            <br/>
            <WebCamp />
            <br/>
            <div className='flex w-full justify-around'>
                <Button theme='Primary' click={save}>Continuar</Button>
            </div>
        </form>
    )
}

export default WithAuth(Home)

