'use client'
import React from 'react';
import { useUser } from '@/context/Context'
import { useEffect, useState, useRef } from 'react'
import Label from '@/components/Label'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import { generateUUID } from '@/utils/UUIDgenerator';
import { getSpecificData, writeUserData, removeData } from '@/firebase/database'
import { uploadStorage } from '@/firebase/storage'
import { useSearchParams } from 'next/navigation'
import Loader from '@/components/Loader'

const MyTable = () => {
    const { user, userDB, setUserProfile, modal, setModal, users, setUsers, setUserSuccess, routeCountry, setRouteCountry, wallets, setWallets, success, setUserData, postsIMG, setUserPostsIMG, setCountries, item, setItem, exchange, setExchange, countries } = useUser()
    const searchParams = useSearchParams()
    const pathnameCCA3 = searchParams.get('cca3')
    const [viewModal, setViewModal] = useState(false)
    const [bankDB, setBankDB] = useState(null)

    const [postImage, setPostImage] = useState({})
    const [urlPostImage, setUrlPostImage] = useState({})

    const [postImageBank, setPostImageBank] = useState({})
    const [urlPostImageBank, setUrlPostImageBank] = useState({})


    const [postImageQR, setPostImageQR] = useState({})
    const [urlPostImageQR, setUrlPostImageQR] = useState({})

    const refFirst = useRef(null);

    console.log(routeCountry)

    function manageInputIMG(e, name) {
        const file = e.target.files[0]
        setPostImage({ ...postImage, [name]: file })
        setUrlPostImage({ ...urlPostImage, [name]: URL.createObjectURL(file) })
    }

    function manageInputIMGbank(e, name) {
        const file = e.target.files[0]
        setPostImageBank(file)
        setUrlPostImageBank(URL.createObjectURL(file))
    }
    function manageInputQRbank(e, name) {
        const file = e.target.files[0]
        setPostImageQR(file)
        setUrlPostImageQR(URL.createObjectURL(file))
    }
    function saveBank(e) {
        e.preventDefault()
        setModal('Guardando...')
        setViewModal(false)

        const uuid = generateUUID()
        const callback2 = () => {
            getSpecificData(`/currencies/`, setCountries)
            setModal('')
            setUrlPostImageBank({})
            setUrlPostImageQR({})
        }
        const callback = () => {
            uploadStorage(`currencies/${routeCountry.cca3}/countries/${uuid}`, postImageQR, { banco: e.target[3].value, ['cta bancaria']: e.target[4].value, dominio: e.target[5].value, ['link de pago']: e.target[6].value, uuid }, callback2, 'qrURL')
        }
        uploadStorage(`currencies/${routeCountry.cca3}/countries/${uuid}`, postImageBank, { banco: e.target[3].value, ['cta bancaria']: e.target[4].value, dominio: e.target[5].value, ['link de pago']: e.target[6].value, uuid }, callback)
    }
    function handlerBankRemove(e) {
        console.log(e)

        setModal('DELETE')
        setBankDB({
            route: `/currencies/${routeCountry.cca3}/countries/${e.uuid ? e.uuid : e.banco}`,
            banco: e.banco
        })
        // console.log(`/currencies/${routeCountry.cca3}/countries/${e.banco}`)
        // removeData(`currencies/${i.cca3}/countries/${e.banco}`, setUserSuccess, callback)
    }
    function deletConfirmBank(i) {
        const callback = () => {
            getSpecificData(`/`, setCountries)
            setModal('')
        }
        console.log(bankDB.route)
        removeData(bankDB.route, setUserSuccess, callback)
    }

    console.log(routeCountry)


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
        routeCountry === null && getSpecificData(`currencies/${pathnameCCA3}`, setRouteCountry)

    }, [routeCountry])




    return (
        <div className='relative w-full flex flex-col '>
            {modal === 'Guardando...' && <Loader> {modal} </Loader>}

            {modal === 'DELETE' && bankDB !== null && <Modal theme="Danger" button="Eliminar" funcion={deletConfirmBank}>Estas por eliminar al siguiente banco:  {bankDB['banco']}</Modal>}

          

            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block left-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:left-[20px] hover:bg-[#00000060] transition-all' onClick={prev}>{'<'}</button>
            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block right-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:right-[20px]  hover:bg-[#00000060] transition-all' onClick={next}>{'>'}</button>

            <div className="w-full   relative h-full overflow-auto shadow-2xl p-5 bg-white min-h-[80vh] scroll-smooth" ref={refFirst}>
                <div className='w-full  flex flex-col justify-between mb-5'>
                <h3 className='text-black text-[12px] font-bold pb-5'>Administrar Bancos {countries?.[routeCountry?.cca3]?.translation.spa.common}</h3>

                    <Button theme={"Success"} click={() => setViewModal(true)}>Admin Bancos</Button>
                    </div>

                <table className="w-full overflow-visible min-w-[1000px]  text-[14px] text-left text-gray-500 border-t-4 border-gray-400" >
                    <thead className="text-[14px] text-gray-700 uppercase bg-gray-800 text-white  ">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Imagen</th>
                            <th className="border border-gray-300 px-4 py-2">QR</th>
                            <th className="border border-gray-300 px-4 py-2">Banco</th>
                            <th className="border border-gray-300 px-4 py-2">Cuenta Bancaria</th>
                            <th className="border border-gray-300 px-4 py-2">Dominio</th>
                            <th className="border border-gray-300 px-4 py-2">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {routeCountry?.countries && Object.values(routeCountry?.countries).map((e, index) => (
                            <tr className={`text-[14px] border-b hover:bg-gray-200  ${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-200'} `} key={index}>
                                <td className="border border-gray-300 px-4 py-2">
                                    <img src={e.url} className="w-[30px]" alt="Imagen" />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <img src={e.qrURL} className="w-[30px]" alt="QR" />
                                </td>
                                <td className="border border-gray-300 px-4 py-2 pl-[10px]">{e.banco}</td>
                                <td className="border border-gray-300 px-4 py-2 pl-[10px]">{e['cta bancaria']}</td>
                                <td className="border border-gray-300 px-4 py-2 pl-[10px]">{e['dominio']}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                <Button theme={"Danger"} click={() => handlerBankRemove(e)}>Eliminar</Button>
                                    {/* <svg
                                        className="cursor-pointer"
                                        xmlns="http://www.w3.org/2000/svg"
                                        x="0px"
                                        y="0px"
                                        width="30"
                                        height="30"
                                        viewBox="0 0 48 48"
                                        onClick={() => handlerBankRemove(e)}
                                    >
                                        <path fill="#f44336" d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"></path>
                                        <line x1="16.9" x2="31.1" y1="16.9" y2="31.1" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="4"></line>
                                        <line x1="31.1" x2="16.9" y1="16.9" y2="31.1" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="4"></line>
                                    </svg> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {viewModal
                && <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center p-5 z-50 bg-[#000000C7]'>
                    <form className='relative p-5 bg-white w-full max-w-[800px] shadow-2xl rounded-[20px]' onSubmit={saveBank} >
                        <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[14px] w-8 h-8 ml-auto inline-flex justify-center items-center  dark:hover:text-white" onClick={() => setViewModal(null)}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <h3 className='text-center text-[16px] text-black pb-3 font-bold'>Agregar Banco</h3>
                        <h3 className='text-center text-[16px] text-black pb-3'>{countries?.[routeCountry?.cca3]?.translation.spa.common}</h3>


                        <div className="grid gap-6 my-6 md:grid-cols-2">


                            <div className="min-w-full flex justify-center ">
                                <label htmlFor="fileUpload" className="mt-2 flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 md:w-[250px] md:h-[200px]" style={{ backgroundImage: `url(${urlPostImageBank === null && countries[routeCountry].countries !== undefined && countries[routeCountry].countries[bank] !== undefined ? countries[routeCountry].countries[bank] : urlPostImageBank})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                                    <div className="text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                        </svg>
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label htmlFor="fileUpload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                <span>Cargar Icono de Banco</span>
                                                <input id="fileUpload" name="frontPage" onChange={manageInputIMGbank} type="file" className="sr-only" accept="image/*" />
                                            </label>
                                            <p className="pl-1">{' '} puede ser:</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, max 10MB</p>
                                    </div>
                                </label>
                            </div>
                            <div className="min-w-full flex justify-center ">
                                <label htmlFor="fileUpload" className="mt-2 flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 md:w-[250px] md:h-[200px]" style={{ backgroundImage: `url(${urlPostImageQR === null && countries[routeCountry].countries !== undefined && countries[routeCountry].countries[bank] !== undefined ? countries[routeCountry].countries[bank] : urlPostImageQR})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                                    <div className="text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                        </svg>
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label htmlFor="fileUploadQR" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                <span>Cargar QR de cobro</span>
                                                <input id="fileUploadQR" name="frontPage" onChange={manageInputQRbank} type="file" className="sr-only" accept="image/*" />
                                            </label>
                                            <p className="pl-1">{' '} puede ser:</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, max 10MB</p>
                                    </div>
                                </label>
                            </div>

                            <div className='space-y-5'>
                                <Label htmlFor="">Banco</Label>
                                <Input type="text" name="nombre de banco" defValue={'banco'} require />
                            </div>

                            <div className='space-y-5'>
                                <Label htmlFor="">Cta. bancaria</Label>
                                <Input type="text" name="cta bancaria" defValue={'banco'} require />
                            </div>
                            <div className='space-y-5'>
                                <Label htmlFor="">Dominio App</Label>
                                <Input type="text" name="dominio" defValue={'dominio'} require />
                            </div>
                            <div className='space-y-5'>
                                <Label htmlFor="">Link de pago</Label>
                                <Input type="text" name="link de pago" defValue={'link de pago'} require />
                            </div>
                        </div>

                        <div className='flex w-full justify-around'>
                            <Button type="submit" theme='Primary'>Guardar</Button>
                        </div>
                    </form>
                </div>
            }

        </div>

    );
};

export default MyTable;
