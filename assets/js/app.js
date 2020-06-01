// Variables
const listaTweets = document.getElementById('lista-tweets')
const formulario = document.getElementById('formulario')


// EventListeners

formulario.addEventListener('submit', leerTweet)

listaTweets.addEventListener('click', eliminarTweet)

document.addEventListener('DOMContentLoaded', mostrarTweets)

// Funciones



function leerTweet(e) {
    e.preventDefault()
    let tweet = document.getElementById('tweet').value

    agregarTweet(tweet)
}


function agregarTweet(tweet) {
    let li = document.createElement('li')
    li.appendChild(document.createTextNode(tweet))
    let botonX = document.createElement('a')
    botonX.innerHTML = 'X'
    botonX.classList = 'borrar-tweet'
    li.appendChild(botonX)
    listaTweets.appendChild(li)
    agregarTweetLocalStorage(tweet)
}

function eliminarTweet(e) {
    e.preventDefault()
    if (e.target.className === "borrar-tweet") {
        tweetABorrar = e.target.parentElement.textContent
        borrarTweetLocalStorage(tweetABorrar)
        e.target.parentElement.remove()
    }
}


function agregarTweetLocalStorage(tweet) {

    let tweets = datosLocalStorage()
    tweets.push(tweet)

    localStorage.setItem('cursos', JSON.stringify(tweets))
}



function datosLocalStorage() {
    let arrayTweets
    if (localStorage.getItem('cursos') === null) {
        arrayTweets = []
    } else {
        arrayTweets = JSON.parse(localStorage.getItem('cursos'))
    }

    return arrayTweets
}

function mostrarTweets() {
    let tweets = datosLocalStorage()

    tweets.forEach((tweet) => {
        let li = document.createElement('li')
        li.appendChild(document.createTextNode(tweet))
        let botonX = document.createElement('a')
        botonX.innerHTML = 'X'
        botonX.classList = 'borrar-tweet'
        li.appendChild(botonX)
        listaTweets.appendChild(li)
    })
}

function borrarTweetLocalStorage(tweet){
    let tweets = datosLocalStorage()
    let tweetBorrar = tweet.substring( 0, tweet.length-1)
    tweets.forEach( (tweetLs, index) => {
        if (tweetLs === tweetBorrar){
            tweets.splice(1, index)
            
        }
    })
    localStorage.setItem('cursos', JSON.stringify(tweets))
}