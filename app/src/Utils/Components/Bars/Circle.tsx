
import type { FC } from "react";
import { useRef, useEffect } from "react";


type Props = {
    value?:number,
    style?:string,
    backgroundColorClass?:string,
    mainColorClass?:string
}

const Circle : FC<Props> = ({value = 100, backgroundColorClass = "bg-zinc-950", mainColorClass = "bg-green-500", style = ""}) => {

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const angle = (value / 100) * 360;
    if(ref.current) {
        ref.current.style.mask = `conic-gradient(#000 ${angle}deg, transparent ${angle}deg)`;
        ref.current.style.webkitMask = `conic-gradient(#000 ${angle}deg, transparent ${angle}deg)`;
    }
  }, [value]);

  return (
    <div className={`relative w-40 h-40 ${style}`}>
      <div className={`absolute inset-0 rounded-full ${backgroundColorClass}`}></div>
      <div
        ref={ref}
        className={`absolute inset-0 rounded-full scale-105 ${mainColorClass} transition-all duration-150 ease-in-out`}
        style={{
          mask: "conic-gradient(#000 0deg, transparent 0deg)",
          WebkitMask: "conic-gradient(#000 0deg, transparent 0deg)",
        }}
      ></div>
    </div>
  );
}


export default Circle;