'use client'
// import CurrencyFlag from 'react-currency-flags';
// import CurrencyList from 'currency-list';
import React, { useState, useEffect } from "react";
import { useUser } from '@/context/Context'

import { writeUserData, getSpecificData } from "@/firebase/database"
import divisasJSON from '@/utils/divisas'

export default function App({ placeholder, value, onChange, propHandlerSelect, propSelect, propIsSelect, propHandlerIsSelect, defaultValue }) {
  const { userDB, currency, setCurrency, setUserSuccess, select, setSelect, select2, setSelect2, transferencia,countries, setTransferencia, comision, setComision, success, setuserSuccess, divisas, setDivisas, isSelect, setIsSelect, isSelect2, setIsSelect2, } = useUser()





  function handlerUserSelect(e, i) {
    // e.nativeEvent.stopImmediatePropagation()
    // e.stopPropagation()

    propHandlerSelect(i.code)
  }
  function handlerIsSelect(e, i) {
    e.stopPropagation()
    propHandlerIsSelect()
  }


  const handlerOnChange = (e) => {
    onChange == 'Transference' && setTransferencia((e.target.value * 1).toFixed(2));

    (divisas && divisas[select] && divisas[select2] && (e.target.value * divisas['USDT'].compra / divisas[select].venta).toFixed(2)) <= 1000 && setComision((divisas[select]['tarifa 1'] * e.target.value / 100).toFixed(2));
    (divisas && divisas[select] && divisas[select2] && (e.target.value * divisas['USDT'].compra / divisas[select].venta).toFixed(2)) <= 10000 && (divisas && divisas[select] && divisas[select2] && (e.target.value * divisas['USDT'].compra / divisas[select].venta).toFixed(2)) > 1000 && setComision((divisas[select]['tarifa 2'] * e.target.value / 100).toFixed(2));
    (divisas && divisas[select] && divisas[select2] && (e.target.value * divisas['USDT'].compra / divisas[select].venta).toFixed(2)) <= 100000 && (divisas && divisas[select] && divisas[select2] && (e.target.value * divisas['USDT'].compra / divisas[select].venta).toFixed(2)) > 10000 && setComision((divisas[select]['tarifa 3'] * e.target.value / 100).toFixed(2));
    (divisas && divisas[select] && divisas[select2] && (e.target.value * divisas['USDT'].compra / divisas[select].venta).toFixed(2)) > 100000 && setComision('CONTACTESE CON SOPORTE');

  }
  console.log(divisas[propSelect])
  // console.log(Object.values(divisasJSON))
  // useEffect(() => {
  //   // writeUserData('divisas', divisasJSON, setUserSuccess)
  //   // setCurrency(CurrencyList.getAll('es_US'))
  //   divisas === undefined && getSpecificData('currencies', setDivisas)
  // }, [divisas, propSelect]);
  // console.log(select)
  // console.log(propSelect)

  // console.log(divisas[select2].cambio)

  return (
    <div className={`relative w-[100%] sm:max-w-[380px] bg-transparent border border-gray-300 text-gray-900 text-[14px] rounded-xl focus:ring-blue-500 focus:border-blue-500 block  p-0 `} >
      <div className='relative w-full bg-transparent flex justify-between items-center'>
        <input
          type="number"
          className='p-3 bg-transparent w-[65%] text-white text-center'
          step=".01"
          onChange={handlerOnChange}
          placeholder={placeholder}
          value={value && divisas && divisas[select] && divisas[select2] && (transferencia * divisas[select2].compra / divisas[select].venta).toFixed(2)}
          defaultValue={defaultValue}
          required />
        <span className=" w-[15%] text-gray-100 p-3 " onClick={(e) => handlerIsSelect(e)}>{propSelect}</span>
        <span className='w-[auto] flex items-center rounded-[20px] '><img src={divisas && divisas[propSelect] && divisas[propSelect].flagPNG} className="w-[50px] h-[30px]" alt="" /></span>
        {/* <span className='w-[auto] flex items.center rounded-[20px] '><CurrencyFlag currency={propSelect} size="xl" /></span> */}
        <span className={propIsSelect ? 'text-white text-center w-[10%] right-5 rotate-[270deg] p-3 ' : 'text-white text-center w-[10%] right-5 rotate-90 p-3 '} onClick={(e) => handlerIsSelect(e)}>{'>'}</span>
      </div>

      <div className={`absolute left-0 top-10 bg-gray-100 flex flex-col justify-start items-center  text-gray-900 text-[14px] rounded-b-xl focus:ring-blue-500 focus:outline-blue-500 w-full  z-30  transition-all ${propIsSelect ? 'h-[150px] outline outline-1 outline-gray-300 overflow-y-auto ' : 'h-0 overflow-y-hidden'}`} >
        <ul className="inline-block w-full">
          {value && divisas !== undefined 
            ? Object.values(divisas).map((i, index) => i.habilitado !== undefined && i.habilitado !== false && i.habilitado !== null && <li className='w-full  h-[50px] flex justify-start items-center px-10' key={index} onClick={(e) => handlerUserSelect(e, i)}>
              {/* <span className="inline-block w-[30px]"><CurrencyFlag currency={i.code} size="lg" /></span> */}
              <span className="inline-block  h-[20px] "><img src={i.flagPNG} className="inline-block w-[30px] h-[20px]" alt="" /></span>
              <span className="pl-5 "> {i.code}, {i.currency}</span>
            </li>)
            : Object.values(divisas).map((i, index) => i.habilitado !== undefined && i.habilitado !== false && i.habilitado !== null && <li className='w-full  h-[50px] flex justify-start items-center px-10' key={index} onClick={(e) => handlerUserSelect(e, i)}>
              {/* <span className="inline-block w-[30px]"><CurrencyFlag currency={i.code} size="lg" /></span> */}
              <span className="inline-block  h-[20px] "><img src={i.flagPNG} className="inline-block w-[30px] h-[20px]" alt="" /></span>
              <span className="pl-5 "> {i.code}, {i.currency}</span>
            </li>)
          
          }
        </ul>
      </div>

    </div>
  );
}             



















