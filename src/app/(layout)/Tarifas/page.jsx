'use client';
import { useUser } from '@/context/Context'
import { useEffect, useState, useRef } from 'react'

export default function Home() {

    const { user, userDB, setUserProfile, modal, tarifas, setModal, users, setUsers, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, divisas, setDivisas, item, setItem, exchange, setExchange, } = useUser()
    const [filter, setFilter] = useState('')
    const refFirst = useRef(null);
    const [row, setRow] = useState(-1)

    function onChangeFilter(e) {
        setFilter(e.target.value)
    }
    function sortArray(x, y) {
        if (x['currency'].toLowerCase() < y['currency'].toLowerCase()) { return -1 }
        if (x['currency'].toLowerCase() > y['currency'].toLowerCase()) { return 1 }
        return 0
    }
    const prev = () => {
        requestAnimationFrame(() => {
            const scrollLeft = refFirst.current.scrollLeft;

            const itemWidth = screen.width - 50
            refFirst.current.scrollLeft = scrollLeft - itemWidth;
        });
    };
    const next = () => {
        requestAnimationFrame(() => {
            const scrollLeft = refFirst.current.scrollLeft;

            const itemWidth = screen.width - 50
            console.log(itemWidth)
            refFirst.current.scrollLeft = scrollLeft + itemWidth;
        });
    };
    return (
        <main className='w-full h-full'>
            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block left-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:left-[20px] hover:bg-[#00000060] transition-all' onClick={prev}>{'<'}</button>
            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block right-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:right-[20px]  hover:bg-[#00000060] transition-all' onClick={next}>{'>'}</button>
            <div className="w-full   relative h-full overflow-auto shadow-2xl  bg-gray-300 min-h-[80vh] scroll-smooth">



                <div className='w-[100%] overflow-x-auto p-3 md:p-5'>

                    <div className='min-w-[1000px]'>
                        <h3 className='font-medium text-[14px] text-black'>Lista De Cambios</h3>
                        <br />
                        <label htmlFor="" className='text-black text-[14px] pr-5 font-medium'>Filtrar: </label>

                        <input type="text" className='border-b-[1px] text-[14px] outline-none w-[400px] text-black  rounded-[5px] p-1 border-[1px] border-gray-400' onChange={onChangeFilter} placeholder='Buscar Divisa' />
                        <br />
                    </div>
                </div>
                <div className="w-full   relative h-full overflow-y-auto  shadow-2xl bg-white max-h-[calc(100vh-120px)] md:max-h-[calc(100vh-70px)] scroll-smooth" ref={refFirst}>

                    <table className="w-full overflow-visible min-w-[1000px]  text-[14px] text-left text-gray-500 border-t-4 border-gray-400">
                        <thead className="text-[14px] text-gray-700 uppercase bg-gray-800 text-white sticky top-0  z-20">
                            <tr>
                                <th scope="col" className=" px-3 py-3">
                                    #
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Divisa
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Code
                                </th>
                                <th scope="col" className=" px-3 py-3">
                                    Base
                                </th>
                                <th scope="col" className="text-center px-3 py-3">
                                    Compra
                                </th>
                                <th scope="col" className="text-center px-3 py-3">
                                    Venta
                                </th>
                                <th scope="col" className="text-center px-3 py-3">
                                    Tarifa de Envio<br />
                                    {tarifas.tarifa_1_min} USD - {tarifas.tarifa_1_max} USD
                                </th>
                                <th scope="col" className="text-center px-3 py-3">
                                    Tarifa de Envio <br />
                                    {tarifas.tarifa_2_min} USD - {tarifas.tarifa_2_max} USD
                                </th>
                                <th scope="col" className="text-center px-3 py-3">
                                    Tarifa de Envio<br />
                                    {tarifas.tarifa_3_min} USD - {tarifas.tarifa_3_max} USD
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {divisas && divisas !== undefined && Object.values(divisas).filter((i) => i.currency !== undefined && i.habilitado !== undefined && i.habilitado === true).sort(sortArray).map((i, index) => {
                                return (i.currency.toLowerCase().includes(filter.toLowerCase()) || i.code.toLowerCase().includes(filter.toLowerCase())) &&
                                    <tr className={`text-[14px] border-b border-gray-50  py-1 transition-all ${(index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-300')} `} key={index}>
                                        <td className="px-3 py-4  flex text-gray-900 ">
                                            <span className='h-full flex py-2'>{index + 1}</span>
                                        </td>
                                        <td className="px-3 py-4 text-gray-900 ">
                                            {i.currency === 'Crypto' ? `${i.currency} ${i.code}` : i.currency}
                                        </td>
                                        <td className="px-3 py-4 text-gray-900 ">
                                            {i.code}
                                        </td>
                                        <td className="px-3 py-4 text-gray-900 ">
                                            1 USDT
                                        </td>
                                        <td className="min-w-32 p-4 text-center">
                                            {i['compra'] !== undefined ? i['compra'] + i.code : '-----'}
                                        </td>
                                        <td className="min-w-32 p-4 text-center">
                                            {i['venta'] !== undefined ? i['venta'] + i.code : '-----'}
                                        </td>
                                        <td className="min-w-32 p-4 text-center">
                                            {i['tarifa 1'] !== undefined ? i['tarifa 1'] + ' % de ' + i.code : '-----'}
                                        </td>
                                        <td className="min-w-32 p-4 text-center">
                                            {i['tarifa 2'] !== undefined ? i['tarifa 2'] + ' % de ' + i.code : '-----'}
                                        </td>
                                        <td className="min-w-32 p-4 text-center">
                                            {i['tarifa 3'] !== undefined ? i['tarifa 3'] + ' % de ' + i.code : '-----'}
                                        </td>
                                    </tr>
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}




















