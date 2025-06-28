import { execSync } from 'child_process'
import fs from 'fs'
import http from 'http'
import https from 'https'
import path from 'path'

const OUTPUT_ROOT = './src/entities/types'
const TEMP_GEN_DIR = './.tmp-generated'
const INPUT_FILE = path.join(TEMP_GEN_DIR, 'data-contracts.ts')
const OPENAPI_FILE = './openapi.json'
const SWAGGER_URL = `http://dam-api.whiteds.net/swagger.json`

function fetchJsonToFile(url, filePath) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http
    client
      .get(url, res => {
        if (res.statusCode !== 200) {
          reject(new Error(`Failed to fetch ${url}: ${res.statusCode}`))
          return
        }
        let data = ''
        res.on('data', chunk => (data += chunk))
        res.on('end', () => {
          fs.writeFileSync(filePath, data)
          resolve()
        })
      })
      .on('error', reject)
  })
}

async function generate() {
  await fetchJsonToFile(SWAGGER_URL, OPENAPI_FILE)
  console.log(`✅ Swagger JSON saved to ${OPENAPI_FILE}`)

  execSync(
    `npx swagger-typescript-api generate \
      --name Api \
      --output ${TEMP_GEN_DIR} \
      --templates ./templates/full \
      --path ${OPENAPI_FILE} \
      --modular`,
    { stdio: 'inherit' }
  )

  const openapi = JSON.parse(fs.readFileSync(OPENAPI_FILE, 'utf-8'))
  const schemas = openapi.components?.schemas || {}

  const schemaTagMap = Object.entries(schemas).reduce((acc, [name, schema]) => {
    const tag = schema['x-tag'] || 'shared'
    acc[name] = tag
    return acc
  }, {})

  let content = fs.readFileSync(INPUT_FILE, 'utf-8')

  for (const [typeName, tag] of Object.entries(schemaTagMap)) {
    const regex = new RegExp(`(export (interface|type) ${typeName}\\b)`)
    content = content.replace(regex, `/** @x-tag ${tag} */\n$1`)
  }

  fs.rmSync(OUTPUT_ROOT, { recursive: true, force: true })

  fs.writeFileSync(INPUT_FILE, content, 'utf-8')

  if (!fs.existsSync(OUTPUT_ROOT)) fs.mkdirSync(OUTPUT_ROOT, { recursive: true })

  const blocks = content.split(/^\/\*\* @x-tag ([\w-]+) \*\/\n(?=export (interface|type) )/gm)
  for (let i = 1; i < blocks.length; i += 3) {
    const tag = blocks[i]
    const typeBlock = blocks[i + 2]
    const filePath = path.join(OUTPUT_ROOT, `${tag}.ts`)
    fs.appendFileSync(filePath, typeBlock.trim() + '\n\n')
  }

  fs.rmSync(TEMP_GEN_DIR, { recursive: true, force: true })
  fs.rmSync(OPENAPI_FILE, { recursive: true, force: true })
}

generate().catch(err => {
  console.error('❌', err)
  process.exit(1)
})
