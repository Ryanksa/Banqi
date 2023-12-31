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
import { autoIncrementID } from './utils';

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
	id: number;
	type: ChessPieceType;
	colour: ChessPieceColour;
	image: string;
	isHidden: boolean;

	constructor(type: ChessPieceType, colour: ChessPieceColour, isHidden: boolean) {
		this.id = autoIncrementID();
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
	takenBlack: ChessPiece[];
	takenRed: ChessPiece[];
	ended: boolean;

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
		this.takenBlack = [];
		this.takenRed = [];
		this.ended = false;
	}

	move = (to: Coord) => {
		move: {
			const turnColour = this.turns[0];

			// No chess piece has been selected yet
			if (this.selected == null) {
				const targetPiece = this.board[to.row][to.col];

				// Case 1: selected nothing
				if (!targetPiece) {
					break move;
				}
				// Case 2: selected a hidden chess piece
				if (targetPiece.isHidden) {
					targetPiece.isHidden = false;
					if (!turnColour) {
						this.#pickColour(targetPiece.colour);
					}
					this.#finishMove(true);
					break move;
				}
				// Case 3: selected a chess piece of the correct colour
				if (targetPiece.colour === turnColour) {
					this.#selectCoord(to);
					break move;
				}
				// Case 4: selected a chess piece of the wrong colour
				if (targetPiece.colour !== turnColour) {
					break move;
				}
			}
			// A chess piece has been selected
			else {
				// If clicked on the selected piece, deselect it
				if (coordsEq(to, this.selected)) {
					this.#selectCoord(null);
					if (this.isConsecMove) this.#finishMove(true);
					break move;
				}

				// If clicked on a movable square
				if (coordsIn(this.movable, to)) {
					const selectedPiece = this.board[this.selected.row][this.selected.col]!;
					const targetPiece = this.board[to.row][to.col];

					// Case 1: move to an empty square
					if (targetPiece == null) {
						this.#movePiece(to);
						this.#finishMove(true);
						this.#selectCoord(null);
						break move;
					}
					// Case 2: take a chess piece
					if (!targetPiece.isHidden) {
						this.#movePiece(to);
						this.#finishMove(false);
						this.#selectCoord(to);
						break move;
					}
					// Case 3: attempt to take a hidden chess piece
					if (targetPiece.isHidden) {
						if (selectedPiece.canTake(targetPiece)) {
							this.#movePiece(to);
							this.#finishMove(false);
							this.#selectCoord(to);
						} else {
							targetPiece.isHidden = false;
							this.#finishMove(true);
							this.#selectCoord(null);
						}
						break move;
					}
				}
			}
		}
		this.#checkIfEnded();
	};

	#pickColour = (colour: ChessPieceColour) => {
		this.turns[0] = colour;
		if (colour === ChessPieceColour.BLACK) {
			this.turns[1] = ChessPieceColour.RED;
		} else {
			this.turns[1] = ChessPieceColour.BLACK;
		}
	};

	#movePiece = (to: Coord) => {
		if (this.selected == null) return;

		const selectedPiece = this.board[this.selected.row][this.selected.col];
		const targetPiece = this.board[to.row][to.col];

		if (targetPiece != null) {
			targetPiece.isHidden = false;
			if (targetPiece.colour === ChessPieceColour.BLACK) {
				this.takenBlack.push(targetPiece);
			} else {
				this.takenRed.push(targetPiece);
			}
		}

		this.board[to.row][to.col] = selectedPiece;
		this.board[this.selected.row][this.selected.col] = null;
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

		const jumpCoords = [];
		jumpCoords.push(this.#canJumpUp());
		jumpCoords.push(this.#canJumpDown());
		jumpCoords.push(this.#canJumpLeft());
		jumpCoords.push(this.#canJumpRight());
		for (const coord of jumpCoords) {
			if (coord != null) {
				this.movable.push(coord);
			}
		}
	};

	#canMoveUp = (): boolean => {
		if (this.selected == null) return false;

		const { row, col } = this.selected;
		if (row <= 0) return false;

		const isCannon = this.board[row][col]!.type === ChessPieceType.CANNON;
		const upPiece = this.board[row - 1][col];
		return (
			(upPiece == null && !this.isConsecMove) ||
			(upPiece != null && !isCannon && upPiece.isHidden) ||
			(upPiece != null && !isCannon && this.board[row][col]!.canTake(upPiece))
		);
	};

	#canMoveDown = (): boolean => {
		if (this.selected == null) return false;

		const { row, col } = this.selected;
		if (row >= 3) return false;

		const isCannon = this.board[row][col]!.type === ChessPieceType.CANNON;
		const downPiece = this.board[row + 1][col];
		return (
			(downPiece == null && !this.isConsecMove) ||
			(downPiece != null && !isCannon && downPiece.isHidden) ||
			(downPiece != null && !isCannon && this.board[row][col]!.canTake(downPiece))
		);
	};

	#canMoveLeft = (): boolean => {
		if (this.selected == null) return false;

		const { row, col } = this.selected;
		if (col <= 0) return false;

		const isCannon = this.board[row][col]!.type === ChessPieceType.CANNON;
		const leftPiece = this.board[row][col - 1];
		return (
			(leftPiece == null && !this.isConsecMove) ||
			(leftPiece != null && !isCannon && leftPiece.isHidden) ||
			(leftPiece != null && !isCannon && this.board[row][col]!.canTake(leftPiece))
		);
	};

	#canMoveRight = (): boolean => {
		if (this.selected == null) return false;

		const { row, col } = this.selected;
		if (col >= 7) return false;

		const isCannon = this.board[row][col]!.type === ChessPieceType.CANNON;
		const rightPiece = this.board[row][col + 1];
		return (
			(rightPiece == null && !this.isConsecMove) ||
			(rightPiece != null && !isCannon && rightPiece.isHidden) ||
			(rightPiece != null && !isCannon && this.board[row][col]!.canTake(rightPiece))
		);
	};

	#canJumpUp = (): Coord | null => {
		if (this.selected == null) return null;

		const { row, col } = this.selected;
		const selectedPiece = this.board[row][col]!;
		if (selectedPiece.type !== ChessPieceType.CANNON) return null;

		let piecesSeen = 0;
		for (let r = row - 1; r > -1; r--) {
			const nextPiece = this.board[r][col];
			if (nextPiece != null) {
				piecesSeen++;
			}

			if (
				piecesSeen === 2 &&
				nextPiece != null &&
				(nextPiece.isHidden || (!nextPiece.isHidden && selectedPiece.colour !== nextPiece.colour))
			) {
				return { row: r, col: col };
			}

			if (piecesSeen >= 2) break;
		}

		return null;
	};

	#canJumpDown = (): Coord | null => {
		if (this.selected == null) return null;

		const { row, col } = this.selected;
		const selectedPiece = this.board[row][col]!;
		if (selectedPiece.type !== ChessPieceType.CANNON) return null;

		let piecesSeen = 0;
		for (let r = row + 1; r < 4; r++) {
			const nextPiece = this.board[r][col];
			if (nextPiece != null) {
				piecesSeen++;
			}

			if (
				piecesSeen === 2 &&
				nextPiece != null &&
				(nextPiece.isHidden || (!nextPiece.isHidden && selectedPiece.colour !== nextPiece.colour))
			) {
				return { row: r, col: col };
			}

			if (piecesSeen >= 2) break;
		}

		return null;
	};

	#canJumpLeft = (): Coord | null => {
		if (this.selected == null) return null;

		const { row, col } = this.selected;
		const selectedPiece = this.board[row][col]!;
		if (selectedPiece.type !== ChessPieceType.CANNON) return null;

		let piecesSeen = 0;
		for (let c = col - 1; c > -1; c--) {
			const nextPiece = this.board[row][c];
			if (nextPiece != null) {
				piecesSeen++;
			}

			if (
				piecesSeen === 2 &&
				nextPiece != null &&
				(nextPiece.isHidden || (!nextPiece.isHidden && selectedPiece.colour !== nextPiece.colour))
			) {
				return { row: row, col: c };
			}

			if (piecesSeen >= 2) break;
		}

		return null;
	};

	#canJumpRight = (): Coord | null => {
		if (this.selected == null) return null;

		const { row, col } = this.selected;
		const selectedPiece = this.board[row][col]!;
		if (selectedPiece.type !== ChessPieceType.CANNON) return null;

		let piecesSeen = 0;
		for (let c = col + 1; c < 8; c++) {
			const nextPiece = this.board[row][c];
			if (nextPiece != null) {
				piecesSeen++;
			}

			if (
				piecesSeen === 2 &&
				nextPiece != null &&
				(nextPiece.isHidden || (!nextPiece.isHidden && selectedPiece.colour !== nextPiece.colour))
			) {
				return { row: row, col: c };
			}

			if (piecesSeen >= 2) break;
		}

		return null;
	};

	#checkIfEnded() {
		if (this.takenBlack.length >= 16 || this.takenRed.length >= 16) {
			this.selected = null;
			this.movable = [];
			this.ended = true;
		}
	}

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
