import * as junitTestResultParser from './junit-test-result-parser'
import * as nunitTestResultParser from './nunit-test-result-parser'
import * as core from '@actions/core'
import {tagTestResults} from './tagging'
import {DataDogClient, Metric} from './client'

function buildMetrics(taggedTestCases: TaggedTestCase[]): Metric[] {
  console.log(taggedTestCases)
  return []
}

function getsupportedFrameworks(): string[] {
  return ['junit', 'nunit']
}

async function main(
  testFramework: string,
  testResultsFile: string,
  tagsFile: string,
  client: DataDogClient
): Promise<void> {
  if (!getsupportedFrameworks().includes(testFramework)) {
    throw new Error(testFramework + ' is not supported')
  }
  let testResults: TestResults

  switch (testFramework) {
    case 'junit':
      testResults = await junitTestResultParser.parse(testResultsFile)
      break
    case 'nunit':
      testResults = await nunitTestResultParser.parse(testResultsFile)
      break
    default:
      throw new Error(testFramework + ' is not supported')
  }
  const taggedTestCases = tagTestResults(testResults, tagsFile)
  const metrics = buildMetrics(taggedTestCases)
  client.sendMetrics(metrics)
}

main(
  core.getInput('test-framework', {required: true}),
  core.getInput('test-report', {required: true}),
  core.getInput('test-results-tags', {required: true}),
  new DataDogClient(core.getInput('dd-api-key', {required: true}))
)
