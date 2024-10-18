import className from "classnames"
import { twMerge } from "tailwind-merge"

function Button({
    children,
    large,
    small,
    accept,
    decline,
    standard,
    ...rest
}){

    const classes = twMerge(
        className(rest.className, "w-1/2 px-2 py-3 rounded-xl shadow-xl", {
            "w-3/4 h-20 text-2xl":large,
            "w-1/4 h-16 text-sm":small,
            "text-white bg-gradient-to-r from-green-400 via-green-500 via-green-500 to-green-600 hover:bg-gradient-to-br":accept,
            "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br":decline,
            "text-gray-900 hover:text-white bg-white border border-gray-400 hover:bg-gray-900":standard,
        })
    )

    return (
        <button {...rest} className={classes}>{children}</button>
    )
}

export default Button