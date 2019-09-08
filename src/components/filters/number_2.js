export default function(str) {
    str = '' + str;
    if (str.length >= 2) {  //  2  == 01 兩位數
        return str;
    } else {
        return '0' + str;
    }
}