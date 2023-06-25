function createGame() {
	const boardEl = <HTMLElement>document.querySelector('[data-js="board"]')
	const endGameEl = <HTMLElement>document.querySelector('[data-js="end-game"]')
	const resultEl = <HTMLElement>document.querySelector('[data-js="result"]')
	const resetEl = <HTMLElement>document.querySelector('[data-js="reset"]')
	const boardBoxsEl = <NodeListOf<HTMLElement>>(
		document.querySelectorAll('[data-js^="board-box"]')
	)

	const board = ['', '', '', '', '', '', '', '', '']
	let player = 'x'

	function handlePlayerMove(event: Event) {
		const target = event.target as HTMLElement
		const isBoardBox = target.getAttribute('data-js')?.includes('board-box')

		if (isBoardBox) {
			const boxPosition = Number(
				target.getAttribute('data-js')?.split(' ')[1].split('-')[2]
			)

			const boxTextEl = <HTMLElement>target.childNodes[1]
			boxTextEl.innerHTML = player
			board[boxPosition] = player

			checkWinner()
			togglePlayer()
		}
	}

	function togglePlayer() {
		player = player === 'x' ? 'o' : 'x'
	}

	function checkWinner() {
		const possibleWins = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		]

		const isWinner = possibleWins.some((win) => {
			const [a, b, c] = win
			return board[a] && board[a] === board[b] && board[a] === board[c]
		})
		const isDraw = board.every((box) => box !== '')

		if (isWinner) {
			endGameEl.style.display = 'flex'
			resultEl.innerHTML = `Player ${player} won!`
		} else if (isDraw) {
			endGameEl.style.display = 'flex'
			resultEl.innerHTML = 'Draw!'
		}
	}

	function resetGame() {
		board.fill('')
		endGameEl.style.display = 'none'
		boardBoxsEl.forEach((box) => (box.innerHTML = ''))
	}

	boardEl.addEventListener('click', handlePlayerMove)
	resetEl.addEventListener('click', resetGame)
}

createGame()
