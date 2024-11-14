function getDayMonthYear (time_stamp) {

    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    const date = time_stamp ? new Date(time_stamp) : new Date();
    
    return `${date.getHours() > 9  ? date.getHours() : '0' + date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes():'0' + date.getMinutes()} ${date.getDate().toString().length === 1 ? '0' + date.getDate().toString() : date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}`
}

function getOnlyDayMonthYear (time_stamp) {

    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    const date = time_stamp ? new Date(time_stamp) : new Date();
    
    return `${date.getDate().toString().length === 1 ? '0' + date.getDate().toString() : date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}`
}
function formatearFechaInput(fechaInput) {
    const [año, mes, dia] = fechaInput.split('-');
    
    const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const mesAbreviado = meses[parseInt(mes, 10) - 1];
    
    return `${dia}-${mesAbreviado}-${año}`;
  }

function getDayMonthYear2() {

    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    let dateDB = new Date();
    let options = { timeZone: 'America/La_Paz' };
    let date = new Date(dateDB.toLocaleString('en-US', options))

    return {
        actualizacion: `${date.getHours() > 9 ? date.getHours() : '0' + date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()} ${date.getDate().toString().length === 1 ? '0' + date.getDate().toString() : date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}`,
        time_stamp: date.getTime()
    }
}
export { getDayMonthYear, getDayMonthYear2, getOnlyDayMonthYear, formatearFechaInput}