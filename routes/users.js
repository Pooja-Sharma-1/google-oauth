const mongooge=require('mongoose')
mongooge.connect('mongodb://127.0.0.1:27017/googleoauth')
const userSchema=mongooge.Schema({
  name:String,
  email:String

})

module.exports=mongooge.model('user',userSchema)