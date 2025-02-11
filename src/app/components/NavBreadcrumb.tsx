'use client'

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { House } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { capitalizeFirstLetter } from "@/utils/functions";

export default function NavBreadcrumb() {
    const path = usePathname();
    const breadcrumbList = path.split('/').filter(Boolean);
    
    return (
        <Breadcrumb className="mb-4">
            <BreadcrumbList>
                <BreadcrumbPage>
                    <Link href="/dashboard">
                        <House size={18}/>
                    </Link>
                </BreadcrumbPage>
                <BreadcrumbSeparator/>
                {
                    breadcrumbList.map((item, index) => {
                        const url = `/${breadcrumbList.slice(0, index + 1).join("/")}`;
                        return (
                            <Fragment key={index}>
                                <BreadcrumbItem >
                                    <BreadcrumbPage>
                                        <Link href={url}>{capitalizeFirstLetter(item)}</Link>
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                                { index < breadcrumbList.length - 1 && <BreadcrumbSeparator/> }
                            </Fragment>
                        )
                    })
                }
            </BreadcrumbList>
        </Breadcrumb>
    )
}
