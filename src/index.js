const jsonld = require('jsonld')
const fs = require('fs')
const path = require('path')

async function main() {
  const cwd = process.cwd()
  const outDir = path.join(cwd, 'json')

  const doc = {
    'http://schema.org/name': 'Manu Sporny',
    'http://schema.org/url': { '@id': 'http://manu.sporny.org/' },
    'http://schema.org/image': { '@id': 'http://manu.sporny.org/images/manu.png' }
  }

  const context = {
    'name': 'http://schema.org/name',
    'homepage': { '@id': 'http://schema.org/url', '@type': '@id' },
    'image': { '@id': 'http://schema.org/image', '@type': '@id' }
  }

  // compact
  const compacted = await jsonld.compact(doc, context)
  fs.writeFileSync(path.join(outDir, 'compact.json'), JSON.stringify(compacted, null, 2))

  // expand
  const expanded = await jsonld.expand(compacted)
  fs.writeFileSync(path.join(outDir, 'expand.json'), JSON.stringify(expanded, null, 2))

  // flatten
  const flattened = await jsonld.flatten(doc)
  fs.writeFileSync(path.join(outDir, 'flatten.json'), JSON.stringify(flattened, null, 2))
}

main()
