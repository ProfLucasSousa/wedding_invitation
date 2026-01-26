import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { names, confirmedAt } = body

    if (!names || !Array.isArray(names) || names.length === 0) {
      return NextResponse.json(
        { error: "Pelo menos um nome deve ser selecionado" },
        { status: 400 }
      )
    }

    // Prepare RSVP data
    const rsvpData = {
      names,
      confirmedAt: confirmedAt || new Date().toISOString(),
    }

    // Send to webhook if WEBHOOK_URL is configured
    const webhookUrl = process.env.WEBHOOK_URL
    let webhookSuccess = false

    if (webhookUrl) {
      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...rsvpData,
            source: "wedding-invitation",
          }),
        })

        if (webhookResponse.ok) {
          webhookSuccess = true
        }
      } catch (error) {
        console.error('Erro ao enviar webhook:', error)
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Presença confirmada com sucesso!",
        webhookSent: webhookSuccess,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Erro ao processar RSVP:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve confirmed names from Google Sheets
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  
  if (type === 'confirmed-names') {
    // Try to fetch from Google Sheets
    const sheetsApiUrl = process.env.SHEETS_API_URL
    
    if (sheetsApiUrl) {
      try {
        const response = await fetch(sheetsApiUrl, {
          method: 'GET',
          cache: 'no-store' // Sempre buscar dados frescos
        })
        
        if (response.ok) {
          const data = await response.json()
          // Confiar nos dados do Sheets, mesmo que esteja vazio
          return NextResponse.json({
            confirmedNames: data.confirmedNames || [],
            source: 'google-sheets'
          })
        }
      } catch (error) {
        console.error('Erro ao buscar do Google Sheets:', error)
      }
    }
    
    // Fallback apenas se houver erro ou Sheets não configurado
    return NextResponse.json({
      confirmedNames: [],
      source: 'no-sheets-configured'
    })
  }
  
  // Default: return empty list
  return NextResponse.json({
    total: 0,
    confirmations: [],
  })
}
