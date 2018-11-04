module.exports = email

function email (app, Users) {
  app.post('/push', async (req,res)=>{
    var result = await Users.findOne({token : req.body.token})
    if(!result) return res.status(404).json({message : "User Not Found!"})
    for (var i = 0; result.emailList[i] != null; i++)
      if(result.emailList[i].email === req.body.email)
        return res.status(409).json({message : "already exist!"})
    var new_email = { email : req.body.email }
    result = await Users.update({token : req.body.token},{
      $push : {emailList : new_email}
    })
    if(!result.ok) return res.status(500).json({message : "ERR!"})
    else return res.status(200).json({message : "success!"})
  })
  .post('/pull', async (req,res)=>{
    var pull_email = { email : req.body.email }
    var result = await Users.update({token : req.body.token}, {
      $pull : {emailList : pull_email}
    })
    if(!result.ok) return res.status(500).json({message : "ERR!"})
    else return res.status(200).json({message : "success!"})
  })
  .post('/list', async (req,res)=>{
    var result = await Users.findOne({token : req.body.token})
    if(!result) return res.status(404).json({message : "User Not Found!"})
    return res.status(200).json({list : result.emailList})
  })
  .post('/check', async (req,res)=>{
    var result = await Users.findOne({token : req.body.token})
    if(!result) return res.status(404).json({message : "User Not Found!"})
    for (var i = 0; result.emailList[i] != null; i++)
      if( result.emailList[i].email === req.body.email )
        return res.status(200).json({message : "success!"})
    res.status(204).json({message : "Email Not Found!"})
  })
}
