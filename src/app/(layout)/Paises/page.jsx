'use client';
import { useUser } from '@/context/Context'
import { getSpecificData, writeUserData } from '@/firebase/database'
import { uploadStorage } from '@/firebase/storage'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
// import { getCurrencyExchange } from '@/currency';
import Modal from '@/components/Modal'

import { useRouter } from 'next/navigation';



export default function Home() {

  const { user, userDB, setUserProfile, modal, setModal, users, setUsers, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, setCountries, item, setItem, exchange, setExchange, countries } = useUser()
  const router = useRouter()
  const [filter, setFilter] = useState('')
  const [state, setState] = useState({})
  const [temporal, setTemporal] = useState(undefined)
  const [postImage, setPostImage] = useState({})
  const [urlPostImage, setUrlPostImage] = useState({})
  const refFirst = useRef(null);
  const [row, setRow] = useState(-1)

  function onChangeFilter(e) {
    setFilter(e.target.value)
  }


  function sortArray(x, y) {
    if (x['translation']['spa']['common'].toLowerCase() < y['translation']['spa']['common'].toLowerCase()) { return -1 }
    if (x['translation']['spa']['common'].toLowerCase() > y['translation']['spa']['common'].toLowerCase()) { return 1 }
    return 0
  }
  function onChangeHandler(e, i) {
    setState({ ...state, [i.cca3]: { ...state[i.cca3], [e.target.name]: e.target.value } })
  }
  function manage(i, data, operacion) {
    setItem(i)
    setModal(operacion)
  }
  function save(i) {
    setItem(i)
    setModal('Save')
  }
  function disableConfirm(operacion) {
    function callback() {
      getSpecificData('currencies', setCountries, () => { setModal('') })
    }
    setModal('Guardando...')
    writeUserData(`currencies/${item.cca3}`, { [operacion]: item[operacion] === undefined || item[operacion] === false ? true : false }, setUserSuccess, callback)
  }
  async function saveConfirm() {

    function callback2() {
      const obj = { ...state }
      delete obj[item.cca3]
      setState(obj)
  
      const obj2 = { ...postImage }
      delete obj2[item.cca3]
      setState(obj2)

      setModal('')
    }

    function callback() {
      getSpecificData('currencies', setCountries, callback2)
    }

    setModal('Guardando...')
    postImage[item.cca3] 
    ? await uploadStorage(`currencies/${item.cca3}`, postImage[item.cca3], state[item.cca3], callback)
    : await writeUserData(`currencies/${item.cca3}`, state[item.cca3], setUserSuccess, callback)
  
    return
  }
  function manageInputIMG(e, name) {
    const file = e.target.files[0]
    setPostImage({ ...postImage, [name]: file })
    setUrlPostImage({ ...urlPostImage, [name]: URL.createObjectURL(file) })
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

  console.log(postImage)

  return (
    <main className='h-full w-full'>
      {modal === 'Guardando...' && <Loader> {modal} </Loader>}
      {modal === 'Save' && <Modal funcion={saveConfirm}>Estas por modificar los datos de:  {item['currency']}</Modal>}
      {modal === 'recepcion' && <Modal funcion={() => disableConfirm('recepcion')}>Estas por {item.recepcion !== undefined && item.recepcion !== false ? 'DESABILITAR' : 'HABILITAR'} la RECEPCIÓN para el siguiente pais:  {item['currency']}</Modal>}
      {modal === 'envio' && <Modal funcion={() => disableConfirm('envio')}>Estas por {item.envio !== undefined && item.envio !== false ? 'DESABILITAR' : 'HABILITAR'} el ENVIO para el siguiente pais:   {item['currency']}</Modal>}
      <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block left-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:left-[20px]' onClick={prev}>{'<'}</button>
      <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block right-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:right-[20px]' onClick={next}>{'>'}</button>

      <div className="w-full   relative h-full overflow-auto shadow-2xl p-5 bg-white min-h-[80vh] scroll-smooth" ref={refFirst}>
        <h3 className='font-medium text-[14px]'>Lista de paises y operaciones habilitadas por BOTTAK</h3>
        <br />
        <input type="text" className='border-b-[1px] text-[14px] outline-none w-[400px]' onChange={onChangeFilter} placeholder='Buscar pais' />
        <br />
        <br />
        <table className="w-full overflow-visible min-w-[500px]  text-[14px] text-left text-gray-500 border-t-4 border-gray-400" >
          {/* <table className="relative w-full overflow-scroll max-w-[800px] h-[50px]  text-[14px] text-left text-gray-500 border-t-4 border-gray-400"> */}
          <thead className="text-[14px] uppercase bg-gray-800 text-white">
          <tr>
              <th scope="col" className=" px-3 py-3">
                #
              </th>
              <th scope="col" className=" px-3 py-3">
                Pais
              </th>
              <th scope="col" className=" px-3 py-3">
                Divisa <br/>
                Code
              </th>
              {/* <th scope="col" className="text-center px-3 py-3">
                Cuenta de cobro
              </th> */}
              <th scope="col" className="text-center px-3 py-3">
                Banco intermedio
              </th>
              {/* <th scope="col" className="text-center px-3 py-3">
                QR de cobro
              </th> */}
              <th scope="col" className="text-center px-3 py-3">
                Recepción
              </th>
              <th scope="col" className="text-center px-3 py-3">
                Envio
              </th>
            </tr>
          </thead>
          <tbody>
            {countries && countries !== undefined && Object.values(countries).sort(sortArray).map((i, index) => {
              return i['translation']['spa']['common'] !== undefined && i['translation']['spa']['common'].toLowerCase().includes(filter.toLowerCase()) &&
               ((i['recepcion'] !== undefined && i['recepcion'] !== false && i['recepcion'] !== null) || (i['envio'] !== undefined && i['envio'] !== false && i['envio'] !== null)) && 
               <tr className={`text-[14px] border-b border-gray-50  py-1 transition-all ${index === row ? 'bg-gray-100' : 'bg-gray-200'} ${index % 2 === 0 ? '' : ''} `} key={index} onClick={() => setRow(index)}>
                <td className="px-3 py-4  flex text-gray-900 ">
                  <span className='h-full flex py-2'>{index + 1}</span>
                </td>
                <td className="px-3 py-4 text-gray-900 ">
                  {i['translation']['spa']['common']}
                </td>
                <td className="px-3 py-4 text-gray-900 ">
                {i.code}
                </td>
                {/* <td className="px-3 py-4 text-gray-900 ">
                  <input type="text" name="cuenta de cobro"  className='min-w-[100px] text-center p-2 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandler(e, i)} defaultValue={i['cuenta de cobro'] !== undefined ? i['cuenta de cobro'] : 0} disabled />
                </td> */}
                <td className="px-3 py-4 text-gray-900 ">
                  <input type="text" name="banco de cobro" className='min-w-[100px] text-center p-2 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandler(e, i)} defaultValue={i['banco de cobro'] !== undefined ? i['banco de cobro'] : 0} disabled />
                </td>
                {/* <td className="px-3 py-4 text-gray-900 ">
                  <label >
                    <img src={urlPostImage[i.cca3] ? urlPostImage[i.cca3] : i.url} alt="Sin QR" />
                  </label>
                </td>}
                 */}
                <td className="px-3 py-4">
                  {i.recepcion !== undefined && i.recepcion !== false
                    ? <Button theme={"Success"} >Habilitado</Button>
                    : <Button theme={"Danger"} >Desabilitado</Button>
                  }
                </td>
                <td className="px-3 py-4">
                  {i.envio !== undefined && i.envio !== false
                    ? <Button theme={"Success"} >Habilitado</Button>
                    : <Button theme={"Danger"} >Desabilitado</Button>
                  }
                </td>
              </tr>
            })
            }
          </tbody>
        </table>
      </div>
    </main>
  )
}


