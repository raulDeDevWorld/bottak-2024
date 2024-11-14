'use client';

import style from './Ping.module.css'


export default function isSelect3({ arr, name, click, defaul, uuid }) {

    return (
        
        <div class="absolute top-[0px] right-[0px] w-[15px] h-[15px] flex justify-center items-center">
            <div class={style.container}></div>
            <div class={style.ping}></div>
        </div>

    )
}
