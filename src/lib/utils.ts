export const getRandomInt = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) + min);
};

export function swap<T>(arr: T[]) {
	const temp = arr[0];
	arr[0] = arr[1];
	arr[1] = temp;
}
