'use client';
import { useUser } from '@/context/Context'
import { getSpecificData, writeUserData, removeData } from '@/firebase/database'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
// import { getCurrencyExchange } from '@/currency';
import Modal from '@/components/Modal'
import ModalINFO from '@/components/ModalINFO'

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import { Input } from 'postcss';



export default function Home() {

    const { user, userDB, setUserProfile, modal, countries, setModal, users, setUsers, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, divisas, setDivisas, item, setItem, exchange, setExchange, destinatario, setDestinatario, transferencia } = useUser()
    const router = useRouter()
    const [filter, setFilter] = useState('')
    const [state, setState] = useState({})
    const [temporal, setTemporal] = useState(undefined)
    const refFirst = useRef(null);
    const [selectDB, setSelectDB] = useState([])

    const searchParams = useSearchParams()
    const pathname = searchParams.get('operacion')
    function onChangeFilter(e) {
        setFilter(e.target.value)
    }

    function save(i) {
        setDestinatario({ ...i, ...state, operacion: pathname })
        pathname === 'Cambio'
            ? router.push('/ConfirmCambio/')
            : router.push('/Confirm/')
    }
    function redirect() {
        setDestinatario({ operacion: pathname })
        router.push(`/Register/Wallets?operacion=${pathname}`)
    }


    function handlerSelect(e) {
        if (e.target.checked) {
            if (e.target.name === 'ALL') {
                let arr = pathname === 'Cambio' ? Object.values(userDB.wallets).map(i => i.uuid) : Object.values(userDB.destinatarioWallets).map(i => i.uuid)
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
            close && getSpecificData(`/users/${user.uid}`, setUserData, () => { setModal(''); setSelectDB([]) })
        }
        if (pathname === 'Envio') {

            selectDB.map((i, index) => {
                removeData(`users/${user.uid}/destinatarioWallets/${i}`, setUserSuccess, () => callback(selectDB.length - 1 === index))
            })
        }
        if (pathname === 'Cambio') {

            selectDB.map((i, index) => {
                removeData(`users/${user.uid}/wallets/${i}`, setUserSuccess, () => callback(selectDB.length - 1 === index))
            })
        }
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

    useEffect(() => {
        transferencia === '' && router.replace('/')
    })
    console.log(selectDB)
    return (
        <main className='w-full h-full'>
            {modal === 'Guardando...' && <Loader> {modal} </Loader>}
            {modal === 'Save' && <Modal funcion={saveConfirm}>Estas por modificar la tasa de cambio de:  {item['currency']}</Modal>}
            {modal === 'Disable' && <Modal funcion={disableConfirm}>Estas por {item.habilitado !== undefined && item.habilitado !== false ? 'DESABILITAR' : 'HABILITAR'} el siguiente item:  {item['currency']}</Modal>}
            {modal === 'DELETE' && <ModalINFO theme="Danger" button="Eliminar" funcion={confirmEliminarSelectDB} close={true}>
                Estas por eliminar a las siguientes billteras: <br />
                <div className='text-left pl-5'>
                    {Object.values(userDB.wallets).map((i) => selectDB.includes(i.uuid) && <> __{i['billetera destinatario']} <br /></>)}
                    {Object.values(userDB.destinatarioWallets).map((i) => selectDB.includes(i.uuid) && <> {i['destinatario']}:___{i['billetera destinatario']} <br /></>)}
                </div>
            </ModalINFO>}
            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block left-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:left-[20px] hover:bg-[#00000060] transition-all' onClick={prev}>{'<'}</button>
            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block right-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:right-[20px]  hover:bg-[#00000060] transition-all' onClick={next}>{'>'}</button>

            <h3 className='font-bold text-[14px] text-white uppercase flex items-center'>
                <div className='bg-gray-950 text-white border border-green-500 h-[40px] w-[40px] rounded-full flex justify-center items-center mr-3'>
                    1
                </div>
                <p className='bg-gray-950 text-white underline  underline-offset-8  decoration-green-500  px-3 py-2 rounded-[10px]  border border-green-500'>
                    {pathname === 'Cambio' ? 'Seleccionar wallet' : 'Seleccionar destinatario'}
                </p>
            </h3>
            <br />
            <div className="w-full md:w-[405px] flex justify-between md:grid md:grid-cols-2 gap-[5px] " >
                <input type="text" className='border-b-[1px] border-white px-3 text-[14px] bg-transparent text-white outline-none w-[170px] md:w-[200px] placeholder:text-gray-300 ' onChange={onChangeFilter} placeholder={pathname === 'Cambio' ? 'Buscar Wallet' : 'Buscar Destinatario'} />

                {selectDB.length > 0
                    ? <button className='w-[200px] flex justify-center items-center h-[40px] text-white text-[14px] font-medium bg-red-500 border border-gray-200 rounded-[10px] px-5 cursor-pointer' onClick={eliminarSelectDB}>Eliminar</button>
                    : <button className='w-[200px] md:w-[200px] flex justify-center items-center h-[40px] text-white text-[14px] font-medium bg-[#32CD32] border border-gray-200 rounded-[10px] px-5 cursor-pointer' onClick={redirect}>{pathname === 'Cambio' ? 'Nuevo wallet' : 'Nuevo destinatario'}</button>

                }

            </div>
            <br />

            <div className="w-full   relative h-full overflow-auto shadow-2xl md-transparent bg-white  min-h-[70vh] scroll-smooth" ref={refFirst}>

                <table className={`w-full ${pathname === 'Envio' ? 'min-w-[1500px]' : 'min-w-[1000px]'} border-[1px] bg-white text-[14px] text-left text-gray-500 `}>
                    {pathname === 'Cambio' && <thead className="text-[14px] text-white uppercase bg-gray-800">
                        <tr>
                            <th scope="col" className="w-[100px] px-3 py-3">
                                <input type="checkbox" className='border-none mr-5 inline' onChange={handlerSelect} name={`ALL`} />
                                #
                            </th>
                            <th scope="col" className=" px-3 py-3">
                                Nombre
                            </th>
                            <th scope="col" className="px-3 py-3">
                                DNI
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Celular
                            </th>
                            <th scope="col" className=" px-3 py-3">
                                Dirección de billetera
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Red
                            </th>
                            <th scope="col" className=" px-3 py-3">
                                QR
                            </th>

                            <th scope="col" className="text-center px-3 py-3">
                                Enviar
                            </th>
                            {/* <th scope="col" className="text-center px-3 py-3">
                                Eliminar
                            </th> */}
                        </tr>
                    </thead>}
                    {pathname === 'Envio' && <thead className="text-[14px] text-white uppercase bg-gray-800">
                        <tr>
                            <th scope="col" className="w-[100px] px-3 py-3">
                                <input type="checkbox" className='border-none mr-5 inline' onChange={handlerSelect} name={`ALL`} />
                                #
                            </th>
                            <th scope="col" className=" px-3 py-3">
                                Nombre
                            </th>
                            <th scope="col" className="px-3 py-3">
                                DNI
                            </th>
                            <th scope="col" className=" px-3 py-3">
                                Pais
                            </th>
                            <th scope="col" className=" px-3 py-3">
                                Dirección
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Celular
                            </th>
                            <th scope="col" className=" px-3 py-3">
                                Direccion de billetera
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Red
                            </th>
                            <th scope="col" className="px-3 py-3">
                                QR
                            </th>
                            <th scope="col" className="text-center px-3 py-3">
                                Enviar
                            </th>
                            {/* <th scope="col" className="text-center px-3 py-3">
                                Eliminar
                            </th> */}
                        </tr>
                    </thead>}
                    <tbody>
                        {pathname === 'Envio' && userDB && userDB !== undefined && userDB.destinatarioWallets && userDB.destinatarioWallets !== undefined && Object.values(userDB.destinatarioWallets).map((i, index) => {
                            return <tr className={`text-[14px] border-b hover:bg-gray-100  ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-100'} `} key={index}>
                                <td className="px-3 py-4  flex text-gray-900 ">
                                    <input type="checkbox" className='border-none mr-5' checked={selectDB.includes(i.uuid)} onChange={handlerSelect} name={i.uuid} />
                                    <span className='h-full flex py-2'>{index + 1}</span>
                                </td>
                                <td className="px-3 py-4 text-gray-900 ">
                                    {i['destinatario']}
                                </td>
                                <td className="w-32 p-3">
                                    {i['dni']}
                                    {/* <input type="text" name="dni" className='min-w-[100px] text-center p-2 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandler(e, i)} defaultValue={i['dni'] !== undefined ? i['dni'] : 0} /> */}
                                </td>
                                <td className="w-32 p-3">
                                    {i['pais']}{countries?.[i?.cca3]?.envio !== undefined && countries[i.cca3].envio === true ? <span className='text-green-400 text-[10px] py-2 px-3 rounded-[5px] bg-gray-800 inline-block'> habilitado: USDT</span> : <span className='text-red-400 text-[10px]  py-2 px-3 rounded-[5px] bg-gray-800 inline-block'> inhabilitado</span>}

                                    {/* <input type="text" name="pais" className='min-w-[100px] text-left p-2 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandler(e, i)} defaultValue={i['pais'] !== undefined ? i['pais'] : 0} /> */}
                                </td>
                                <td className="w-32 p-3">
                                    {i['direccion']}
                                    {/* <input type="text" name="direccion" className='min-w-[100px] text-left p-2 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandler(e, i)} defaultValue={i['direccion'] !== undefined ? i['direccion'] : 0} /> */}
                                </td>
                                <td className="w-32 p-3">
                                    {i['celular']}
                                    {/* <input type="text" name="celular" className='min-w-[100px] text-center p-2 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandler(e, i)} defaultValue={i['celular'] !== undefined ? i['celular'] : 0} /> */}
                                </td>
                                <td className=" p-3">
                                    {i['billetera destinatario']}
                                    {/* <input type="text" name="cuenta destinatario" className='min-w-[100px] text-center p-2 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandler(e, i)} defaultValue={i['cuenta destinatario'] !== undefined ? i['cuenta destinatario'] : 0} /> */}
                                </td>
                                <td className="w-32 p-3">
                                    {i['red destinatario']}
                                    {/* <input type="text" name="nombre de banco" className='min-w-[100px] text-center p-2 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandler(e, i)} defaultValue={i['nombre de banco'] !== undefined ? i['nombre de banco'] : 0} /> */}
                                </td>
                                <td className="w-[150px] p-4">
                                    <img src={i.url} className={`h-[100px] w-[100px]`} onClick={() => handlerProfileIMG(i.image3)} alt="Apple Watch" />
                                </td>
                                <td className="px-3 py-4 w-32 text-center">
                                    {/* <Button theme={"Success"} click={() => save(i)}>Continuar</Button> */}
                                    {countries?.[i?.cca3]?.envio !== undefined && countries[i.cca3].envio === true ? <Button theme={"Success"} click={() => save(i)}>Continuar</Button> : <Button theme={"Disable"}>inhabilitado</Button>}

                                </td>
                                {/* <td className="px-3 py-4 ">
                                    <Button theme={"Danger"} click={() => manage(i, 'DELETE')}>Eliminar</Button>
                                </td> */}
                            </tr>
                        })
                        }
                        {pathname === 'Cambio' && userDB && userDB !== undefined && userDB.wallets && userDB.wallets !== undefined && Object.values(userDB.wallets).map((i, index) => {
                            return <tr className={`text-[14px] border-b hover:bg-gray-100  ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-100'} `} key={index}>
                                <td className="px-3 py-4  flex text-gray-900 ">
                                    <input type="checkbox" className='border-none mr-5' checked={selectDB.includes(i.uuid)} onChange={handlerSelect} name={i.uuid} />
                                    <span className='h-full flex py-2'>{index + 1}</span>
                                </td>
                                <td className="px-3 py-4 text-gray-900 ">
                                    {userDB.nombre}  {userDB.apellido}
                                </td>
                                <td className=" p-3">
                                    {userDB.dni}
                                    {/* <input type="text" name="dni" className='min-w-[100px] text-center p-2 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandler(e, i)} defaultValue={i['dni'] !== undefined ? i['dni'] : 0} /> */}
                                </td>

                                <td className=" p-3">
                                    {userDB.whatsapp}
                                    {/* <input type="text" name="celular" className='min-w-[100px] text-center p-2 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandler(e, i)} defaultValue={i['celular'] !== undefined ? i['celular'] : 0} /> */}
                                </td>
                                <td className="w-32 p-3">
                                    {i['billetera destinatario']}
                                    {/* <input type="text" name="cuenta destinatario" className='min-w-[100px] text-center p-2 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandler(e, i)} defaultValue={i['cuenta destinatario'] !== undefined ? i['cuenta destinatario'] : 0} /> */}
                                </td>
                                <td className="w-32 p-3">
                                    {i['red destinatario']}
                                    {/* <input type="text" name="nombre de banco" className='min-w-[100px] text-center p-2 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandler(e, i)} defaultValue={i['nombre de banco'] !== undefined ? i['nombre de banco'] : 0} /> */}
                                </td>
                                <td className="w-32 p-4">
                                    <img src={i.url} className={`h-[100px] w-[100px]`} onClick={() => handlerProfileIMG(i.image3)} alt="Apple Watch" />
                                </td>
                                <td className="px-3 py-4 w-32 text-center">
                                    <Button theme={"Success"} click={() => save(i)}>Continuar</Button>
                                </td>
                                {/* <td className="px-3 py-4 ">
                                    <Button theme={"Danger"} click={() => manage(i, 'DELETE')}>Eliminar</Button>
                                </td> */}
                            </tr>
                        })
                        }
                    </tbody>
                </table>
            </div>
        </main>
    )
}




