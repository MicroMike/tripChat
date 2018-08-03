import { UserInfo } from '../models/userInfo'

export function putUserInfo(req, res) {
  const newUserInfo = req.body

  UserInfo.findOneAndUpdate({ userId: newUserInfo.userId }, newUserInfo, { upsert: true }, (err, userInfo) => {
    if (err) {
      return res.status(500).send(err)
    }

    res.status(200).send({ done: true })
  })
}