'use client'

import { writeUserData, getSpecificData } from '@/firebase/database'
import { useState, useEffect } from 'react'
import { useUser } from '@/context/Context.js'
import { getDayMonthYear } from '@/utils/date'
import { WithAuth } from '@/HOCs/WithAuth'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
import { useMask } from '@react-input/mask';
import { useRouter } from 'next/navigation';
import { generateUUID } from '@/utils/UUIDgenerator'

function Home() {
    const { nav, setNav, user, userDB, setUserProfile, select, setSelect, select2, setSelect2, isSelect, setIsSelect, isSelect2, setIsSelect2, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, modal, setModal, setTransferencia, transferencia, divisas, setDivisas, destinatario, setDestinatario, fecha, setFecha, qr, setQr, QRurl, setQRurl, comision } = useUser()
    const [state, setState] = useState({})
    const router = useRouter()

    const inputRefWhatsApp = useMask({ mask: '+ 591 __ ___ ___', replacement: { _: /\d/ } });
    const redirectHandler = (route) => {
        router.replace(route)
    }
    function save(e) {
        e.preventDefault()
        e.stopPropagation()

        const db = {

            ...destinatario,
            usuario: `${userDB.nombre} ${userDB.apellido}`,
            dni: userDB.dni,
            pais: userDB.pais,
            whatsapp: userDB.whatsapp,
            // ['cuenta bancaria']: userDB['cuenta bancaria'],
            // banco: userDB['banco'],
            ['divisa de usuario']: select,
            importe: `${(transferencia * 1 + comision * 1).toFixed(2)} ${select}`,
            importeTotal: (transferencia * 1 + comision * 1).toFixed(2),
            ['importe neto']: (transferencia * 1).toFixed(2),
            ['divisa de cambio']: select2,
            cambio: `${divisas && divisas[select] && divisas[select2] && (transferencia * divisas[select2].compra / divisas[select].venta).toFixed(2)} ${select2}`,
            comision: `${comision} ${select}`,
            operacion: 'Cambio',
            ['user uuid']: user.uid,
            notificaciones: true,

        }
        setDestinatario(db)
        router.push('/Transferir')

    }

    useEffect(() => {
        transferencia === '' && router.replace('/')
    })
    return (
        <div className='w-full'>
            {modal === 'Guardando...' && <Loader> {modal} </Loader>}
            {destinatario !== undefined && transferencia !== '' && <div className='relative left-0 right-0 mx-0   rounded-[20px]'>
                <div className="relative sm:left-0 sm:right-0 mx-auto  w-full overflow-y-auto sm:w-[500px] sm:max-h-[87vh] lg:w-[70%] lg:min-w-auto text-[14px] text-gray-500 bg-gradient-to-tr from-gray-100 to-gray-300 rounded-[5px]  p-0 md:p-5">

                    <table className='w-full' >
                        <thead className="w-full text-[14px] text-gray-900 uppercase bg-gray-50">

                            <tr className="w-full text-[14px] text-center font-semibold border-b bg-gray-800 ">
                                <th colspan="2" scope="colgroup" className='px-2 py-2 text-center text-white'>
                                    Verifique los datos de transacción <br />
                                    El Importe neto con el cambio aplicado podria variar en la operacion por las fluctuaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className=" text-[14px] bg-gray-800 border-b" >
                                <td scope="col" colSpan="2" className="px-3 py-3  font-bold text-[14px] text-white  ">
                                    DATOS DE EMISION
                                </td>
                            </tr>
                            <tr className=" text-[14px] border-b border-[#00000040] hover:bg-gray-50 " >
                                <td className="px-2 py-2 flex flex-col bg-gray-300 font-bold text-[14px] text-gray-900 ">
                                    Nombre
                                </td>
                                <td className="px-2 py-2  text-gray-900  border-r border-[#00000040] ">
                                    {userDB && userDB && userDB.nombre}
                                </td>
                            </tr>
                            <tr className=" text-[14px] border-b border-[#00000040] hover:bg-gray-50 " >
                                <td className="px-2 py-2 flex flex-col bg-gray-300 font-bold text-[14px] text-gray-900 ">
                                    DNI                           </td>
                                <td className="px-2 py-2  text-gray-900  border-r border-[#00000040]">
                                    {userDB && userDB && userDB.dni}
                                </td>
                            </tr>
                            <tr className=" text-[14px] border-b border-[#00000040] hover:bg-gray-50 " >
                                <td className="px-2 py-2 flex flex-col bg-gray-300 font-bold text-[14px] text-gray-900 ">
                                    Pais
                                </td>
                                <td className="px-2 py-2  text-gray-900  border-r border-[#00000040]">
                                    {userDB && userDB && userDB.pais}
                                </td>
                            </tr>


                            <tr className=" text-[14px] border-b border-[#00000040] hover:bg-gray-50 " >
                                <td className="px-2 py-2 flex flex-col bg-gray-300 font-bold text-[14px] text-gray-900 ">
                                    Celular
                                </td>
                                <td className="px-2 py-2  text-gray-900  border-r border-[#00000040]">
                                    {userDB && userDB && userDB.whatsapp}
                                </td>
                            </tr>
                            <tr className=" text-[14px]  border-b border-[#00000040] hover:bg-gray-50 " >
                                <td className="px-2 py-2 bg-gray-300   font-bold  text-gray-900 ">
                                    Divisa de emision
                                </td>
                                <td className="px-2 py-2  text-gray-900  border-r border-[#00000040]">
                                    {select2}
                                </td>
                            </tr>

                            <tr className=" text-[14px] bg-gray-800 border-b" >
                                <td scope="col" colSpan="2" className="px-3 py-3  font-bold text-[14px] text-white  ">
                                    DATOS PARA RECEPCIÓN
                                </td>
                            </tr>
                            <tr className=" text-[14px]  border-b border-[#00000040] hover:bg-gray-50 " >
                                <td className="px-2 py-2 bg-gray-300   font-bold  text-gray-900 ">
                                    {destinatario['billetera destinatario'] ? 'direccion de billetera' : 'Cuenta receptora de usuario'}
                                </td>
                                <td className="px-2 py-2  text-gray-900  border-r border-[#00000040]">
                                    {destinatario['cuenta destinatario'] && destinatario['cuenta destinatario']}
                                    {destinatario['billetera destinatario'] && destinatario['billetera destinatario']}
                                </td>
                            </tr>



                            <tr className=" text-[14px]  border-b border-[#00000040] hover:bg-gray-50 " >
                                <td className="px-2 py-2 bg-gray-300   font-bold  text-gray-900 ">
                                    {destinatario['red destinatario'] ? 'Red' : 'Banco receptor de usuario'}
                                </td>
                                <td className="px-2 py-2  text-gray-900  border-r border-[#00000040]">
                                    {destinatario['nombre de banco'] && destinatario['nombre de banco']}
                                    {destinatario['red destinatario'] && destinatario['red destinatario']}
                                </td>
                            </tr>
                            <tr className=" text-[14px]  border-b border-[#00000040] hover:bg-gray-50 " >
                                <td className="px-2 py-2 bg-gray-300   font-bold  text-gray-900 ">
                                    Divisa de recepción
                                </td>
                                <td className="px-2 py-2  text-gray-900  border-r border-[#00000040]">
                                    {select2}
                                </td>
                            </tr>
                            <tr className=" text-[14px] bg-gray-800 border-b" >
                                <td scope="col" colSpan="2" className="px-3 py-3  font-bold text-[14px] text-white  ">
                                    DATOS DE TRANSACCION
                                </td>
                            </tr>

                            <tr className=" text-[14px] border-b border-[#00000040] hover:bg-gray-50 " >
                                <td className="px-2 py-2 bg-gray-300  font-bold  text-gray-900 ">
                                    Operacion
                                </td>
                                <td className="px-2 py-2  text-gray-900  border-r border-[#00000040]">
                                    {destinatario.operacion}
                                </td>
                            </tr>

                            <tr className=" text-[14px] border-b border-[#00000040] hover:bg-gray-50 " >
                                <td className="px-2 py-2 bg-gray-300  font-bold  text-gray-900 ">
                                    Importe mas comision
                                </td>
                                <td className="px-2 py-2  text-gray-900  border-r border-[#00000040]">
                                    {(transferencia * 1 + comision * 1).toFixed(2)} {select}
                                </td>
                            </tr>
                            <tr className=" text-[14px] border-b border-[#00000040] hover:bg-gray-50 " >
                                <td className="px-2 py-2 bg-gray-300  font-bold  text-gray-900 ">
                                    comision
                                </td>
                                <td className="px-2 py-2  text-gray-900  border-r border-[#00000040]">
                                    {comision} {select}
                                </td>
                            </tr>

                            <tr className=" text-[14px] border-b border-[#00000040] hover:bg-gray-50 " >
                                <td className="px-2 py-2 bg-gray-300  font-bold  text-gray-900 ">
                                    Importe neto a recibir <br /> con el cambio aplicado
                                </td>
                                <td className="px-2 py-2  text-gray-900  border-r border-[#00000040] bg-yellow-300">

                                    {divisas && divisas[select] && divisas[select2] && (transferencia * divisas[select2].compra / divisas[select].venta).toFixed(2)} {select2}

                                </td>
                            </tr>

                            <tr className=" text-[14px] border-b border-[#00000040] hover:bg-gray-50  bg-transparent md:bg-gray-50" >
                                <td className="px-2 py-2 font-bold  text-gray-900 ">
                                    <div className='flex justify-center pt-5'>
                                        <Button theme={"Disable"} click={() => router.back()}>Atras</Button>
                                    </div>                            </td>
                                <td className="px-2 py-2  text-gray-900  ">
                                    <div className='flex justify-center pt-5'>
                                        <Button theme={"Success"} click={save}>Confirmar datos</Button>
                                    </div>                            </td>

                            </tr>
                        </tbody>
                    </table>



                </div>


            </div>}
        </div>
    )
}

export default WithAuth(Home)
