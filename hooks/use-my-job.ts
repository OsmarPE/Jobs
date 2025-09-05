import MyJobContext from "@/context/MyJobContext";
import { useContext } from "react";


export default function useMyJobTab() {
    const context = useContext(MyJobContext);
    if (!context) {
        throw new Error("useMyJobTab must be used within a MyJobProvider");
    }
    return context;
}