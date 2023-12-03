function formatDate(date) {
    return date.toLocaleString("en-gb", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    });
}

function formatTime(date) {
    return date.toLocaleString("en-gb", {
        hour: "numeric",
        minute: "numeric",
    });
}

const today = new Date();
today.setHours(12);
today.setMinutes(0);

const todaysDateFormatted = formatDate(today);
const todaysTimeFormatted = formatTime(today);

const sevenDaysFromNow = new Date(today);
sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

const sevenDaysFormatted = formatDate(sevenDaysFromNow);
const sevenTimeFormatted = formatTime(sevenDaysFromNow);

export {
    todaysDateFormatted,
    todaysTimeFormatted,
    sevenDaysFormatted,
    sevenTimeFormatted
};