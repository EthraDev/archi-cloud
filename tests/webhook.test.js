import fetch from 'node-fetch'

const WEBHOOK_URL = 'https://webhook.site/098ea412-331c-448b-930f-18050d24429e'

async function sendSuccessNotification() {
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: '✅ Tous les tests ont réussi !',
        timestamp: new Date().toISOString()
      }),
    })
    if (!res.ok) {
      console.error('Erreur en envoyant la notif:', res.statusText)
      process.exit(1)
    }
    console.log('✅ Notif succès envoyée')
    process.exit(0)
  } catch (err) {
    console.error('Erreur lors de l\'envoi:', err)
    process.exit(1)
  }
}

sendSuccessNotification()
