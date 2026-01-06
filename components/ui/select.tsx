import * as React from "react"
import { cn } from "@/lib/utils"

export interface SelectProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> { }

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div className="relative">
                <select
                    className={cn(
                        "flex h-12 w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:text-gray-50 appearance-none",
                        className
                    )}
                    ref={ref}
                    {...props}
                >
                    {children}
                </select>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        )
    }
)
Select.displayName = "Select"

export { Select }
