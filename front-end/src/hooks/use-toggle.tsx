//creation du hook toggle qui repond true ou false
import { useState } from "react"

interface Props{
    initial?: boolean;
}

export const useToggle =({initial = false}:Props ={})=>{
    const [value, setValue] = useState <boolean>(initial) //permet de garder la valeur de base defini(true ou false ) ou de preciser la valeur souhaitée
    const toggle=()=>{
        setValue(!value)
    }
    return{
        toggle,
        value,
        setValue
    }
}