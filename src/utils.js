export const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
};

export const getHumanReadableDate = () => {
    let month = new Date().getMonth();
    let day = new Date().getDate();

    const humanMonth = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ];
    return day + ' ' + humanMonth[month];
};
