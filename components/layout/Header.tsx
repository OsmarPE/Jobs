import Link from "next/link";
import { Button } from "../ui/button";

export default function Header() {
  return (
     <header className="header">
        <div className="container">
            <div className="header__body">
                <Link href="/" className="header__logo">
                    <span>Jobs</span> Easy
                </Link>
             
                <div className="header__action">
                    <Button variant={'secondaryLanding'} asChild>
                        <Link href="/auth/register">
                            Registrarse
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href="/auth/login">
                            Iniciar Sesión
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    </header>
  )
}
