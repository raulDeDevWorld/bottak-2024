'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '@/context/Context'
import style from '@/app/(layout)/style.module.css'


export default function Button({ mobile }) {


    const { nav, setNav, user, userDB, setUserProfile, state,setSelect2, setState, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, modal, setModal, transferencia } = useUser()
  const router = useRouter()

    const pathname = usePathname()


    function handlerMode(e, data) {
        setState(data)
        setSelect2('USDT')
        router.push(data)
        console.log('click')
      }


    return (
        <div className={`w-full flex justify-center items-end z-20 ${style.translate} ${mobile ? 'lg:hidden' : 'hidden lg:flex'}`}>
            <div className='flex justify-between items-center pr-[40px] '>
                <div className={`flex justify-between items-center pb-2 cursor-pointer ${pathname === '/' ? 'border-b-2 border-gray-300' : 'border-b-2 border-transparent'}`} onClick={(e) => handlerMode(e, '/')} >
                    <svg width="30" height="30" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">

                        <path d="M22.6157 11.3859C22.3 9.50498 21.4395 7.75794 20.1408 6.36113C18.8422 4.96432 17.1623 3.97907 15.3093 3.52737C13.4563 3.07568 11.5115 3.17738 9.71576 3.81988C7.91997 4.46238 6.35207 5.61746 5.20617 7.14211C4.06027 8.66676 3.38671 10.494 3.26887 12.3976C3.15104 14.3012 3.59411 16.1976 4.54323 17.8519C5.49235 19.5063 6.90584 20.8459 8.60867 21.705C10.3115 22.564 12.2289 22.9048 14.1235 22.6851M3.90005 9.75009H22.1M3.90005 16.2501H14.6251" stroke="white" strokeidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12.4584 3.25C10.6333 6.17458 9.66577 9.55269 9.66577 13C9.66577 16.4473 10.6333 19.8254 12.4584 22.75M13.5417 3.25C15.3715 6.18047 16.3394 9.56686 16.3345 13.0217M22.75 16.25H20.0417C19.6107 16.25 19.1974 16.4212 18.8927 16.726C18.5879 17.0307 18.4167 17.444 18.4167 17.875C18.4167 18.306 18.5879 18.7193 18.8927 19.024C19.1974 19.3288 19.6107 19.5 20.0417 19.5H21.125C21.556 19.5 21.9694 19.6712 22.2741 19.976C22.5788 20.2807 22.75 20.694 22.75 21.125C22.75 21.556 22.5788 21.9693 22.2741 22.274C21.9694 22.5788 21.556 22.75 21.125 22.75H18.4167M20.5834 22.75V23.8333M20.5834 15.1667V16.25" stroke="white" strokeidth="2" strokeLinecap="round" strokeLinejoin="round" />

                    </svg>
                    <span className='text-white text-[14px] pl-5'>Remesas</span>
                </div>
            </div>
            <div className='flex  justify-between items-center border-l border-gray-50 pl-[40px]'>
                <div className={`flex justify-between items-center cursor-pointer ${pathname === '/Cambios' ? 'border-b-2 border-gray-300' : 'border-b-2 border-transparent'} pb-2`} onClick={(e) => handlerMode(e, 'Cambios')}>
                    <svg width="26" height="30" viewBox="0 0 22 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.9168 1.5V2.15625C12.1612 2.23125 12.3981 2.325 12.6119 2.41875C13.1008 2.63125 13.3911 3.45625 13.2613 4.25625C13.1314 5.05625 12.6272 5.53125 12.1383 5.31875C11.722 5.1375 11.3324 5.0125 10.9848 5.00625C10.706 5 10.4234 5.1125 10.2439 5.28125C10.1637 5.3625 10.1255 5.43125 10.1102 5.46875C10.0987 5.5 10.0834 5.54375 10.0834 5.64375V5.68125C10.0911 5.69375 10.1178 5.75625 10.2095 5.84375C10.431 6.0625 10.7595 6.23125 11.256 6.475L11.2904 6.49375C11.7144 6.7 12.2796 6.98125 12.738 7.45C13.2613 7.9875 13.7349 8.88125 13.7463 10.2563C13.7578 11.6625 13.3109 12.6875 12.7265 13.2875C12.4706 13.5438 12.1956 13.725 11.913 13.8375V14.5C11.913 15.3313 11.5043 16 10.9963 16C10.4883 16 10.0796 15.3313 10.0796 14.5V13.7875C9.71677 13.6438 9.38448 13.4563 9.10184 13.3C9.02163 13.2563 8.94524 13.2125 8.87267 13.175C8.39141 12.9125 8.13169 12.0625 8.2921 11.275C8.45252 10.4875 8.97197 10.0625 9.45323 10.325C9.55253 10.3812 9.6442 10.4312 9.73205 10.4812C10.2515 10.7687 10.6258 10.975 11.0269 11C11.3324 11.0188 11.6036 10.9 11.7602 10.7437C11.8328 10.6687 11.8671 10.6062 11.8824 10.5625C11.8977 10.525 11.9168 10.45 11.913 10.3062V10.2937C11.913 10.2312 11.913 10.1625 11.7602 10.0063C11.5425 9.78125 11.214 9.60625 10.7251 9.3625L10.6525 9.325C10.24 9.125 9.69768 8.85625 9.26225 8.425C8.74662 7.91875 8.25009 7.05 8.24627 5.66875C8.24245 4.2375 8.73898 3.25625 9.30427 2.70625C9.54872 2.46875 9.81226 2.30625 10.0758 2.19375V1.5C10.0758 0.66875 10.4845 0 10.9925 0C11.5005 0 11.9092 0.66875 11.9092 1.5H11.9168ZM21.7023 21.0187C22.2027 22.1312 22.0575 23.6938 21.3777 24.5125L16.5422 30.3438C15.6484 31.4188 14.5713 32 13.4599 32H1.22224C0.546186 32 0 31.1063 0 30V26C0 24.8937 0.546186 24 1.22224 24H2.62781L4.34276 21.75C5.20978 20.6125 6.28687 20 7.39834 20H13.4446C14.1206 20 14.6668 20.8937 14.6668 22C14.6668 23.1063 14.1206 24 13.4446 24H10.389C10.0529 24 9.77788 24.45 9.77788 25C9.77788 25.55 10.0529 26 10.389 26H14.9953L19.5672 20.4875C20.2471 19.6687 21.202 19.9062 21.7023 21.0187Z" fill="white" />
                    </svg>
                    <span className='text-white text-[14px] pl-5'>Cambios</span>
                </div>
            </div>
        </div>
    )
}






