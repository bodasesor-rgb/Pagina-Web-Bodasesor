/**
 * Google Apps Script — pegar en Extensiones > Apps Script del Google Sheet
 * Ejecutar updateRedirectLinks() para sincronizar columna B desde GitHub
 */
function updateRedirectLinks() {
  const CSV_URL =
    'https://raw.githubusercontent.com/bodasesor-rgb/Pagina-Web-Bodasesor/main/scripts/paginas-bodasesor-actualizado.csv'

  const csv = UrlFetchApp.fetch(CSV_URL).getContentText('UTF-8')
  const rows = Utilities.parseCsv(csv)
  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Paginas Bodasesor') ||
    SpreadsheetApp.getActiveSpreadsheet().getSheets()[1]

  if (!sheet) throw new Error('No se encontró la pestaña Paginas Bodasesor')

  const destCol = []
  const noteCol = []

  for (let i = 1; i < rows.length; i++) {
    destCol.push([rows[i][1] || ''])
    noteCol.push([rows[i][2] || ''])
  }

  if (destCol.length === 0) throw new Error('CSV vacío o sin filas de datos')

  sheet.getRange(2, 2, destCol.length, 1).setValues(destCol)
  sheet.getRange(2, 3, noteCol.length, 1).setValues(noteCol)

  SpreadsheetApp.getUi().alert(
    'Listo',
    'Se actualizaron ' + destCol.length + ' links en la columna B.',
    SpreadsheetApp.getUi().ButtonSet.OK,
  )
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Bodasesor')
    .addItem('Actualizar links de redirect', 'updateRedirectLinks')
    .addToUi()
}
