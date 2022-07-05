const life = document.querySelector('#life')

const choices = [
  document.querySelector('#rock'),
  document.querySelector('#paper'),
  document.querySelector('#scissors')
]
const [rock, paper, scissors] = choices

const userChoiceHTML = document.querySelector('#userChoice')
const cpuChoiceHTML = document.querySelector('#cpuChoice')

let cpuChoice = rock
let userChoice = rock

const makeCpuChoice = () => {
  switch (Math.floor(Math.random() * 3)) {
    case 0:
      cpuChoice = rock
      break
    case 1:
      cpuChoice = paper
      break
    case 2:
      cpuChoice = scissors
      break
    default:
      throw new Error('Cpu could npt make a choice')
  }
  cpuChoiceHTML.innerHTML = cpuChoice.outerHTML
}

const setStatus = status => {
  const statusBar = document.querySelector('#status')
  statusBar.innerHTML = status
}

const setScore = score => {
  const scoreBar = document.querySelector('#score')
  scoreBar.innerHTML = `Score: ${score}`
}

const setLives = lives => {
  const LivesBar = document.querySelector('#lives')
  const life = document.querySelector('#life')
  life.classList.remove('hidden')
  let lifeArray = Array(lives + 1).join(life.outerHTML)
  LivesBar.innerHTML = lifeArray
}

const setGameOver = () => {
  const gameOverHTML = document.querySelector('.info')
  gameOverHTML.classList.remove('hidden')
}

const startGame = () => {
  location.reload()
}

let score = 0
let lives = 3
let prevStatus = false
setScore(score)
setLives(lives)

function checkCombo (currentStatus) {
  if (prevStatus === true && currentStatus === true) {
    setStatus('Combo bonus: Extra Life!!')
    lives += 1
    setLives(lives)
  }

  prevStatus = currentStatus
}

const program = () => {
  switch (userChoice) {
    case cpuChoice:
      setStatus("It's a tie!")
      checkCombo(false)
      break
    case rock:
      if (cpuChoice == scissors) {
        score += 1
        setScore(score)
        setStatus('You Win')
        checkCombo(true)
      } else {
        lives -= 1
        setLives(lives)
        setStatus('You Lose')
        checkCombo(false)
      }
      break
    case paper:
      if (cpuChoice == rock) {
        score += 1
        setScore(score)
        setStatus('You Win')
        checkCombo(true)
      } else {
        lives -= 1
        setLives(lives)
        setStatus('You Lose')
        checkCombo(false)
      }
      break
    case scissors:
      if (cpuChoice == paper) {
        score += 1
        setScore(score)
        setStatus('You win!')
        checkCombo(true)
      } else {
        lives -= 1
        setLives(lives)
        setStatus('You Lose')
        checkCombo(false)
      }
      break
    default:
      lives -= 1
      setLives(lives)
      setStatus('You Lose!')
      checkCombo(false)
  }
  if (lives <= 0) {
    setGameOver()
  }
}

rock.addEventListener('click', e => {
  userChoice = rock
  userChoiceHTML.innerHTML = rock.outerHTML
  makeCpuChoice()
  program()
})

paper.addEventListener('click', e => {
  userChoice = paper
  userChoiceHTML.innerHTML = paper.outerHTML
  makeCpuChoice()
  program()
})

scissors.addEventListener('click', e => {
  userChoice = scissors
  userChoiceHTML.innerHTML = scissors.outerHTML
  makeCpuChoice()
  program()
})
