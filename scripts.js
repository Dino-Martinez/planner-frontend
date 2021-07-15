const url = 'https://express-planner.herokuapp.com'
const list = document.querySelector('#todo-list')
async function populatePage() {
    const res = await fetch(url)
    const todos = await res.json()
    let itemsLeft = 0
    todos.forEach((todo, index) => {
        if (!todo.completed) {
            itemsLeft++
        }
        const li = document.createElement('li')
        li.classList.add('todo')
        li.innerHTML = `
            <svg id="complete-${todo._id}" class="check-mark check-${todo.completed}" xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
            <p class="todo-content status-${todo.completed}">${todo.title} </p>
            <p style="display: none;" id="status-${todo._id}">${todo.completed}</p>
            <svg id="delete-${todo._id}" class="cross" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
        `
        list.appendChild(li)
    })

    document.querySelector('#items-left').innerHTML = `${itemsLeft} items left`

    enableControls()
}

function enableControls() {
    const checks = document.querySelectorAll('.check-mark')
    const crosses = document.querySelectorAll('.cross')

    checks.forEach(check => {
        check.onclick = async (e) => {
            if (e.target.id === 'submit-create') {
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
                    input.value = ''
                    window.location.reload()
                }
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
                window.location.reload()
            }
        }
    })

    crosses.forEach(cross => {
        cross.onclick = async (e) => {
            e.path[1].style.display = 'none'
        }
    })
    

}

populatePage()
