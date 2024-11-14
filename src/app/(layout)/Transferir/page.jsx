'use client'
import { useState, useEffect } from 'react'
import { uploadStorage, downloadFile } from '@/firebase/storage'
import { useUser } from '@/context/Context.js'
import Input from '@/components/Input'
import SelectCountry from '@/components/SelectCountry'
import Label from '@/components/Label'
import Loader from '@/components/Loader'
import Button from '@/components/Button'
import Msg from '@/components/Msg'
import { useMask } from '@react-input/mask';
import { useRouter } from 'next/navigation';
import { WithAuth } from '@/HOCs/WithAuth'
import { getDayMonthYear } from '@/utils/date'
import { generateUUID } from '@/utils/UUIDgenerator'
import SelectBank from '@/components/SelectBank'
import SelectWallet from '@/components/SelectWallet'

import ModalINFO from '@/components/ModalINFO'
import { getSpecificDataEq, getSpecificData2, writeUserData, removeData } from '@/firebase/database'
import { ChatIcon, PhoneIcon, ClipboardDocumentCheckIcon, FolderPlusIcon, CurrencyDollarIcon, DocumentTextIcon, UserCircleIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/solid';

import Link from 'next/link'
function Home() {

    const { nav, setNav, user, userDB, setUserProfile, select, select2, wallets, setDestinatario, success, setUserData, postsIMG, setUserPostsIMG, isSelect3, setIsSelect3, isSelect4, setIsSelect4, modal, setModal, destinatario, qr, setQr, QRurl, setQRurl, countries, setEnviosDB, setCambiosDB, setIsSelect5, isSelect5 } = useUser()
    const router = useRouter()

    const [postImage, setPostImage] = useState(undefined)
    const [pagosQR, setPagosQR] = useState(undefined)
    const [walletQR, setWalletQR] = useState(undefined)

    const [urlPostImage, setUrlPostImage] = useState(undefined)
    const [payDB, setPayDB] = useState(undefined)
    function onChangeHandler(e) {
        setDestinatario({ ...destinatario, [e.target.name]: e.target.value })
    }
    // const handlerCountrySelect = (pais, cca3) => {
    //     setDestinatario({ ...destinatario, ['pais cuenta bancaria']: pais, cca3 })
    // }
    const handlerIsSelect = () => {
        setIsSelect3(!isSelect3)
    }
    const handlerBankSelect2 = (i, data) => {
        setDestinatario({ ...destinatario, ['banco remitente']: i, ['banco bottak']: i, ['cuenta bottak']: data['cta bancaria'] })
        setPagosQR(data)
    }
    const handlerWalletSelect2 = (i, db) => {
        console.log(db)
        setDestinatario({ ...destinatario, ['billetera bottak']: db.address, ['red bottak']: db.network })
        setWalletQR(db)
    }



    const handlerBankSelect = (i, data) => {
        setDestinatario({ ...destinatario, ['banco bottak']: i, ['cuenta bottak']: data['cta bancaria'] })
        setPayDB(data)
    }
    function manageInputIMG(e) {
        const file = e.target.files[0]
        setPostImage(file)
        setUrlPostImage(URL.createObjectURL(file))
    }
    const handlerIsSelect4 = () => {
        setIsSelect4(!isSelect4)
    }
    const handlerIsSelect5 = () => {
        setIsSelect5(!isSelect5)
    }





    function save(e) {
        e.preventDefault()

        setModal('Iniciando verificación rapida...')

        // const reader = new FileReader();
        // reader.onloadend = () => {
        //     // console.log(reader.result);
        // }
        // reader.readAsDataURL(postImage);

        const uuid = generateUUID()
        const date = new Date().getTime()
        const fecha = getDayMonthYear(date)
        const db = {
            ...destinatario,
            email: user.email,
        }
        console.log(db)
        const callback2 = async (object) => {
            getSpecificDataEq(`/envios/`, 'user uuid', user.uid, setEnviosDB)
            getSpecificDataEq(`/cambios/`, 'user uuid', user.uid, setCambiosDB)

            try {
                setModal(`Enviando los resultados de la VERIFICACION RAPIDA a \n ${user.email}`)

                const res = await fetch('/api/postGoogleSheet', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "op": "listar",
                        "remitente": object['remitente'],
                        "importe": db['importeTotal'],
                        "user uuid": object['user uuid'],
                        "uuid": object.uuid,
                        "operacionURL": object['operacion'] === 'Envio' ? 'envios' : 'cambios',
                        "name": userDB.nombre,
                        "lastName": userDB.apellido
                    }),

                    // WITH APPSCRIPT ONLY
                    // body: JSON.stringify({
                    //     ...db, ...object, email: user.email,
                    //     "op": "listar",
                    //     "operacionURL": object['operacion'] === 'Envio' ? 'envios' : 'cambios'
                    // }),
                })
                setModal(`Finalizando...`)
                const data = await res.json()









                const datosEmail = object['operacion'] === 'Envio'
                    ? {
                        'DATOS DE REMITENTE': db['divisa de envio'] === 'USDT'
                            ? {
                                Nombre: object['remitente'],
                                Dni: db['dni remitente'],
                                Pais: db['pais remitente'],
                                Celular: db['whatsapp'],
                                'Direccion de wallet': db['billetera remitente'],
                                Red: db['red bottak'],
                                'Divisa Envio': db['divisa de envio']
                            }
                            : {
                                Nombre: db['remitente'],
                                Dni: db['dni remitente'],
                                Pais: db['pais remitente'],
                                Celular: db['whatsapp'],
                                Banco: db['banco remitente'],
                                'Cuenta Bancaria': db['cuenta bancaria'],
                                'Divisa Envio': db['divisa de envio']
                            },
                        'DATOS DE DESTINATARIO': db['divisa de receptor'] === 'USDT'
                            ? {
                                Nombre: db['destinatario'],
                                Dni: db['dni'],
                                Pais: db['pais'],
                                Direccion: db['direccion'],
                                Celular: db['celular'],
                                'Direccion de billetera': db['billetera destinatario'],
                                'Red': db['red destinatario'],
                                'Divisa Receptor': db['divisa de receptor'],
                            }
                            : {
                                Nombre: db['destinatario'],
                                Dni: db['dni'],
                                Pais: db['pais'],
                                Direccion: db['direccion'],
                                Celular: db['celular'],
                                'Cuenta Destinatario': db['cuenta destinatario'],
                                'Nombre Banco': db['nombre de banco'],
                                'Divisa Receptor': db['divisa de receptor'],
                            },
                        'DATOS DE TRANSACCION': {
                            Operacion: object['operacion'],
                            Importe: object['importe'],
                            Comision: db['comision'],
                            ['Importe detinatario']: db['cambio'],
                            Estado: (data?.message && data.message === 'Verificado con Exito') ? 'Verificado' : 'En verificación',
                            Fecha: object['fecha'],
                            'ID de tracking': db.uuid

                        },
                        'CUENTA RECEPTORA BOTTAK': db['divisa de envio'] === 'USDT'
                            ? {
                                'Billetera Bottak': db['billetera bottak'],
                                'Red Bottak': db['red bottak']
                            }
                            : {
                                'Banco Bottak': db['banco bottak'],
                                'Cuenta Bottak': db['cuenta bottak']
                            }

                    }

                    : {


                        'DATOS DE EMISION': db['divisa de usuario'] === 'USDT'
                            ? {
                                Nombre: object['remitente'],
                                Dni: db['dni'],
                                Pais: db['pais'],
                                Celular: db['whatsapp'],
                                'Direccion de wallet': db['billetera remitente'],
                                Red: db['red bottak'],
                                'Divisa Emision': db['divisa de usuario']
                            }
                            : {
                                Nombre: object['remitente'],
                                Dni: db['dni'],
                                Pais: db['pais'],
                                Celular: db['whatsapp'],
                                'Banco Emisor': db['banco remitente'],
                                'Cuenta Emisora': db['cuenta bancaria'],
                                'Divisa Emision': db['divisa de usuario']
                            }
                        ,
                        'DATOS PARA RECEPCIÓN': db['divisa de cambio'] === 'USDT'
                            ? {
                                'Direccion de billetera': db['billetera destinatario'],
                                'Red': db['red destinatario'],
                                'Divisa Recepcion': db['divisa de cambio']
                            }
                            : {
                                'Cuenta Receptora': db['cuenta destinatario'],
                                'Banco Receptor': db['nombre de banco'],
                                'Divisa Recepcion': db['divisa de cambio']
                            },
                        'DATOS DE TRANSACCION': {
                            Operacion: object['operacion'],
                            Importe: object['importe'],
                            Comision: db['comision'],
                            Cambio: db['cambio'],
                            Estado: (data?.message && data.message === 'Verificado con Exito') ? 'Verificado' : 'En verificación',
                            Fecha: object['fecha'],
                            'ID de tracking': db.uuid

                        },
                        'CUENTA RECEPTORA BOTTAK': db['divisa de usuario'] === 'USDT'
                            ? {
                                'Billetera Bottak': db['billetera bottak'],
                                'Red Bottak': db['red bottak']
                            }
                            : {
                                'Banco Bottak': db['banco bottak'],
                                'Cuenta Bottak': db['cuenta bottak']
                            }
                    };







                const html = (`<main style="font-family: Arial, sans-serif; background-color: #f0f0f0; padding: 20px;">
                        <table style="width: 100%; min-width: 50vw; border-radius: 20px; text-align: left; font-size: 14px; color: #6b7280; background-color: white; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                            <thead style="text-align: center; font-weight: bold; background-color: #4b5563; color: white;">
                                <tr>
                                    <th colspan="2" style="padding: 15px;">
                                        Baucher de transacción <br />
                                    </th>
                                </tr>
                            </thead>
                      ${(`     <tbody>
       ${Object.entries(datosEmail).map(item => `
                    <tr style="background-color: rgba(0, 0, 0, 0.1);">
                        <td colspan="2" style="padding: 15px; font-weight: bold; background-color: #4b5563;  color: white;">
                            ${item[0]}
                        </td>
                    </tr>
                ${Object.entries(item[1]).map(i => `<tr style="background-color: white; border-bottom: 1px solid #e5e7eb;">
                            <td style="padding: 15px; background-color: rgba(0, 0, 0, 0.1); font-weight: bold; color: #1f2937;">
                                ${i[0]}
                            </td>
                            <td style="padding: 15px; color: #1f2937;">
                                ${i[1]}
                            </td>
                    </tr>`)}
              `)}  
              </tbody>`).replaceAll('</tr>,', '</tr>')}
            </table>
        </main>`)






                const botChat = ` ${(`${Object.entries(datosEmail).map(item => `------${item[0]}---\n${Object.entries(item[1]).map(i => `${i[0]}: ${i[1]}\n`)}`)}\n${object.url}`).replaceAll(',', '').replaceAll('  ', ' ')}`

                console.log(botChat)

                await fetch(`/api/bot`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ data: botChat, url: object.url }),
                })

                await fetch(`/api/sendEmail`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ data: html, estado: data?.message && data?.message !== undefined && data.message === 'Verificado con Exito' ? 'Verificado' : 'En verificación', email: user.email, operacion: object['operacion'] })
                })
                router.replace(`/Exitoso?uuid=${uuid}&operacion=${object['operacion'] === 'Cambio' ? 'cambios' : 'envios'}`)
                setModal('')
            } catch (err) {
                console.log(err)
            }
        }

        function callback(object) {
            const obj = {
                "remitente": object['operacion'] === 'Cambio' ? object['usuario'] : object['remitente'],
                "importe": object['importe'],
                "user uuid": object['user uuid'],
                "uuid": object.uuid,
                "operacion": object['operacion'],
                "fecha": object.fecha,
                "email": object.email,
                "url": object.url
            }
            destinatario.operacion === 'Cambio'
                ? uploadStorage(`cambios/${uuid}`, postImage, obj, callback2)
                : uploadStorage(`envios/${uuid}`, postImage, obj, callback2)
        }



        destinatario.operacion === 'Cambio'
            ? uploadStorage(`cambios/${uuid}`, postImage, { ...db, fecha, date, uuid, estado: 'En verificación', verificacion: false, email: user.email }, callback)
            : uploadStorage(`envios/${uuid}`, postImage, { ...db, fecha, date, uuid, estado: 'En verificación', verificacion: false, email: user.email }, callback)
    }
    console.log(destinatario)





    const TextWithCopy = ({ keys, value }) => {
        const [copied, setCopied] = useState(false);

        const copyToClipboard = (textToCopy) => {
            navigator.clipboard.writeText(textToCopy).then(() => {
                setCopied(textToCopy);
                setTimeout(() => setCopied(false), 3000); // Ocultar el mensaje después de 2 segundos
            });
        };

        return (
            <div className="relative flex ">
                <p className='text-black flex'>
                    {keys}:{' '}
                    <span onClick={() => copyToClipboard(value)} className="cursor-pointer flex pl-1">
                        {value}
                        <ClipboardDocumentCheckIcon className="h-4 w-4 fill-green-400  pl-1" />
                    </span>
                </p>
                {copied === value && (
                    <p className="absolute top-2 w-[150px] text-green-500 flex items-center shadow-sm rounded-[5px] py-1 px-2 shadow-[#979797] bg-white z-30">
                        <ClipboardDocumentCheckIcon className="h-4 w-4 fill-green-400 mr-1" />
                        Texto Copiado!
                    </p>
                )}
            </div>
        );
    };




    return (
        countries[userDB.cca3] !== undefined && countries[userDB.cca3].countries !== undefined
            ? <form className='relative left-0 right-0  md:bg-gradient-to-tl from-gray-100 to-gray-300  mx-auto w-full  max-w-[700px]  min-h-[80vh] space-y-6 ' onSubmit={(e) => save(e)}>
                {modal === 'Validando...' && <Loader> {modal} </Loader>}
                {modal.length > 5 && <Loader>{modal}</Loader>}


                <div className='bg-transparent col-span-2 p-1 lg:p-5 justify-items-center'>
                    <div className='text-center w-full col-span-2 text-green-500 font-bold py-5 mb-5  md:flex md:justify.center' >
                        <h3 className='font-bold text-[14px] text-white uppercase flex items-center'>
                            <div className='bg-gray-950 text-white border border-green-500 h-[40px] w-[40px] rounded-full flex justify-center items-center mr-3'>
                                2
                            </div>
                            <p className='w-[80%] bg-gray-950 text-white text-left underline  underline-offset-8  decoration-green-500  px-3 py-2 rounded-[10px]  border border-green-500 inline-block'>
                                {select !== 'USDT' ? 'Indica el banco y el numero de cuenta de donde efectuaras la transferencia' : 'Indica la billetera y la direccion de donde efectuaras la transferencia'}
                            </p>
                        </h3>
                    </div>



                    <div className=' md:bg-gradient-to-tl from-[#ffffff] to-[#ffffffb1] shadow rounded-[10px] relative left-0 right-0 mx-auto w-full space-y-6 lg:grid lg:grid-cols-2 lg:gap-x-5 lg:p-5 lg:mb-10  lg:place-items-end'>



                        {select !== 'USDT' && <div className='py-5  md:py-0  space-y-5 w-full max-w-[380px] '>
                            <Label htmlFor="">Elige tu banco</Label>
                            <SelectBank name="nombre de banco" bg='bg-gray-50  border-gray-400' propHandlerIsSelect={handlerIsSelect5} propIsSelect={isSelect5} operation="envio" click={handlerBankSelect2} arr={countries[userDB.cca3].countries !== undefined ? Object.values(countries[userDB.cca3].countries) : []} />
                        </div>}
                        {select !== 'USDT' && <div className='py-5  md:py-0   space-y-5 w-full max-w-[380px] '>
                            <Label htmlFor="">Numero de tu cuenta bancaria</Label>
                            <Input type="text" name="cuenta bancaria" onChange={onChangeHandler} required />
                        </div>}

                        {select == 'USDT' && <div className='py-5  md:py-0   w-full max-w-[380px] space-y-5'>
                            <Label htmlFor="">Elige una wallet de tranferencia</Label>
                            <SelectWallet name="billetera bottak" bg='bg-gray-50 border-gray-400' propHandlerIsSelect={handlerIsSelect5} propIsSelect={isSelect5} operation="envio" click={handlerWalletSelect2} arr={wallets ? Object.values(wallets) : []} />
                        </div>}
                        {select == 'USDT' && <div className='py-5  md:py-0   space-y-5 w-full max-w-[380px]'>
                            <Label htmlFor="">Dirección de tu billetera</Label>
                            <Input type="text" name="billetera remitente" onChange={onChangeHandler} required />
                        </div>}

                    </div>








                    <div className='text-center w-full col-span-2 text-green-500 font-bold py-5 mb-5 lg:mb-0 md:flex md:justify.center' >
                        <h3 className='font-bold text-[14px] text-white uppercase flex items-center'>
                            <div className='bg-gray-950 text-white border border-green-500 h-[40px] w-[40px] rounded-full flex justify-center items-center mr-3'>
                                3
                            </div>
                            <p className='bg-gray-950 text-white underline  underline-offset-8  decoration-green-500  px-3 py-2 rounded-[10px]  border border-green-500'>
                                EFECTUAR TRANSACCION
                            </p>
                        </h3>
                    </div>

                    <div className='  relative left-0 right-0 mx-auto w-full lg:mb-10 space-y-6 lg:grid lg:grid-cols-2 lg:gap-x-5 lg:p-0  lg:place-items-start'>

                        {/* {destinatario !== undefined && destinatario['banco bottak'] !== undefined &&  */}
                        {select !== 'USDT'
                            ? <div className='py-5 shadow md:py-0  space-y-5'>
                                {/* <Label htmlFor="">QR bancario para el deposito</Label> */}
                                <Label htmlFor="">QR para transferencia</Label>

                                {/* <div className=' space-y-5'>
                                <SelectBank name="nombre de banco" propHandlerIsSelect={handlerIsSelect4} bg='bg-white' propIsSelect={isSelect4} operation="envio" click={handlerBankSelect} arr={countries[userDB.cca3].countries !== undefined ? Object.values(countries[userDB.cca3].countries) : []} />
                                </div> */}
                                <Link href='#' className="w-full flex flex-col justify-center items-center" download >
                                    <label className="relative flex flex-col justify-start items-center w-[300px] min-h-[300px] h-auto bg-white border border-gray-400 text-gray-900 text-[12px]  focus:ring-blue-500 focus:border-blue-500 rounded-[10px]" >
                                        {pagosQR && pagosQR !== undefined
                                            ? <img className=" flex justify-center items-center w-[300px] min-h-[300px] h-auto bg-white text-gray-900 text-[12px]  focus:ring-blue-500 focus:border-blue-500 rounded-[10px]" style={{ objectPosition: 'center' }} src={pagosQR.qrURL} alt="" />
                                            : <p className='relative h-full text-[12px] w-full p-5 text-center top-0 bottom-0 my-auto'>Selecciona uno de nuestros bancos para obtener un QR y efectuar su transferencia</p>}
                                        {/* {destinatario && destinatario.importe}
                                        {destinatario && destinatario['divisa de envio']} */}
                                    </label>
                                </Link>


                                {/* <div className='text-black text-center text-[12px] border border-gray-400 rounded-[10px] bg-white p-3 shadow-black'>
                                    Importe:   {destinatario && destinatario.importe} <br />
                                    Cta. {countries && countries !== undefined && countries[userDB.cca3] !== undefined && countries[userDB.cca3].countries !== undefined && countries[userDB.cca3].countries[destinatario['banco bottak']] !== undefined && countries[userDB.cca3].countries[destinatario['banco bottak']]['cta bancaria']} <br />
                                    Banco: {destinatario !== undefined && destinatario['banco bottak'] !== undefined && countries && countries !== undefined && countries[userDB.cca3] !== undefined && countries[userDB.cca3].countries[destinatario['banco bottak']] !== undefined && countries[userDB.cca3].countries[destinatario['banco bottak']].banco} <br />
                                    {countries?.[userDB.cca3]?.countries?.[destinatario?.['banco bottak']]['link de pago'] && <p>
                                        Link de pago: <Link target='_blank' href={countries?.[userDB.cca3]?.countries?.[destinatario?.['banco bottak']]['link de pago']} className='underline text-blue-500' >{countries?.[userDB.cca3]?.countries?.[destinatario?.['banco bottak']]['link de pago']}</Link>
                                    </p>}
                                </div> */}

                                {console.log(pagosQR)}
                                {pagosQR && pagosQR !== undefined && destinatario &&


                                    <div className='text-black text-center text-[12px] border border-gray-400 rounded-[10px] bg-white p-3 shadow-black flex flex-col items-center'>
                                        {pagosQR && pagosQR !== undefined && destinatario &&
                                            <TextWithCopy
                                                keys={'Importe'}
                                                value={destinatario.importe}
                                            />
                                        }
                                        {pagosQR['cta bancaria'] &&
                                            <TextWithCopy
                                                keys={'Cta'}
                                                value={pagosQR['cta bancaria']}
                                            />
                                        }
                                         {pagosQR && pagosQR !== undefined && destinatario &&
                                            <TextWithCopy
                                                keys={'Banco'}
                                                value={pagosQR.banco}
                                            />
                                        }
                                        {destinatario !== undefined && destinatario['banco bottak'] !== undefined && countries && countries !== undefined && countries[userDB.cca3] !== undefined && countries[userDB.cca3].countries[destinatario['banco bottak']] !== undefined && countries[userDB.cca3].countries[destinatario['banco bottak']].banco &&
                                            <TextWithCopy
                                                keys={'Banco'}
                                                value={pagosQR.banco}
                                            />
                                        }
                                        {pagosQR['link de pago'] && <p>
                                            Link de pago: <Link target='_blank' href={pagosQR['link de pago']} className='underline text-blue-500' >{pagosQR['link de pago']}</Link>
                                        </p>}

                                    </div>



                                }
                            </div>
                            : <div className=' space-y-5  py-5  md:py-0  '>
                                <Label htmlFor="">QR para transferencia</Label>


                                <Link href='#' className="w-full flex flex-col justify-center items-center" download >
                                    <label className="relative flex flex-col justify-start items-center w-[300px] min-h-[300px] h-auto bg-white border border-gray-400 text-gray-900 text-[12px]  focus:ring-blue-500 focus:border-blue-500 rounded-[10px]" >
                                        {walletQR && walletQR !== undefined
                                            ? <img className=" flex justify-center items-center w-[300px] min-h-[300px] h-auto bg-white text-gray-900 text-[12px]  focus:ring-blue-500 focus:border-blue-500 rounded-[10px]" style={{ objectPosition: 'center' }} src={walletQR.qrURL} alt="" />
                                            : <p className='relative h-full text-[12px] w-full p-5 text-center top-0 bottom-0 my-auto'>Selecciona uno de nuestros bancos para obtener un QR y efectuar su transferencia</p>}
                                    </label>
                                </Link>

                                {walletQR && walletQR !== undefined && <div className='text-black text-center text-[12px] border border-gray-400 rounded-[10px] bg-white p-3 shadow-black flex flex-col items-center'>
                                    {walletQR && walletQR !== undefined && destinatario &&
                                        <TextWithCopy
                                            keys={'Importe'}
                                            value={destinatario.importe}
                                        />
                                    }
                                    {walletQR && walletQR !== undefined &&
                                        <TextWithCopy
                                            keys={'Direccion'}
                                            value={walletQR['address']}
                                        />
                                    }
                                    {walletQR && walletQR !== undefined &&
                                        <TextWithCopy
                                            keys={'Red'}
                                            value={walletQR['network']}
                                        />
                                    }
                                    {walletQR && walletQR !== undefined && walletQR['link de pago'] && <p>
                                        Link de pago: <Link target='_blank' href={walletQR && walletQR !== undefined && walletQR['link de pago']} className='underline text-blue-500' >{walletQR && walletQR !== undefined && walletQR['link de pago']}</Link>
                                    </p>}

                                </div>}

                            </div>
                        }


                        {/* {((destinatario !== undefined && destinatario['banco bottak'] !== undefined) || walletQR) && <div className=' py-5  md:py-0  space-y-5'> */}
                        {<div className=' py-5  md:py-0  space-y-5 h-full'>

                            <Label htmlFor="">Subir baucher</Label>

                            {/* <Label htmlFor="">Baucher de transferencia</Label> */}
                            <div className="w-full flex justify-center">
                                <label htmlFor="file" className="flex justify-center items-center w-[300px] min-h-[300px] bg-white border border-gray-400  text-center text-gray-900 text-[14px] focus:ring-blue-500 focus:border-blue-500 rounded-[10px]" >
                                    {urlPostImage !== undefined ? <img className="flex justify-center items-center w-[300px] min-h-[300px] bg-white border border-gray-400 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 rounded-[10px]" style={{ objectPosition: 'center' }} src={urlPostImage} alt="" />
                                        : 'Subir baucher'}
                                </label>
                                <input className="hidden" id='file' name='name' onChange={manageInputIMG} accept=".jpg, .jpeg, .png, .mp4, webm" type="file" required />
                            </div>

                        </div>}
                    </div>

                    {countries[userDB.cca3] !== undefined && countries[userDB.cca3].countries !== undefined && <div className='py-5  md:py-0  flex w-full justify-around items-end col-span-2'>
                        <Button type='submit' theme='Success' >Verificar Transacción</Button>
                        {/* <Button type='button' theme='Success' click={validateTransaction} >Verificar Transacció</Button> */}
                    </div>}

                </div>

                {success == 'CompletePais' && <Msg>Seleccione un pais</Msg>}
            </form>
            : <ModalINFO theme={'Danger'} alert={false} button="Volver" funcion={() => router.replace('/')} close={true} >Por el momento no hay bancos disponibles para tu pais</ModalINFO>
    )
}

