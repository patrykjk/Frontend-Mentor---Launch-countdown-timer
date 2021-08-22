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

// secondsContainer.querySelector('.card-flipping .card-back p').innerText = time
// secondsContainer.querySelector('.card-top .card-front p').innerText = time

let flipCard = (currentTime, container) => {
    let topCard = container.querySelector('.card-top')
    let flippingCard = container.querySelector('.card-flipping')
    let bottomCard = container.querySelector('.card-bottom')

    bottomCard.classList.remove('card-bottom')
    bottomCard.classList.add('card-top')

    flippingCard.classList.add('card-bottom')
    flippingCard.classList.remove('card-flipping')

    topCard.classList.add('card-flipping')
    topCard.classList.remove('card-top')

    if (currentTime < 10) {
        topCard.querySelector('.card-back p').innerText = '0' + currentTime
        bottomCard.querySelector('.card-front p').innerText = '0' + currentTime
    } else {
        topCard.querySelector('.card-back p').innerText = currentTime
        bottomCard.querySelector('.card-front p').innerText = currentTime
    }
}

let updateTime = time => {
    let days = Math.floor(time / day)
    if (days != prevTimeDays) {
        flipCard(days, daysContainer)
        prevTimeDays = days
    }

    let hours = Math.floor(time % day / hour)
    if (hours != prevTimeHours) {
        flipCard(hours, hoursContainer)
        prevTimeHours = hours
    }

    let minutes = Math.floor(time % hour / minute)
    if (minutes != prevTimeMinutes) {
        flipCard(minutes, minutesContainer)
        prevTimeMinutes = minutes
    }

    let seconds = Math.floor(time % minute / second)
    if (seconds != prevTimeSeconds) {
        flipCard(seconds, secondsContainer)
        prevTimeSeconds = seconds
    }

    timeLeft -= 1000
}


let autoUpdateTime = setInterval(() => updateTime(timeLeft), 1000)