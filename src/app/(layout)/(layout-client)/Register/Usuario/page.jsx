'use client'


import { writeUserData, getSpecificData } from '@/firebase/database'
import { useState } from 'react'
import { useUser } from '@/context/Context.js'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Loader from '@/components/Loader'
import SelectCountry from '@/components/SelectCountry'
import Button from '@/components/Button'
import { useMask } from '@react-input/mask';
import { useRouter } from 'next/navigation';
import { WithAuth } from '@/HOCs/WithAuth'

function Home() {
    const { user, userDB, setUserData, setUserSuccess, select3, setSelect3, isSelect3, setIsSelect3, isSelect4, setIsSelect4, image1, setImage1, image2, setImage2, image3, transferencia, countries, setCountries, modal, setModal } = useUser()
    const [state, setState] = useState({})
    const inputRefWhatsApp = useMask({ mask: '+ 591 __ ___ ___', replacement: { _: /\d/ } });
    const router = useRouter()

    function onChangeHandler(e) {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const handlerCountrySelect = (pais, cca3) => {
        setState({ ...state, pais, cca3 })
    }
    const handlerIsSelect = () => {
        setIsSelect3(!isSelect3)
    }
    const handlerBankSelect = (i) => {
        setState({ ...state, ['banco']: i })
    }
    const handlerIsSelect4 = () => {
        setIsSelect4(!isSelect4)
    }
    function save(e) {
        e.preventDefault()
        const data = { ...state, image1, image2, image3, rol: 'Cliente', uuid: user.uid, habilitado: false, bloqueado: false }
        setModal('Guardando...')
        const callback = () => {
            getSpecificData(`/users/${user.uid}`, setUserData)
            setModal('')
        }
        writeUserData(`users/${user.uid}`, {email: user.email, ...data}, setUserSuccess, callback)
        transferencia ? router.replace('/') : router.replace('/')
    }
    return (
        <form className='relative portrait:min-h-[87vh] space-y-6 w-full lg:px-3  ' onSubmit={save}>
            {modal === 'Guardando...' && <Loader> {modal} </Loader>}
            <div className='w-full border-b-[2px] border-gray-100 '>
                <h3 className=' pb-3 text-white  text-right'>Completa tus datos</h3>
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div className=' space-y-5'>
                    <Label htmlFor="">Nombres</Label>
                    <Input type="text" name="nombre" onChange={onChangeHandler} required />
                </div>
                <div className=' space-y-5'>
                    <Label htmlFor="">Apellidos</Label>
                    <Input type="text" name="apellido" onChange={onChangeHandler} required />
                </div>
                <div className=' space-y-5'>
                    <Label htmlFor="">DNI</Label>
                    <Input type="text" name="dni" onChange={onChangeHandler} required />
                </div>
                <div className=' space-y-5'>
                    <Label htmlFor="">Pais</Label>
                    <SelectCountry name="pais" propHandlerIsSelect={handlerIsSelect} propIsSelect={isSelect3} operation="recepcion" click={handlerCountrySelect} />
                </div>
                <div className=' space-y-5'>
                    <Label htmlFor="">Dirección</Label>
                    <Input type="text" name="direccion" onChange={onChangeHandler} required />
                </div>
                <div className=' space-y-5'>
                    <Label htmlFor="">Whatsapp</Label>
                    <Input type="text" name="whatsapp" onChange={onChangeHandler} required />
                </div>
                {/* {countries !== undefined && state.cca3 !== undefined && countries[state.cca3] !== undefined && countries[state.cca3].countries
                    ?
                    <>
                        <div className=' space-y-5'>
                            <Label htmlFor="">Nombre de banco</Label>
                            <SelectBank name="nombre de banco" propHandlerIsSelect={handlerIsSelect4} propIsSelect={isSelect4} operation="envio" click={handlerBankSelect} arr={Object.values(countries[state.cca3].countries)} />
                        </div>
                        <div className=' space-y-5'>
                            <Label htmlFor="">Numero de cuenta bancaria</Label>
                            <Input type="text" name="cuenta bancaria" onChange={onChangeHandler} required />
                        </div>
                        <div className='flex w-full justify-around items-end'>
                            <Button theme='Primary'>Guardar</Button>
                        </div>
                    </>
                    : state.pais !== undefined && <div className='flex w-full justify-around items-end text-white'>El pais que selecciono no cuenta con bancos disponibles.</div>
                } */}
               
                <div className='flex w-full justify-around items-end col-span-2'>
                    <Button theme='Primary'>Guardar</Button>
                </div>
            </div>

        </form>
    )
}

export default WithAuth(Home)
