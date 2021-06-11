import xml2js from 'xml2js'
import xpath from 'xml2js-xpath'
import fs from 'fs'

export async function parse(testResultPath: string): Promise<TestResults> {
  const xmlString = await fs.promises.readFile(testResultPath)

  const testResults: TestResults = {
    testSuites: []
  }

  xml2js.parseString(xmlString, function (err, json) {
    const testCasesMatches = xpath.find(json, '//test-case')
    testCasesMatches.forEach(function (testCaseItem) {
      appendToTestSuite(testCaseItem['$'], testResults.testSuites)
    })
  })

  return testResults
}

function parseTestCase(testCaseElement): TestCase {
  const testCase: TestCase = {
    name: testCaseElement.name,
    duration: Number(parseFloat(testCaseElement.duration).toFixed(2)),
    result: testCaseElement.result == 'Passed' ? 'succeeded' : 'failed'
  }
  return testCase
}

function appendToTestSuite(testCaseElement, testSuites): void {
  const testCaseParsed = parseTestCase(testCaseElement)
  const testSuiteName = testCaseElement.fullname.replace(
    testCaseElement.name,
    ''
  )
  const existingTestSuite = testSuites.find(({name}) => name === testSuiteName)

  if (existingTestSuite === undefined) {
    const newTestSuite: TestSuite = {name: testSuiteName, testCases: []}
    newTestSuite.testCases.push(testCaseParsed)
    testSuites.push(newTestSuite)
  } else {
    existingTestSuite.testCases.push(testCaseParsed)
  }
}
