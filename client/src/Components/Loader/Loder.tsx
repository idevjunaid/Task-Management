import React from 'react'
import './Loader.scss'

const Loder:React.FC = ():JSX.Element => {
  return (
    <div className="main h-[100vh] w-100 bg-black grid place-content-center">
            <svg viewBox="0 0 300 150" width={200}><path fill="none" stroke="#FFFFFF" strokeWidth="24" strokeLinecap="round" strokeDasharray="300 385" strokeDashoffset="0" d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"><animate attributeName="stroke-dashoffset" calcMode="spline" dur="1.8" begin="0s"  values="685;-685" keySplines="0 0 1 1" repeatCount="indefinite"></animate></path></svg>

        </div>
  )
}

export default Loder