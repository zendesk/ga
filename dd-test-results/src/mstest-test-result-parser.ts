import xml2js from 'xml2js'
import xpath from 'xml2js-xpath'
import fs from 'fs'

export async function parse(testResultPath: string): Promise<TestResults> {
  const xmlString = await fs.promises.readFile(testResultPath)

  const testResults: TestResults = {
    testSuites: []
  }

  new xml2js.Parser({explicitArray: false, mergeAttrs: true}).parseString(
    xmlString,
    function (err, json) {
      const foundTestCases = xpath.find(json, '//UnitTestResult')
      const foundTestMethods = xpath.find(json, '//TestMethod')

      foundTestCases.forEach(function (tc) {
        const testCase = parseTestCase(tc)

        // find test suite name
        const matchingTestSuite = foundTestMethods.find(
          ({name}) => name === testCase.name
        )
        const testSuiteName = matchingTestSuite.className
        // Check if test suite already exists
        const existingTestSuite = testResults.testSuites.find(
          ({name}) => name === testSuiteName
        )
        // if it does not exist, create a new one and then append the test case
        if (existingTestSuite === undefined) {
          const newTestSuite: TestSuite = {name: testSuiteName, testCases: []}
          newTestSuite.testCases.push(testCase)
          testResults.testSuites.push(newTestSuite)
        } else {
          // if exists, append test case to it
          existingTestSuite.testCases.push(testCase)
        }
      })
    }
  )

  return testResults
}

function parseTestCase(testCaseElement): TestCase {
  const testCase: TestCase = {
    name: testCaseElement.testName,
    duration: convertDurationToSeconds(testCaseElement.duration),
    result: testCaseElement.outcome
  }
  return testCase
}

function convertDurationToSeconds(testCaseDuration: string): number {
  // Remove milliseconds
  const hms = testCaseDuration.split('.')[0]
  const [hours, minutes, seconds] = hms.split(':')

  // Note: +var converts string to number
  return +hours * 60 * 60 + +minutes * 60 + +seconds
}
