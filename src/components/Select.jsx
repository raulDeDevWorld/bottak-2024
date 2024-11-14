'use client';
import { useUser } from '@/context/Context'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import style from './Select.module.css'


export default function isSelect3({ arr, name, click, defaul, uuid }) {
    const [isSelect3, setIsSelect3] = useState(false)
    const router = useRouter()

    const [state, setState] = useState(defaul)

    function handlerSelect(e) {
        e.stopPropagation()
        setIsSelect3(!isSelect3)
    }

    function handlerUserState(name, i) {
        setState(i)
        click(name, i, uuid)
        setIsSelect3(false)
    }
    return (
        <div className={`relative w-[100%] sm:min-w-[150px] sm:max-w-[350px] bg-transparent border-[.5px] border-gray-300 text-gray-900 text-[14px] rounded-xl block  p-0 `} >
            <div
                className={`relative bg-gray-50 border border-gray-300 text-gray-900 text-[14px] rounded-xl block w-full p-3 cursor-pointer  ${state == 'En verificación' && 'bg-gray-100'}  ${state == 'Verificado' && 'bg-[#a5d4ff]'} ${state == 'Transfiriendo' && 'bg-yellow-300'}   ${state == 'Exitoso' && 'bg-green-300'} ${state == 'Rechazado' && 'bg-red-300'}`}
                onClick={handlerSelect}>
                {state} <span className={isSelect3 ? 'absolute right-5 rotate-[270deg]' : 'absolute right-5 rotate-90'}>{'>'}</span>
            </div>
            <ul
                className={isSelect3 ? `py-3  absolute left-0 top-[38px] h-[100px] overflow-y-auto bg-gray-50 outline outline-1 outline-gray-300 text-gray-900 text-[14px] rounded-b-xl focus:ring-blue-500 focus:outline-blue-500 w-full  z-30` : 'hidden'}            // className={`bg-gray-50 border border-gray-300 text-gray-900 text-[14px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
            >
                {
                    arr.map((i, index) => <li key={i} className={`py-2 px-3 cursor-pointer   ${index % 2 === 0 ? '' : ''}`} onClick={() => handlerUserState(name, i)}>{i}</li>)
                }
            </ul>
        </div>

    )
}







// 'use client';

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation';
// import style from './Select.module.css'
// import { useUser } from '@/context/Context.js'
// import Tolkipt from '@/components/Tolkipt'

// export default function Select({ arr, name, click, defaultValue, uuid }) {
//     const { setFilterDis, user, userDB, distributorPDB, setUserDistributorPDB, setUserItem, item, setUserData, setUserSuccess, cart, setUserCart, modal, setModal, setFilter, success } = useUser()

//     const router = useRouter()

//     const [select, setSelect] = useState(false)
//     const [state, setState] = useState(defaultValue ? defaultValue : arr[0])

//     function handlerSelect() {
//         setSelect(!select)
//     }

//     function handlerUserState(name, i) {
//         setState(i)
//         click(name, i, uuid)
//     }



//     return (

//         <div className={`relative bg-gray-50 border border-gray-300 text-gray-900 text-[14px] rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full  `} onClick={handlerSelect}>
//             {arr.includes('Chuquisaca') && <div className='absolute w-full top-[-130px]'>
//                 {success == 'Importand' && <Tolkipt>Esta información es importante,<br /> por favor revisa que sea correcta.</Tolkipt>}
//             </div>}
//             <div className={`p-3 font-semibold rounded-xl ${state == 'No disponible' && 'bg-red-400'} ${state == 'Inmediata' && 'bg-green-400'}  ${state == 'En 24 hrs' && 'bg-yellow-400'}  ${state == 'Rechazado' && 'bg-red-400'} ${state == 'Autorizado' && 'bg-green-300'} ${state == 'Pendiente' && 'bg-gray-400'} ${state == 'Felicitaciones' && 'bg-green-400'} ${state == 'Atendido' && 'bg-yellow-300'}`}>
//                 {state} <span className={select ? 'font-semibold absolute right-5 rotate-[270deg]' : 'font-semibold absolute right-5 rotate-90'}>{'>'}</span>
//             </div>
//             <ul className={select ? `py-3 absolute h-[150px] overflow-y-auto  left-0 top-12 bg-gray-50 outline outline-1 outline-gray-300 text-gray-900 text-[14px] rounded-b-xl focus:ring-blue-500 focus:outline-blue-500 w-full z-50` : 'hidden'} >
//                 {
//                     arr.map((i, index) => <li key={i} className={`mb-2 cursor-pointer py-2 px-3 font-semibold ${index % 2 === 0 ? 'bg-gray-100' : ''}`} onClick={() => handlerUserState(name, i)}>{i}</li>)
//                 }
//             </ul>
//         </div>
//     )
// }







