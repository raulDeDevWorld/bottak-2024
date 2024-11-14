'use client';

export default function Button({ styled, name, change }) {
    return (
        <input
            id={name}
            type="checkbox"
            name={name}
            onChange={change}
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300  dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" 
            />
    )
}















// 'use client'
// import { useUser } from '@/context/Context'
// import { onAuth, signInWithEmail } from '@/firebase/utils'
// import { getSpecificData } from '@/firebase/database'

// import { useEffect } from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
// import Button from '@/components/Button'
// import Input from '@/components/Input'
// import Msg from '@/components/Msg'
// import NavInit from '@/components/NavInit'

// import Error from '@/components/Error'
// import SelectWithFlag from '@/components/SelectWithFlag'
// import { useRouter } from 'next/navigation';
// import style from '@/app/(layout)/style.module.css'

// export default function Home() {
//   const { user, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, transferencia } = useUser()
//   const router = useRouter()

//   const signInHandler = async (e) => {
//     e.preventDefault()
//     let email = e.target[0].value
//     let password = e.target[1].value

//     if (email.length == 0 || password.length == 0) {
//       return setUserSuccess('Complete')
//     }
//     const res = await signInWithEmail(email, password, setUserProfile)

//     if (res == null) {
//       setUserSuccess('Error')
//       return
//     }

//     if (res && (userDB == null || userDB == undefined)) {
//       const data = await getSpecificData(`/users/${res.uid}`)
//       data == null ? router.push('/Register') : router.push('/Register/Destinatario')
//     }
//     console.log()
//   }

//   console.log(user)

//   useEffect(() => {
//     // console.log(user)
//     // if (user) {
//     //   transferencia ? router.push('/') : router.push('/Register')
//     // }
//   }, [user]);

//   return (


//     <main className='relative w-full h-full flex flex-col items-center justify-center' >

//       <div className={`lg:grid lg:grid-cols-2 w-full lg:w-full lg:px-[5vw] lg:h-screen flex flex-col justify-between h-[750px] pb-5`} style={{ gridTemplateColumns: '40% 60%' }}>
//         <div className={`flex flex-col justify-center items-center h-[300px] lg:h-auto  `}>
//           <img src="/logo.svg" className={`h-[200px] w-[200px] ${style.logo}`} alt="User" />
//           <h1 className='text-[#FFF500] text-[14px] font-light'>Bottak</h1>
//           <h3 className='text-white text-[14px] font-light'>Tus transferencias mas faciles y seguras</h3>
//           <div className='py-12 hidden lg:block'>
//             <NavInit mobile={false} />
//             <br /> <br />
//             <p className='text-white underline text-[14px] font-light text-center'>Politicas De Servicio</p>
//           </div>
//         </div>
//         <div className='lg:h-full lg:py-20 w-full flex flex-col justify-between items-center h-[350px]'>
//           <form className="relative w-full max-w-[500px] h-full flex flex-col justify-between" onSubmit={signInHandler} >
//             <h5 className="text-[24px] font-medium text-white text-center">Iniciar Sesión</h5>
//             <div>
//               <label htmlFor="email" className="block mb-2 text-[14px] font-light text-left  text-white">Email</label>
//               <Input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-[14px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 " placeholder="name@company.com" required />
//             </div>
//             <div>
//               <label htmlFor="password" className="block mb-2  text-left  text-[14px] font-light text-white">Contraseña</label>
//               <Input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-[14px] font-light  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 " required />
//             </div>
//             <div className="flex items-start">
//               <a href="#" className="ml-auto text-green-400 text-[14px] font-light hover:underline">Olvidaste tu contraseña?</a>
//             </div>
//             <div className="w-full flex justify-center">
//               <Button type="submit" theme={"Primary"}>Iniciar Sesión</Button>
//             </div>
//             <div className="text-[14px] font-light  text-gray-500 dark:text-gray-300 text-center">No tienes una cuenta? <Link href="/SignUp" className="text-green-400 text-[14px] font-light  hover:underline">Registrate</Link ></div>
//           </form>
//         </div>
//         <p className='text-white underline text-[14px] font-light text-center lg:hidden'>Politicas De Servicio</p>
//         {/* {success == false && <Error>ERROR: verifique e intente nuevamente</Error>}
//         {success == 'complete' && <Error>Llene todo el formulario</Error>} */}
//       </div>

//     </main>
//   )}





