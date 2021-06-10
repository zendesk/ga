import * as junitTestResultParser from './junit-test-result-parser'
import * as nunitTestResultParser from './nunit-test-result-parser'
import {tagTestResults} from './tagging'
import {DataDogClient, Metric} from './client'
import {buildAllMetrics} from './metrics'

interface Inputs {
  metricName: string
  host: string
  testFramework: string
  testReportFiles: Promise<string[]>
  testTagsFile: string
}

function parse(testFramework: string, testReportFile: string): TestResults {
  switch (testFramework) {
    case 'junit':
      junitTestResultParser.parse(testReportFile)
    case 'nunit':
      nunitTestResultParser.parse(testReportFile)
    default:
      throw new Error(testFramework + ' is not supported')
  }
}

export async function run(
  client: DataDogClient,
  inputs: Inputs
): Promise<void> {
  let allMetrics: Metric[] = []

  for (const testReportFile of await inputs.testReportFiles) {
    const testResults: TestResults = parse(inputs.testFramework, testReportFile)
    const taggedTestCases = tagTestResults(testResults, inputs.testTagsFile)
    const metrics = buildAllMetrics(
      taggedTestCases,
      inputs.metricName,
      inputs.host
    )

    allMetrics = [...allMetrics, ...metrics]
  }

  client.sendMetrics(allMetrics)
}
