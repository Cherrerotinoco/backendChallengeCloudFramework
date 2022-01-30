import withConnectDB from "../../../../middleware/mongodb"
import { updateUserContacts, getCommonContacts, getContacts } from "./utils"

const Handler = (req, res) => {

  const { method } = req

  switch (method) {
    case 'PUT':
      updateUserContacts(req, res)
    break;
    
    case 'GET':
      if (typeof req.query.userid === 'object') {
        getCommonContacts(req, res)
      }
      if (typeof req.query.userid === 'string') {
        getContacts(req, res)
      }
    break;
  
    default:
      return res.status(405).end(`Method ${method} Not Allowed`)
    break;
  }

}

export default withConnectDB(Handler);