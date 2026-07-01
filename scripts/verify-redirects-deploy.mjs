#!/usr/bin/env node
/** Re-export for build pipeline — see guard-redirects.mjs */
import { guardDistArtifacts } from './guard-redirects.mjs'

const { ruleCount, mapEntries } = guardDistArtifacts()
console.log(`✓ Redirects OK: ${ruleCount} rules in dist/_redirects, ${mapEntries} map entries`)
