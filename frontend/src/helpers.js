export const formatDateTime = (dateTimeString) => {
    let [date, time] = dateTimeString.split("T");
    time = time.slice(0, 5);

    return { date, time }
}