// 'use client'
// // import CurrencyFlag from 'react-currency-flags';
// // import CurrencyList from 'currency-list';
// import React, { useState, useEffect } from "react";
// import { useUser } from '@/context/Context'

// import { writeUserData, getSpecificData } from "@/firebase/database"
// import divisasJSON from '@/utils/divisas'

// export default function App({ placeholder, value, onChange, propHandlerSelect, propSelect, propIsSelect, propHandlerIsSelect, defaultValue }) {
//   const { userDB, currency, setCurrency, setUserSuccess, select, setSelect, select2, setSelect2, transferencia, countries, setTransferencia, comision, setComision, success, setuserSuccess, divisas, setDivisas, isSelect, setIsSelect, isSelect2, setIsSelect2, } = useUser()





//   function handlerUserSelect(e, i) {
//     // e.nativeEvent.stopImmediatePropagation()
//     // e.stopPropagation()

//     propHandlerSelect(i.code)
//   }
//   function handlerIsSelect(e, i) {
//     e.stopPropagation()
//     propHandlerIsSelect()
//   }


//   const handlerOnChange = (e) => {
//     onChange == 'Transference' && setTransferencia((e.target.value * 1).toFixed(2));

//     (divisas && divisas[select] && divisas[select2] && (e.target.value * divisas['USDT'].compra / divisas[select].venta).toFixed(2)) <= 1000 && setComision((divisas[select]['tarifa 1'] * e.target.value / 100).toFixed(2));
//     (divisas && divisas[select] && divisas[select2] && (e.target.value * divisas['USDT'].compra / divisas[select].venta).toFixed(2)) <= 10000 && (divisas && divisas[select] && divisas[select2] && (e.target.value * divisas['USDT'].compra / divisas[select].venta).toFixed(2)) > 1000 && setComision((divisas[select]['tarifa 2'] * e.target.value / 100).toFixed(2));
//     (divisas && divisas[select] && divisas[select2] && (e.target.value * divisas['USDT'].compra / divisas[select].venta).toFixed(2)) <= 100000 && (divisas && divisas[select] && divisas[select2] && (e.target.value * divisas['USDT'].compra / divisas[select].venta).toFixed(2)) > 10000 && setComision((divisas[select]['tarifa 3'] * e.target.value / 100).toFixed(2));
//     (divisas && divisas[select] && divisas[select2] && (e.target.value * divisas['USDT'].compra / divisas[select].venta).toFixed(2)) > 100000 && setComision('CONTACTESE CON SOPORTE');

