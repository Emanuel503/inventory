'use client'

import { useIsMobile } from "@/hooks/use-mobile"

export default function LegendMoreOptions() {
    const mobile = useIsMobile()
    return (
        <span className="text-sm">{`(Mas opciones ${mobile ? 'manten presionado' : 'clic derecho'})`}</span>
    )
}
