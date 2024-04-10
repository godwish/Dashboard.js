class Util{
    static getCurrentDate(){
        let date = new Date();
        let ret = date.getFullYear().toString();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minites = date.getMinutes();
        let seconds = date.getSeconds();

        if( month < 10 ) ret += '0';
        ret += month.toString();

        if( day < 10 ) ret += '0';
        ret += day.toString();
        
        if( hour < 10 ) ret += '0';
        ret += hour.toString();
        
        if( minites < 10 ) ret += '0';
        ret += minites.toString();

        if( seconds < 10 ) ret += '0';
        ret += seconds.toString();

        return ret;
    }
}
module.exports = Util