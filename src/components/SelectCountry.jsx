'use client'

import React, { useState, useEffect } from "react";
import { useUser } from '@/context/Context'
import { writeUserData, getSpecificData } from "@/firebase/database"
import { usePathname } from "next/navigation";
import { useSearchParams } from 'next/navigation'

export default function App({ propIsSelect, propHandlerIsSelect, click }) {
    const { countries, select, select2} = useUser()
    const [countrie, setCountrie] = useState(undefined)
    const [selectC, setSelect] = useState('Seleccionar')
    const [flag, setFlag] = useState('')
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const operation = searchParams.get('operacion')

    function handlerUserSelect(e, i) {
        setSelect(i.translation.spa.common)
        setFlag(i.flagPNG)
        click(i.translation.spa.common, i.cca3)
        setCountrie(i)
    }
    function handlerIsSelect(e, i) {
        e.stopPropagation()
        propHandlerIsSelect()
    }
    console.log(countrie?.code === select  || (countrie?.divisasPaisDestinatario && countrie?.divisasPaisDestinatario?.replaceAll(' ', '')?.includes(`${select},`)))
    return (
        <div className={`relative w-full sm:max-w-[380px] bg-transparent border border-gray-300 text-gray-900 text-[14px] rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-0 `} >
            <div className='relative w-full bg-transparent flex justify-between items-center'>
                <span className=" w-full text-gray-100 p-3 " onClick={(e) => handlerIsSelect(e)}>{selectC}</span>
                <span className='w-[auto] flex items-center rounded-[20px] '><img src={flag} className="max-w-[50px] h-[30px]" alt="" /></span>
                <span className={propIsSelect ? 'text-white text-center w-[10%] right-5 rotate-[270deg] p-3 ' : 'text-white text-center w-[10%] right-5 rotate-90 p-3 '} onClick={(e) => handlerIsSelect(e)}>{'>'}</span>
            </div>
            {propIsSelect === false && operation === 'recepcion' && countrie && countrie !== undefined && countrie.translation.spa.common === selectC && countrie['recepcion'] !== true && <span className=" inline-block text-green-400 text-[14px] font-light p-3">{countrie.translation.spa.common} esta habilitado unicamente para envio de dinero</span>}
            {propIsSelect === false && operation === 'envio' && countrie && countrie !== undefined && countrie.translation.spa.common === selectC && countrie['envio'] !== true && <span className=" inline-block text-green-400 text-[14px] font-light p-3">{countrie.translation.spa.common} esta habilitado unicamente para recepciones de dinero</span>}
            <div className={`absolute left-0 top-10 bg-gray-100 flex flex-col justify-start items-center  text-gray-900 text-[14px] rounded-b-xl focus:ring-blue-500 focus:outline-blue-500 w-full   z-30 overflow-y-auto transition-all ${propIsSelect ? 'h-[150px] outline outline-1 outline-gray-300' : 'h-0 overflow-y-hidden'}`} >
                <ul className="inline-block w-full">
                    {(pathname === '/Register/Destinatario' || pathname ===  'Register/Wallets')
                        ? Object.values(countries).map((i, index) => i[operation === 'recepcion' ? 'envio': 'recepcion'] && i[operation === 'recepcion' ? 'envio': 'recepcion'] !== undefined &&
                            <li className='w-full h-[50px] relative flex justify-start items-center pl-5 pr-10' key={index} onClick={(e) => handlerUserSelect(e, i)}>
                                <span className="inline-block w-30px] h-[20px]"><img src={i.flagPNG} className="w-[30px] h-[20px]" alt="" /></span>
                                <div className="pl-5 relative  w-full pb-[10px]"> {i.translation.spa.common}
                                    <span className='absolute  w-full text-right left-0 bottom-[0px] ml-5 text-[10px] bg-green-200 -z-30'>{(`${i.code}, ${i.divisasPaisDestinatario !== undefined ? i.divisasPaisDestinatario : ''}`)}</span>
                                </div>
                            </li>)
                        : Object.values(countries).map((i, index) => ((i[operation] !== undefined && i[operation] !== false && i[operation] !== null) || (i['envio'] !== undefined && i['envio'] !== false && i['envio'] !== null)) &&
                            <li className='w-full h-[50px] flex justify-start items-center px-10' key={index} onClick={(e) => handlerUserSelect(e, i)}>
                                <span className="inline-block w-30px] h-[20px]"><img src={i.flagPNG} className="w-[30px] h-[20px]" alt="" /></span>
                                <span className="pl-5"> {i.translation.spa.common}</span>
                            </li>)}
                </ul>
            </div>
            {(pathname === '/Register/Destinatario' || pathname === '/Register/Wallets') && countrie?.code === select2  || (countrie?.divisasPaisDestinatario && countrie?.divisasPaisDestinatario?.replaceAll(' ', '')?.includes(`${select2},`)) 
            ?''
            : select2 !== 'USDT' && (pathname === '/Register/Destinatario' || pathname === '/Register/Wallets') &&selectC && countrie?.code&& <p className='text-green-500 px-5'><br />{selectC} no admite la divisa <span className='text-red-500 font-semibold p-0' > {select2}</span><br /> <span className='text-red-500 font-semibold'>La divisa se cambiara en destino por una de las divisas admitidas como ser: </span>
            {(`${countrie?.code}, ${countrie.divisasPaisDestinatario !== undefined ? countrie.divisasPaisDestinatario : ''}`)}</p> }

      {/* {countrie !== undefined && pathname === '/Register/Destinatario' && <p className='text-green-500 px-5'>{selectC} admite la siguientes divisas: {(`${countrie.code}, ${countrie.divisasPaisDestinatario !== undefined ? countrie.divisasPaisDestinatario : ''}`)}</p>} */}


            {/* {countrie !== undefined && pathname === '/Register/Destinatario' && <p className='text-green-500 p-5'>Si el pais no admite la divisa que seleccionaste se cambiara</p>}  */}


        </div>
    );
}

