import * as model from "../../../../../models"

export const updateUserContacts = async (req, res) => {
  
  const {query, body: contacts} = req
  
  // Verify user Id
  const userId = query.userid 
  const user = await model.User.findById(userId)
  if (!user) return res.status(400).json({status: `Not user found, input given => ${userId}`}) 

  // Verify contacts 
  if (contacts.length <= 0) return res.status(400).json({status: `Expecting an Array of objects, input given => ${contacts}`})

  // Iterate!
  contacts.forEach(async contact => {
    try {

      let contactRef;
      const contactUpdated = await model.Contact.findOneAndUpdate({phone: contact.phone}, {contactName: contact.contactName})

      if (!contactUpdated) {
        const newContact = new model.Contact(contact)
        const contactCreated = await newContact.save()
        contactRef = contactCreated._id
      } else {
        contactRef = contactUpdated._id
      }
 
      // Save reference in to the user object array
      await model.User.findOneAndUpdate({_id: userId}, {$push: {"contacts": contactRef}})
  
    } catch (error) {
      return res.status(500).send(error.message)
    }    
  });

  return res.status(200).json({status: 'All the contacts has been saved/updated'})
}

export const getCommonContacts = async (req, res) => {

  const usersId = req.query.userid

  try {
   
    const users = await model.User.find().where('_id').in(usersId).exec()
    const contactsIdsArrayObjs = users.map(user => user.contacts).flat() 
    const contactsIdsArrayString = contactsIdsArrayObjs.map(idObj => idObj.valueOf())
    const contactsIdsInCommon = [...new Set(findDuplicates(contactsIdsArrayString))] // Using Set we get unique values
    const contactsInCommon = await model.Contact.find().where('_id').in(contactsIdsInCommon).exec()
    
    return res.status(200).send(contactsInCommon)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

export const getContacts = async (req, res) => {
  const userId = req.query.userid

  try {
    const user = await model.User.findById(userId)
    const userContactIds = user.contacts
    const contacts = await model.Contact.find().where('_id').in(userContactIds).exec()
  
    return res.status(200).send(contacts)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const findDuplicates = (array) => {
  return array.filter((curr, i) => array.indexOf(curr) !== i)
} 