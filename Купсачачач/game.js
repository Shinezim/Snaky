//хтмл на месте
const canvas = document.getElementById("game")

//Плоский мир
const ctx = canvas.getContext("2d")

//Задний фон
const ground = new Image()
ground.src = "img/ground.png"

//Картинка еда
const foodImg = new Image()
foodImg.src = "img/food.png"

//250 тыс. тонн тратила
const bombImg = new Image()
bombImg.src = "img/bomb.png"

//Майнкрафт лаки блок
const blockImg = new Image()
blockImg.src = "img/block.jpeg"

//Ячейка
let box = 32

//Бимбы
let bomb = [{}]

//Бимбоудолятор
let bombDelete = [{}]

//Хавка
let food = {
	x: Math.floor((Math.random() * 17 + 1)) * box,
	y: Math.floor((Math.random() * 15 + 3)) * box
}

//Змейка
let snake = []
snake[0] = {
	x: 9 * box,
	y: 10 * box
}

//Счёт
let score = snake.length - 1

//Кнопочки инициализорованны
document.addEventListener("keydown", direction)

//Направление
let dir

//Изменение движения
function direction(event) {
	if (event.keyCode == 37 && dir != "right") dir = "left"
	else if (event.keyCode == 38 && dir != "down") dir = "up"
	else if (event.keyCode == 39 && dir != "left") dir = "right"
	else if (event.keyCode == 40 && dir != "up") dir = "down"
}

//Враги наступают
let enemySnake = []
enemySnake[0] = {
	x: 18 * box,
	y: Math.floor((Math.random() * 15 + 3)) * box
}

//Ема агромная
for (let i = 1; i < Math.random(2, 25) * box; i++) {
	enemySnake[i] = {
		x: (18 + i) * box,
		y: enemySnake[0].y
	}
}

//Галава врага
let enemySnakeX = enemySnake[0].x
let enemySnakeY = enemySnake[0].y

//Рисунок вани 3б
function drawGame() {
//Где будет фон
	ctx.drawImage(ground, 0, 0)
//Рисуем еду
	ctx.drawImage(foodImg, food.x, food.y)
//Рисуем змийку
	for (let i = 0; i < snake.length; i++) {
		ctx.fillStyle = i == 0 ? "darkgreen" : "green"
		ctx.fillRect(snake[i].x, snake[i].y, box, box)
	}

//НАША башка
	let snakeX = snake[0].x
	let snakeY = snake[0].y

//Ам
	if (snakeX == food.x && snakeY == food.y) {
		score++
		food = {
			x: Math.floor((Math.random() * 17 + 1)) * box,
			y: Math.floor((Math.random() * 15 + 3)) * box
		}
	} else snake.pop()

//Обратку не даём
	if (dir == "left") snakeX -= box
	if (dir == "right") snakeX += box
	if (dir == "up") snakeY -= box
	if (dir == "down") snakeY += box

//Корды головы
	let newHead = {
		x: snakeX,
		y: snakeY
	}

//Обновление головы
	snake.unshift(newHead)

//Корды галавы
	enemySnakeX = enemySnake[0].x
	enemySnakeY = enemySnake[0].y

//Движение врага
	if (score > 0 && snake.length < 20) {
		for (let i = 0; i < enemySnake.length; i++) {
			ctx.fillStyle = "red"
			ctx.fillRect(enemySnake[i].x, enemySnake[i].y, box, box)
			enemySnake[i].x -= box

			if (enemySnake[enemySnake.length - 1].x < -2000)
				enemySnake.pop()
		}
	}

//Его обновление
	for (let i = 0; i < snake.length; i++) {
		for (let y = 0; y < enemySnake.length; y++) {
			if (enemySnake[enemySnake.length - 1].x < -2000 && enemySnakeY != snake[i]) {
				enemySnake[0] = {
				x: 18 * box,
				y: Math.floor((Math.random() * 15 + 3)) * box
			    }
			

			for (let i = 1; i < Math.random(2, 25) * box; i++) {
				enemySnake[i] = {
					x: (18 + i) * box,
					y: enemySnake[0].y
				}
			}
		}

//Не хавай
			if (enemySnakeX == snake[i].x && enemySnakeY == snake[i].y) {
				snake.pop(i)
				score -= i
			}

//Вкусны змея
			if (snakeX == enemySnake[y].x && snakeY == enemySnake[y].y) {
				enemySnake.pop(y)
				score += y
			}
		}
	}

//Э мая яда
	if (enemySnakeX == food.x && enemySnakeY == food.y) {
		food = {
			x: Math.floor((Math.random() * 17 + 1)) * box,
			y: Math.floor((Math.random() * 15 + 3)) * box
		}
	}

//Бомбардир
    if(enemySnakeX == box || enemySnake.length == 0) {
		bomb.push({
			x: Math.floor((Math.random() * 17 + 1)) * box,
			y: Math.floor((Math.random() * 15 + 3)) * box
		})
	}

//Ресуем бомбы на асфальте
	for ( let i = 0; i < bomb.length; i++)
		ctx.drawImage(bombImg, bomb[i].x, bomb[i].y)

	if(bomb.length > 4)
		bomb.shift()

//99 способов умереть
	if (enemySnakeX == snakeX && enemySnakeY == snakeY) {
		clearInterval(game)
		alert("You lose:( Last score:" + score)
		location.reload()
	}


	if (score < 0 || snake.length < 1) {
		clearInterval(game)
		alert("You've become too small for that")
		location.reload()
	}

	if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
		clearInterval(game)
		alert("You lose:( Last score: " + score)
		location.reload()
	}

	for(let i = 0; i < bomb.length; i++) {
		if(snakeX == bomb[i].x && snakeY == bomb[i].y) {
			clearInterval(game)
			alert("You eated something not that. Last score:" + score)
			location.reload()
		}
	}

	for (let i = 2; i < snake.length; i++) {
		if (snakeX == snake[i].x && snakeY == snake[i].y) {
		clearInterval(game)
		alert("Testy? Last score:" + score)
		location.reload()
		}
	}

//Даресовывай
	ctx.fillStyle = "#578a34"
	ctx.fillRect(0, box * 3, box, box * 15)
	ctx.fillRect(box * 18, box * 3, box, box * 15)
	ctx.fillRect(0, box * 2, box * 19, box)
	ctx.fillRect(0, box * 18, box * 19, box)

	ctx.fillStyle = "#4a752c"
	ctx.fillRect(0, 0, box * 19, box * 2.2)
	ctx.drawImage(foodImg, box, box / 1.8)

	ctx.fillStyle = "white"
	ctx.font = "50px Arial"
	ctx.fillText(score, box * 2.5, box * 1.7)
}

//Рисуем в тик
let game = setInterval(drawGame, 110)