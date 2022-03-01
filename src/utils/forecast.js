const request= require('request');
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=eb4a1acc802897b293007533b1752950&query= '+latitude + ',' + longitude + '&units=m'
    request({url:url,json:true},(error,response)=>{
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            //console.log(response.body.current.humidity)
            callback(undefined,'It is currently '+response.body.current.temperature+' degrees'+'.It feels like '+response.body.current.feelslike+' degrees.Humidity is '+response.body.current.humidity+' currently')
            
        }
    })
}
module.exports = forecast