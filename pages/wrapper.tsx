import { ReactNode } from "react"

type Papierki = {
    title: string
    children: ReactNode
}

export function Papierek({ title, children}:
    Papierki){
        return <>
        <h2 style={{
            textAlign: "center",
            margin: 0,
            marginBottom: "2rem",
            marginTop: "2rem",
            borderStyle: "solid",
        }}>{title}</h2>
        <div style={{
            gap: "1rem .5rem",
            background: "grey",
            textAlign: "center",
            width:"auto",
            marginTop:"2rem",
            marginBottom:"2rem"
        }}>{children}</div>
        
        </>
    }