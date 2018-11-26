module.exports = auth;

function auth(app, Users, Emails, rndstring) {
  app.post('/signup', async(req,res)=>{
    var user = new Users(req.body);
    user.token = rndstring.generate(40);
    try {
      var result = await user.save();
    }catch(e){
      if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
      if(e instanceof ValidationError) return res.status(400).json({message: e.message});
      if(e instanceof paramsError) return res.status(400).json({message: e.message});
    }
    res.status(200).json({message : "success!"});
  })
  .post('/signin', async(req,res)=>{
    var result = await Users.findOne(req.body)
    if(!result) return res.status(404).json({message : "Not Found"})
    var list = []
    for (var i=0; result.accountList[i] != null ; i++) {
      let userEmail = await Emails.findOne({email: result.accountList[i].email })
      userEmail.token = undefined;
      list.push(userEmail)
    }
    return res.status(200).json({
      SocialEmailList : list,
      EmailList : result.emailList,
      token : result.token
    })
  })
  .post('/addAccount', async (req,res)=>{
    var new_email = new Emails(req.body);
    try {
      var result = await new_email.save();
    }catch(e) {
      if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
      if(e instanceof ValidationError) return res.status(400).json({message: e.message});
      if(e instanceof paramsError) return res.status(400).json({message: e.message});
    }
    var emailsJson = { email : req.body.email, passwd: req.body.passwd }
    var push_email = await Users.update({token : req.body.token}, {
      $push : {accountList : emailsJson}
    })
    if(!push_email.ok) return res.status(500).json({message : "ERR!"})
    res.status(200).json(new_email)
  })
  .post('/removeAccount', async (req,res)=>{
    let email = { email : req.body.email }
    let result = await Users.update({token : req.body.token}, {
      $pull : {accountList : email }
    })
    if(!result.ok) return res.status(500).json({message : "ERR!"})
    result = await Emails.remove({token : req.body.token})
    if(result.ok) return res.status(500).json({message : "ERR!"})
    res.status(200).json({message : "success!"})
  })
}
