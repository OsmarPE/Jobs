'use client'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";

interface Props {
    links: {
        label: string;
        href: string;
    }[],
    className?: string;
}


export default function BreadcrumbLinks({ links, className = '' }: Props) {

    const lastLink = links.length - 1

    return (
        <Breadcrumb className={className}>
            <BreadcrumbList>              
                {links.map((link,index) => (
                    <>
                        <BreadcrumbItem  key={index}> 
                            <BreadcrumbLink asChild>
                                <Link href={link.href}>{link.label}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {lastLink !== index && <BreadcrumbSeparator />}
                    </>
                ))}
               
               
            </BreadcrumbList>
        </Breadcrumb>
    )
}
