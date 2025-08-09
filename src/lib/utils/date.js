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

export function daysToFill(date) {
    const fillDays = { fromStart: 0, fromEnd: 0 };
    const monthDays = getMonthDays(date);

    const startOfMonth = monthDays[0].getDay();
    fillDays.fromStart = startOfMonth === 0 ? 6 : startOfMonth - 1;

    const endOfMonth = monthDays[monthDays.length - 1].getDay();
    fillDays.fromEnd = endOfMonth === 0 ? 0 : 7 - endOfMonth;

    return fillDays;
}

export function getFilledMonth(date = new Date()) {
    const monthDays = [];
    const fillDays = daysToFill(date);

    for (let i = 0; i < fillDays.fromStart; i++) {
        monthDays.push(null);
    }

    monthDays.push(...getMonthDays(date));

    for (let i = 0; i < fillDays.fromEnd; i++) {
        monthDays.push(null);
    }

    while (monthDays.length < 42) {
        monthDays.push(null);
    }

    return monthDays;
}

export function getMonthRows(date = new Date()) {
    const filledMonth = getFilledMonth(date);
    const rows = [];

    for (let i = 0; i < filledMonth.length; i += 7) {
        rows.push(filledMonth.slice(i, i + 7));
    }

    return rows;
}
