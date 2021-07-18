import React, { useState } from 'react'

function TodoHeader() {
    const [theme, setTheme] = useState('light')

    const toggle = () => {
        const root = document.querySelector(':root')

        if (theme === 'light') {
            root.style.cssText = `
                --clr-page-background: hsl(235, 21%, 11%);
                --clr-highlight: hsl(237, 14%, 26%);
                --clr-text-inactive: hsl(233, 14%, 35%);
                --clr-text-muted: hsl(234, 11%, 52%);
                --clr-text: hsl(234, 39%, 85%);
                --clr-brightblue: hsl(220, 98%, 61%);
                --clr-content-background: hsl(235, 24%, 19%);
                --clr-shadow: hsl(0, 0%, 5%);
                --clr-checkbg: linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%));
                --border-radius: 7px;
            `
        } else {
            root.style.cssText = `
                --clr-page-background: hsl(0, 0%, 98%);
                --clr-highlight: hsl(236, 33%, 92%);
                --clr-text-inactive: hsl(233, 11%, 84%);
                --clr-text-muted: hsl(236, 9%, 61%);
                --clr-text: hsl(235, 19%, 35%);
                --clr-brightblue: hsl(220, 98%, 61%);
                --clr-content-background: hsl(0, 0%, 100%);
                --clr-shadow: hsl(0, 0%, 90%);
                --clr-checkbg: linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%));
                --border-radius: 7px;
            `
        }

        theme === 'light' ? setTheme('dark') : setTheme('light')
    }

    return (
        <header className="flex-row between">
            <h1>TODO</h1>
            <svg id="dark-toggle" onClick={() => toggle()} className={`toggle ${theme === 'dark' ? 'hidden' : ''}`} xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path fill="#FFF" fillRule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>
            <svg id="light-toggle" onClick={() => toggle()} className={`toggle ${theme === 'light' ? 'hidden' : ''}`} xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path fill="#FFF" fillRule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>
        </header>
    )
}

export default TodoHeader
