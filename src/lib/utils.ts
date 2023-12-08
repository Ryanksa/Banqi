export const getRandomInt = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) + min);
};

export const autoIncrementID = (function (): () => number {
	let id = -1;
	return () => {
		id++;
		return id;
	};
})();
