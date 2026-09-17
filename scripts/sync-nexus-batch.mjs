#!/usr/bin/env node
/**
 * Sync Nexus landings in batches to avoid overwhelming the system.
 * Usage: 
 *   node scripts/sync-nexus-batch.mjs [batch-size] [start-index]
 * 
 * Examples:
 *   node scripts/sync-nexus-batch.mjs 500 0     # First 500
 *   node scripts/sync-nexus-batch.mjs 500 500   # Next 500 (500-999)
 *   node scripts/sync-nexus-batch.mjs 500 1000  # Next 500 (1000-1499)
 */
import { execSync } from 'node:child_process'

const BATCH_SIZE = parseInt(process.argv[2] || '500', 10)
const START_INDEX = parseInt(process.argv[3] || '0', 10)
const END_INDEX = START_INDEX + BATCH_SIZE

console.log(`\n🔄 Syncing Nexus landings: ${START_INDEX} to ${END_INDEX - 1}`)
console.log(`   Batch size: ${BATCH_SIZE}`)
console.log(`   Starting from: ${START_INDEX}\n`)

try {
  // Set environment variables for the batch
  const env = {
    ...process.env,
    NEXUS_BATCH_SIZE: String(BATCH_SIZE),
    NEXUS_BATCH_START: String(START_INDEX),
    SEO_SYNC_FORCE: '0', // Don't force full sync in batches
  }

  // Run the sync
  execSync('npm run build:nexus', {
    stdio: 'inherit',
    env,
    encoding: 'utf8',
  })

  console.log(`\n✅ Batch ${START_INDEX}-${END_INDEX - 1} completed!`)
  console.log(`\n💡 Next batch: node scripts/sync-nexus-batch.mjs ${BATCH_SIZE} ${END_INDEX}`)

} catch (error) {
  console.error(`\n❌ Batch ${START_INDEX}-${END_INDEX - 1} failed:`, error.message)
  process.exit(1)
}