// --------------------------------IMPORTANTE-----------------------

// const fetchdata = async (e) => {
//     const res = await fetch('https://restcountries.com/v3.1/all')
//     const db = await res.json()

//     console.log(db)
//     const data = db.reduce((acc, i) => {
//         const obj = {
//             cambioUSD: 0,
//             cambio: false,
//             cca2: i.cca2,
//             cca3: i.cca3,
//             ccn3: i.ccn3 ? i.ccn3 : 'non exist',
//             cioc: i.cioc !== undefined ? i.cioc : i.status,
//             remesas: false,
//             code: i.currencies && Object.keys(i.currencies)[0] !== null && Object.keys(i.currencies)[0] !== undefined ? Object.keys(i.currencies)[0] : i.cca3,
//             symbol: i.currencies && i.currencies[Object.keys(i.currencies)[0]].symbol ? i.currencies[Object.keys(i.currencies)[0]].symbol : 'non exist',
//             currency: i.currencies && i.currencies[Object.keys(i.currencies)[0]].name ? i.currencies[Object.keys(i.currencies)[0]].name : 'non exist',
//             flagSVG: i.flags.svg,
//             flagPNG: i.flags.png,
//             translation: i.translations
//         }
//         console.log(obj)
//         return { ...acc, [obj.cca3]: obj }
//     }, {})

//     return writeUserData('currencies', data, setUserSuccess)
// }

// -------------------------------------------------


// const fetchdata = async (e) => {
//     const res = await fetch('https://restcountries.com/v3.1/all')
//     const db = await res.json()

//     console.log(db)
//     const data = db.reduce((acc, i) => {
//         const obj = {
//             cambioUSD: 0,
//             cambio: false,
//             cca2: i.cca2,
//             cca3: i.cca3,
//             ccn3: i.ccn3,
//             cioc: i.cioc !== undefined ? i.cioc : i.status,
//             remesas: false,
//             code: i.currencies && Object.keys(i.currencies)[0] !== null && Object.keys(i.currencies)[0] !== undefined ? Object.keys(i.currencies)[0] : i.cca3,
//             symbol: i.currencies && i.currencies[Object.keys(i.currencies)[0]].symbol ? i.currencies[Object.keys(i.currencies)[0]].symbol : 'non exist',
//             currency: i.currencies && i.currencies[Object.keys(i.currencies)[0]].name ? i.currencies[Object.keys(i.currencies)[0]].name : 'non exist',
//             flagSVG: i.flags.svg,
//             flagPNG: i.flags.png,
//             translation: i.transalations ? i.transalations : 'non exist',
//         }
//         console.log(obj)
//         return { ...acc, [obj.code !== null && obj.code !== undefined ? obj.code : obj.ccn3]: obj }
//     }, {})

//     return writeUserData('currencies', data, setUserSuccess)
// }



