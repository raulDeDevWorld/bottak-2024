'use client'

import { writeUserData } from '@/firebase/database'
import { useUser } from '@/context/Context.js'
import Input from '@/components/Input'
import SelectCountry from '@/components/SelectCountry'
import SelectBank from '@/components/SelectBank'
import Label from '@/components/Label'
import Loader from '@/components/Loader'
import Button from '@/components/Button'
import Msg from '@/components/Msg'
import { useMask } from '@react-input/mask';
import { useRouter } from 'next/navigation';
import { WithAuth } from '@/HOCs/WithAuth'
import { getDayMonthYear } from '@/utils/date'
import { generateUUID } from '@/utils/UUIDgenerator'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
function Home() {

    const { nav, setNav, user, userDB, countries, setUserProfile, select, setDestinatario, isSelect3, setIsSelect3, isSelect4, setIsSelect4, select3, setSelect3, setSelect, select2, setSelect2, isSelect, setIsSelect, isSelect2, setIsSelect2, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, modal, setModal, setTransferencia, transferencia, divisas, setDivisas, destinatario, qr, setQr, QRurl, setQRurl, } = useUser()
    const [cca3, setCca3] = useState(null)
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = searchParams.get('operacion')

    function onChangeHandler(e) {
        setDestinatario({ ...destinatario, [e.target.name]: e.target.value })
    }
    const handlerCountrySelect = (i, cca3) => {
        const obj = { ...destinatario }
        delete obj['nombre de banco']
        setDestinatario({ ...obj, ['pais']: i })
        setCca3(cca3)
    }
    const handlerBankSelect = (i) => {
        setDestinatario({ ...destinatario, ['nombre de banco']: i })
    }
    const handlerIsSelect = () => {
        setIsSelect3(!isSelect3)
    }
    const handlerIsSelect4 = () => {
        setIsSelect4(!isSelect4)
    }
    const redirectHandler = (route, data) => {
        setDestinatario(data)
        router.replace(route)
    }
    // function save(e) {
    //     e.preventDefault()
    //     e.stopPropagation()

    //     if (destinatario.pais === null || destinatario.pais === undefined) {
    //         setUserSuccess('CompletePais')
    //         return
    //     }
    //     const uuid = generateUUID()
    //     const date = new Date().getTime()
    //     const destinatarioDB = { ...destinatario, uuid, operacion: pathname ? pathname : destinatario.operacion }
    //     setModal('Guardando...')
    //     const callback = () => {
    //         redirectHandler('/Confirm', destinatarioDB)
    //         setModal('')
    //     }
    //     writeUserData(`users/${user.uid}/destinatarios/${uuid}`, { ...destinatario, uuid }, setUserSuccess, callback)
    // }


    function save(e) {
        e.preventDefault()
        e.stopPropagation()

        const uuid = generateUUID()
        const date = new Date().getTime()
        const destinatarioDB = { ...destinatario, uuid, operacion: pathname ? pathname : destinatario.operacion }
        setModal('Guardando...')
        const callback = () => {
            redirectHandler('/ConfirmCambio', destinatarioDB)
            setModal('')
        }
        writeUserData(`users/${user.uid}/bancos/${uuid}`, { ...destinatario, uuid }, setUserSuccess, callback)
    }
    return (
        <div className='md:pl-5'>
            <form className='w-full min-h-[80vh] space-y-6 lg:grid lg:grid-cols-2 lg:gap-5  rounded-[5px] md:max-h-[80vh] overflow-y-auto overflow-x-hidden' onSubmit={save}>
                {modal === 'Guardando...' && <Loader> {modal} </Loader>}
                <div className='w-full border-b-[2px] border-gray-100 col-span-2'>
                    <h3 className=' pb-3 text-white  text-right'>Registrar Banco de Recepcion</h3>
                </div>
                <div className='lg:hidden'>
                    <h3 className='text-center pb-3  text-green-400 lg:hidden'>Informacion personal</h3>
                </div>

                <div className='lg:hidden'>
                    <h3 className='text-center pb-3  text-green-400 lg:hidden'>Informacion Bancaria</h3>
                </div>
                <div className=' space-y-5'>
                    <Label htmlFor="">Seleccionar Banco</Label>
                    <SelectBank name="nombre de banco" propHandlerIsSelect={handlerIsSelect4} propIsSelect={isSelect4} operation="envio" click={handlerBankSelect} arr={userDB?.cca3 && Object.values(countries?.[userDB?.cca3].countries)} />
                </div>
                <div className=' space-y-5'>
                    <Label htmlFor="">Numero de cuenta bancaria</Label>
                    <Input type="text" name="cuenta destinatario" onChange={onChangeHandler} required />
                </div>
                <div className='flex w-full justify-around items-end'>
                    <Button theme='Primary' >Guardar</Button>
                </div>

                {success == 'CompletePais' && <Msg>Seleccione un pais</Msg>}
            </form>
        </div>
    )
}

export default WithAuth(Home)













{/* <form className='w-full min-h-[80vh] space-y-6 lg:grid lg:grid-cols-2 lg:gap-5  rounded-[5px] md:max-h-[80vh] overflow-y-auto overflow-x-hidden' onSubmit={save}>
{modal === 'Guardando...' && <Loader> {modal} </Loader>}
<div className='w-full border-b-[2px] border-gray-100 col-span-2'>
    <h3 className=' pb-3 text-white  text-right'>Registrar Banco de Recepcion</h3>
</div>
<div className='lg:hidden'>
    <h3 className='text-center pb-3  text-green-400 lg:hidden'>Informacion personal</h3>
</div>

<div className=' space-y-5'>
    <Label htmlFor="">Pais</Label>
    <SelectCountry name="pais" propHandlerIsSelect={handlerIsSelect} propIsSelect={isSelect3} operation="envio" click={handlerCountrySelect} />
</div>

{destinatario !== undefined && destinatario.pais !== undefined && countries[cca3].countries !== undefined && cca3 && <>
    <div className='lg:hidden'>
        <h3 className='text-center pb-3  text-green-400 lg:hidden'>Informacion Bancaria</h3>
    </div>
    <div className=' space-y-5'>
        <Label htmlFor="">Seleccionar Banco</Label>
        <SelectBank name="nombre de banco" propHandlerIsSelect={handlerIsSelect4} propIsSelect={isSelect4} operation="envio" click={handlerBankSelect} arr={Object.values(countries[cca3].countries)}/>
    </div>
    <div className=' space-y-5'>
        <Label htmlFor="">Numero de cuenta bancaria</Label>
        <Input type="text" name="cuenta destinatario" onChange={onChangeHandler} required />
    </div>
    <div className='flex w-full justify-around items-end'>
        <Button theme='Primary' >Guardar</Button>
    </div>
</>}
{success == 'CompletePais' && <Msg>Seleccione un pais</Msg>}
</form> */}