import { User } from '../models/user'
// import cuid from 'cuid'
// import slug from 'limax'
// import sanitizeHtml from 'sanitize-html'

export function getUser(req, res) {
  User.find().exec((err, user) => {
    if (err) {
      res.status(500).send(err)
    }
    res.json({ user })
  })
}

export function putUser(req, res) {
  console.log(req)
  const newUser = new User(req.body)  
  newUser.save(err => {  
      if (err) return res.status(500).send(err)
      return res.status(200).send(newUser)
  })
}