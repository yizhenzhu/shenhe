export default  function  getIndexres (arr, item){
    for (var i in arr) {
        if (arr[i] == item) {
            return i;
        }
    }

}