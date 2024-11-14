'use client'
import style from './Intro.module.css'
import { useEffect, useState } from 'react'
export default function Loader() {

    const [visible, setVisible] = useState(true)

    function off() {
        if (visible === true) {
            let timer = setTimeout(() => {
                setVisible(false)
            }, 6000)
        }
        return () => {
            clearTimeout(timer)
        };
    }
    
    useEffect(() => {
        off()
    }, []);
    
    return (
        visible && <div className={`fixed top-0 left-0 w-screen h-screen flex flex-col justify-center  items-center z-50 ${style.animation}`}>
            <div className={`relative h-[100px] w-[100px] inline-block`}>
                <img src='/favicon.png' className={`h-[100px] w-[100px] rounded-full ${style.animation1}`} />
                </div>
                <br />
                <div className={`relative flex items-center space-x-2 `}>
                    <span className={`text-[20px] font-medium z-40 ${style.animation2}`}>Bottak</span>
                    {/* <span className={`inline-block  absolute bg-transparent h-[10px] w-[10px] ${style.animation3}`}>   </span> */}
                </div>
        </div>
    )
}