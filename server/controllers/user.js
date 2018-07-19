import { User } from '../models/user'
// import cuid from 'cuid'
// import slug from 'limax'
// import sanitizeHtml from 'sanitize-html'

export function getUser(req, res) {
  User.find().exec((err, users) => {
    if (err) {
      res.status(500).send(err)
    }
    res.json({ users })
  })
}

export function putUser(req, res) {
  const newUser = new User(req.body)

  User.findOne({ email: newUser.email }).exec((err, user) => {
    if (err) {
      res.status(500).send(err)
      return
    }

    if (user) {
      console.log(newUser)
      res.status(500).send('***ERROR***')
      return
    }

    newUser.save(err => {
      res.status(200)
      if (err) {
        res.statusText = 'error f*** !'
        res.status(500)
      }
      res.send()
    })
  })


}