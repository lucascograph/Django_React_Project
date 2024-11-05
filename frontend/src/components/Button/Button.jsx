import className from "classnames"
import { twMerge } from "tailwind-merge"

function Button({
    children,
    large,
    accept,
    decline,
    standard,
    ...rest
}){

    const classes = twMerge(
        className(rest.className, "w-1/2 h-1/2 rounded-xl shadow-xl shadow-inner-xl border border-gray-300", {
            "text-white bg-gradient-to-r from-green-400 via-green-500 via-green-500 to-green-600 hover:bg-gradient-to-br":accept,
            "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br":decline,
            "text-gray-900 bg-white border-gray-300 hover:bg-gray-200":standard,
        })
    )

    return (
        <button {...rest} className={classes}>{children}</button>
    )
}

export default Button