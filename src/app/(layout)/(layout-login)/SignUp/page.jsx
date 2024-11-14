'use client';
import { useUser } from '@/context/Context'
import { onAuth, signUpWithEmail } from '@/firebase/utils'
import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import Error from '@/components/Error'

import Input from '@/components/Input'
import { useRouter } from 'next/navigation';



export default function Home() {

  const { user, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG } = useUser()
  const router = useRouter()


  // const signInHandler = async (e) => {
  //   e.preventDefault()
  //   let email = e.target[0].value
  //   let password = e.target[1].value

  //   if (email.length == 0 || password.length == 0) {
  //     return setUserSuccess('Complete')
  //   }
  //   const res = await signInWithEmail(email, password, setUserProfile)

  //   if (res == null) {
  //     setUserSuccess('Intente')
  //     return
  //   }

  //   if (res && (userDB == null || userDB == undefined)) {
  //     const data = await getSpecificData(`/users/${res.uid}`)
  //     data == null ? router.push('/Register') : router.push('/Register/Destinatario')
  //   }
  //   console.log()
  // }

  const signUpHandler = async (e) => {
    e.preventDefault()
    let email = e.target[0].value
    let password = e.target[1].value

    if (email.length == 0 || password.length == 0) {
      return setUserSuccess('Complete')
    }
    const callback = () => {
      router.push('/Register')
    }
     signUpWithEmail(email, password, setUserProfile, setUserSuccess, callback)

    // if (res == null) {
    //   setUserSuccess('Existe')
    //   return
    // }
  }

  useEffect(() => {
    // user == undefined && onAuth(setUserProfile, setUserData)
    // user && router.push('/Register')
  }, [user, success]);


  console.log(user)
  return (
        <form className="relative w-full max-w-[500px] h-full flex flex-col justify-between items-center space-y-3" onSubmit={signUpHandler} >
          <h5 className="text-[24px] font-medium text-white text-center">Registrate</h5>
          <div className='relative w-full'>
            <label htmlFor="email" className="block mb-2 text-[14px] text-left font-medium text-white">Email</label>
            <Input type="email" name="email" id="email" placeholder="name@company.com" required />
          </div>
          <div className='relative w-full'>
            <label htmlFor="password" className="block mb-2 text-[14px] text-left  font-medium text-white">Contraseña</label>
            <Input type="password" name="password" id="password" placeholder="••••••••••••" styled='font-sans' minLength={8} pattern='^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,15}$' title='8 a 15 caracteres, mayusculas, minusculas, numeros, caracteres especiales, no espacios' required />
          </div>
          {/* <div className="flex items-start">
          <Link href="/Resset" className="ml-auto text-green-400 text-[14px] font-light hover:underline">Olvidaste tu contraseña?</Link>
          </div> */}
          <div className="w-full flex justify-end items-start">
            <div className="flex justify-end items-center">
                <div className="flex items-center h-5">
                  <input id="remember" type="checkbox" onInvalid={(e)=>e.target.setCustomValidity('Debe aceptar las politicas de servicio')} onInput={e => e.target.setCustomValidity('')} className="w-[16px] h-[16px] border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required />
                </div>
                <Link href="/Politicas" className="ml-3 text-[12px] font-medium  text-green-400 underline  underline-green-400">Políticas de Servicio</Link>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <Button type="submit" theme="Primary">Continuar</Button>
          </div>
          <div className="text-[14px] font-medium text-gray-500 dark:text-gray-300 text-center">Ya tienes una cuenta? <Link href="/Login" className="text-green-400 hover:underline">Inicia Sessión</Link ></div>
        </form>
  )
}




































// 'use client'


// import { writeUserData, getSpecificData } from '@/firebase/database'
// // import { uploadStorage } from '@/supabase/storage'
// import { useEffect, useState } from 'react'
// import { useUser } from '@/context/Context.js'
// import Input from '@/components/Input'
// import Select from '@/components/Select'
// import Label from '@/components/Label'
// import Checkbox from '@/components/Checkbox'
// import { getDayMonthYear } from '@/utils/date'
// import { WithAuth } from '@/HOCs/WithAuth'

// import Button from '@/components/Button'
// import { useMask } from '@react-input/mask';
// import { useRouter } from 'next/navigation';
// // import { WithAuth } from '@/HOCs/WithAuth'
// import dynamic from 'next/dynamic'
// const InvoicePDF = dynamic(() => import("@/components/pdf"), {
//     ssr: false,
// });

// function Home() {
//     const router = useRouter()

//     const { user, userDB, setUserData, setUserSuccess, destinatario, transferencia, fecha, setFecha} = useUser()
//     const [state, setState] = useState({})

//     const [postImage, setPostImage] = useState(null)
//     const [urlPostImage, setUrlPostImage] = useState(null)

//     const [account, setAccount] = useState('dependiente')





