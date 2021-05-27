function tagTestCases(
  testResults: TestResults,
  testResultsTags: TestResultsTags
): TaggedTestCase[] {
  return testResults.testSuites
    .map(testSuite =>
      testSuite.testCases.map(testCase =>
        tagTestCase(testSuite, testCase, testResultsTags)
      )
    )
    .reduce((total, current) => [...total, ...current])
}

function tagTestCase(
  testSuite: TestSuite,
  testCase: TestCase,
  testResultsTags: TestResultsTags
): TaggedTestCase {
  const testSuiteTags = testResultsTags.suites.find(
    testSuiteTags => testSuiteTags.name === testSuite.name
  )
  const testCaseTags = testSuiteTags?.cases.find(
    testCaseTags => testCaseTags.name === testCase.name
  )

  return {
    ...testCase,
    tags: {
      ...testResultsTags.tags,
      ...testSuiteTags?.tags,
      ...testCaseTags?.tags
    }
  }
}

import fs from 'fs'

export function loadTagsFromFile(filePath: string): TestResultsTags {
  const data = fs.readFileSync(filePath, 'utf8')
  const json = JSON.parse(data)
  return json
}

export function tagTestResults(
  testResults: TestResults,
  tagsFile: string
): TaggedTestCase[] {
  return tagTestCases(testResults, loadTagsFromFile(tagsFile))
}
