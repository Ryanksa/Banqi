import blackGeneral from '../assets/black-general.png';
import blackAdvisor from '../assets/black-advisor.png';
import blackElephant from '../assets/black-elephant.png';
import blackHorse from '../assets/black-horse.png';
import blackChariot from '../assets/black-chariot.png';
import blackCannon from '../assets/black-cannon.png';
import blackSoldier from '../assets/black-soldier.png';
import redGeneral from '../assets/red-general.png';
import redAdvisor from '../assets/red-advisor.png';
import redElephant from '../assets/red-elephant.png';
import redHorse from '../assets/red-horse.png';
import redChariot from '../assets/red-chariot.png';
import redCannon from '../assets/red-cannon.png';
import redSoldier from '../assets/red-soldier.png';

export type Coord = { row: number; col: number };

export enum ChessPieceType {
	GENERAL = 'GENERAL',
	ADVISOR = 'ADVISOR',
	ELEPHANT = 'ELEPHANT',
	HORSE = 'HORSE',
	CHARIOT = 'CHARIOT',
	CANNON = 'CANNON',
	SOLDIER = 'SOLDIER'
}

export enum ChessPieceColour {
	BLACK = 'BLACK',
	RED = 'RED'
}

export class ChessPiece {
	type: ChessPieceType;
	colour: ChessPieceColour;
	image: string;
	isHidden: boolean;

	constructor(type: ChessPieceType, colour: ChessPieceColour, isHidden: boolean) {
		this.type = type;
		this.colour = colour;
		this.image = ChessPiece.#getImage(type, colour);
		this.isHidden = isHidden;
	}

	canTake(piece: ChessPiece): boolean {
		return this.colour !== piece.colour && ChessPiece.#takeable[this.type].includes(piece.type);
	}

	static #getImage(type: ChessPieceType, colour: ChessPieceColour): string {
		switch (type) {
			case ChessPieceType.GENERAL:
				return colour === ChessPieceColour.BLACK ? blackGeneral : redGeneral;
			case ChessPieceType.ADVISOR:
				return colour === ChessPieceColour.BLACK ? blackAdvisor : redAdvisor;
			case ChessPieceType.ELEPHANT:
				return colour === ChessPieceColour.BLACK ? blackElephant : redElephant;
			case ChessPieceType.HORSE:
				return colour === ChessPieceColour.BLACK ? blackHorse : redHorse;
			case ChessPieceType.CHARIOT:
				return colour === ChessPieceColour.BLACK ? blackChariot : redChariot;
			case ChessPieceType.CANNON:
				return colour === ChessPieceColour.BLACK ? blackCannon : redCannon;
			case ChessPieceType.SOLDIER:
				return colour === ChessPieceColour.BLACK ? blackSoldier : redSoldier;
			default:
				return '';
		}
	}

	static #takeable = {
		[ChessPieceType.GENERAL]: [
			ChessPieceType.GENERAL,
			ChessPieceType.ADVISOR,
			ChessPieceType.ELEPHANT,
			ChessPieceType.HORSE,
			ChessPieceType.CHARIOT,
			ChessPieceType.CANNON
		],
		[ChessPieceType.ADVISOR]: [
			ChessPieceType.ADVISOR,
			ChessPieceType.ELEPHANT,
			ChessPieceType.HORSE,
			ChessPieceType.CHARIOT,
			ChessPieceType.CANNON,
			ChessPieceType.SOLDIER
		],
		[ChessPieceType.ELEPHANT]: [
			ChessPieceType.ELEPHANT,
			ChessPieceType.HORSE,
			ChessPieceType.CHARIOT,
			ChessPieceType.CANNON,
			ChessPieceType.SOLDIER
		],
		[ChessPieceType.CHARIOT]: [
			ChessPieceType.CHARIOT,
			ChessPieceType.HORSE,
			ChessPieceType.CANNON,
			ChessPieceType.SOLDIER
		],
		[ChessPieceType.HORSE]: [ChessPieceType.HORSE, ChessPieceType.CANNON, ChessPieceType.SOLDIER],
		[ChessPieceType.SOLDIER]: [
			ChessPieceType.GENERAL,
			ChessPieceType.CANNON,
			ChessPieceType.SOLDIER
		],
		[ChessPieceType.CANNON]: [
			ChessPieceType.GENERAL,
			ChessPieceType.ADVISOR,
			ChessPieceType.ELEPHANT,
			ChessPieceType.HORSE,
			ChessPieceType.CHARIOT,
			ChessPieceType.CANNON,
			ChessPieceType.SOLDIER
		]
	};
}

export class Game {
	board: (ChessPiece | null)[][];
	turns: (ChessPieceColour | null)[];
	isConsecMove: boolean;
	selected: Coord | null;
	movable: Coord[];

