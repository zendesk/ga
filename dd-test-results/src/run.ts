import * as junitTestResultParser from './junit-test-result-parser'
import * as nunitTestResultParser from './nunit-test-result-parser'
import {tagTestResults} from './tagging'
import {DataDogClient} from './client'
import {buildAllMetrics} from './metrics'

interface Inputs {
  metricName: string
  host: string
  testFramework: string
  testReportFile: string
  testTagsFile: string
}

export async function run(
  client: DataDogClient,
  inputs: Inputs
): Promise<void> {
  if (!getsupportedFrameworks().includes(inputs.testFramework)) {
    throw new Error(inputs.testFramework + ' is not supported')
  }
  let testResults: TestResults

  switch (inputs.testFramework) {
    case 'junit':
      testResults = await junitTestResultParser.parse(inputs.testReportFile)
      break
    case 'nunit':
      testResults = await nunitTestResultParser.parse(inputs.testReportFile)
      break
    default:
      throw new Error(inputs.testFramework + ' is not supported')
  }
  const taggedTestCases = tagTestResults(testResults, inputs.testTagsFile)
  const metrics = buildAllMetrics(
    taggedTestCases,
    inputs.metricName,
    inputs.host
  )

  client.sendMetrics(metrics)
}

function getsupportedFrameworks(): string[] {
  return ['junit', 'nunit']
}
