var express = require('express')
const axios = require('axios')

var app = express()

const climateUrl = 'http://apiadvisor.climatempo.com.br/api/v1/weather/locale/'
const cityUrl = 'http://apiadvisor.climatempo.com.br/api/v1/locale/'

const apiKey = '91ef1ad272379ceb5b88fe5e4b98c0cc'

const capitais = [
  { name: 'São Paulo', state: 'SP' },
  { name: 'Rio de Janeiro', state: 'RJ' },
  { name: 'Rio de Janeiro', state: 'RJ' },
  { name: 'Rio de Janeiro', state: 'RJ' },
  { name: 'Rio de Janeiro', state: 'RJ' },
]

const getCityId = (name, state) => {
  return axios({
    method:'get',
    url: `${cityUrl}city?name=${name}&state=${state}&token=${apiKey}`,
  }) //cuidado com callback hell
    .then((response) => {
      if (!response.data.length) {
        return null
      }
      return response.data[0].id
    })
}

const getTemperature = (id) => {
  if (!id) {
    return null
  }
  return axios({
    method:'get',
    url: `${climateUrl}${id}/current?token=${apiKey}`,
  })
  // stack trace
}

app.get('/', function (req, res) {
  const name = req.query.name
  const state = req.query.state
  getCityId(name, state)
    .then((id) => {
      // o return é muito importante
      return getTemperature(id)
    })
    .then((climeInfo) => {
      if (!climeInfo) {
        return res.send('Cidade não encontrada')
      }
      // res.send é do express
      res.send(climeInfo.data)
    })
    .catch(function (error) {
      console.log('erro', error);
    })

})

// quebra no state, resolver e retornar mensagem de erro

// faça uma rota GET/capitais que retorna
// as temperaturas de todas as capitais brasileiras (variavel capitais)

app.listen(5000, () => console.log('Listening to port 5000...'))
