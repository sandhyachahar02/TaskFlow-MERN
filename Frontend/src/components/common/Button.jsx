import clsx from "clsx";

const Button = ({
    children,
    className,
    ...props
}) => {

    return (

        <button
            {...props}
            className={clsx(
                "px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium transition-all hover:bg-indigo-700 active:scale-95",
                className
            )}
        >
            {children}
        </button>

    );

};

export default Button;