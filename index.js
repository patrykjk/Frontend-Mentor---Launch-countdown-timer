let daysContainer = document.querySelector('[data-time="days"]')
let hoursContainer = document.querySelector('[data-time="hours"]')
let minutesContainer = document.querySelector('[data-time="minutes"]')
let secondsContainer = document.querySelector('[data-time="seconds"]')

let prevTimeDays, prevTimeHours, prevTimeMinutes, prevTimeSeconds

let timeLeft = 172800000
let day = 86400000
let hour = 3600000
let minute = 60000
let second = 1000




let display = (element, numberToDisplay) => {
    if (numberToDisplay < 0 || numberToDisplay == undefined) {
        element.innerText = '--'
    } else if (numberToDisplay < 10) {
        element.innerText = '0' + numberToDisplay
    } else {
        element.innerText = numberToDisplay
    }
}

let flipCard = (container, currentTime, prevTime) => {
    let topCardP = container.querySelector('.card-top p')
    let bottomCardP = container.querySelector('.card-bottom p')

    let middleCard = container.querySelector('.card-middle')
    middleCard.classList.remove('card-flipping')

    display(bottomCardP, prevTime)
    display(topCardP, currentTime)
    display(middleCard.querySelector('.card-middle-front p'), prevTime)
    display(middleCard.querySelector('.card-middle-back p'), currentTime)

    setTimeout(() => {
        middleCard.classList.add('card-flipping')
    }, 22)
}

let updateTime = time => {
    let days = Math.floor(time / day)
    if (days != prevTimeDays) {
        flipCard(daysContainer, days, prevTimeDays)
        prevTimeDays = days
    }

    let hours = Math.floor(time % day / hour)
    if (hours != prevTimeHours) {
        flipCard(hoursContainer, hours, prevTimeHours)
        prevTimeHours = hours
    }

    let minutes = Math.floor(time % hour / minute)
    if (minutes != prevTimeMinutes) {
        flipCard(minutesContainer, minutes, prevTimeMinutes)
        prevTimeMinutes = minutes
    }

    let seconds = Math.floor(time % minute / second)
    if (seconds != prevTimeSeconds) {
        flipCard(secondsContainer, seconds, prevTimeSeconds)
        prevTimeSeconds = seconds
    }


    timeLeft -= 1000

    if (time < 1000) {
        clearInterval(autoUpdateTime)
    }
}


let autoUpdateTime = setInterval(() => updateTime(timeLeft), 1000)

updateTime(timeLeft)