export default WithAuth(Home)













// ----DATOS DE REMITENTE----\n
// Remitente: ${object['remitente']},\n
// Dni remitente: ${db['dni remitente']},\n
// Pais remitente: ${db['pais remitente']},\n
// ${db['divisa de envio'] === 'USDT' ?
//                   `Red: ${db['banco remitente']},\n
// Direccion de billetera: ${db['cuenta bancaria']},\n`
//                   : `Banco remitente: ${db['banco remitente']},\n
// Cuenta bancaria: ${db['cuenta bancaria']},\n`}
// Divisa de envio: ${db['divisa de envio']},\n

// -------DATOS DE DESTINATARIO-------\n
// ${db['red'] && db['red'] !== undefined
//                   ? `
// Destinatario: ${db['destinatario']},\n
// DNI destinatario: ${db['dni']},\n
// Pais destinatario: ${db['pais']},\n
// Direccion: ${db['direccion']},\n
// Celular: ${db['celular']},\n
// Direccion de billetera: ${db['direccion de billetera']},\n
// Red: ${db['red']},\n
// Divisa de receptor: ${db['divisa de receptor']},\n`
//                   : `
// Destinatario: ${db['destinatario']},\n
// DNI destinatario: ${db['dni']},\n
// Pais destinatario: ${db['pais']},\n
// Direccion: ${db['direccion']},\n
// Celular: ${db['celular']},\n
// Cuenta destinatario: ${db['cuenta destinatario']},\n
// Nombre de banco: ${db['nombre de banco']},\n
// Divisa de receptor: ${db['divisa de receptor']},\n`
//               }

