import { createContext, useContext, useEffect, useState } from "react"

export const DarkModeContext = createContext();
// 여기에 필요한 데이터 보관
// Context를 만들 때, 항상 Provider도 만든다.
// Context : 데이터 보관
// Provider : 부모 우산 컴포넌트

// 처리하고 싶은 데이터를 여기 안에 만들어준다.
export function DarkModeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false); //다크모드가 아닌 초기값
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        updateDarkMode(!darkMode)
    };

    useEffect(() => {
        const isDark = localStorage.theme === 'dark' ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches
            );
        setDarkMode(isDark);
        updateDarkMode(isDark);
    }, [])

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider >
    )
}

function updateDarkMode(darkMode) {
    if (darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark'
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.theme = ''

    }
}

export const useDarkMode = () => useContext(DarkModeContext);