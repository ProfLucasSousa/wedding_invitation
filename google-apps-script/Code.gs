/**
 * Google Apps Script - Somente GET para buscar nomes confirmados
 * 
 * INSTRUÇÕES:
 * 1. Abra a planilha: https://docs.google.com/spreadsheets/d/1NXxI4zVitmX3lGlP0zBSCJmxUPbyQSBoF1hMBACuRa0/edit
 * 2. Vá em: Extensões > Apps Script
 * 3. Cole este código
 * 4. Clique em Implantar > Nova implantação
 * 5. Clique no ícone de engrenagem ao lado de "Selecionar tipo"
 * 6. Escolha: Aplicativo da Web
 * 7. Executar como: "Eu"
 * 8. Quem tem acesso: "Qualquer pessoa" ← IMPORTANTE!
 * 9. Clique em Implantar
 * 10. Autorize as permissões quando solicitado
 * 11. Copie a URL e adicione no .env.local como SHEETS_API_URL
 */

/**
 * Função que lida com requisições GET
 */
function doGet(e) {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheets()[0]; // Primeira aba da planilha
    
    // Pega todos os dados
    const data = sheet.getDataRange().getValues();
    
    if (data.length === 0) {
      return createJsonResponse({
        confirmedNames: [],
        total: 0,
        success: true
      });
    }
    
    // Assumindo que os nomes estão na primeira coluna (A)
    // Pula o cabeçalho (primeira linha) se houver
    const allNames = data.map(row => row[0]);
    
    // Remove cabeçalho e valores vazios
    const names = allNames.slice(1).filter(name => {
      return name && 
             typeof name === 'string' && 
             name.toString().trim() !== '' &&
             name.toString().trim().toLowerCase() !== 'nome';
    });
    
    // Remove duplicados
    const uniqueNames = [...new Set(names)];
    
    return createJsonResponse({
      confirmedNames: uniqueNames,
      total: uniqueNames.length,
      success: true
    });
    
  } catch (error) {
    return createJsonResponse({
      error: error.message,
      success: false,
      confirmedNames: []
    });
  }
}

/**
 * Função auxiliar para criar resposta JSON
 */
function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
