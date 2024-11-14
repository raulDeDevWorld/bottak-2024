

'use client'
// import CurrencyFlag from 'react-currency-flags';
// import CurrencyList from 'currency-list';
import React, { useState, useEffect } from "react";
import { useUser } from '@/context/Context'

export default function App({ placeholder, value, onChange, propHandlerSelect, propSelect, propIsSelect, propHandlerIsSelect, defaultValue }) {
  const { userDB, currency, setCurrency, countries, setUserSuccess, tarifas, select, setSelect, select2, setSelect2, setComision, transferencia, setTransferencia, success, setuserSuccess, divisas, setDivisas, isSelect, setIsSelect, isSelect2, setIsSelect2, } = useUser()
 
  // const [currency, setCurrency] = useState("BOB");
  // const [select, setSelect] = useState('BOB')
  // const [isSelect, setIsSelect] = useState(false)

  function handlerUserSelect(e, i) {
    // e.nativeEvent.stopImmediatePropagation()
    // e.stopPropagation()

    console.log('child')
    propHandlerSelect(i.code)
  }
  function handlerIsSelect(e, i) {
    e.stopPropagation()

    console.log('child')
    propHandlerIsSelect()
  }


  // const handlerOnChange = (e) => {
  //   console.log(e.target.value)
  //   onChange == 'Transference' && setTransferencia(e.target.value)
  // }

  const handlerOnChange = (e) => {
    onChange == 'Transference' && setTransferencia((e.target.value * 1).toFixed(2));

    (e.target.value * divisas['USDT'].compra / divisas[select].venta).toFixed(2) <= tarifas.tarifa_1_max * 1 && ((e.target.value * divisas['USDT'].compra / divisas[select].venta).toFixed(2)) >= tarifas.tarifa_1_min * 1 && setComision((divisas[select]['tarifa 1'] * e.target.value / 100).toFixed(2));
    (e.target.value * divisas['USDT'].compra / divisas[select].venta).toFixed(2) <= tarifas.tarifa_2_max * 1 && ((e.target.value * divisas['USDT'].compra / divisas[select].venta).toFixed(2)) >= tarifas.tarifa_2_min * 1 && setComision((divisas[select]['tarifa 2'] * e.target.value / 100).toFixed(2));
    (e.target.value * divisas['USDT'].compra / divisas[select].venta).toFixed(2) <= tarifas.tarifa_3_max * 1 && ((e.target.value * divisas['USDT'].compra / divisas[select].venta).toFixed(2)) >= tarifas.tarifa_3_min * 1 && setComision((divisas[select]['tarifa 3'] * e.target.value / 100).toFixed(2));
    ((e.target.value * divisas['USDT'].compra / divisas[select].venta).toFixed(2)) > tarifas.tarifa_3_max * 1 && setComision('CONTACTESE CON SOPORTE');

  }
  useEffect(() => {
    // setCurrency(CurrencyList.getAll('es_US'))
  }, []);

  return (
    <div className={`relative flex justify-between w-[100%] sm:max-w-[350px]  focus:ring-blue-500 focus:border-blue-500  p-0 `} >
      <div className='relative flex w-[85%] justify-between items-center bg-transparent border border-gray-300 text-gray-900 text-[14px] rounded-xl'>
        <input type="number" className='p-3 bg-transparent w-[65%] text-white text-center' step=".01" onChange={handlerOnChange}
          placeholder={placeholder}
          value={value && divisas && divisas[select] && divisas[select2] && (transferencia * divisas[select2].compra / divisas[select].venta).toFixed(2)}
          defaultValue={defaultValue} required />
        <span className=" w-[15%] text-gray-100 p-3 " onClick={(e) => handlerIsSelect(e)}>{propSelect}</span>
        {/* <span className='w-[auto] flex items.center rounded-[20px] '><CurrencyFlag currency={propSelect} size="xl" /></span> */}
        <span className={propIsSelect ? 'text-white text-center w-[10%] right-5 rotate-[270deg] p-3 ' : 'text-white text-center w-[10%] right-5 rotate-90 p-3 '} onClick={(e) => handlerIsSelect(e)}>{'>'}</span>

        <div className={`absolute left-0 top-10 bg-gray-100 flex flex-col justify-start items-center  text-gray-900 text-[14px] rounded-b-xl focus:ring-blue-500 focus:outline-blue-500 w-full   z-30  transition-all ${propIsSelect ? 'h-[150px] outline outline-1 outline-gray-300 overflow-y-scroll ' : 'h-0 overflow-y-hidden'}`} >
          <ul className="inline-block w-full">


            {value && divisas !== undefined
              ? Object.values(divisas).map((i, index) => i.habilitado !== undefined && i.habilitado !== false && i.habilitado !== null && (countries[userDB && userDB !== undefined ? userDB.cca3 : 'BOL']?.divisasPaisDestinatario?.includes(i.code) || i.cca3 === userDB?.cca3 || i.code === 'USDT') &&
                <li className='w-full  h-[50px] flex justify-start items-center px-10' key={index} onClick={(e) => handlerUserSelect(e, i)}>
                  <span className="inline-block w-30px] h-[20px] "><img src={i.flagPNG} className="inline-block w-[30px] h-[20px]" alt="" /></span>
                  <span className="pl-5"> {i.code}, {i.currency}</span>
                </li>)
              : userDB !== null && userDB !== undefined
                ? Object.values(divisas).map((i, index) => i.habilitado !== undefined && i.habilitado !== false && i.habilitado !== null && (countries[userDB && userDB !== undefined ? userDB.cca3 : 'BOL']?.divisasPaisRemitente?.includes(i.code) || i.cca3 === userDB?.cca3 || i.code === 'USDT') &&
                  <li className='w-full  h-[50px] flex justify-start items-center px-10' key={index} onClick={(e) => handlerUserSelect(e, i)}>
                    <span className="inline-block w-30px] h-[20px] "><img src={i.flagPNG} className="inline-block w-[30px] h-[20px]" alt="" /></span>
                    <span className="pl-5"> {i.code}, {i.currency}</span>
                  </li>)
                : Object.values(divisas).map((i, index) => i.habilitado !== undefined && i.habilitado !== false && i.habilitado !== null &&
                  <li className='w-full  h-[50px] flex justify-start items-center px-10' key={index} onClick={(e) => handlerUserSelect(e, i)}>
                    <span className="inline-block w-30px] h-[20px] "><img src={i.flagPNG} className="inline-block w-[30px] h-[20px]" alt="" /></span>
                    <span className="pl-5"> {i.code}, {i.currency}</span>
                  </li>)
            }


          </ul>
        </div>
      </div>


      <button className='inline-block relative right-0 top-0 bottom-0  bg-[yellow] rounded-full w-[50px] h-[50px] font-bold text-black'>
        <img src={divisas[propSelect].flagPNG} className="w-full h-full object-cover rounded-[15px] " alt="" />
        {/* {propSelect} */}
      </button>

    </div>
  );
}

//  {divisas !== undefined && Object.values(divisas).map((i, index) => i.habilitado !== undefined && i.habilitado !== false && i.habilitado !== null &&
//             <li className='w-full  h-[50px] flex justify-start items-center px-10' key={index} onClick={(e) => handlerUserSelect(e, i)}>
//               {/* <span className="inline-block w-[30px]"><CurrencyFlag currency={i.code} size="lg" /></span> */}
//               <span className="inline-block w-30px] h-[20px] "><img src={i.flagPNG} className="inline-block w-[30px] h-[20px]" alt="" /></span>
//               <span className="pl-5"> {i.code}, {i.currency}</span>
//             </li>)}

