
const mathProblem = document.querySelector(".math-problem")
const submit = document.querySelector(".submit")
const inputField = document.querySelector(".input-field")
const form = document.querySelector(".form")
const submitBtn = document.getElementById("submit-btn")
const pointsNeeded = document.getElementById("points-needed")
const errorsAllowed = document.getElementById("errors-allowed")
const restartBtn = document.getElementById("restart-btn")
const progressBar = document.querySelector(".progress-inner")
const endMessage = document.querySelector(".end-message")



let state = {
    score:0,
    wrongAnswer:0
}

function updateProblem(){
    state.currentProblem = generateProblem()
    mathProblem.innerHTML = `${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}`
}
updateProblem()

function generateNumber(max){
   return Math.floor(Math.random()*max + 1)
}

function generateProblem(){
   return {
    numberOne: generateNumber(10),
    numberTwo: generateNumber(10),
    operator:['+','-','x'][generateNumber(2)]
   } 
}

// a function to prevent default web property when a user enters submit
form.addEventListener('submit',handleSubmit)

function handleSubmit(e){
    e.preventDefault()

    let correctAnswer 
    let x=  state.currentProblem
    if(x.operator=="+") correctAnswer = x.numberOne + x.numberTwo
    if(x.operator=="-") correctAnswer = x.numberOne - x.numberTwo
    if(x.operator=="x") correctAnswer = x.numberOne * x.numberTwo

 
    console.log(correctAnswer);

    if(parseInt(inputField.value,10) === correctAnswer){
        state.score++
        pointsNeeded.textContent = `${ 10-state.score } `
        updateProblem()
        inputField.value = ""
        inputField.focus()
        progressBar.style.transform = `scaleX(${state.score/10})`
        renderProgressBar()
    }
    else{
        state.wrongAnswer++
        errorsAllowed.textContent = `${ 3-state.wrongAnswer } `
        updateProblem()
        inputField.value = ""
        inputField.focus()
        mathProblem.classList.add("animate-wrong")
        setTimeout(()=>mathProblem.classList.remove("animate-wrong") ,331)
    }
    checkLogic()
}
function initialState(){
    state.score = 0
    state.wrongAnswer=0
}
function checkLogic(){
    if(state.score==10){
       endMessage.textContent = "You WON! yayy!!!"
       document.body.classList.add("overlay-is-open")
       submitBtn.disabled = true
       initialState()
    }
    if(state.wrongAnswer==3){
        console.log("you lost try again")
        submitBtn.disabled = true
       document.body.classList.add("overlay-is-open")
        endMessage.textContent = "You lost!"
        initialState()
    }
}

restartBtn.addEventListener("click",handleRestart)

function handleRestart(e){
   submitBtn.disabled = false
   errorsAllowed.textContent = 3
    pointsNeeded.textContent =10
   initialState()
   updateProblem()
 renderProgressBar()
 document.body.classList.remove("overlay-is-open")
}

function renderProgressBar(){
     progressBar.style.transform =`scaleX(${state.score/10})`
}