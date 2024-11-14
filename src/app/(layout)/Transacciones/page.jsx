'use client';
import { useUser } from '@/context/Context'
import { getSpecificData, writeUserData, getSpecificDataEq } from '@/firebase/database'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
import Modal from '@/components/Modal'

import { useRouter } from 'next/navigation';



export default function Home() {

  const { user, userDB, setUserProfile, modal, setUserData, item, setDestinatario, enviosDB } = useUser()
  const router = useRouter()
  const [filter, setFilter] = useState('')
  const [state, setState] = useState({})
  const refFirst = useRef(null);
  const [row, setRow] = useState(-1)
  const [profileIMG, setProfileIMG] = useState('')

  function onChangeFilter(e) {
    setFilter(e.target.value)
  }
  function sortArray(x, y) {
    if (x['translation']['spa']['common'].toLowerCase() < y['translation']['spa']['common'].toLowerCase()) { return -1 }
    if (x['translation']['spa']['common'].toLowerCase() > y['translation']['spa']['common'].toLowerCase()) { return 1 }
    return 0
  }
  function handlerProfileIMG(img) {
    setProfileIMG(img)
  }
  function onChangeHandler(e, i) {
    setState({ ...state, [i.cca3]: { ...state[i.cca3], [e.target.name]: e.target.value } })
  }
  function save(i) {
    setDestinatario(i)
    router.push('/Confirm/')
  }
  function redirect() {
    router.push('/Register/Destinatario')
  }
  const prev = () => {
    requestAnimationFrame(() => {
      const scrollLeft = refFirst.current.scrollLeft;

      const itemWidth = screen.width - screen.width / 2
      refFirst.current.scrollLeft = scrollLeft - itemWidth;
    });
  };
  const next = () => {
    requestAnimationFrame(() => {
      const scrollLeft = refFirst.current.scrollLeft;

      const itemWidth = screen.width - screen.width / 2

      refFirst.current.scrollLeft = scrollLeft + itemWidth;
    });
  };


  return (
    <main className='w-full h-full'>
      {modal === 'Guardando...' && <Loader> {modal} </Loader>}
      {modal === 'Save' && <Modal funcion={saveConfirm}>Estas por modificar la tasa de cambio de:  {item['currency']}</Modal>}
      {modal === 'Disable' && <Modal funcion={disableConfirm}>Estas por {item.habilitado !== undefined && item.habilitado !== false ? 'DESABILITAR' : 'HABILITAR'} el siguiente item:  {item['currency']}</Modal>}
      <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block left-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:left-[20px] hover:bg-[#00000060] transition-all' onClick={prev}>{'<'}</button>
      <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block right-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:right-[20px]  hover:bg-[#00000060] transition-all' onClick={next}>{'>'}</button>
      <div className="w-full   relative h-full overflow-auto shadow-2xl  bg-gray-300 min-h-[80vh] scroll-smooth">




        <div className='w-[100%] overflow-x-auto p-3 md:p-5'>
          <div className='min-w-[1000px]'>
            <h3 className='font-medium text-[14px] text-black'>Remesas</h3>
            <br />
            <label htmlFor="" className='text-black text-[14px] pr-5 font-medium'>Filtrar: </label>
            <input type="text" className='border-b-[1px] text-[14px] outline-none w-[400px] text-black  rounded-[5px] p-1 border-[1px] border-gray-400' onChange={onChangeFilter} placeholder='Buscar Destinatario' />
            <br />
          </div>
        </div>
        <div className="w-full   relative h-full overflow-y-auto  shadow-2xl bg-white max-h-[calc(100vh-120px)] md:max-h-[calc(100vh-70px)] scroll-smooth" ref={refFirst}>
          <table className="w-full min-w-[4000px] border-[1px] bg-white text-[14px] text-left text-gray-500 border-t-4 border-t-gray-400">
          <thead className="text-[14px] text-gray-700 uppercase bg-gray-800 text-white sticky top-0  z-20">
          <tr>
                <th scope="col" className="w-[50px] px-3 py-1">

                </th>
                <th scope="col" className="w-[50px] px-3 py-1">

                </th>
                <th scope="col" colSpan={7} className=" text-center bg-red-500 px-3 py-1" >
                  DATOS DE REMITENTE
                </th>
                <th scope="col" colSpan={9} className=" text-center bg-green-500  px-3 py-1">
                  DATOS DE DESTINATARIO
                </th>
                <th scope="col" colSpan={6} className=" text-center bg-yellow-500 px-3 py-1">
                  DATOS DE TRANSACCION
                </th>
                <th scope="col" colSpan={4} className=" text-center bg-blue-500 px-3 py-1">
                  Cuenta receptora Bottak
                </th>

              </tr>

              <tr>
                <th scope="col" className="w-[50px] px-3 py-3">
                  #
                </th>
                <th scope="col" className=" px-3 py-3">
                  estado
                </th>
                <th scope="col" className=" px-3 py-3">
                  Remitente
                </th>
                <th scope="col" className=" px-3 py-3">
                  DNI remitente
                </th>
                <th scope="col" className=" px-3 py-3">
                  Pais remitente
                </th>
                <th scope="col" className=" px-3 py-3">
                  Nombre de banco
                </th>
                <th scope="col" className=" px-3 py-3">
                  Cuenta bancaria
                </th>
                <th scope="col" className=" px-3 py-3">
                  Direccion de wallet
                </th>
                <th scope="col" className=" px-3 py-3">
                  Red
                </th>
                {/* Destinatario */}
                <th scope="col" className=" px-3 py-3">
                  Destinatario
                </th >
                <th scope="col" className=" px-3 py-3">
                  DNI destinatario
                </th>
                <th scope="col" className=" px-3 py-3">
                  Pais destinatario
                </th>
                <th scope="col" className=" px-3 py-3">
                  Dirección destinatario
                </th>
                <th scope="col" className=" px-3 py-3">
                  Celular destinatario
                </th>
                <th scope="col" className=" px-3 py-3">
                  Nombre de banco
                </th>
                <th scope="col" className=" px-3 py-3">
                  Cuenta bancaria
                </th>
                <th scope="col" className=" px-3 py-3">
                  Direccion de wallet
                </th>
                <th scope="col" className=" px-3 py-3">
                  Red
                </th>
                <th scope="col" className=" px-3 py-3">
                  Importe mas comision
                </th>
                <th scope="col" className=" px-3 py-3">
                  Comision
                </th>
                <th scope="col" className=" px-3 py-3">
                  Importe destinatario
                </th>
                <th scope="col" className=" px-3 py-3">
                  Fecha
                </th>
                <th scope="col" className=" px-3 py-3">
                  ID de transacción
                </th>
                <th scope="col" className=" px-3 py-3">
                  Baucher
                </th>
                <th scope="col" className=" px-3 py-3">
                  Nombre de banco
                </th>
                <th scope="col" className=" px-3 py-3">
                  Cuenta bancaria
                </th>
                <th scope="col" className=" px-3 py-3">
                  Billetera Bottak
                </th>
                <th scope="col" className=" px-3 py-3">
                  Red Bottak
                </th>
              </tr>
            </thead>
            <tbody>
              {enviosDB && enviosDB !== undefined && Object.values(enviosDB).sort((a, b) => a.date - b.date).map((i, index) => {
                return i.destinatario.toLowerCase().includes(filter.toLowerCase()) &&
                <tr className={`text-[14px] border-b border-gray-50  py-1 transition-all ${(index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-300')} `} key={index}>
                    <td className="px-3 py-0 flex  ">
                      <span className='h-full flex py-0'>{index + 1}</span>
                    </td>
                    <td className="min-w-32 px-3 py-4  ">
                      <span className={`w-full block py-5 px-10 rounded-[10px] ${i.estado == 'En verificación' && 'bg-gray-100'}   ${i.estado == 'Transfiriendo' && 'bg-yellow-300'}   ${i.estado == 'Exitoso' && 'bg-green-400'} ${i.estado == 'Rechazado' && 'bg-red-400'}`}>{i['estado']}</span>
                    </td>
                    <td className="min-w-32 px-3 py-0 ">
                      {i['remitente']}
                    </td>
                    <td className="min-w-32 px-3 py-0 ">
                      {i['dni remitente']}
                    </td>
                    <td className="min-w-32 px-3 py-0 ">
                      {i['pais remitente']}
                    </td>
                    <td className="min-w-32 px-3 py-0 ">
                      {i['banco remitente']}
                    </td>
                    <td className="min-w-32 px-3 py-0 ">
                      {i['cuenta bancaria']}
                    </td>
                    <td className="min-w-32 px-3 py-0 ">
                      {i['billetera remitente']}
                    </td>
                    <td className="min-w-32 px-3 py-0 ">
                      {i['red bottak']}
                    </td>
                    {/* Destinatario */}
                    <td className="min-w-32 px-3 py-0 ">
                      {i['destinatario']}
                    </td>
                    <td className="min-w-32 px-2">
                      {i['dni']}
                    </td>
                    <td className="min-w-32 px-2">
                      {i['pais']}
                    </td>
                    <td className="min-w-32 px-2">
                      {i['direccion']}
                    </td>
                    <td className="min-w-32 px-2">
                      {i['celular']}
                    </td>
                    <td className="min-w-32 px-2">
                      {i['nombre de banco']}
                    </td>
                    <td className="min-w-32 px-2">
                      {i['cuenta destinatario']}
                    </td>
                    <td className="min-w-32 px-2">
                      {i['billetera destinatario']}
                    </td>
                    <td className="min-w-32 px-2">
                      {i['red destinatario']}
                    </td>
                    {/* Detalles transaccion */}
                    <td className="px-3 py-0 ">
                      {i['importe']}
                    </td>
                    <td className="min-w-32 px-2">
                      {i['comision']}
                    </td>
                    <td className=" px-2">
                      {i['cambio']}
                    </td>
                    <td className="min-w-32 px-2">
                      {i['fecha']}
                    </td>
                    <td className="min-w-32 px-2">
                      {i['uuid']}
                    </td>
                    <td className="min-w-32 px-2">
                      <img src={i.url} className={`${i.url === profileIMG ? 'fixed right-0 left-0 top-0 bottom-0 m-auto portrait:w-[100vw] landscape:h-[100vh] z-50' : 'h-[150px] w-[150px] object-contain'}`} onClick={() => handlerProfileIMG(i.url)} alt="" />
                    </td>
                    <td className="min-w-32 px-2">
                      {i['banco bottak']}
                    </td>
                    <td className="min-w-32 px-2">
                      {i['cuenta bottak']}
                    </td>
                    <td className="min-w-32 px-2">
                      {i['billetera bottak']}
                    </td>
                    <td className="min-w-32 px-2">
                      {i['red bottak']}
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




















