'use client';
import { useUser } from '@/context/Context'
import { useEffect, useState, useRef } from 'react'
import { getDayMonthYear } from '@/utils/date'
import ModalINFO from '@/components/ModalINFO'
import { getSpecificData, removeData, listenToSpecificDataEq } from '@/firebase/database'

export default function Home() {

    const { user, userDB, setUserProfile, modal, setModal, enviosDB,setEnviosDB, cambiosDB,setCambiosDB, setUserSuccess,postsIMG, setUserPostsIMG, divisas, setDivisas, item, setItem, exchange, setExchange, } = useUser()
    const [filter, setFilter] = useState('')
    const refFirst = useRef(null);
    const [selectDB, setSelectDB] = useState([])

    function onChangeFilter(e) {
        setFilter(e.target.value)
    }
    function sortArray(x, y) {
        if (x['currency'].toLowerCase() < y['currency'].toLowerCase()) { return -1 }
        if (x['currency'].toLowerCase() > y['currency'].toLowerCase()) { return 1 }
        return 0
    }

    function handlerSelect(e) {
        if (e.target.checked) {
            if (e.target.name === 'ALL') {
                let arr = Object.values(enviosDB && enviosDB !== undefined && cambiosDB && cambiosDB !== undefined ? { ...enviosDB, ...cambiosDB } : (enviosDB && enviosDB !== undefined ? enviosDB : (cambiosDB && cambiosDB !== undefined ? cambiosDB : {}))).map(i => i.uuid)

                setSelectDB(arr)
                return
            }
            setSelectDB([...selectDB, e.target.name])
        } else {
            if (e.target.name === 'ALL') {
                setSelectDB([])
                return
            }
            const data = selectDB.filter(i => i !== e.target.name)
            setSelectDB(data)
        }
    }
    function eliminarSelectDB() {
        setModal('DELETE')
    }

    function confirmEliminarSelectDB() {

        const callback = (close) => {
            console.log(close)
            if(close){
                setSelectDB([])
                setModal('')
                user && user !== undefined && listenToSpecificDataEq(`/envios/`, 'user uuid', user.uid, setEnviosDB)
                user && user !== undefined && listenToSpecificDataEq(`/cambios/`, 'user uuid', user.uid, setCambiosDB)
           
            }
        }


        selectDB.map((i, index) => {
            removeData(`envios/${i}`, setUserSuccess, () => callback(selectDB.length - 1 === index))
            removeData(`cambios/${i}`, setUserSuccess, () => callback(selectDB.length - 1 === index))

        })


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

            refFirst.current.scrollLeft = scrollLeft + itemWidth;
        });
    };
    console.log(selectDB)
    return (
        <main className='w-full h-full'>
               {modal === 'DELETE' && <ModalINFO theme="Danger" button="Eliminar" funcion={confirmEliminarSelectDB} close={true}>
                Estas por eliminar {selectDB.length > 1 ? `${selectDB.length} notificaciones` : `una notificación`}  <br />
                {/* <div className='text-left pl-5'>
                    {Object.values(userDB.destinatarios).map((i) => selectDB.includes(i.uuid) && <> {i['destinatario']}:___{i['cuenta destinatario']} <br /></>)}
                </div> */}
            </ModalINFO>}
            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block left-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:left-[20px] hover:bg-[#00000060] transition-all' onClick={prev}>{'<'}</button>
            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block right-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:right-[20px]  hover:bg-[#00000060] transition-all' onClick={next}>{'>'}</button>
            <div className="w-full   relative h-full overflow-auto shadow-2xl md:p-2 bg-gray-300 min-h-[80vh] scroll-smooth" ref={refFirst}>
                <h3 className='font-bold text-[16px] flex items-center justify-between text-white px-5 py-2 border-t-[5px] border-gray-200 bg-gray-800 border-b'>
                    <div>
                        <input type="checkbox" className='border-none mr-5 inline' onChange={handlerSelect} name={`ALL`} />
                        Historial de notificaciones
                    </div>

                    {selectDB.length > 0 ?
                        <button className='w-[200px] flex justify-center items-center h-[40px] ml-5 text-white text-[14px] font-medium bg-red-500 border border-gray-200 rounded-[10px] px-5 cursor-pointer' onClick={eliminarSelectDB}>Eliminar</button>
                        : <div className=' h-[40px]'></div>}
                </h3>

                {/* <div className="w-[405px] grid grid-cols-2 gap-[5px]" >
                    <input type="text" className='border-b-[1px] text-[14px] outline-none w-[200px]' onChange={onChangeFilter} placeholder='Buscar Destinatario' />
                </div> */}


                <div className={'bg-white top-[70px] w-full p-5 z-40 sm-right-[10px]'}>
                    {((enviosDB && enviosDB !== undefined) || (cambiosDB && cambiosDB !== undefined)) ? <ul> {Object.values(enviosDB && enviosDB !== undefined && cambiosDB && cambiosDB !== undefined ? { ...enviosDB, ...cambiosDB } : (enviosDB && enviosDB !== undefined ? enviosDB : (cambiosDB && cambiosDB !== undefined ? cambiosDB : {}))).sort((a, b) => b.date - a.date).map((i, index) => {
                        return <li className='relative pb-8 border-b-[1px] text-black border-gray-300' >
                            <input type="checkbox" className='border-none mr-5' checked={selectDB.includes(i.uuid)} onChange={handlerSelect} name={i.uuid} />

                            <span className='w-full pr-[10px]'>Tu {i.operacion} de dinero de
                                <b> {i['importe neto']} {i['divisa de envio']}{i['divisa de usuario'] && i['divisa de usuario'] !== undefined ? `${i['divisa de usuario']} a ${i['divisa de cambio']}` : ''}</b>  {i.destinatario !== undefined ? `a ${i.destinatario}, ` : ''}
                                {i.estado == 'En verificación' && <span className={` text-black`}>esta en verificación.</span>}
                                {i.estado == 'Verificado' && <span className={` text-black  bg-blue-100`}>esta VERIFICADO, la transaferencia esta apunto de realizarse.</span>}
                                {i.estado == 'Transfiriendo' && <span className={` text-black  bg-yellow-100`}>'ya se esta transfiriendo.</span>}
                                {i.estado == 'Exitoso' && <span className={` text-black bg-green-100`}>ha sido exitoso.</span>}
                                {i.estado == 'Rechazado' && <span className={` text-black bg-red-100 `}>ha sido rechazado.</span>}

                            </span>
                            <span className="absolute bottom-[15px] right-0 text-[10px]">{getDayMonthYear(i.date)}</span>
                            <span className="absolute bottom-[2px] right-0 text-[10px]">ID:{i.uuid}</span>


                        </li>


                    })
                    }</ul>
                        : <ul>
                            <li className='pb-4 border-b-[1px] border-gray-300'>Sin notificaciones</li>
                        </ul>}
                </div>
            </div>
        </main>
    )
}




















