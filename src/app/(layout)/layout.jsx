'use client'
import { useUser } from '@/context/Context'
import Navbar from '@/components/Navbar'
import Modal from '@/components/Modal'
import ModalINFO from '@/components/ModalINFO'
import { onAuth, handleSignOut } from '@/firebase/utils'
import { useRouter } from 'next/navigation';
import Particles from '@/components/Particles'
import { useEffect } from 'react'
import { getSpecificData, getSpecificDataEq, listenToSpecificDataEq } from '@/firebase/database'

export default function RootLayout({ children }) {

    const { user, userDB, setUserProfile, modal, nav, setNav, userNav, setTarifas, setNavItem, setWallets, setUserData, divisas, setDivisas, setCountries, setEnviosDB, setCambiosDB, setNotificaciones, setIsSelect, setIsSelect2, setIsSelect3, setIsSelect4, setIsSelect5 } = useUser()
    const router = useRouter()


    function mainHandler() {
        setIsSelect(false)
        setIsSelect2(false)
        setIsSelect3(false)
        setIsSelect4(false)
        setIsSelect5(false)
        setNavItem('')
        setNotificaciones(false)

    }
    const signOutHandler = () => {
        handleSignOut()
        setUserProfile(null)
        setUserData(null)
        setNav(false)
        router.push('/')
    }
    function soporte(e) {
        e.preventDefault()
        window.open('https://api.whatsapp.com/send?phone=+59177455743&text=Hola%20BOTTAK,%20necesito%20hacer%20una%20transacci%C3%B3n...', '_blank')
    }

    useEffect(() => {
        onAuth(setUserProfile, setUserData)
        getSpecificData('divisas', setDivisas)
        getSpecificData(`/currencies/`, setCountries)
        getSpecificData(`/wallets/`, setWallets)
        getSpecificData(`/tarifas/`, setTarifas)
    }, [])
    useEffect(() => {
        user && userDB === undefined && getSpecificData(`/users/${user.uid}`, setUserData)
        user && user !== undefined && listenToSpecificDataEq(`/envios/`, 'user uuid', user.uid, setEnviosDB)
        user && user !== undefined && listenToSpecificDataEq(`/cambios/`, 'user uuid', user.uid, setCambiosDB)
    }, [user, userDB])
    
    console.log(userDB)
    return (
        user !== undefined && userDB !== undefined && divisas !== undefined && <>
            {userDB && userDB.bloqueado === true ? <Modal funcion={soporte} cancel={signOutHandler} cancelText="Cerrar sesión" successText="Soporte">
                Esta cuenta esta bloqueada, <br />por favor comuniquese con soporte.<br />
            </Modal> : ''
            }
            {modal === 'INFO: No habilitado' && userDB && userDB.habilitado === false ? <ModalINFO cancel={signOutHandler} close={true} theme='Success' cancelText="Cerrar sesión">
                Felicidades su cuenta esta en VERFICACIÓN, le rogamos paciencia hasta que nuestros agentes validen sus datos.<br />
            </ModalINFO> : ''
            }

            {modal === 'INFO: Tu pais no puede hacer envio de divisa, solo recepeciones, lo sentimos...'  ? <ModalINFO cancel={signOutHandler} close={true} theme='Danger' cancelText="Cerrar sesión">
                {modal}<br />
            </ModalINFO> : ''
            }

            {modal === 'INFO: Tu pais no esta habilitado para transaccionar, lo sentimos...'? <ModalINFO cancel={signOutHandler} close={true} theme='Danger' cancelText="Cerrar sesión">
                {modal}<br />
            </ModalINFO> : ''
            }

            <Navbar />
            <div className={`relative  w-screen px-[20px]  pt-[80px] pb-[30px] md:pb-0 flex items-center min-h-full   ${nav ? 'left-[100vw] sm:left-[250px]' : 'left-0'} ${userNav ? 'top-[70px]' : 'top-0'}`} style={{ transition: 'all .02s linear' }} onClick={mainHandler}>
                {children}
            </div>
            <Particles />
        </>
    )
}

