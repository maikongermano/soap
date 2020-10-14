var BuscarCTes = require('./index')

BuscarCTes('dev')
  .then(function(cteClient) {
    cteClient.BuscarCTesPorPeriodo()
    .then(function(ret){
        console.log(JSON.stringify(ret))
    })
    .catch(function(err){
        console.log(JSON.stringify(err))
    })
})
.catch(function(err){
    console.log(err)
}) 