//     const inputRefCard = useMask({ mask: '____ ____ ____ ____', replacement: { _: /\d/ } });
//     const inputRefDate = useMask({ mask: '__/__', replacement: { _: /\d/ } });
//     const inputRefCVC = useMask({ mask: '___', replacement: { _: /\d/ } });
//     const inputRefPhone = useMask({ mask: '+ 591 _ ___ ___', replacement: { _: /\d/ } });
//     const inputRefWhatsApp = useMask({ mask: '+ 591 __ ___ ___', replacement: { _: /\d/ } });


//     function manageInputIMG(e) {
//         // const fileName = `${e.target.name}`
//         const file = e.target.files[0]

//         setPostImage(file)
//         setUrlPostImage(URL.createObjectURL(file))

//     }


//     function onChangeHandler(e) {
//         setState({ ...state, [e.target.name]: e.target.value })
//     }
//     function onChangeHandlerCheck(e) {
//         setState({ ...state, [e.target.name]: e.target.checked })
//     }
//     function onClickHandler(name, value) {
//         setState({ ...state, [name]: value })
//     }
//     console.log(user)
// console.log(userDB)

//     function save(e) {
//         e.preventDefault()
//         router.push('/Register/Tarjeta')
//         // e.preventDefault()
//         // writeUserData('Clinica', { ...state, uuid: user.uuid }, user.uuid, userDB, setUserData, setUserSuccess, 'Se ha guardado correctamente', 'Perfil')
//         // uploadStorage('Clinica', postImage, user.uuid, updateUserData)
//         // router.push('/Clinica/Perfil')
//     }

//     useEffect(()=>{
//         const date = getDayMonthYear()
//         console.log(date)
//         setFecha(date)
//        userDB === undefined && getSpecificData(`/users/${user.uid}`, setUserData)
//     }, [user, userDB])


//     return (
//         <main>
//             <table className=" w-[300px] lg:w-full lg:min-w-auto text-[14px] text-left text-gray-500 rounded-[20px]">
//                 <thead className="text-[14px] text-gray-700 uppercase bg-gray-50  ">
//                     <tr>
//                         <th scope="col-3" className="w-1/2 px-3 py-3">
//                             Datos
//                         </th>
//                         <th scope="col" className="px-3 py-3">
//                             Valores
//                         </th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr className="bg-white text-[14px] border-b   hover:bg-gray-50 " >
//                         <td className="px-3 py-4  flex flex-col text-[14px] text-gray-700 ">
//                         Remitente
//                         </td>
//                         <td className="px-3 py-4 font-semibold text-gray-900 ">
//                         {userDB && userDB.profile &&userDB.profile.nombre}
//                         </td>
//                     </tr>
//                     <tr className="bg-white text-[14px] border-b   hover:bg-gray-50 " >
//                         <td className="px-3 py-4  flex flex-col text-[14px] text-gray-700 ">
//                         Destinatario
//                         </td>
//                         <td className="px-3 py-4 font-semibold text-gray-900 ">
//                         {destinatario.nombre && destinatario.nombre}
//                         </td>
//                     </tr>
//                     <tr className="bg-white text-[14px] border-b   hover:bg-gray-50 " >
//                         <td className="px-3 py-4 font-semibold text-gray-900 ">
//                         Cuenta destinatario:
//                         </td>
//                         <td className="px-3 py-4 font-semibold text-gray-900 ">
//                         {destinatario.tarjeta && destinatario.tarjeta}
//                         </td>
//                     </tr>
//                     <tr className="bg-white text-[14px] border-b   hover:bg-gray-50 " >

//                         <td className="px-3 py-4 font-semibold text-gray-900 ">
//                         Divisa:
//                         </td>
//                         <td className="px-3 py-4 font-semibold text-gray-900 ">
//                          BOB
//                         </td>
//                     </tr>
//                     <tr className="bg-white text-[14px] border-b   hover:bg-gray-50 " >

//                         <td className="px-3 py-4 font-semibold text-gray-900 ">
//                         Importe: 
//                         </td>
//                         <td className="px-3 py-4 font-semibold text-gray-900 ">
//                           {transferencia}
//                         </td>
//                     </tr>
//                     <tr className="bg-white text-[14px] border-b   hover:bg-gray-50 " >

//                         <td className="px-3 py-4 font-semibold text-gray-900 ">
//                         Fecha: 
//                         </td>

//                         <td className="px-3 py-4 font-semibold text-gray-900 ">
//                         {fecha}
//                         </td>
//                     </tr>
                    
//                     <tr className="bg-white text-[14px] border-b   hover:bg-gray-50 " >

//                         <td className="px-3 py-4 font-semibold text-gray-900 ">
//                         Estado:
//                         </td>
//                         <td className="px-3 py-4 font-semibold text-gray-900 ">
//                         En verficación
//                         </td>
//                      </tr>
//                     <tr className="bg-white text-[14px] border-b   hover:bg-gray-50 " >

//                         <td className="px-3 py-4 font-semibold text-gray-900 ">
//                         Operacion:
//                         </td>
//                         <td className="px-3 py-4 font-semibold text-gray-900 ">
//                         Envio
//                         </td>
//                     </tr>


//                 </tbody>
           
//             </table>


//              <InvoicePDF />

//         </main >


//     )
// }

// export default WithAuth(Home)