	constructor() {
		this.board = Game.#shuffleBoard([
			new ChessPiece(ChessPieceType.GENERAL, ChessPieceColour.BLACK, true),
			new ChessPiece(ChessPieceType.GENERAL, ChessPieceColour.RED, true),
			new ChessPiece(ChessPieceType.ADVISOR, ChessPieceColour.BLACK, true),
			new ChessPiece(ChessPieceType.ADVISOR, ChessPieceColour.RED, true),
			new ChessPiece(ChessPieceType.ADVISOR, ChessPieceColour.BLACK, true),
			new ChessPiece(ChessPieceType.ADVISOR, ChessPieceColour.RED, true),
			new ChessPiece(ChessPieceType.ELEPHANT, ChessPieceColour.BLACK, true),
			new ChessPiece(ChessPieceType.ELEPHANT, ChessPieceColour.RED, true),
			new ChessPiece(ChessPieceType.ELEPHANT, ChessPieceColour.BLACK, true),
			new ChessPiece(ChessPieceType.ELEPHANT, ChessPieceColour.RED, true),
			new ChessPiece(ChessPieceType.HORSE, ChessPieceColour.BLACK, true),
			new ChessPiece(ChessPieceType.HORSE, ChessPieceColour.RED, true),
			new ChessPiece(ChessPieceType.HORSE, ChessPieceColour.BLACK, true),
			new ChessPiece(ChessPieceType.HORSE, ChessPieceColour.RED, true),
			new ChessPiece(ChessPieceType.CHARIOT, ChessPieceColour.BLACK, true),
			new ChessPiece(ChessPieceType.CHARIOT, ChessPieceColour.RED, true),
			new ChessPiece(ChessPieceType.CHARIOT, ChessPieceColour.BLACK, true),
			new ChessPiece(ChessPieceType.CHARIOT, ChessPieceColour.RED, true),
			new ChessPiece(ChessPieceType.CANNON, ChessPieceColour.BLACK, true),
			new ChessPiece(ChessPieceType.CANNON, ChessPieceColour.RED, true),
			new ChessPiece(ChessPieceType.CANNON, ChessPieceColour.BLACK, true),
			new ChessPiece(ChessPieceType.CANNON, ChessPieceColour.RED, true),
			new ChessPiece(ChessPieceType.SOLDIER, ChessPieceColour.BLACK, true),
			new ChessPiece(ChessPieceType.SOLDIER, ChessPieceColour.RED, true),
			new ChessPiece(ChessPieceType.SOLDIER, ChessPieceColour.BLACK, true),
			new ChessPiece(ChessPieceType.SOLDIER, ChessPieceColour.RED, true),
			new ChessPiece(ChessPieceType.SOLDIER, ChessPieceColour.BLACK, true),
			new ChessPiece(ChessPieceType.SOLDIER, ChessPieceColour.RED, true),
			new ChessPiece(ChessPieceType.SOLDIER, ChessPieceColour.BLACK, true),
			new ChessPiece(ChessPieceType.SOLDIER, ChessPieceColour.RED, true),
			new ChessPiece(ChessPieceType.SOLDIER, ChessPieceColour.BLACK, true),
			new ChessPiece(ChessPieceType.SOLDIER, ChessPieceColour.RED, true)
		]);
		this.turns = [null, null];
		this.isConsecMove = false;
		this.selected = null;
		this.movable = [];
	}

	move = (to: Coord) => {
		const turnColour = this.turns[0];

		// No chess piece has been selected yet
		if (this.selected == null) {
			const targetPiece = this.board[to.row][to.col];

			// Case 1: selected nothing
			if (!targetPiece) {
				return;
			}
			// Case 2: selected a hidden chess piece
			if (targetPiece.isHidden) {
				targetPiece.isHidden = false;
				if (!turnColour) {
					this.#pickColour(targetPiece.colour);
				}
				this.#finishMove(true);
				return;
			}
			// Case 3: selected a chess piece of the correct colour
			if (targetPiece.colour === turnColour) {
				this.#selectCoord(to);
				return;
			}
			// Case 4: selected a chess piece of the wrong colour
			if (targetPiece.colour !== turnColour) {
				return;
			}
		}
		// A chess piece has been selected
		else {
			// If clicked on the selected piece, deselect it
			if (coordsEq(to, this.selected)) {
				this.#selectCoord(null);
				if (this.isConsecMove) this.#finishMove(true);
				return;
			}

			// If clicked on a movable square
			if (coordsIn(this.movable, to)) {
				const selectedPiece = this.board[this.selected.row][this.selected.col]!;
				const targetPiece = this.board[to.row][to.col];

				// Case 1: move to an empty square
				if (targetPiece == null) {
					this.board[to.row][to.col] = selectedPiece;
					this.board[this.selected.row][this.selected.col] = null;
					this.#finishMove(true);
					this.#selectCoord(null);
					return;
				}
				// Case 2: take a chess piece
				if (!targetPiece.isHidden) {
					this.board[to.row][to.col] = selectedPiece;
					this.board[this.selected.row][this.selected.col] = null;
					this.#finishMove(false);
					this.#selectCoord(to);
					return;
				}
				// Case 3: attempt to take a hidden chess piece
				if (targetPiece.isHidden) {
					if (selectedPiece.canTake(targetPiece)) {
						this.board[to.row][to.col] = selectedPiece;
						this.board[this.selected.row][this.selected.col] = null;
						this.#finishMove(false);
						this.#selectCoord(to);
					} else {
						targetPiece.isHidden = false;
						this.#finishMove(true);
						this.#selectCoord(null);
					}
					return;
				}
			}
		}
	};

	#pickColour = (colour: ChessPieceColour) => {
		this.turns[0] = colour;
		if (colour === ChessPieceColour.BLACK) {
			this.turns[1] = ChessPieceColour.RED;
		} else {
			this.turns[1] = ChessPieceColour.BLACK;
		}
	};

	#finishMove = (switchTurns: boolean) => {
		if (switchTurns) {
			this.isConsecMove = false;
			const temp = this.turns[0];
			this.turns[0] = this.turns[1];
			this.turns[1] = temp;
		} else {
			this.isConsecMove = true;
		}
	};

	#selectCoord = (coord: Coord | null) => {
		this.selected = coord;

		if (coord == null) {
			this.movable = [];
			return;
		}
		const { row, col } = coord;

		this.movable = [];
		if (this.#canMoveUp()) {
			this.movable.push({ row: row - 1, col });
		}
		if (this.#canMoveDown()) {
			this.movable.push({ row: row + 1, col });
		}
		if (this.#canMoveLeft()) {
			this.movable.push({ row, col: col - 1 });
		}
		if (this.#canMoveRight()) {
			this.movable.push({ row, col: col + 1 });
		}
	};

	#canMoveUp = (): boolean => {
		if (this.selected == null) return false;

		const { row, col } = this.selected;
		if (row <= 0) return false;

		const upPiece = this.board[row - 1][col];
		return (
			(upPiece == null && !this.isConsecMove) ||
			(upPiece != null && upPiece.isHidden) ||
			(upPiece != null && this.board[row][col]!.canTake(upPiece))
		);
	};

	#canMoveDown = (): boolean => {
		if (this.selected == null) return false;

		const { row, col } = this.selected;
		if (row >= 3) return false;

		const downPiece = this.board[row + 1][col];
		return (
			(downPiece == null && !this.isConsecMove) ||
			(downPiece != null && downPiece.isHidden) ||
			(downPiece != null && this.board[row][col]!.canTake(downPiece))
		);
	};

	#canMoveLeft = (): boolean => {
		if (this.selected == null) return false;

		const { row, col } = this.selected;
		if (col <= 0) return false;

		const leftPiece = this.board[row][col - 1];
		return (
			(leftPiece == null && !this.isConsecMove) ||
			(leftPiece != null && leftPiece.isHidden) ||
			(leftPiece != null && this.board[row][col]!.canTake(leftPiece))
		);
	};

	#canMoveRight = (): boolean => {
		if (this.selected == null) return false;

		const { row, col } = this.selected;
		if (col >= 7) return false;

		const rightPiece = this.board[row][col + 1];
		return (
			(rightPiece == null && !this.isConsecMove) ||
			(rightPiece != null && rightPiece.isHidden) ||
			(rightPiece != null && this.board[row][col]!.canTake(rightPiece))
		);
	};

	static #shuffleBoard = (boardPieces: (ChessPiece | null)[]): (ChessPiece | null)[][] => {
		for (let i = boardPieces.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = boardPieces[i];
			boardPieces[i] = boardPieces[j];
			boardPieces[j] = temp;
		}

		const shuffledBoard: (ChessPiece | null)[][] = [];
		shuffledBoard.push(boardPieces.slice(0, 8));
		shuffledBoard.push(boardPieces.slice(8, 16));
		shuffledBoard.push(boardPieces.slice(16, 24));
		shuffledBoard.push(boardPieces.slice(24, 32));

		return shuffledBoard;
	};
}

export const coordsEq = (coord1: Coord, coord2: Coord): boolean => {
	return coord1.row === coord2.row && coord1.col === coord2.col;
};

export const coordsIn = (coordsArr: Coord[], coord: Coord): boolean => {
	return coordsArr.findIndex((c) => coordsEq(c, coord)) >= 0;
};
