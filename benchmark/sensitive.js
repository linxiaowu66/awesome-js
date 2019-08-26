const { makeSensitiveMap, checkSensitiveWord } = require('../dist/help')
const FastScanner = require('fastscan')
const fs = require('fs')
const path  = require('path')

function loadOneHundredThousandSentences() {
  const data = fs.readFileSync(path.resolve(__dirname, './sensitiveWords.txt'), 'utf8')
  const wordsArray = data.trim().split('|')
  console.log(`Now we have sensitive words length is: [${wordsArray.length}]`)
  return wordsArray
}

function loadOneHundredThousandWords() {
  const data = fs.readFileSync(path.resolve(__dirname, './beCheckedWords.txt'), 'utf8')
  const words = data.trim()
  console.log(`Now we have checking words length is: [${words.length}]`)
  return words
}

function benchmarkForDFAalgorithm() {
  const wordsArray = loadOneHundredThousandSentences()
  const before = process.memoryUsage()
  console.time('DFA algorithm load sensitive map tree')
  const wordMaps = makeSensitiveMap(wordsArray)
  console.timeEnd('DFA algorithm load sensitive map tree')
  const after = process.memoryUsage()
  console.log("DFA algorithm build tree of %d words costs rss=%dM heapTotal=%dM heapUsed=%dM", wordsArray.length, (after.rss-before.rss) >> 20, (after.heapTotal - before.heapTotal) >> 20, (after.heapUsed - before.heapUsed) >> 20)

  const toBeCheckedWords = loadOneHundredThousandWords()
  console.time('DFA algorithm check one hundred thousand words')
  checkSensitiveWord(toBeCheckedWords, false, wordMaps)
  console.timeEnd('DFA algorithm check one hundred thousand words')

}

function benchmarkForACalgorithm() {
  const wordsArray = loadOneHundredThousandSentences()
  const before = process.memoryUsage()
  console.time('AC algorithm load sensitive map tree')
  const scanner = new FastScanner(wordsArray)
  console.timeEnd('AC algorithm load sensitive map tree')
  const after = process.memoryUsage()
  console.log("AC algorithm build tree of %d words costs rss=%dM heapTotal=%dM heapUsed=%dM", wordsArray.length, (after.rss-before.rss) >> 20, (after.heapTotal - before.heapTotal) >> 20, (after.heapUsed - before.heapUsed) >> 20)

  const toBeCheckedWords = loadOneHundredThousandWords()
  console.time('AC algorithm check one hundred thousand words')
  scanner.search(toBeCheckedWords)
  console.timeEnd('AC algorithm check one hundred thousand words')
}

// 内存的测试需要单独跑，否则二者之间会有相互冲突的情况
// benchmarkForDFAalgorithm()
// benchmarkForACalgorithm()
