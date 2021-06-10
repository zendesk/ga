import path from 'path'
import {tagTestResults} from '../src/tagging'

describe('tagging', () => {
  it('should decorate test results with tags', () => {
    const testCase = {
      name: 'sampleTestName',
      duration: 0,
      result: 'succeeded'
    }
    const testResults = {
      testSuites: [
        {
          name: 'com.example.SampleTests',
          testCases: [testCase]
        }
      ]
    }

    const tagsFile = path.join(__dirname, 'resources', 'test-results-tags.json')
    const taggedTestCases = tagTestResults(
      ['platform:android'],
      testResults,
      tagsFile
    )

    expect(taggedTestCases).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...testCase,
          tags: {
            platform: 'android',
            team: 'c',
            test_case: 'sampleTestName',
            test_classification: 'smoke',
            test_suite: 'sample_tests'
          }
        })
      ])
    )
  })
})
