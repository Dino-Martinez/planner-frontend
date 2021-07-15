const checks = document.querySelectorAll('.check-mark')
const crosses = document.querySelectorAll('.cross')

checks.forEach(check => {
    check.onclick = (e) => e.target.classList.toggle('check-bg')
})

crosses.forEach(cross => {
    cross.onclick = (e) => e.path[1].style.display = 'none'
})
