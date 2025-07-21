import { spawn } from 'child_process'
import fetch from 'node-fetch'

const WEBHOOK_URL = 'https://your-webhook-url-here'

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
    console.log('❌ Tests échoués – envoi du webhook...')

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: '🚨 **Tests échoués dans Amplify !** ❌',
        }),
      })
      console.log('✅ Webhook envoyé')
    } catch (err) {
      console.error('❌ Échec de l’envoi du webhook :', err)
    }

    process.exit(0) // ✅ on continue le build malgré l’échec
  } else {
    console.log('✅ Tous les tests ont réussi.')
    process.exit(0)
  }
})