// ------DATOS DE TRANSACCION-----\n
// Operacion: ${object['operacion']},\n
// Importe: ${object['importe']},\n
// Comision: ${db['comision']},\n
// Cambio: ${db['cambio']},\n
// Estado: ${data?.message && data?.message !== undefined && data.message === 'Verificado con Exito' ? 'Verificado' : 'En verificación'},\n
// fecha: ${object['fecha']},\n

// -----CUENTA RECEPTORA BOTTAK-----\n
// banco bottak: ${db['banco bottak']},\n 









// ` 
// ---------DATOS DE EMISION--------\n
//   Nombre : ${object['remitente']},\n
//   Dni: ${db['dni']},\n
//   Pais: ${db['pais']},\n
//   Celular: ${db['whatsapp']},\n
//   ${db['divisa de usuario'] === 'USDT'
//                     ? `Red: ${db['banco remitente']},\n
//   Direccion de billetera: ${db['cuenta bancaria']},\n`
//                     : `Banco emisor: ${db['banco remitente']},\n
//   Cuenta emisora: ${db['cuenta bancaria']},\n`}
//   Divisa de emision: ${db['divisa de usuario']},\n

// ---------DATOS PARA RECEPCIÓN----------\n
// ${db['red'] && db['red'] !== undefined
//                     ? `Direccion de billetera: ${db['direccion de billetera']},\n
//   Red: ${db['red']},\n
//   Divisa de recepción: ${db['divisa de cambio']},\n`
//                     : `Cuenta receptora: ${db['cuenta destinatario']},\n
//   Banco receptor: ${db['nombre de banco']},\n
//   Divisa de recepción: ${db['divisa de cambio']},\n`
//                 }

// ---------DATOS DE TRANSACCION---------\n
//   Operacion: ${object['operacion']},\n
//   Importe: ${object['importe']},\n
//   Comision: ${db['comision']},\n
//   Cambio: ${db['cambio']},\n
//   Estado: ${data?.message && data?.message !== undefined && data.message === 'Verificado con Exito' ? 'Verificado' : 'En verificación'},\n
//   fecha: ${object['fecha']},\n

// -------CUENTA RECEPTORA BOTTAK-----\n
//   banco bottak: ${db['banco bottak']},\n 
//   `