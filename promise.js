function task(){
    const promise = new Promise(function(resolve, reject){
        console.log('1');

        setTimeout(function() {
            resolve('Ok');
        } , 2000)
    })

    return promise
}


console.log('before');
task()
    .then(function(data){

        console.log('RESOLVED PROMISE', data);
 
    })
    .catch(function(err){
        console.log('REJECTED PROMISE', err);
    })
    .finally(function(){
        console.log('Выполняется всегда после изменения состояния промиса');
    })
console.log('after');