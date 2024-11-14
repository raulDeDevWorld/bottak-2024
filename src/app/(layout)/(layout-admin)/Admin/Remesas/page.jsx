'use client';
import { useUser } from '@/context/Context'
import { getSpecificData, writeUserData, removeData } from '@/firebase/database'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import Tag from '@/components/Tag'
import Loader from '@/components/Loader'
import Modal from '@/components/Modal'
import Select from '@/components/Select'
import { estado as estadoCONST } from '@/constants/'
import ModalINFO from '@/components/ModalINFO'
import { formatearFechaInput } from '@/utils/date'
export default function Home() {

  const { user, userDB, setUserProfile, modal, setModal, users, setUsers, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, divisas, setDivisas, item, setItem, exchange, setExchange, destinatario, setDestinatario } = useUser()
  const [filter, setFilter] = useState('')
  const [state, setState] = useState({})
  const [remesasDB, setRemesasDB] = useState(undefined)
  const [estado, setEstado] = useState('')
  const refFirst = useRef(null);
  const [profileIMG, setProfileIMG] = useState('')
  const [row, setRow] = useState(-1)
  const [selectDB, setSelectDB] = useState([])
  const [filterDate, setFilterDate] = useState('')

  function onChangeFilter(e) {
    setFilter(e.target.value)
  }
  function handlerProfileIMG(img) {
    setProfileIMG(img)
  }
  function closeProfileIMG() {
    setProfileIMG('')
  }
  function sortArray(x, y) {
    if (x['translation']['spa']['common'].toLowerCase() < y['translation']['spa']['common'].toLowerCase()) { return -1 }
    if (x['translation']['spa']['common'].toLowerCase() > y['translation']['spa']['common'].toLowerCase()) { return 1 }
    return 0
  }
  function handlerSelect(name, i, uuid) {
    setState({ ...state, [uuid]: { [name]: i } })
  }




  function save(i, uuid) {
    async function callback(obj) {

      const object = { ...i, ...obj }








      const datosEmail = {
        'DATOS DE REMITENTE': object['divisa de envio'] === 'USDT'
          ? {
            Nombre: object['remitente'],
            Dni: object['dni remitente'],
            Pais: object['pais remitente'],
            Celular: object['whatsapp'],
            'Direccion de wallet': object['billetera remitente'],
            Red: object['red bottak'],
            'Divisa Envio': object['divisa de envio']
          }
          : {
            Nombre: object['remitente'],
            Dni: object['dni remitente'],
            Pais: object['pais remitente'],
            Celular: object['whatsapp'],
            Banco: object['banco remitente'],
            'Cuenta Bancaria': object['cuenta bancaria'],
            'Divisa Envio': object['divisa de envio']
          },
        'DATOS DE DESTINATARIO': object['divisa de receptor'] === 'USDT'
          ? {
            Nombre: object['destinatario'],
            Dni: object['dni'],
            Pais: object['pais'],
            Direccion: object['direccion'],
            Celular: object['celular'],
            'Direccion de billetera': object['billetera destinatario'],
            'Red': object['red destinatario'],
            'Divisa Receptor': object['divisa de receptor'],
          }
          : {
            Nombre: object['destinatario'],
            Dni: object['dni'],
            Pais: object['pais'],
            Direccion: object['direccion'],
            Celular: object['celular'],
            'Cuenta Destinatario': object['cuenta destinatario'],
            'Nombre Banco': object['nombre de banco'],
            'Divisa Receptor': object['divisa de receptor'],
          },
        'DATOS DE TRANSACCION': {
          Operacion: object['operacion'],
          Importe: object['importe'],
          Comision: object['comision'],
          ['Importe detinatario']: object['cambio'],
          Estado: object['estado'],
          Fecha: object['fecha'],
          'ID de tracking': object.uuid

        },
        'CUENTA RECEPTORA BOTTAK': object['divisa de envio'] === 'USDT'
          ? {
            'Billetera Bottak': object['billetera bottak'],
            'Red Bottak': object['red bottak']
          }
          : {
            'Banco Bottak': object['banco bottak'],
            'Cuenta Bottak': object['cuenta bottak']
          }

      }



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

      await fetch(`/api/sendEmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: html, estado: object['estado'], email: user.email, operacion: object['operacion'] })
      })
      await fetch(`/api/bot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: botChat, url: object.url }),
      })
      setModal('')
    }

    setModal('Guardando...')
    writeUserData(`envios/${uuid}`, { ...state[uuid], notificaciones: true, date: new Date().getTime() }, setUserSuccess, callback)
  }


  function handlerSelect(e) {
    if (e.target.checked) {
      if (e.target.name === 'ALL') {
        let arr = Object.values(remesasDB).map(i => i.uuid)
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
      setRow(-1)
      close && getSpecificData(`/envios/`, setRemesasDB, () => { setModal(''); setSelectDB([]) })
    }


    selectDB.map((i, index) => {
      removeData(`envios/${i}`, setUserSuccess, () => callback(selectDB.length - 1 === index))
    })


  }

  function onChangeFilterDate(e) {
    console.log(e)
    if (e.target.value !== '') {
      setFilterDate(formatearFechaInput(e.target.value))
    } else {
      setFilterDate('')
    }
  }

  console.log(filterDate)


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
  useEffect(() => {
    remesasDB === undefined && getSpecificData(`/envios/`, setRemesasDB)
  }, [remesasDB])


  console.log(remesasDB)
  return (
    <>
      {modal === 'Guardando...' && <Loader> {modal} </Loader>}
      {modal === 'Save' && <Modal funcion={saveConfirm}>Estas por modificar la tasa de cambio de:  {item['currency']}</Modal>}
      {modal === 'Disable' && <Modal funcion={disableConfirm}>Estas por {item.habilitado !== undefined && item.habilitado !== false ? 'DESABILITAR' : 'HABILITAR'} el siguiente item:  {item['currency']}</Modal>}
      {modal === 'DELETE' && <ModalINFO theme="Danger" button="Eliminar" funcion={confirmEliminarSelectDB} close={true}>
        Estas por eliminar las siguientes remesas de remitente e importe: <br />
        <div className='text-left pl-5'>
          {Object.values(remesasDB).map((i) => selectDB.includes(i.uuid) && <> {i['remitente']}:__{i['importe']} <br /></>)}
        </div>
      </ModalINFO>}


      {profileIMG.length > 0 && <div className='fixed top-0 left-0 h-[100vh] w-[100vw] bg-[#000000c7] z-40' onClick={closeProfileIMG}></div>}
      <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block left-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:left-[20px]' onClick={prev}>{'<'}</button>
      <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block right-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:right-[20px]' onClick={next}>{'>'}</button>

      <div className="w-full   relative h-full overflow-auto shadow-2xl  bg-gray-300 min-h-[80vh] scroll-smooth">

        <div className='w-[100%] overflow-x-auto p-3 md:p-5'>

          <div className='min-w-[1000px]'>
            <h3 className='font-medium text-[14px] text-black'>Remesas</h3>
            <br />
            <label htmlFor="" className='text-black text-[14px] pr-5 font-medium'>Filtrar: </label>
            <input type="date" className='border-b-[1px] text-[14px] outline-none w-[150px] text-black pr-5  mr-5 rounded-[5px] p-1 border-[1px] border-gray-400' onChange={onChangeFilterDate} placeholder='Buscar por remitente, destinatario o DNI' />
            <input type="text" className='++++++++' onChange={onChangeFilter} placeholder='Buscar por remitente, destinatario o DNI' />
            <div className='min-w-[500px] flex justify-start items-center my-5 h-[40px]'>

              {selectDB.length > 0 && <button className='w-[200px] flex justify-center items-center h-[40px] mr-5 text-white text-[14px] font-medium bg-red-500 border border-gray-200 rounded-[10px] px-5 cursor-pointer' onClick={eliminarSelectDB}>Eliminar</button>}
              <h3 className="text-black text-[14px] pr-2 font-medium" htmlFor="">Estado</h3>
              <div className="grid grid-cols-5 gap-4 w-[800px] ">
                {estadoCONST.map((i, index) => {
                  return <Tag theme={estado == i ? 'Primary' : 'Secondary'} click={() => setEstado(estado == i ? '' : i)}>{i}</Tag>
                })}
              </div>

            </div>
          </div>



        </div>


        <div className="w-full   relative h-full overflow-y-auto  shadow-2xl bg-white max-h-[calc(100vh-120px)] md:max-h-[calc(100vh-70px)] scroll-smooth" ref={refFirst}>


          <table className="w-full min-w-[4300px] bg-white text-[14px] text-left text-gray-500">
            <thead className="text-[14px] text-gray-700 uppercase bg-gray-800 text-white sticky top-0  z-20">

              <tr className=''>
                <th scope="col" className="w-[50px] px-3 py-1">

                </th>
                <th scope="col" className="w-[50px] px-3 py-1">

                </th>
                <th scope="col" colSpan={8} className=" text-center bg-red-500 px-3 py-1" >
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
                <th scope="col" className="w-[50px] px-3 py-1">

                </th>
              </tr>

              <tr>
                <th scope="col" className="w-[100px] px-3 py-3">
                  <input type="checkbox" className='border-none mr-5 inline' onChange={handlerSelect} name={`ALL`} />

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
                <th>
                  Celular
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
                <th scope="col" className=" px-3 py-3">
                  Actualizar
                </th>
              </tr>


            </thead>
            <tbody>
              {remesasDB && remesasDB !== undefined && Object.values(remesasDB).map((i, index) => {
                return ((i.destinatario !== undefined && i.destinatario.toLowerCase().includes(filter.toLowerCase())) ||
                  (i.remitente !== undefined && i.remitente.toLowerCase().includes(filter.toLowerCase())) ||
                  (i.dni !== undefined && i.dni.toLowerCase().includes(filter.toLowerCase())) ||
                  (i['dni remitente'] !== undefined && i['dni remitente'].toLowerCase().includes(filter.toLowerCase()))) &&
                  (i.estado !== undefined && i.estado.toLowerCase().includes(estado.toLowerCase())) && i.operacion === 'Envio' && i.fecha.includes(filterDate) &&
                  <tr className={`text-[14px] border-b border-gray-50  py-1 transition-all ${(index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-300')} `} key={index}>
                    <td className="px-3 py-0 flex  ">
                      <input type="checkbox" className='border-none mr-5' checked={selectDB.includes(i.uuid)} onChange={handlerSelect} name={i.uuid} />

                      <span className='h-full flex py-0'>{index + 1}</span>
                    </td>
                    <td className="min-w-32 px-3 py-0 ">
                      <Select arr={estadoCONST} name='estado' uuid={i.uuid} defaul={i.estado} click={handlerSelect} />
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
                      {i['whatsapp']}
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


                    <td className="px-3 py-0">
                      {state && state !== undefined && state[i.uuid] && state[i.uuid] !== undefined
                        ? <Button theme={"Success"} click={() => save(i, i.uuid)}>Guardar</Button>
                        : <Button theme={"Disable"}>Desabilitado</Button>
                      }
                    </td>
                  </tr>
              })
              }
            </tbody>
          </table>
        </div>
      </div>

    </>
  )
}

