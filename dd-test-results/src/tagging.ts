function tagTestCases(
  tags: string[],
  testResults: TestResults,
  testResultsTags: TestResultsTags
): TaggedTestCase[] {
  return testResults.testSuites
    .map(testSuite =>
      testSuite.testCases.map(testCase =>
        tagTestCase(tags, testSuite, testCase, testResultsTags)
      )
    )
    .reduce((total, current) => [...total, ...current])
}

function tagTestCase(
  tags: string[],
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
      ...testSuiteTags?.tags,
      ...testCaseTags?.tags,
      ...parseTags(tags)
    }
  }
}

function parseTags(rawTags: string[]): Record<string, string> {
  const r: Record<string, string> = {}

  rawTags
    .filter(rawTag => rawTag.includes(':'))
    .forEach(rawTag => {
      const key = rawTag.split(':')[0]
      const value = rawTag.substring(key.length + 1)
      r[key] = value
    })

  return r
}

import fs from 'fs'

export function loadTagsFromFile(filePath: string): TestResultsTags {
  const data = fs.readFileSync(filePath, 'utf8')
  const json = JSON.parse(data)
  return json
}

export function tagTestResults(
  tags: string[],
  testResults: TestResults,
  tagsFile: string
): TaggedTestCase[] {
  return tagTestCases(tags, testResults, loadTagsFromFile(tagsFile))
}
