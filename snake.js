document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.querySelector('.score span');
    const startBtn = document.querySelector('.start');

    const width = 10;
    let squares = [];
    let currentSnake = [2, 1, 0];
    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 100;
    let interval = 0;
    let appleIndex = 0;

    // Crear el grid
    function createGrid() {
        for (let i = 0; i < width * width; i++) {
            const div = document.createElement('div');
            grid.appendChild(div);
            squares.push(div);
        }
    }
    createGrid();

    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'));
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        score = 0;
        direction = 1;
        scoreDisplay.textContent = score;
        intervalTime = 100;
        currentSnake = [2, 1, 0];
        currentSnake.forEach(index => squares[index].classList.add('snake'));
        randomApple();
        interval = setInterval(moveOutcomes, intervalTime);
    }

    function moveOutcomes() {
        if (
            (currentSnake[0] + direction >= width * width && direction === width) || // Si la serpiente toca el fondo
            (currentSnake[0] % width === width - 1 && direction === 1) || // Si la serpiente toca la pared derecha
            (currentSnake[0] % width === 0 && direction === -1) || // Si la serpiente toca la pared izquierda
            (currentSnake[0] - width < 0 && direction === -width) || // Si la serpiente toca la pared superior
            squares[currentSnake[0] + direction].classList.contains('snake') // Si la serpiente se choca consigo misma
        ) {
            return clearInterval(interval); // Esto limpiará el intervalo si cualquiera de las condiciones anteriores ocurre
        }

        const tail = currentSnake.pop();
        squares[tail].classList.remove('snake');
        currentSnake.unshift(currentSnake[0] + direction);

        // Lidiar con la serpiente obteniendo la manzana
        if (squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake');
            currentSnake.push(tail);
            score++;
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutcomes, intervalTime);
            randomApple();
        }
        squares[currentSnake[0]].classList.add('snake');
    }

    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length);
        } while (squares[appleIndex].classList.contains('snake'));
        squares[appleIndex].classList.add('apple');
    }

    function control(e) {
        if (e.keyCode === 39 && direction !== -1) {
            direction = 1; // Tecla de flecha derecha
        } else if (e.keyCode === 38 && direction !== width) {
            direction = -width; // Tecla de flecha arriba
        } else if (e.keyCode === 37 && direction !== 1) {
            direction = -1; // Tecla de flecha izquierda
        } else if (e.keyCode === 40 && direction !== -width) {
            direction = width; // Tecla de flecha abajo
        }
    }

    document.addEventListener('keyup', control);
    startBtn.addEventListener('click', startGame);

    startGame(); // Iniciar el

});
