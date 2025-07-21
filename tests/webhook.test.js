import fetch from 'node-fetch'

const WEBHOOK_URL = 'https://webhook.site/098ea412-331c-448b-930f-18050d24429e'  // Remplace par ton URL

describe('Webhook connectivity', () => {
  it('envoie un message de test au webhook', async () => {
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: '✅ Les tests fonctionnent !',
        timestamp: new Date().toISOString(),
      }),
    })

    expect(res.ok).toBe(true)
  }, 10000) // timeout 10s pour être safe
})
