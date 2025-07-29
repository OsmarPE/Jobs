import Link from "next/link";
import { Button } from "../ui/button";
import Navegation from "../landing/Navegation";
import { Avatar, AvatarFallback } from "../ui/avatar";
import HeaderProfile from "../landing/HeaderProfile";

export default function Header() {

    const auth = true

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

                    <HeaderProfile />

                </div>
            </div>
        </header>
    )
}
