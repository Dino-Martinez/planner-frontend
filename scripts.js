
// This code block to filter query string out of url was taken from 
// https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
let urlParams
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")) },
        query  = window.location.search.substring(1)

    urlParams = {}
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2])
})()

if (urlParams.filter === undefined) {
    urlParams.filter = 'all'
}

const url = 'https://express-planner.herokuapp.com'
const list = document.querySelector('#todo-list')
const filter = document.querySelector('#filter')
const hero = document.querySelector('#hero')
const currentFilterButtons = document.querySelectorAll(`.${urlParams.filter}-button`)
let todos
let viewWidth = window.innerWidth
let theme = urlParams.theme || 'light'
themeSwitch(theme)

currentFilterButtons.forEach(button => {
    button.classList.add('active-filter')
})

async function populatePage() {
    const res = await fetch(url)
    todos = await res.json()
    todos.sort((a,b) => {
        if (a.completed && b.completed)
            return 0
        if (!a.completed && b.completed)
            return 1
        if (a.completed && !b.completed)
            return -1
    })
    let itemsLeft = 0
    todos.forEach((todo, index) => {
        if ((urlParams.filter === 'all') || (urlParams.filter === 'active' && !todo.completed) || (urlParams.filter === 'completed' && todo.completed)) {
            if (!todo.completed) {
                itemsLeft++
            }
    
            const li = document.createElement('li')
            li.classList.add('todo')
            li.innerHTML = `
                <svg id="complete-${todo._id}" class="check-mark check-${todo.completed}" xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
                <p class="todo-content status-${todo.completed}">${todo.title} </p>
                <p style="display: none" id="status-${todo._id}">${todo.completed}</p>
                <svg id="delete-${todo._id}" class="cross" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
            `
            list.appendChild(li)
        }
    })

    document.querySelector('#items-left').innerHTML = `${itemsLeft} items left`

    enableControls()
}

async function createTodo() {
    const input = document.querySelector('#todo-input')
    if (input.value.length > 0) {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: input.value,
                body: 'No Body Implementation yet'
            }) 
        })
        refresh()
    }
}

function enableControls() {
    const checks = document.querySelectorAll('.check-mark')
    const crosses = document.querySelectorAll('.cross')

    checks.forEach(check => {
        check.onclick = async (e) => {
            if (e.target.id === 'submit-create') {
                createTodo()
            } else {
                // Update todo
                e.target.classList.toggle('check-true')
                const id = e.target.id.substring(9)
                const status = !(document.querySelector(`#status-${id}`).innerHTML === 'true')
                
                const response = await fetch(`${url}/${id}`, {
                    method: 'PUT',
                    mode: 'cors',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        completed: status
                    }) 
                  })
                refresh()
            }
        }
    })

    crosses.forEach(cross => {
        cross.onclick = async (e) => {
            const id = e.target.id.substring(7)
            e.path[1].style.display = 'none'
            const response = await fetch(`${url}/${id}`, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id
                }) 
              })
            refresh()
        }
    })
}

function clearCompleted() {
    todos.forEach(async todo => {
        if (todo.completed) {
            const id = todo._id
            const response = await fetch(`${url}/${id}`, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id
                }) 
              })
            refresh()
        }
    })
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        createTodo()
    }
})

function themeSwitch(newTheme) {
    theme = newTheme
    const currentTheme = document.documentElement.getAttribute("data-theme")
    const lightBtn = document.querySelector('#light-toggle')
    const darkBtn = document.querySelector('#dark-toggle')
    if (newTheme !== currentTheme) {
        document.documentElement.setAttribute("data-theme", newTheme)
        const root = document.querySelector(':root')
        const device = viewWidth > 500 ? 'desktop' : 'mobile'
        const src = `./images/bg-${device}`
        if (newTheme === 'dark') {
            darkBtn.classList.add('hidden')
            lightBtn.classList.remove('hidden')

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
            darkBtn.classList.remove('hidden')
            lightBtn.classList.add('hidden')


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
        hero.src = `${src}-${theme}.jpg`
    }
}

function changeFilter (query) {
    filter.innerHTML = query
    refresh()
}

function refresh () {
    window.location.href = `http://${window.location.host}${window.location.pathname}?filter=${filter.innerHTML}`
    //window.location.href = `file:///D:/Programming/express-planner/frontend/index.html?filter=${filter.innerHTML}&theme=${theme}`   
}

populatePage()


window.onresize = () => {
    const device = viewWidth > 500 ? 'desktop' : 'mobile'
    const src = `./images/bg-${device}`
    hero.src = `${src}-${theme}.jpg`
    viewWidth = window.innerWidth
}