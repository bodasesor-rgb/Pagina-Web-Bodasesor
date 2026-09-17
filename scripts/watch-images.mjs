#!/usr/bin/env node
/**
 * Watch for new/modified images and auto-generate WebP versions.
 * Usage: npm run watch:images (in dev mode alongside vite)
 */
import { watch } from 'node:fs'
import { join, extname, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'

const execAsync = promisify(exec)
const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const IMAGE_ROOT = join(ROOT, 'public', 'images')

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg'])
let processing = false
let queue = new Set()

console.log('👀 Watching for image changes in public/images/...')
console.log('💡 Tip: Drop new images and they will auto-convert to WebP\n')

async function processQueue() {
  if (processing || queue.size === 0) return
  
  processing = true
  const files = Array.from(queue)
  queue.clear()
  
  console.log(`\n📸 Processing ${files.length} image(s)...`)
  files.forEach(f => console.log(`  - ${f}`))
  
  try {
    const { stdout, stderr } = await execAsync('npm run generate:webp', {
      cwd: ROOT,
      encoding: 'utf8'
    })
    console.log(stdout)
    if (stderr) console.error(stderr)
    console.log('✅ WebP generation complete\n')
  } catch (error) {
    console.error('❌ Error generating WebP:', error.message)
  } finally {
    processing = false
    // Process any new items that arrived while we were working
    if (queue.size > 0) {
      setTimeout(processQueue, 500)
    }
  }
}

function scheduleProcess(filename) {
  queue.add(filename)
  // Debounce: wait 2s for more changes before processing
  clearTimeout(scheduleProcess.timer)
  scheduleProcess.timer = setTimeout(processQueue, 2000)
}

// Watch recursively
const watcher = watch(IMAGE_ROOT, { recursive: true }, (eventType, filename) => {
  if (!filename) return
  
  const ext = extname(filename).toLowerCase()
  if (!IMAGE_EXTENSIONS.has(ext)) return
  
  // Ignore changes in subdirectories we don't care about
  if (filename.includes('node_modules') || filename.includes('.git')) return
  
  if (eventType === 'change' || eventType === 'rename') {
    console.log(`📸 Detected ${eventType}: ${filename}`)
    scheduleProcess(filename)
  }
})

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Stopping image watcher...')
  watcher.close()
  process.exit(0)
})

process.on('SIGTERM', () => {
  watcher.close()
  process.exit(0)
})