//   }
//   // console.log(countries[divisas[propSelect].cioc])
//   // console.log(Object.values(divisasJSON))
//   // useEffect(() => {
//   //   // writeUserData('divisas', divisasJSON, setUserSuccess)
//   //   // setCurrency(CurrencyList.getAll('es_US'))
//   //   divisas === undefined && getSpecificData('currencies', setDivisas)
//   // }, [divisas, propSelect]);
//   // console.log(select)
//   // console.log(propSelect)

//   // console.log(countries[userDB && userDB !== undefined ?userDB.cca3 :'BOL'].divisasPaisRemitente)

//   return (
//     countries && countries !== undefined && divisas && <div className={`relative w-[100%] sm:max-w-[380px] bg-transparent border border-gray-300 text-gray-900 text-[14px] rounded-xl focus:ring-blue-500 focus:border-blue-500 block  p-0 `} >
//       <div className='relative w-full bg-transparent flex justify-between items-center'>
//         <input
//           type="number"
//           className='p-3 bg-transparent w-[65%] text-white text-center'
//           step=".01"
//           onChange={handlerOnChange}
//           placeholder={placeholder}
//           value={value && divisas && divisas[select] && divisas[select2] && (transferencia * divisas[select2].compra / divisas[select].venta).toFixed(2)}
//           defaultValue={defaultValue}
//           required />
//         <span className=" w-[15%] text-gray-100 p-3 " onClick={(e) => handlerIsSelect(e)}>{propSelect}</span>
//         <span className='w-[auto] flex items-center rounded-[20px] '><img src={divisas && divisas[propSelect] && divisas[propSelect].flagPNG} className="w-[50px] h-[30px]" alt="" /></span>
//         {/* <span className='w-[auto] flex items.center rounded-[20px] '><CurrencyFlag currency={propSelect} size="xl" /></span> */}
//         <span className={propIsSelect ? 'text-white text-center w-[10%] right-5 rotate-[270deg] p-3 ' : 'text-white text-center w-[10%] right-5 rotate-90 p-3 '} onClick={(e) => handlerIsSelect(e)}>{'>'}</span>
//       </div>

//       <div className={`absolute left-0 top-10 bg-gray-100 flex flex-col justify-start items-center  text-gray-900 text-[14px] rounded-b-xl focus:ring-blue-500 focus:outline-blue-500 w-full  z-30  transition-all ${propIsSelect ? 'h-[150px] outline outline-1 outline-gray-300 overflow-y-auto ' : 'h-0 overflow-y-hidden'}`} >
//         <ul className="inline-block w-full">
//           {value && divisas !== undefined
//             ? Object.values(divisas).map((i, index) => i.habilitado !== undefined && i.habilitado !== false && i.habilitado !== null && <li className='w-full  h-[50px] flex justify-start items-center px-10' key={index} onClick={(e) => handlerUserSelect(e, i)}>
//               {/* <span className="inline-block w-[30px]"><CurrencyFlag currency={i.code} size="lg" /></span> */}
//               <span className="inline-block  h-[20px] "><img src={i.flagPNG} className="inline-block w-[30px] h-[20px]" alt="" /></span>
//               <span className="pl-5 "> {i.code}, {i.currency}</span>
//             </li>)
//             : Object.values(divisas).map((i, index) => i.habilitado !== undefined && i.habilitado !== false && i.habilitado !== null && (countries[userDB && userDB !== undefined ? userDB.cca3 : 'BOL']?.divisasPaisRemitente.includes(i.code) || i.cca3 === userDB?.cca3) && <li className='w-full  h-[50px] flex justify-start items-center px-10' key={index} onClick={(e) => handlerUserSelect(e, i)}>
//               {/* <span className="inline-block w-[30px]"><CurrencyFlag currency={i.code} size="lg" /></span> */}
//               <span className="inline-block  h-[20px] "><img src={i.flagPNG} className="inline-block w-[30px] h-[20px]" alt="" /></span>
//               <span className="pl-5 "> {i.code}, {i.currency}</span>
//             </li>)
//           }
//         </ul>
//       </div>

//     </div>
//   );
// }             
