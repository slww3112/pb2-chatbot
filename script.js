function getTime() {
    let d = new Date()
    return `${d.getHours()}:${d.getMinutes()}, ${d.getDate()}.${d.getMonth()+1}.`
}