const mongooge=require('mongoose')
mongooge.connect('mongodb+srv://pjasharma2004:Rashi123@cluster0.9mruo4f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
const userSchema=mongooge.Schema({
  name:String,
  email:String

})

module.exports=mongooge.model('user',userSchema)