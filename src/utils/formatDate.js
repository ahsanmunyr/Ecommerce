export default function formatDate(date){
    if(date){
        var year=date.getFullYear();
    var day=date.getDate();
    var month=date.getMonth()+1;
    return year+"-"+"0"+month+"-"+day
    }
}