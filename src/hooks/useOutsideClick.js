import { useEffect, useRef } from "react"


export function useOutsideClick(close, capturingPhase){
    const modalRef = useRef()

    useEffect(function(){
      function handleClick(e){
        console.log("Click from outside click")
        if(modalRef.current && !modalRef.current.contains(e.target))
          close()
      }


      document.addEventListener('click', handleClick, capturingPhase)

      return () => document.removeEventListener('click', handleClick)
    },[close])

    return {modalRef}
}