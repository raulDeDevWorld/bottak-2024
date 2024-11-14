'use client'; 
import style from '@/app/(layout)/style.module.css'

export default function Button({ theme, styled, click, children, type}) {


    switch (theme) {
        case 'Transparent':
            return <button
                type={type? type: "submit"}
                className=" bg-transparent border-[1px] border-gray-50 text-white  hover:bg-transparent hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  rounded-[10px] text-[14px] w-[100%] sm:max-w-[380px] px-5 py-2 text-center"
 
                onClick={click}
            >
                {children}
            </button>
            break
        case 'Primary':
            return <button
                type={type? type: "submit"}

                className={`text-black inline-block hover:bg-gray-950 border-[1px] border-gray-50  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  rounded-full text-[14px]  w-[100%] sm:max-w-[380px] px-5 py-3 text-center cursor-pointer ${style.buttonPrimary}`} 

                // className="text-white bg-violet-700 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[14px] w-full sm:w-auto px-5 py-2.5 text-center 
                // dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={click}
            >
                {children}
            </button>
            break
        case 'Secondary':
            return <button
                type={type? type: "submit"}
                className="nhn text-white bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  rounded-[10px] text-[14px] w-full sm:w-[250px] px-5 py-2 text-center"
                // className="text-white bg-violet-700 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[14px] w-full sm:w-auto px-5 py-2.5 text-center 
                // dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={click}
            >
                {children}
            </button>

        case 'Success':
            return <button
                type={type? type: "submit"}

                className="text-white border-[1px] border-green-500 bg-[#32CD32] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[10px] text-[14px] w-full min-w-[120px]  sm:max-w-[380px] px-5 py-2 text-center"

                // className="text-white bg-violet-700 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[14px] w-full sm:w-auto px-5 py-2.5 text-center 
                // dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={click}
            >
                {children}
            </button>

            case 'Disable':
                return <button
                    type={type? type: "submit"}
                    className={`bg-transparent text-gray-400 border-[1px] border-gray-400 font-medium  rounded-[10px] text-[14px]  w-full min-w-[120px]  sm:max-w-[380px] px-5 py-2 text-center cursor-pointer `} 
                    // className="text-white bg-violet-700 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[14px] w-full sm:w-auto px-5 py-2.5 text-center 
                    // dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={click}
                >
                    {children}
                </button>
            case 'Danger':
                return <button
                    type={type? type: "submit"}
                    className="text-white bg-[red] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  rounded-[10px] text-[14px]  min-w-[120px] w-full sm:max-w-[380px]  px-5 py-2 text-center"

                    // className="text-white bg-violet-700 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[14px] w-full sm:w-auto px-5 py-2.5 text-center 
                    // dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={click}
                >
                    {children}
                </button>
        default:
           
    }
}