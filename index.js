require('dotenv/config');
var fs = require('fs')
var soap = require('soap')
module.exports = function(env) {
    var url = `${process.env.APP_URL}`
    
    if(env === 'prod') {
        url = `${process.env.APP_URL}`
    }
    console.log(url)
    function cteClient(client) {
        return {
            BuscarCTesPorPeriodo: function() {
                return new Promise(function(resolve, reject){
                    client.BuscarCTesPorPeriodo({
                        dataInicial: '01/10/2020', 
                        dataFinal: '09/10/2020', 
                        tipoDocumentoRetorno: 'XML', 
                        inicio: 1, 
                        limite: 10
                    }, function(err, result){
                        if(err){
                            reject(err)
                        } else {
                            resolve(JSON.stringify(result))
                            
                            fs.writeFile("C:\\TMP\\file.txt",JSON.stringify(result), function(err){
                                if(err) {
                                    console.log(err)
                                } else {
                                    console.log('file saved')
                                }
                            } )
                        }
                       // console.log(err, result)
                    })
                })
                
            }
        }
    }

    return new Promise(function(resolve, reject) {
        soap
          .createClient(url, function(err, client){
              if(err){
                  reject(err)
              } else {
                client.addSoapHeader(`<Token xmlns="Token">${process.env.APP_TOKEN}</Token>`) 
                console.log(client)
                resolve(cteClient(client))
              }
          })
    })

}