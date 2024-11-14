'use client'

import React, { useState, useMemo, useContext } from 'react'

const UserContext = React.createContext()

export function UserProvider({ children }) {

	const [user, setUser] = useState(undefined)
	const [users, setUsers] = useState(undefined)
	const [userDB, setUserDB] = useState(undefined)     
	const [routeCountry, setRouteCountry] = useState(null)

	const [time_stamp, setTime_stamp] = useState(undefined)
	const [divisas, setDivisas] = useState(undefined)
	const [envios, setEnvios] = useState(undefined)
	const [exchange, setExchange] = useState(undefined)
	const [destinatario, setDestinatario] = useState(undefined)
	const [destinatarios, setDestinatarios] = useState(undefined)
	const [wallets, setWallets] = useState(undefined)

	const [enviosDB, setEnviosDB] = useState(undefined)
	const [cambiosDB, setCambiosDB] = useState(undefined)

	const [success, setSuccess] = useState(null)
	const [state, setState] = useState('Remesas')
	const [nav, setNav] = useState(false)
	const [userNav, setUserNav] = useState(false)
	const [modal, setModal] = useState('')
	const [currency, setCurrency] = useState("BOB");
	const [select, setSelect] = useState('USDT')
	const [select2, setSelect2] = useState('USDT')
	const [select3, setSelect3] = useState('USA')
	const [countries, setCountries] = useState("BOL");
	const [tarifas, setTarifas] = useState(undefined);

	const [isSelect, setIsSelect] = useState(false)
	const [isSelect2, setIsSelect2] = useState(false)
	const [isSelect3, setIsSelect3] = useState(false)
	const [isSelect4, setIsSelect4] = useState(false)
	const [isSelect5, setIsSelect5] = useState(false)

	const [notificaciones, setNotificaciones] = useState(false)
	const [webScann, setWebScann] = useState(null)
	const [filter, setFilter] = useState(null)
	const [filterQR, setFilterQR] = useState(null)
    const [transactionDB, setTransactionDB] = useState(undefined)
	const [navItem, setNavItem] = useState(undefined)

	const [transferencia, setTransferencia] = useState('')
	const [comision, setComision] = useState('')
	const [item, setItem] = useState(null)
	const [qr, setQr,] = useState(null)
	const [QRurl, setQRurl,] = useState(null)

	const [fecha, setFecha] = useState(null)

	const [image1, setImage1] = useState(null)
	const [image2, setImage2] = useState(null)
	const [image3, setImage3] = useState(null)

	const webcamRef1 = React.useRef(null);
	const webcamRef2 = React.useRef(null);
	const webcamRef3 = React.useRef(null);      


	const setUserProfile = (data) => {
		setUser(data)
	}

	const setUserData = (data) => {
		setUserDB(data)
	}

	const setUserSuccess = (data) => {

		if (success === null) {
			setSuccess(data)
			const timer = setTimeout(() => {
				setSuccess(null)
				console.log('timer')
				return clearTimeout(timer)
			}, 6000)
		
		}

	}

	const value = useMemo(() => {
		return ({
			user,
			userDB,
			success,
			state,
			nav,
			modal,
			transferencia,
			currency,
			select,
			users,
			destinatario,
			image1, setImage1, image2, setImage2, image3, setImage3,
			webcamRef1, item, setItem,
			webcamRef2,
			webcamRef3,
			tarifas, setTarifas,
			time_stamp, setTime_stamp,
			notificaciones, setNotificaciones,
			navItem, setNavItem,
			transactionDB, setTransactionDB,
			comision, setComision,
			userNav, setUserNav,
			exchange, setExchange,
			webScann, setWebScann,
			filter, setFilter,
			filterQR, setFilterQR,
			envios, setEnvios,
			divisas, setDivisas,
			select2, setSelect2,
			isSelect, setIsSelect,
			isSelect2, setIsSelect2,
			isSelect3, setIsSelect3,
			isSelect4, setIsSelect4,
			isSelect5, setIsSelect5,
			fecha, setFecha, qr, setQr, QRurl, 
			select3, setSelect3,
			countries, setCountries,
			destinatarios, setDestinatarios,
			enviosDB, setEnviosDB,
			cambiosDB, setCambiosDB,
			setQRurl, 
			routeCountry, setRouteCountry,
			wallets, setWallets,
			setDestinatario,
			setUsers,
			setSelect,
			setCurrency,
			setTransferencia,
			setModal,
			setNav,
			setState,
			setUserProfile,
			setUserData,
			setUserSuccess

		})

	}, [user, userDB, success, state, nav, userNav, modal, transferencia, currency, select, select2, select3, isSelect, isSelect2, isSelect3, isSelect4, isSelect5, users, destinatario, image1, image2, image3, item, webcamRef1,
		webcamRef2,
		webcamRef3,
		fecha, qr, QRurl, divisas, envios,
		webScann,
		filter, tarifas,
		filterQR, exchange, countries, destinatarios, transactionDB, navItem, comision,wallets,
		enviosDB,
		cambiosDB,time_stamp,
		notificaciones, routeCountry])


	return (
		<UserContext.Provider value={value} >
			{children}
		</UserContext.Provider>
	)
}

export function useUser() {
	const context = useContext(UserContext)
	if (!context) {
		throw new Error('error')
	}
	return context
}
