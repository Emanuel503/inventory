import { cn } from "@/lib/utils"

function Title({children, classNames}: { children:string, classNames:string|undefined }) {
  return (
    <h3 className={cn("text-blue-900 font-semibold text-xl my-5", classNames)}>{children}</h3>
  )
}

export { Title }
