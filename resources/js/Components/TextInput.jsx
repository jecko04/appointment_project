import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'border-gray-300 rounded-md shadow-sm hover:border-blue-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none' +
                className
            }
            ref={input}
        />
    );
});
