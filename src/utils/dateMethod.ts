export const getStartOfDay = (date: Date): Date => {
	const startDateTime = new Date(date);
	startDateTime.setUTCHours(0, 0, 0, 0);
	return startDateTime;
};

export const getEndOfDay = (date: Date): Date => {
	const endDateTime = new Date(date);
	endDateTime.setUTCHours(23, 59, 59, 999);
	return endDateTime;
};
