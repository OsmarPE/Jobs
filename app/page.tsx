import Landing from "@/pages/Landing";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Jobs Easy | Home', 
  description: 'En Jobs Easy puedes buscar miles de empleos en línea para encontrar tu próximo reto profesional. Contamos con herramientas para búsqueda de empleo, CV, evaluaciones de empresas y más.',
}
export default async function Home() {
  
  return <Landing />
}
