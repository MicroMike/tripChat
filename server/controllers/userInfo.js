import { UserInfo } from '../models/userInfo'

export function putUserInfo(req, res) {
  const newUserInfo = new UserInfo(req.body)
  const {_id, ...search} = newUserInfo._doc

  UserInfo.findOneAndUpdate({ userId: search.userId }, search, { upsert: true }, (err, userInfo) => {
    if (err) {
      return res.status(500).send(err)
    }

    res.status(200).send({ done: true })
  })
}