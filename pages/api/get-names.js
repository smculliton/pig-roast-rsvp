const { GoogleSpreadsheet } = require('google-spreadsheet')
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID)

export default async function getNames (req, res) {
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  })
  
  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[0]

  try {
    const rows = await sheet.getRows()
    const formatted = rows.map(row => `${row._rawData[0]} ${row._rawData[1]}`)

    res.status(200).json({ names: formatted })
  } catch (error) {
    console.log(error)
  }
}