export default  function yujingweifen(val,list){
    
    var keyType=val
    var newkey = {};

    for (var q = 0; q <list.length; q++) {
        if (list[q].fraudType1 === keyType) {
          newkey = list[q];
          list.splice(q,1)
        }
      }
      // console.log(list);
      list.push(newkey)
      return  list
}
