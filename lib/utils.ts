import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeAgoInWords(hours: number): string {
        if (hours > 24) {
            const days = Math.floor(hours / 24);
            return `${days} día${days > 1 ? 's' : ''}`;
        }

        if (hours < 1) {
            const minutes = Math.floor(60 * hours);
            return `${minutes} minuto${minutes > 1 ? 's' : ''}`;
        }

        return `${hours} hora${hours > 1 ? 's' : ''}`;
    }
