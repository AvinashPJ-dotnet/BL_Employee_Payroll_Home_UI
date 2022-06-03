const stringifyDate = (date) => {
    const option = {year:'numeric', month:'short', day:'numeric'};
    const newDate = !date ? "undefined": new Date(Date.parse(date)).toLocaleDateString('en-GB', option);
    return newDate;
}