import { NextResponse } from "next/server"

// In-memory storage for RSVPs (in production, use a database)
const rsvpList: Array<{
  fullName: string
  confirmedAt: string
}> = []

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fullName, confirmedAt } = body

    if (!fullName) {
      return NextResponse.json(
        { error: "Nome completo é obrigatório" },
        { status: 400 }
      )
    }

    // Store the RSVP locally
    const rsvpData = {
      fullName,
      confirmedAt: confirmedAt || new Date().toISOString(),
    }
    
    rsvpList.push(rsvpData)

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
        // Silently ignore webhook failures - RSVP is already saved locally
      } catch {
        // Silently ignore webhook errors - RSVP is already saved locally
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

// GET endpoint to retrieve all RSVPs (for testing/admin purposes)
export async function GET() {
  return NextResponse.json({
    total: rsvpList.length,
    confirmations: rsvpList,
  })
}
