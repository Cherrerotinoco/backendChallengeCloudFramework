import withConnectDB from "../../../middleware/mongodb"
import * as model from "../../../models"

const Handler = async (req, res) => {

  const { method, body } = req

  // Only allowed request is POST
  if (method !== 'POST') return res.status(405).end(`Method ${method} Not Allowed`)

  // Create user
  try {
    
    const newUser = new model.User(body)
    const user = await newUser.save()

    return res.status(200).json({status: `New user has been save with ID: ${user._id}`})
  } catch (error) {
    return res.status(500).send(error.message)
  }

}

export default withConnectDB(Handler);