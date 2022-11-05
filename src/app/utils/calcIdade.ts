import * as moment from "moment";

export default function calcIdade(dataNasc: string) {
    const momentDataNasc = moment(dataNasc, 'DD/MM/YYYY');
    const todayDate = moment(new Date(), 'DD/MM/YYYY');
    console.log(dataNasc)
    console.log(momentDataNasc)
    console.log( moment(todayDate).diff(momentDataNasc, "years"))
    return moment(todayDate).diff(momentDataNasc, "years");
} 