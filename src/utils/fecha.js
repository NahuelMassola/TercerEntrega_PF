
const fecha = () =>{
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let fecha = (`${day}/${month}/${year} -- ${hours}:${minutes}`)
    return fecha;
}

module.exports = fecha