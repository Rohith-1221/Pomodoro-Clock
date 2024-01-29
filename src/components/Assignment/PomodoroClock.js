import React, { useEffect, useState } from 'react';
import alarm from './alarm.wav'
const PomodoroClock= () => {

    const [time,setTime] = useState(1)
    const [isActive,setIsActive] = useState(false)
    const[userInput,setUserInput] = useState('')
    const sound = new Audio(alarm)

    const updateTime = ()=>{
        if(time>0 && isActive){
            setTime((prev)=>prev-1)
        }
    }

    const extractMinutes = ()=>{
        const currentTime = time
        const CurrentMinutes = Math.floor(currentTime/60)
        return CurrentMinutes
    }

    const extractSeconds = ()=>{
        const currentTime = time
        const CurrentSeconds = currentTime%60
        return CurrentSeconds
    }

    const onchangeHandler = (e)=>{
        setIsActive(false)
        setUserInput(e.target.value)
     
    }
    

    const customTimeHandler = ()=>{
        const value = parseInt(userInput)
        setTime(value)
    }
    useEffect(()=>{
       const intervalId =  setInterval(updateTime,1000)
        if(time===0){
            sound.play()
            setIsActive(false)
            setTime(10)
        }
       return ()=>{
        clearInterval(intervalId)
       }

    },[time,isActive])
  return (
    <div className='pomodoroClock'>
        <h1>POMODORO CLOCK</h1>
        <h1 className='view'>{`${extractMinutes()}:${extractSeconds()}`}</h1>
        <button onClick={()=>setIsActive(true)} className='btn'>Start</button>
        <button onClick={()=>setIsActive(false)} className='btn'>Pause</button><br/><br/>
        <input onChange={onchangeHandler} name='userInput'  type='number' value={userInput} className='inputvalue'/>
        <button onClick={customTimeHandler} className='btn1'>setCustomTime</button>
    </div>
  );
}

export default PomodoroClock;