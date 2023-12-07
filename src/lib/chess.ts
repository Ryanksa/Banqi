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

export type Coord = { row: number; col: number };

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
		return this.colour !== piece.colour && takeable[this.type].includes(piece.type);
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
}

export const shuffleBoard = (boardPieces: (ChessPiece | null)[]): (ChessPiece | null)[][] => {
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

export const coordsEq = (coord1: Coord, coord2: Coord): boolean => {
	return coord1.row === coord2.row && coord1.col === coord2.col;
};

export const coordsIn = (coordsArr: Coord[], coord: Coord): boolean => {
	return coordsArr.findIndex((c) => coordsEq(c, coord)) >= 0;
};

export const canMoveUp = (board: (ChessPiece | null)[][], selected: Coord): boolean => {
	const { row, col } = selected;
	return (
		row > 0 &&
		(board[row - 1][col] == null ||
			board[row - 1][col]!.isHidden ||
			board[row][col]!.canTake(board[row - 1][col]!))
	);
};

export const canMoveDown = (board: (ChessPiece | null)[][], selected: Coord): boolean => {
	const { row, col } = selected;
	return (
		row < 3 &&
		(board[row + 1][col] == null ||
			board[row + 1][col]!.isHidden ||
			board[row][col]!.canTake(board[row + 1][col]!))
	);
};

export const canMoveLeft = (board: (ChessPiece | null)[][], selected: Coord): boolean => {
	const { row, col } = selected;
	return (
		col > 0 &&
		(board[row][col - 1] == null ||
			board[row][col - 1]!.isHidden ||
			board[row][col]!.canTake(board[row][col - 1]!))
	);
};

export const canMoveRight = (board: (ChessPiece | null)[][], selected: Coord): boolean => {
	const { row, col } = selected;
	return (
		col < 7 &&
		(board[row][col + 1] == null ||
			board[row][col + 1]!.isHidden ||
			board[row][col]!.canTake(board[row][col + 1]!))
	);
};

export const takeable = {
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
	[ChessPieceType.SOLDIER]: [ChessPieceType.GENERAL, ChessPieceType.CANNON, ChessPieceType.SOLDIER],
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
