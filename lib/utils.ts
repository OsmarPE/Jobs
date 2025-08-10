import { clsx, type ClassValue } from "clsx"
import { verify } from "crypto";
import { twMerge } from "tailwind-merge"
import jwt from 'jsonwebtoken';
// import { cookies } from "next/headers";


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


export function generateToken(length = 32) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}


export function getCode(length: number = 6) {
    let code = ''; 
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
   
    for (let i = 0; i < length; i++) {
        code += numbers[Math.floor(Math.random() * numbers.length)];
    }
   
    return code;
}
   
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}


export const formarPrice = (price: number) => {
  return price.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export const getUserByToken = async() => {
    // const cookie = await cookies();
    // const token = cookie.get('token');
    // if (!token) return null
    // const user = jwt.verify(token.value, process.env.SECRET_KEY!);
    return null;
}

export const formatPhone = (phone: string) => {

  const regex = /^\+?([0-9]{10,12})/

  const isValidPhone = regex.test(phone);
  
  if (!isValidPhone) return phone;

  if (phone.startsWith('+')){
    const separateNumber = phone.replace(/^(\+\d{2})(\d{10})$/, "$1 $2");
    const onlyNumber = separateNumber.split(' ')[1]
    const newPhone = onlyNumber?.replace(/^(\d{3})(\d{3})(\d{4})$/, "$1-$2-$3");
    return newPhone
  }
  const cellPhone = phone.replace(/^(\d{3})(\d{3})(\d{4})$/, "$1-$2-$3");
  return cellPhone;
}

export const getDateProfile = (date: string | null) => {
  if (!date) return null;
  const dateFormat = new Date(date);
  const newDate = dateFormat.toLocaleDateString('es-MX',{
    month: 'short',
    year: 'numeric'
  });
  return  newDate

}