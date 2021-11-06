import { useLayoutEffect, useState } from "react";
import ThemeContext from "./ThemeContext";

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState(false);

    /*
        Toggle between two different themes in your css using true/false values
    */
    useLayoutEffect(() => {
        if (currentTheme === JSON.parse(window.localStorage.getItem('theme'))) {
            document.body.setAttribute('theme', currentTheme);
        } else if (window.localStorage.getItem('theme') === null) {
            document.body.setAttribute('theme', currentTheme);
        } else {
            document.body.setAttribute('theme', JSON.parse(window.localStorage.getItem('theme')));
            setCurrentTheme(JSON.parse(document.body.getAttribute('theme')));
        }
    }, [currentTheme]);

    function setTheme(_newTheme) {
        window.localStorage.setItem('theme', _newTheme)
        setCurrentTheme(_newTheme);
    }

    const value = {setTheme, currentTheme};

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}