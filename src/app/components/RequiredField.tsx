import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

export default function RequiredField() {
  return (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <span className='text-red-500 mx-1 cursor-pointer'>*</span>
            </TooltipTrigger>
            <TooltipContent>
                <p>Campo requerido</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  )
}
