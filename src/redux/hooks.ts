import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { AppDispatch, AppState } from './store'


export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<AppState>()




type debonuncedProps={
    searchQuery:string,
    delay:number
}
// useDebonunced hooks use in the project 
export const useDebonunced=({searchQuery,delay}:debonuncedProps)=>{
     const [debonuncedValue,setDebonuncedValue]=useState<string>(searchQuery)
     useEffect(()=>{
      const hander=setTimeout(()=>{
        setDebonuncedValue(searchQuery)
      },delay)
    return ()=>  clearTimeout(hander)
     },[searchQuery,delay])
    return debonuncedValue
}