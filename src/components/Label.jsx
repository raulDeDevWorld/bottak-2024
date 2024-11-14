'use client';

export default function Button({ styled, children }) {
    return (
        <label
            className=" bg-[#FFF500] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-[14px] p-2 text-black                                                                                                                     w-[100%] max-w-[350px] px-5 py-3 text-center"
        // className="text-white bg-violet-700 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[14px] w-full sm:w-auto px-5 py-2.5 text-center 
        // dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
            {children}
        </label>
    )
}