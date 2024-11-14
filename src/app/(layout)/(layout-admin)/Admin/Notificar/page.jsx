'use client'
// import style from '../styles/Loader.module.css' 
import { useUser } from '@/context/Context.js'
import Button from '@/components/Button'
import TextEditor from '@/components/TextEditor'
import Loader from '@/components/Loader'
import { useState, useEffect } from 'react'
import { getSpecificData, writeUserData } from '@/firebase/database'
import { useSearchParams } from 'next/navigation'
import { generateUUID } from '@/utils/UUIDgenerator'

export default function Modal({ children, theme, button, funcion, alert }) {
    const { nav, setNav, user, userDB, setUserProfile, state, setState, modal, setUserSuccess, setModal } = useUser()

    const [textEditor, setTextEditor] = useState("Redactar...")
    const [cliente, setCliente] = useState(undefined)
    const searchParams = useSearchParams()
    const pathname = searchParams.get('uuid')
    function handlerTextEditorOnChange(content, delta, source, editor) {
        setTextEditor(editor.getHTML())
    }

    function save(route) {
        const uuid = generateUUID()

        function callback() {
            setModal('')
        }
        setModal('Guardando...')
        writeUserData(`${route}/${uuid}`, {nota: textEditor, notificaciones: true, uuid }, setUserSuccess, callback)
    }
    useEffect(() => {
        getSpecificData(`/users/${pathname}`, setCliente)
    }, [pathname])

    return (<div className={`h-full w-full flex flex-col justify-center items-center  p-4 overflow-x-hidden overflow-y-auto `}>
        {modal === 'Guardando...' && <Loader> {modal} </Loader>}
        <div className={`relative bg-white max-w-[1000px] w-full  rounded-lg shadow p-5 `}>
            <h3 className='text-center py-10'>Notificaciòn</h3>
            <p>Para: {cliente && cliente !== undefined && cliente.nombre}</p>
            <div className=" text-center">
                <div>
                    <TextEditor setValue={handlerTextEditorOnChange} value={textEditor ? textEditor : 'nada'} edit={true} />
                </div>
                <br />
                <Button theme="Primary" click={() => save('/notificaciones')}>Enviar</Button>
            </div>
        </div>
    </div>
    )
}







