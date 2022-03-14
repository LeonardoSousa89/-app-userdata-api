const db      = require('../db/db')
const method  = require('../methods/validation')

const bcrypt  = require('bcrypt')
const express = require('express')

const server  = express.Router()

server.route('/signup').post((req, res)=>{
    const user = {  ...req.body  }

    const cryptograph = password =>{
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password,salt)
    }

    try{
        method(user.username, 'Nome de usuário não informado!')
        method(user.email, 'Email não informado!')
        method(user.pass, 'senha não informada!')
    }catch(err){
        return res.status(500).send(err)
    }

    user.pass = cryptograph(user.pass)

    db.insert(user)
      .table('edatauser')
      .then(_ => res.status(201).send())
      .catch(err => res.status(400).send(err))
})



server.route('/login').post(async(req, res)=>{
    const user = {  ...req.body  }

    if(!user.email || !user.pass) return res.status(400)
                                            .send('Email e senha não informados!')

    const searchUser = await db.where({ email: user.email })
                               .table('edatauser')
                               .first()

    if(!searchUser) return res.status(401).send('Usuário não encontrado!')

    if(searchUser) {
        const passwordCompare = bcrypt.compareSync(user.pass,searchUser.pass)

        if(!passwordCompare) return res.status(401).send('Email/Senha inválidos!')

        if(passwordCompare) {
               return db.where({email: user.email})
                        .first()
                        .table('edatauser')
                        .then(_ => res.status(200).send())
                        .catch(err => res.status(400).json(err))
     }
 }

})



server.route('/userdata').post(async(req, res)=>{
    const user = { ...req.body }
 
    const userData = {
            userdesc :user.userdesc,
            userimg: user.userimg,
            id_information: user.id_information
    }
   
    return db.insert(userData)
             .table('edatauserinformation')
             .then(_ => res.status(200).send(_))
             .catch(err => res.status(400).json(err))
    
})



server.route('/app/:id').get(async(req, res)=>{

    return db.select(['id_user','userimg','userdesc'])
             .table('edatauser')
             .innerJoin('edatauserinformation','id_user','id_information')
             .where('id_user', req.params.id)
             .then(userData => res.status(200).json(userData))
             .catch(err => res.status(400).json(err))

})

module.exports = server