/**
 * Get an array of all the days in the week for a given date.
 * @param {Date} date - The date to get the week for.
 * @returns {Date[]} An array of Date objects for each day in the week.
 */
export function getWeekDays(date = new Date()) {
    const days = [];
    const startOfWeek = date.getDate() - date.getDay() + 1;
    for (let i = 0; i < 7; i++) {
        const day = new Date(date);
        day.setDate(startOfWeek + i);
        days.push(day);
    }
    return days;
}

/** Get an array of all the days in the month for a given date.
 * @param {Date} date - The date to get the month for.
 * @returns {Date[]} An array of Date objects for each day in the month.
 */
export function getMonthDays(date = new Date()) {
    const days = [];
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    for (let i = startOfMonth.getDate(); i <= endOfMonth.getDate(); i++) {
        const day = new Date(date);
        day.setDate(i);
        days.push(day);
    }
    return days;
}

/**
 * Get the number of days to fill at the start and end of the month.
 * @param {Date} date - The date to get the fill days for.
 * @returns {Object} An object containing the number of fill days from the start and end.
 */
export function daysToFill(date) {
    const fillDays = { fromStart: 0, fromEnd: 0 };
    const monthDays = getMonthDays(date);

    const startOfMonth = monthDays[0].getDay();
    fillDays.fromStart = startOfMonth === 0 ? 6 : startOfMonth - 1;

    const endOfMonth = monthDays[monthDays.length - 1].getDay();
    fillDays.fromEnd = endOfMonth === 0 ? 0 : 7 - endOfMonth;

    return fillDays;
}

/**
 * Get a filled array of all the days in the month for a given date.
 * @param {Date} date - The date to get the filled month for.
 * @returns {Array} An array of Date objects for each day in the month, including fill days.
 */
export function getFilledMonth(date = new Date()) {
    const monthDays = [];
    const fillDays = daysToFill(date);
    let currentID = `${date.getFullYear()}-${date.getMonth()}-`;
    let index = 1;

    for (let i = 0; i < fillDays.fromStart; i++) {
        monthDays.push({ index, id: currentID + index++, date: null });
    }

    getMonthDays(date).forEach((day) => {
        monthDays.push({ index, id: currentID + index++, date: day });
    });

    for (let i = 0; i < fillDays.fromEnd; i++) {
        monthDays.push({ index, id: currentID + index++, date: null });
    }

    while (monthDays.length < 42) {
        monthDays.push({ index, id: currentID + index++, date: null });
    }

    return monthDays;
}

/**
 * Get an array of all the rows in the month for a given date.
 * @param {Date} date - The date to get the month rows for.
 * @returns {Array} An array of arrays, each containing the days in a week. Array size is 6 x 7.
 */
export function getMonthRows(date = new Date()) {
    const filledMonth = getFilledMonth(date);
    const rows = [];

    for (let i = 0; i < filledMonth.length; i += 7) {
        rows.push(filledMonth.slice(i, i + 7));
    }

    return rows;
}

/**
 * Tworzy klucz localStorage dla danej daty (unika problemów z timezone)
 * @param {Date} date - Data dla której tworzyć klucz
 * @returns {string} Klucz w formacie YYYY-MM-DD
 */
export function getDateKey(date) {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
