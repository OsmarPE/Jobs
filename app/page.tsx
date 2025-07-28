import Landing from "@/pages/Landing";
import { getUsers } from "@/src/db/queries";
import { getCategories } from "@/src/schemas/category";

export default async function Home() {
  
  return <Landing />
}
