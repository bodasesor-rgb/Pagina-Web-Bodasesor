/**
 * Git pre-commit hook: Auto-generate WebP for staged images.
 * Works cross-platform (Windows, Mac, Linux).
 */
import { execSync } from 'node:child_process'

console.log('🔍 Checking for new/modified images...')

try {
  // Get list of staged image files
  const stagedFiles = execSync('git diff --cached --name-only --diff-filter=ACM', {
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'ignore']
  }).trim()

  if (!stagedFiles) {
    console.log('✅ No new images to process')
    process.exit(0)
  }

  const imageFiles = stagedFiles
    .split('\n')
    .filter(file => 
      file.startsWith('public/images/') || file.startsWith('public\\images\\')
    )
    .filter(file => /\.(png|jpe?g)$/i.test(file))

  if (imageFiles.length === 0) {
    console.log('✅ No new images to process')
    process.exit(0)
  }

  console.log(`📸 Found ${imageFiles.length} new/modified image(s), generating WebP...`)
  imageFiles.forEach(f => console.log(`  - ${f}`))

  // Generate WebP versions
  execSync('npm run generate:webp', {
    encoding: 'utf8',
    stdio: 'inherit'
  })

  // Stage the generated WebP files
  execSync('git add public/images/**/*.webp', {
    encoding: 'utf8',
    stdio: 'inherit'
  })

  console.log('✅ WebP images generated and staged')
} catch (error) {
  console.error('❌ Error in pre-commit hook:', error.message)
  process.exit(1)
}
