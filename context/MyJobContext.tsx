'use client'
import { createContext, useState } from "react";

interface MyJobContextType {
    index: number;
    setIndex: (index: number) => void;
}


export const MyJobContext = createContext<MyJobContextType>({
    index: 0,
    setIndex: (index: number) => {},
});

export default MyJobContext;

export const MyJobProvider = ({ children }: { children: React.ReactNode }) => {
    
    const [index, setIndex] = useState(0);


    return (
        <MyJobContext.Provider value={{ index, setIndex }}>
            {children}
        </MyJobContext.Provider>
    )
}
