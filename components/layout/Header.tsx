import Link from "next/link";
import { Button } from "../ui/button";
import Navegation from "../landing/Navegation";
import { Avatar, AvatarFallback } from "../ui/avatar";
import HeaderProfile from "../landing/HeaderProfile";
import { getUserByToken } from "@/lib/auth";

export default async function Header() {

    const user = await getUserByToken();

    return (
        <header className="header">
            <div className="container">
                <div className="header__body">
                    <div className="header__left">
                        <Link href="/" className="header__logo">
                            <span>Jobs</span> Easy
                        </Link>
                        <Navegation />
                    </div>

                    <HeaderProfile user={user} />

                </div>
            </div>
        </header>
    )
}
