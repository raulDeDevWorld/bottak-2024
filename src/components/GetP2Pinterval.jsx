'use client'

import { useUser } from '@/context/Context'



import React, { useState, useEffect } from "react";

function ControlButtons(props) {
  const StartButton = (
    <button className="bg-green-500 text-center w-[150px] py-1 rounded-full"
      onClick={props.handleStart}>
      Start
    </button>
  );
  const ActiveButtons = (
    <button className="bg-red-500 text-center w-[150px] py-1 rounded-full"
      onClick={props.handleReset}>
      Stop
    </button>
  );

  return (
    <div className="Control-Buttons">
      <div>{props.active ? ActiveButtons : StartButton}</div>
    </div>
  );
}





function StopWatch() {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  const [count, setCount] = useState(0);

  const { setTime_stamp, user, userDB, setUserProfile, modal, setModal, users, setUsers, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, divisas, setDivisas, item, setItem, exchange, setExchange, } = useUser()

  const Timer = () => {

    useEffect(() => {
      //Implementing the setInterval method
      const interval = setInterval(() => {
        setCount(count + 1);
      }, 1000);

      //Clearing the interval
      return () => clearInterval(interval);
    }, [count]);

    return (
      <div
        style={{
          display: "flexbox",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <h1 className="text-green-500">
          Cronometro de Actualizacion
        </h1>
        {/* <h3>
          React Example for using setInterval method
        </h3> */}
        <h1 className="text-green-500">{count}</h1>
      </div>
    );
  };


  async function getAllExchage(i) {
    try {

      const responseData = await fetch('https://f05lpixnh8.execute-api.us-east-1.amazonaws.com/Version_1')
      console.log(responseData)
                  setCount(0)

        } catch (error) {
      console.error(error);
                  setCount(0)

    }
  }


  React.useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {

        let dateDB = new Date();
        let options = { timeZone: 'America/La_Paz' };
        let date = new Date(dateDB.toLocaleString('en-US', options))

        setTime_stamp(date.getTime())
        setTime(time * 1 + 60000);
        getAllExchage()

      }, 60000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  return (
    <div className="w-full flex fixed top-[70px] left-0 px-5 pb-3 z-40 bg-black">
      {isActive && <Timer time={time} />}
      <ControlButtons
        active={isActive}
        isPaused={isPaused}
        handleStart={handleStart}
        handlePauseResume={handlePauseResume}
        handleReset={handleReset}
      />
    </div>
  );
}

export default StopWatch;











// import React, { useState, useEffect } from "react";

