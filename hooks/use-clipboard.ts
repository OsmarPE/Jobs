import { useCallback, useState } from "react";

type Props =  {time?: number}
export const useClipboard = (props?: Props) => {
    const time = props?.time ?? 3000;
    const [coping, setCoping] = useState(false);

    const copyToClipboard = useCallback(async (text: string) => {
        if (!navigator.clipboard) {
            console.error('Clipboard API not supported');
            return;
        }
        setCoping(true);

        try {
            await navigator.clipboard.writeText(text);
            setTimeout(() => setCoping(false), time);
        } catch (error) {
            console.error('Failed to copy text:', error);
        }
    }, [time]);

    return { coping, copyToClipboard };
};
