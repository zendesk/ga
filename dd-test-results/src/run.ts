import * as junitTestResultParser from './junit-test-result-parser'
import * as nunitTestResultParser from './nunit-test-result-parser'
import * as mstestTestResultParser from './mstest-test-result-parser'
import {tagTestResults} from './tagging'
import {DataDogClient, Metric} from './client'
import {buildAllMetrics} from './metrics'

interface Inputs {
  metricName: string
  tags: string[]
  host: string
  testFramework: string
  testReportFiles: Promise<string[]>
  testTagsFile: string
}

async function parse(
  testFramework: string,
  testReportFile: string
): Promise<TestResults> {
  switch (testFramework) {
    case 'junit':
      return await junitTestResultParser.parse(testReportFile)
    case 'nunit':
      return await nunitTestResultParser.parse(testReportFile)
    case 'mstest':
      return await mstestTestResultParser.parse(testReportFile)
    default:
      throw new Error(testFramework + ' is not supported')
  }
}

export async function run(
  client: DataDogClient,
  inputs: Inputs
): Promise<void> {
  let allMetrics: Metric[] = []

  const testReportResults = await inputs.testReportFiles

  if (testReportResults.length == 0) {
    throw new Error('Test report files not found')
  }

  for (const testReportFile of await inputs.testReportFiles) {
    console.log(`Parsing ${testReportFile}`)

    const testResults: TestResults = await parse(
      inputs.testFramework,
      testReportFile
    )

    console.log('Tagging test results...')

    const taggedTestCases = tagTestResults(
      inputs.tags,
      testResults,
      inputs.testTagsFile
    )

    console.log('Building metrics...')

    const metrics = buildAllMetrics(
      taggedTestCases,
      inputs.metricName,
      inputs.host
    )

    allMetrics = [...allMetrics, ...metrics]
  }

  console.log('Sending metrics...')

  console.log(`About to send ${allMetrics.length} allMetrics`)
  console.log(`metrics: ${JSON.stringify(allMetrics)}`)

  client.sendMetrics(allMetrics)

  console.log('Metrics sent.')
}
