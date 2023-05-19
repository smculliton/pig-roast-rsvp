const { GoogleSpreadsheet } = require('google-spreadsheet')
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID)

export default async function addRow (req, res) {
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  })
  
  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[0]

  try {
    await sheet.addRow([req.body.firstName, req.body.lastName, req.body.sideDish, req.body.numberPeople])

    res.status(200).json({ message: 'Row appended to Google Sheet' })
  } catch (error) {
    console.log(error)
  }
}