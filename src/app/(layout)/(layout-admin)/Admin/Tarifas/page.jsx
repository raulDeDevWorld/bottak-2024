'use client';
import { useUser } from '@/context/Context'
import { getSpecificData, writeUserData } from '@/firebase/database'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
// import { getCurrencyExchange } from '@/currency';
import Modal from '@/components/Modal'
import Input from '@/components/Input'
import SelectSimple from '@/components/SelectSimple'
import { params } from '@/utils/paramsP2P'
import GetP2Pinterval from '@/components/GetP2Pinterval'
import { useRouter } from 'next/navigation';
import { getDayMonthYear2 } from '@/utils/date'



export default function Home() {

  const { user, userDB, setTime_stamp, time_stamp, setUserProfile, modal, setModal, tarifas, setTarifas, users, setUsers, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, divisas, setDivisas, item, setItem, exchange, setExchange, } = useUser()
  const router = useRouter()
  const [filter, setFilter] = useState('')
  const [state, setState] = useState({})
  const [temporal, setTemporal] = useState(undefined)

  const [fiat, setFiat] = useState('BOB')
  const [trade, setTrade] = useState('BUY')
  const [crypto, setCrypto] = useState('USDT')
  const [resP2P, setResP2P] = useState(null)
  const [habilitados, setHabilitados] = useState(true)


  const [act, setAct] = useState(false)


  const refFirst = useRef(null);
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);

  function onChangeFilter(e) {
    setFilter(e.target.value)
  }


  function sortArray(x, y) {
    if (x['translation']['spa']['common'].toLowerCase() < y['translation']['spa']['common'].toLowerCase()) { return -1 }
    if (x['translation']['spa']['common'].toLowerCase() > y['translation']['spa']['common'].toLowerCase()) { return 1 }
    return 0
  }
  function onChangeHandler(e, i) {
    setState({ ...state, [i.code]: { ...state[i.code], [e.target.name]: e.target.value } })
  }
  console.log(tarifas)
  function onChangeHandlerTarifa(e, i) {
    if (tarifas === undefined) {
      setTarifas({ [e.target.name]: e.target.value })
    } else {
      setTarifas({ ...tarifas, [e.target.name]: e.target.value })
    }
  }
  function manage(i) {
    setItem(i)
    setModal('Disable')
  }
  function save(i) {
    setItem(i)
    setModal('Save')
  }
  function disableConfirm() {
    function callback() {
      getSpecificData('divisas', setDivisas, () => { setModal('') })
    }

    setModal('Guardando...')
    writeUserData(`divisas/${item.code}`, { habilitado: item.habilitado === undefined || item.habilitado === false ? true : false }, setUserSuccess, callback)
    return
  }
  async function saveConfirm() {
    function callback() {
      getSpecificData('divisas', setDivisas, () => { setModal('') })
    }

    setModal('Guardando...')
    await writeUserData(`divisas/${item.code}`, state[item.code], setUserSuccess, callback)
    const obj = { ...state }
    delete obj[item.code]
    setState(obj)
    return
  }
  function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
  }

  const getCurrencyExchange = async (input, output) => {
    const arr = Object.values(divisas).filter(i => i.habilitado !== undefined && i.habilitado === true && i.code !== 'USD').map(i => i.code)
    if (arr.length === 0) {
      return
    }
    const res = await fetch('/api/getExchange', {
      method: 'POST',
      body: JSON.stringify({ divisas: arr }),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    })
    const data = await res.json()

    setExchange(data)
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










  function handlerClickSelect(name, i, setUpdate) {
    if (name == 'fiat') {
      setFiat(i)
    }
    if (name == 'trade') {
      setTrade(i)
    }
    if (name == 'crypto') {
      setCrypto(i)
    }
  }



  // async function getChangeP2P(e) {
  //   e.preventDefault()
  //   const headers = {
  //     "Accept": "*/*",
  //     "Accept-Encoding": "gzip, deflate, br",
  //     "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
  //     "Cache-Control": "no-cache",
  //     "Connection": "keep-alive",
  //     "Content-Length": "123",
  //     "content-type": "application/json",
  //     "Host": "p2p.binance.com",
  //     "Origin": "https://p2p.binance.com",
  //     "Pragma": "no-cache",
  //     "TE": "Trailers",
  //     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0"
  //   };

  //   const data = {
  //     asset: crypto,
  //     tradeType: trade,
  //     fiat,
  //     transAmount: 0,
  //     order: '',
  //     page: 1,
  //     rows: 10,
  //     filterType: 'all'
  //   };

  //   const responseData = await fetch(
  //     'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
  //     {
  //       headers,
  //       method: 'POST',
  //       body: JSON.stringify(data),

  //     }
  //   );

  //   if (!responseData.ok)
  //     throw 'bad response';
  //   const jsonData = await responseData.json();
  //   setResP2P(jsonData.data)
  // }


  // async function getChangeP2P(e) {
  //   e.preventDefault()
  //   const headers = {
  //     "Accept": "*/*",
  //     "Accept-Encoding": "gzip, deflate, br",
  //     "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
  //     "Cache-Control": "no-cache",
  //     "Connection": "keep-alive",
  //     "Content-Length": "123",
  //     "content-type": "application/json",
  //     "Host": "p2p.binance.com",
  //     "Origin": "https://p2p.binance.com",
  //     "Pragma": "no-cache",
  //     "TE": "Trailers",
  //     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0"
  //   };

  //   const data = {
  //     asset: crypto,
  //     tradeType: trade,
  //     fiat,
  //     transAmount: 0,
  //     order: '',
  //     page: 1,
  //     rows: 10,
  //     filterType: 'all'
  //   };


  //   const responseData = await fetch(
  //     'https://cors-anywhere.herokuapp.com/https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
  //     {
  //       headers,
  //       method: 'POST',
  //       body: JSON.stringify(data),

  //     }
  //   );






  //   // const responseData = await fetch(
  //   //   'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
  //   //   {
  //   //     headers,
  //   //     method: 'POST',
  //   //     body: JSON.stringify(data),

  //   //   }
  //   // );

  //   if (!responseData.ok)
  //     throw 'bad response';
  //   const jsonData = await responseData.json();
  //   setResP2P(jsonData.data)
  // }


  // GET 10 ROWS P2P EXCHANGE CABECERA

  async function getChangeP2P(e) {
    e.preventDefault()

    const data = {
      asset: crypto,
      tradeType: trade,
      fiat,
      transAmount: 0,
      order: '',
      page: 1,
      rows: 10,
      filterType: 'all'
    };


    let res = await fetch('/api/getP2P', {
      headers: {
        "Content-Length": "123",
        "content-type": "application/json",
      },
      method: 'POST',
      body: JSON.stringify({ ...data }),

    })
    let resDB = await res.json()
    setResP2P(resDB.data)

  }








  // GET & APPLY FUNCTION
  async function getExchage(i) {

    const data = {
      asset: 'USDT',
      // tradeType: 'BUY',
      fiat: i.code,
      transAmount: state[i.code] && state[i.code].transAmount ? state[i.code].transAmount : (i.transAmount ? i.transAmount : 0),
      order: '',
      page: 1,
      rows: 5,
      filterType: 'all'
    };

    let responseData = await fetch('/api/getP2Pbinance', {
      headers: {
        "Content-Length": "123",
        "content-type": "application/json",
      },
      method: 'POST',
      body: JSON.stringify({ ...data, tradeType: 'SELL', }),

    })

    let responseData2 = await fetch('/api/getP2Pbinance', {
      headers: {
        "Content-Length": "123",
        "content-type": "application/json",
      },
      method: 'POST',
      body: JSON.stringify({ ...data, tradeType: 'BUY', }),

    })

    const jsonData = await responseData.json();
    const jsonData2 = await responseData2.json();
    if (jsonData.data.length !== 0 && jsonData2.data.length !== 0) {
      let tempMaxima = Math.max(...jsonData.data.map((i) => i.adv.price));
      let tempMinima = Math.min(...jsonData.data.map((i) => i.adv.price));
      let promedio = (tempMaxima + tempMinima) / 2;


      let tempMaxima2 = Math.max(...jsonData2.data.map((i) => i.adv.price));
      let tempMinima2 = Math.min(...jsonData2.data.map((i) => i.adv.price));
      let promedio2 = (tempMaxima2 + tempMinima2) / 2;


      const cp = i['compra porcentaje'] ? promedio * ((i['compra porcentaje'] * 1) / 100) : 0
      const vp = i['venta porcentaje'] ? promedio2 * ((i['venta porcentaje'] * 1) / 100) : 0

      console.log('compra', (promedio + 0.01 - cp * 1).toFixed(2))
      console.log('venta', (promedio2 + 0.01 + vp * 1).toFixed(2))
      setState({ ...state, [i.code]: { ...state[i.code], compra: (promedio + 0.01 - cp * 1).toFixed(2), venta: (promedio2 + 0.01 + vp * 1).toFixed(2), ...getDayMonthYear2() } })
    } else {
      setModal('NonExchange')
      setItem({ ...i, transAmount: state[i.code] && state[i.code].transAmount ? state[i.code].transAmount : 0, })
    }

  }












  let interval

  function handlerInterval() {
    if (!act) {
      interval = setInterval(() => {

      }, 2000)
    } else {
      clearInterval(interval)
    }

  }



  // async function getAllExchage(i) {


  //   await fetch('/api/getUsdtP2P')
  // }


  // async function getExchage(i) {
  //   const headers = {
  //     // "Accept": "*/*",
  //     // "Accept-Encoding": "gzip, deflate, br",
  //     // "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
  //     // "Cache-Control": "no-cache",
  //     // "Connection": "keep-alive",
  //     "Content-Length": "123",
  //     "content-type": "application/json",
  //     // "Host": "p2p.binance.com",
  //     // "Origin": "https://p2p.binance.com",
  //     // "Pragma": "no-cache",
  //     // "TE": "Trailers",
  //     // "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0"
  //   };

  //   const data = {
  //     asset: 'USDT',
  //     // tradeType: 'BUY',
  //     fiat: i.code,
  //     transAmount: state[i.code] && state[i.code].transAmount ? state[i.code].transAmount : (i.transAmount ? i.transAmount : 0),
  //     order: '',
  //     page: 1,
  //     rows: 5,
  //     filterType: 'all'
  //   };

  //   const responseData = await fetch(
  //     'https://cors-anywhere.herokuapp.com/https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
  //     {
  //       headers,
  //       method: 'POST',
  //       body: JSON.stringify({ ...data, tradeType: 'BUY', }),

  //     }
  //   );
  //   const responseData2 = await fetch(
  //     'https://cors-anywhere.herokuapp.com/https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
  //     {
  //       headers,
  //       method: 'POST',
  //       body: JSON.stringify({ ...data, tradeType: 'SELL', }),

  //     }
  //   );
  //   // if (!responseData.ok) throw 'bad response';
  //   // if (!responseData.ok) throw 'bad response';

  //   const jsonData = await responseData.json();
  //   const jsonData2 = await responseData2.json();

  //   if (jsonData.data.length !== 0 && jsonData2.data.length !== 0) {
  //     let tempMaxima = Math.max(...jsonData.data.map((i) => i.adv.price));
  //     let tempMinima = Math.min(...jsonData.data.map((i) => i.adv.price));
  //     let promedio = (tempMaxima + tempMinima) / 2;


  //     let tempMaxima2 = Math.max(...jsonData2.data.map((i) => i.adv.price));
  //     let tempMinima2 = Math.min(...jsonData2.data.map((i) => i.adv.price));
  //     let promedio2 = (tempMaxima2 + tempMinima2) / 2;
  //     setState({ ...state, [i.code]: { ...state[i.code], compra: (promedio2 + 0.01).toFixed(2), venta: (promedio + 0.01).toFixed(2) } })
  //   } else {
  //     setModal('NonExchange')
  //     setItem({ ...i, transAmount: state[i.code] && state[i.code].transAmount ? state[i.code].transAmount : 0, })
  //   }

  // }

  // async function getExchage(i) {
  //   const headers = {
  //     // "Accept": "*/*",
  //     // "Accept-Encoding": "gzip, deflate, br",
  //     // "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
  //     // "Cache-Control": "no-cache",
  //     // "Connection": "keep-alive",
  //     "Content-Length": "123",
  //     "content-type": "application/json",
  //     // "Host": "p2p.binance.com",
  //     // "Origin": "https://p2p.binance.com",
  //     // "Pragma": "no-cache",
  //     // "TE": "Trailers",
  //     // "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0"
  //   };

  //   const data = {
  //     asset: 'USDT',
  //     // tradeType: 'BUY',
  //     fiat: i.code,
  //     transAmount: state[i.code] && state[i.code].transAmount ? state[i.code].transAmount : (i.transAmount ? i.transAmount:  0),
  //     order: '',
  //     page: 2,
  //     rows: 15,
  //     filterType: 'all'
  //   };

  //   const responseData = await fetch(
  //     'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
  //     {
  //       headers,
  //       method: 'POST',
  //       body: JSON.stringify({ ...data, tradeType: 'BUY', }),

  //     }
  //   );
  //   const responseData2 = await fetch(
  //     'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
  //     {
  //       headers,
  //       method: 'POST',
  //       body: JSON.stringify({ ...data, tradeType: 'SELL', }),

  //     }
  //   );
  //   // if (!responseData.ok) throw 'bad response';
  //   // if (!responseData.ok) throw 'bad response';

  //   const jsonData = await responseData.json();
  //   const jsonData2 = await responseData2.json();

  //   if (jsonData.data.length !== 0 && jsonData2.data.length !== 0) {
  //     let tempMaxima = Math.max(...jsonData.data.map((i) => i.adv.price));
  //     let tempMinima = Math.min(...jsonData.data.map((i) => i.adv.price));
  //     let promedio = (tempMaxima + tempMinima) / 2;


  //     let tempMaxima2 = Math.max(...jsonData2.data.map((i) => i.adv.price));
  //     let tempMinima2 = Math.min(...jsonData2.data.map((i) => i.adv.price));
  //     let promedio2 = (tempMaxima2 + tempMinima2) / 2;
  //     setState({ ...state, [i.code]: { ...state[i.code],  compra: (promedio2 + 0.01).toFixed(2), venta: (promedio + 0.01).toFixed(2) } })
  //   } else {
  //     setModal('NonExchange')
  //     setItem({ ...i, transAmount: state[i.code] && state[i.code].transAmount ? state[i.code].transAmount : 0, })
  //   }

  // }


  async function saveTarifas(e) {
    e.preventDefault()
    function callback() {
      getSpecificData('/tarifas', setTarifas, () => { setModal('') })
    }
    setModal('Guardando...')
    writeUserData(`/tarifas`, tarifas, setUserSuccess, callback)
    return
  }


  useEffect(() => {
    let dateDB = new Date();
    let options = { timeZone: 'America/La_Paz' };
    let date = new Date(dateDB.toLocaleString('en-US', options))

    setTime_stamp(date.getTime())
  }, []);

  return (
    <main className='h-full w-full pt-[70px]'>
      {modal === 'Guardando...' && <Loader> {modal} </Loader>}
      {modal === 'Save' && <Modal funcion={saveConfirm}>Estas por modificar la tasa de cambio de:  {item['currency']}</Modal>}
      {modal === 'NonExchange' && <Modal funcion={disableConfirm}>{item.code ? `La divisa ${item.code} no esta en la P2P de binance` : ''} {item.transAmount ? `o no se encontro cambio para el volumen ${item.transAmount}` : ''}</Modal>}
      {modal === 'Disable' && <Modal funcion={disableConfirm}>Estas por {item.habilitado !== undefined && item.habilitado !== false ? 'DESABILITAR' : 'HABILITAR'} el siguiente item:  {item['currency']}</Modal>}

      <GetP2Pinterval></GetP2Pinterval>
      <div className="w-full   relative h-full overflow-auto shadow-2xl  p-2 md:p-5 bg-gray-300 min-h-[80vh] scroll-smooth">
        <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block left-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:left-[20px]' onClick={prev}>{'<'}</button>
        <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block right-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:right-[20px]' onClick={next}>{'>'}</button>







        <form class="w-full ">
          <div class="w-full flex flex-wrap md:flex-nowrap -mx-3 mb-6">
            <div class="w-full md:w-[25%] px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Exchage
              </label>
              <SelectSimple arr={params.exchange} name='trade' click={handlerClickSelect} defaultValue={trade} uuid='8768798' label='Fiat' required={true}></SelectSimple>
              {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
            </div>
            <div class="w-full md:w-[25%] px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Crypto
              </label>
              <SelectSimple arr={params.crypto} name='crypto' click={handlerClickSelect} defaultValue={crypto} uuid='8768798' label='Crypto' required={true}></SelectSimple>
            </div>
            <div class="w-full md:w-[25%] px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                Fiat
              </label>
              <SelectSimple arr={params.fiat} name='fiat' click={handlerClickSelect} defaultValue={fiat} uuid='8768798' label='Fiat' required={true}></SelectSimple>
            </div>
            <div class="w-full md:w-[25%] px-3 py-5 md:py-0 flex items-end">
              <Button theme="Primary" click={getChangeP2P}>Get Change</Button>
            </div>

          </div>
        </form>


        {resP2P && <div class="relative w-full mb-5 overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full min-w-[700px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Advertisers
                </th>
                <th scope="col" class="px-6 py-3">
                  Price
                </th>
                <th scope="col" class="px-6 py-3">
                  Available/Order Limit
                </th>
              </tr>
            </thead>
            <tbody>


              {
                resP2P.map((i) => {
                  return <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {i.advertiser.nickName}
                    </th>
                    <td class="px-6 py-4">
                      {i.adv.price}
                    </td>
                    <td class="px-6 py-4">
                      {i.adv.tradableQuantity} {crypto} <br />
                      {i.adv.minSingleTransAmount} - {i.adv.maxSingleTransAmount}
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>}




        <div class="relative w-full mb-5 overflow-x-auto shadow-md sm:rounded-lg">

          <form className=' min-w-[700px] w-full' onSubmit={saveTarifas}>
            <div className='bg-gray-800 grid grid-cols-7 p-1 font-bold text-[12px] uppercase'>
              <span className='col-span-2 text-center'>Rango Tarifa 1</span>
              <span className='col-span-2 text-center'>Rango Tarifa 2</span>
              <span className='col-span-2 text-center'>Rango Tarifa 3</span>
              <span className='text-center'>GUARDAR</span>
            </div>

            <div className='grid grid-cols-7 place-items-center bg-gray-200 '>

              <input type="number" name="tarifa_1_min" className='w-[100px] text-center text-black  p-1 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandlerTarifa(e)} value={tarifas && tarifas['tarifa_1_min'] ? tarifas['tarifa_1_min'] : ''} />
              <input type="number" name="tarifa_1_max" className='w-[100px] text-center text-black  p-1 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandlerTarifa(e)} value={tarifas && tarifas['tarifa_1_max'] ? tarifas['tarifa_1_max'] : ''} />

              <input type="number" name="tarifa_2_min" className='w-[100px] text-center text-black  p-1 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandlerTarifa(e)} value={tarifas && tarifas['tarifa_2_min'] ? tarifas['tarifa_2_min'] : ''} />
              <input type="number" name="tarifa_2_max" className='w-[100px] text-center text-black  p-1 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandlerTarifa(e)} value={tarifas && tarifas['tarifa_2_max'] ? tarifas['tarifa_2_max'] : ''} />

              <input type="number" name="tarifa_3_min" className='w-[100px] text-center text-black  p-1 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandlerTarifa(e)} value={tarifas && tarifas['tarifa_3_min'] ? tarifas['tarifa_3_min'] : ''} />
              <input type="number" name="tarifa_3_max" className='w-[100px] text-center text-black  p-1 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandlerTarifa(e)} value={tarifas && tarifas['tarifa_3_max'] ? tarifas['tarifa_3_max'] : ''} />

              <Button theme={"Success"}>Guardar</Button>
            </div>

          </form>
        </div>
        <br />
        <div className='w-[100%] overflow-x-auto p-3 md:p-5'>

          <div className='min-w-[400px]'>
            <h3 className='font-medium text-[14px] text-black'>Lista De Divisas, Tipo De Cambio y Comisiones</h3>
            <br />
            <div className=' space-y-5 lg:space-y-0 lg:grid grid-cols-2 gap-2'>

              <input type="text" className='border-b-[1px] text-[14px] outline-none w-[400px] text-black  rounded-[5px] p-1 border-[1px] border-gray-400' onChange={onChangeFilter} placeholder='Buscar Divisa' />


              {habilitados
                ? <Button theme={"Success"} click={() => setHabilitados('')}>Habilitados</Button>
                : <Button theme={"Disable"} click={() => setHabilitados(true)}>Habilitados</Button>
              }

            </div>

          </div>



        </div>
        <br />
        <div className="w-full   relative h-full overflow-y-auto  shadow-2xl bg-white max-h-[calc(100vh-120px)] md:max-h-[calc(100vh-70px)] scroll-smooth" ref={refFirst}>

          <table className="w-full overflow-visible  text-[14px] text-left text-gray-500  bg-gray-800 text-white" style={{ minWidth: '2000px' }}>
            {/* <table className="relative w-full overflow-scroll max-w-[800px] h-[50px]  text-[14px] text-left text-gray-500 border-t-4 border-gray-400"> */}
            <thead className="text-[14px] text-gray-700 uppercase  bg-gray-800 text-white">
              <tr>
                <th scope="col" className=" px-3 py-3">
                  #
                </th>
                <th scope="col" className=" px-3 py-3">
                  Pais
                </th>
                <th scope="col" className=" px-3 py-3">
                  Code
                </th>
                <th scope="col" className=" px-3 py-3">
                  Tasa de <br /> cambio USD
                </th>
                <th scope="col" className="text-center px-3 py-3">
                  Compra
                </th>
                <th scope="col" className="text-center px-3 py-3">
                  Compra- %
                </th>
                <th scope="col" className="text-center px-3 py-3">
                  Venta
                </th>
                <th scope="col" className="text-center px-3 py-3">
                  Venta+ %
                </th>
                <th scope="col" className="text-center px-3 py-3">
                  Ultima Actualizacion
                </th>
                <th scope="col" className="text-center px-3 py-3">
                  Volumen de exchange
                </th>
                <th scope="col" className="text-center px-3 py-3">
                  Aply Exchange USD
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
                <th scope="col" className="text-center px-3 py-3">
                  Guardar
                </th>
                <th scope="col" className="text-center px-3 py-3">
                  Habilitar
                </th>
              </tr>
            </thead>
            <tbody>
              {divisas && divisas !== undefined && time_stamp !== undefined && Object.values(divisas).map((i, index) => {
                return i.currency !== undefined && i.currency.toLowerCase().includes(filter.toLowerCase()) && (i.habilitado !== undefined && habilitados && i.habilitado.toString() !== undefined ? i.habilitado.toString().includes(habilitados) : habilitados ? false : true) && <tr className={`text-[14px] border-b  border-gray-50   ${index % 2 === 0 ? 'bg-gray-300' : 'bg-gray-300'} `} key={index}>
                  <td className="px-3 py-4  flex text-gray-900 ">
                    <span className='h-full flex py-2'>{index + 1}</span>
                  </td>
                  <td className="px-3 py-4 text-gray-900 ">
                    {i['translation']['spa']['common']}
                  </td>
                  <td className="px-3 py-4 text-gray-900 ">
                    {i.code}/{i.currency}
                  </td>
                  <td className="w-[150px] px-3 py-4 text-gray-900 ">
                    1 USDT  {exchange && exchange !== undefined && exchange[i.code] !== undefined && exchange[i.code]} {exchange && exchange !== undefined && exchange[i.code] !== undefined && `${i.code}`}
                  </td>
                  <td className="w-32 p-4">
                    {/* <input type="number" name="compra" className='w-[100px] text-center p-2 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandler(e, i)} defaultValue={i['compra'] !== undefined ? i['compra'] : 0} /> */}
                    <input type="number" name="compra" className='w-[100px] text-center text-black p-2 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandler(e, i)} value={state[i.code] && state[i.code].compra ? state[i.code].compra : (i['compra'] !== undefined ? i['compra'] : '')} />
                  </td>
                  <td className="w-32 p-4">
                    {/* <input type="number" name="compra" className='w-[100px] text-center p-2 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandler(e, i)} defaultValue={i['compra'] !== undefined ? i['compra'] : 0} /> */}
                    <input type="number" name="compra porcentaje" className='w-[100px] text-center text-black  p-2 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandler(e, i)} value={state[i.code] && state[i.code]['compra porcentaje'] ? state[i.code]['compra porcentaje'] : (i['compra porcentaje'] !== undefined ? i['compra porcentaje'] : '')} />
                  </td>
                  <td className="w-32 p-4">
                    <input type="number" name="venta" className='w-[100px] text-center text-black  p-2 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandler(e, i)} value={state[i.code] && state[i.code].venta ? state[i.code].venta : (i['venta'] !== undefined ? i['venta'] : '')} />
                  </td>
                  <td className="w-32 p-4">
                    {/* <input type="number" name="compra" className='w-[100px] text-center p-2 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandler(e, i)} defaultValue={i['compra'] !== undefined ? i['compra'] : 0} /> */}
                    <input type="number" name="venta porcentaje" className='w-[100px] text-center text-black  p-2 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandler(e, i)} value={state[i.code] && state[i.code]['venta porcentaje'] ? state[i.code]['venta porcentaje'] : (i['venta porcentaje'] !== undefined ? i['venta porcentaje'] : '')} />
                  </td>
                  <td className={`px-3 py-4 text-gray-900 ${((time_stamp - i.time_stamp) / 60000) > 60 && 'bg-red-200'} ${((time_stamp - i.time_stamp) / 60000) < 10 && 'bg-green-200'} ${((time_stamp - i.time_stamp) / 60000) > 10 && ((time_stamp - i.time_stamp) / 60000) < 60 && 'bg-yellow-200'}`}>

                    {i.actualizacion && i.actualizacion !== undefined ? <>{i.actualizacion.split(' ')[0]} <br /> {i.actualizacion.split(' ')[1]}</> : ''}
                  </td>
                  <td className="w-32 p-4">
                    <input type="number" name="transAmount" className='w-[100px] text-center text-black  p-2 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandler(e, i)} value={state[i.code] && state[i.code].transAmount ? state[i.code].transAmount : (i['transAmount'] !== undefined ? i['transAmount'] : '')} />
                  </td>

                  <td className="w-[170px] p-4">
                    <Button theme={"Success"} click={() => getExchage(i)}>Get & Apply</Button>
                  </td>

                  <td className="w-32 p-4">
                    <input type="number" name="tarifa 1" className='w-[100px] text-center text-black  p-2 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandler(e, i)} defaultValue={i['tarifa 1'] !== undefined ? i['tarifa 1'] : 0} />
                  </td>
                  <td className="w-32 p-4">
                    <input type="number" name="tarifa 2" className='w-[100px] text-center text-black  p-2 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandler(e, i)} defaultValue={i['tarifa 2'] !== undefined ? i['tarifa 2'] : 0} />
                  </td>
                  <td className="w-32 p-4">
                    <input type="number" name="tarifa 3" className='w-[100px] text-center text-black  p-2 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandler(e, i)} defaultValue={i['tarifa 3'] !== undefined ? i['tarifa 3'] : 0} />
                  </td>
                  <td className="px-3 py-4">
                    {state && state[i.code] !== undefined
                      ? <Button theme={"Success"} click={() => save(i)}>Guardar</Button>
                      : <Button theme={"Disable"} >Disable</Button>
                    }
                  </td>
                  <td className="px-3 py-4">
                    {i.habilitado !== undefined && i.habilitado !== false
                      ? <Button theme={"Success"} click={() => manage(i, 'Desabilitar')}>Habilitado</Button>
                      : <Button theme={"Danger"} click={() => manage(i, 'Habilitar')}>Desabilitado</Button>
                    }
                  </td>
                </tr>
              })
              }
            </tbody>
          </table>
        </div>

      </div>
    </main >
  )
}




















