'use client'

import React, { useState, useEffect } from "react";
import { useUser } from '@/context/Context'
import { writeUserData, getSpecificData } from "@/firebase/database"

export default function App({ propIsSelect, propHandlerIsSelect, operation, click, arr, bg}) {
    const { countries } = useUser()
    const [countrie, setCountrie] = useState(undefined)
    const [select, setSelect] = useState('Seleccionar Wallet')
    const [red, setRed] = useState('')

    const [flag, setFlag] = useState('')

    function handlerUserSelect(e, i) {
        setSelect(i.wallet)
        setRed(i.network)
        setFlag(i.url)
        click(i.wallet, i)
        // setCountrie(i)
    }
    function handlerIsSelect(e, i) {
        e.stopPropagation()
        propHandlerIsSelect()
    }

    return (
        <div className={`relative w-full sm:max-w-[380px] ${bg ? bg:'bg-transparent border-gray-300'} border  text-gray-900 text-[14px] rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-0 `} >
            <div className='relative w-full bg-transparent flex justify-between items-center'>
                <span className={` w-full p-3 ${bg ? 'text-black':'text-white'}`} onClick={(e) => handlerIsSelect(e)}>{select} <span className={`${bg ? 'text-black':'text-white'} text-[10px]`}>{red}</span></span>
                <span className='w-[auto] flex items-center rounded-[20px] '><img src={flag} className="max-w-[50px] h-[30px]" alt="" /></span>
                <span className={`  ${bg ? 'text-black':'text-white'} ${propIsSelect ? 'text-white text-center w-[10%] right-5 rotate-[270deg] p-3 ' : ' text-center w-[10%] right-5 rotate-90 p-3 '}`} onClick={(e) => handlerIsSelect(e)}>{'>'}</span>
            </div>
            {propIsSelect === false && operation === 'recepcion' && countrie && countrie !== undefined && countrie.translation.spa.common === select && countrie['envio'] !== true && <span className=" inline-block text-green-400 text-[14px] font-light p-3">{countrie.translation.spa.common} esta habilitado unicamente para recepciones de dinero</span>}
            <div className={`absolute left-0 top-10 bg-gray-100 flex flex-col justify-start items-center  text-gray-900 text-[14px] rounded-b-xl focus:ring-blue-500 focus:outline-blue-500 w-full   z-30 overflow-y-auto transition-all ${propIsSelect ? 'h-[150px] outline outline-1 outline-gray-300' : 'h-0 overflow-y-hidden'}`} >
                <ul className="inline-block w-full">
                    {arr.map((i, index) =>
                        <li className='w-full h-[50px] flex justify-start items-center px-10' key={index} onClick={(e) => handlerUserSelect(e, i)}>
                            <span className="inline-block w-30px] h-[20px]"><img src={i.url} className="w-[30px] h-[20px]" alt="" /></span>
                            <span className="pl-5 w-full flex justify-between "> <span>{i.wallet}</span><span className=" text-[10px]"> {i.network}</span></span>
                           
                        </li>)}
                </ul>
            </div>
        </div>
    );
}
