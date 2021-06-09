const canvas = document.getElementById('snake-board')
const ctx = canvas.getContext('2d')

const cookieImg = new Image()
cookieImg.src = "img/01_keks.png"

const headImg = new Image()
headImg.src = "img/012_c_Monster_Kopf.png"

const tailImg = new Image()
tailImg.src = "img/012_a_Monster_Puschel.png"

const snakeParts = []

let inputXVelocity = 0
let inputYVelocity = 0
let xVelocity = 0
let yVelocity = 0

let tileCount = 20
let tileSize = canvas.width / tileCount - 2

let headX = 10
let headY = 10
let tailLength = 2

let cookieX = 5
let cookieY = 5
let score = 0

let speed = 7

function oeffneSnake() {
    document.getElementById('snake-dialog').style.display = 'block'
}

function schliesseSnake() {
    document.getElementById('snake-dialog').style.display = 'none'
    document.getElementById('snake-ergebnis').innerText = "0"
}

function resetSnake() {
    headX = 10
    headY = 10
    tailLength = 2
    inputXVelocity = 0
    inputYVelocity = 0
    xVelocity = 0
    yVelocity = 0
    score = 0
    speed = 7
    snakeParts.length = 0
    drawGame()
}

function drawGame() {
    //Logik des Spiels
    xVelocity = inputXVelocity
    yVelocity = inputYVelocity

    changeSnakePosition()
    let result = isGameOver()
    if (result) {
        return
    }

    clearScreen()
    checkCookieCollision()
    drawCookie()
    drawSnake()

    document.getElementById('snake-ergebnis').innerText = score

    if (score > 5) {
        speed = 9
    }
    if (score > 10) {
        speed = 11
    }
    setTimeout(drawGame, 1000 / speed)
}

function putCookie() {
    cookieX = Math.floor(Math.random() * tileCount)
    cookieY = Math.floor(Math.random() * tileCount)
}

function drawCookie() {
    ctx.drawImage(cookieImg, cookieX * tileCount, cookieY * tileCount, tileSize, tileSize)
}

function checkCookieCollision() {
    if (cookieX === headX && cookieY === headY) {
        putCookie()
        tailLength++
        score++
    }
}

function isGameOver() {
    let gameOver = false

    if (yVelocity === 0 && xVelocity === 0) {
        return gameOver
    }

    //Kollision mit Wand
    if (headX < 0) {
        gameOver = true
    } else if (headX === tileCount) {
        gameOver = true
    } else if (headY < 0) {
        gameOver = true
    } else if (headY === tileCount) {
        gameOver = true
    }

    //Kollision mit Schwanz
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i]
        if (part.x === headX && part.y === headY) {
            gameOver = true
            break
        }
    }

    if (gameOver) {
        ctx.fillStyle = "white"
        ctx.font = "50px Verdana"
        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2)
        keksspeicher += score
    }

    return gameOver
}

function drawSnake() {
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i]
        ctx.drawImage(tailImg, part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }

    snakeParts.push({ x: headX, y: headY })

    while (snakeParts.length > tailLength) {
        snakeParts.shift()
    }

    ctx.drawImage(headImg, headX * tileCount, headY * tileCount, tileSize, tileSize)
}

function changeSnakePosition() {
    headX += xVelocity
    headY += yVelocity
}

function clearScreen() {
    ctx.fillStyle = "magenta"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

document.addEventListener('keydown', keyDown)

function keyDown(event) {

    //hoch (Pfeil hoch oder W)
    if (event.keyCode == 38 || event.keyCode == 87) {
        if (inputYVelocity == 1) return
        inputYVelocity = -1
        inputXVelocity = 0
    }
    //runter (Pfeil runter oder S)
    if (event.keyCode == 40 || event.keyCode == 83) {
        if (inputYVelocity == -1) return
        inputYVelocity = 1
        inputXVelocity = 0
    }
    //links (Pfeil links oder A)
    if (event.keyCode == 37 || event.keyCode == 65) {
        if (inputXVelocity == 1) return
        inputYVelocity = 0
        inputXVelocity = -1
    }
    //rechts (Pfeil rechts oder D)
    if (event.keyCode == 39 || event.keyCode == 68) {
        if (inputXVelocity == -1) return
        inputYVelocity = 0
        inputXVelocity = 1
    }
}

putCookie()
drawGame()