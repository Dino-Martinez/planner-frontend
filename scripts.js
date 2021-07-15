const list = document.querySelector('#todo-list')
async function populatePage() {
    const res = await fetch('https://express-planner.herokuapp.com')
    const todos = await res.json()
    console.log(todos)
    todos.forEach((todo, index) => {
        const li = document.createElement('li')
        li.classList.add('todo')
        li.innerHTML = `
            <svg id="complete-${todo._id}" class="check-mark" xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
            <p class="todo-content">${todo.title}</p>
            <svg id="delete-${todo._id}" class="cross" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
        `
        list.appendChild(li)
    })
    enableControls()
}

function enableControls() {
    const checks = document.querySelectorAll('.check-mark')
    const crosses = document.querySelectorAll('.cross')

    checks.forEach(check => {
        check.onclick = (e) => e.target.classList.toggle('check-bg')
    })

    crosses.forEach(cross => {
        cross.onclick = (e) => e.path[1].style.display = 'none'
    })
    
}

populatePage()
