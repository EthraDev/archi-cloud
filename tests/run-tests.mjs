import { spawn } from 'child_process'
import fetch from 'node-fetch'

const WEBHOOK_URL = 'https://webhook.site/098ea412-331c-448b-930f-18050d24429e'

const vitest = spawn('npx', ['vitest', 'run'], { shell: true })

let output = ''

vitest.stdout.on('data', (data) => {
  output += data.toString()
  process.stdout.write(data)
})

vitest.stderr.on('data', (data) => {
  output += data.toString()
  process.stderr.write(data)
})

vitest.on('close', async (code) => {
  const failed = output.includes('FAIL')

  if (failed) {
    console.log('❌ Tests échoués – envoi du webhook Zapier...')

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: '🚨 Tests échoués dans Amplify CI !',
          timestamp: new Date().toISOString(),
          details: output.slice(0, 1000), // envoie les 1000 premiers caractères du log
        }),
      })
      console.log('✅ Webhook envoyé à Zapier')
    } catch (err) {
      console.error('❌ Échec de l’envoi du webhook :', err)
    }

    process.exit(0) // ou 1 pour stopper le build
  } else {
    console.log('✅ Tous les tests ont réussi.')
    process.exit(0)
  }
})
