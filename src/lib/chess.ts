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

export type Coord = { x: number; y: number };

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
