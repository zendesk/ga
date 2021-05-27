import * as core from '@actions/core'
// import * as junitTestResultParser from './junit-test-result-parser'
// import {DataDogClient} from '../src/client'

export async function run(): Promise<void> {
  try {
    // IMPLEMENTED - Get the input from action.yml
    // const apiKey: string = core.getInput('dd-api-key', {required: true})
    // const testDataPath: string = core.getInput('test-data-path', {
    //   required: true
    // })
    // const testReportPath: string = core.getInput('junit-test-report', {
    //   required: true
    // })
    // IMPLEMENTED - Create the client
    // const dataDogClient = new DataDogClient(apiKey)
    // IMPLEMENTED - Parse the test results
    // const testResults = await junitTestResultParser.parse(testReportPath)
    // TODO - Parse the test data json
    // const testData = await testDataParser.parse(testDataPath)
    // TODO - Generate metrics and service checks from testResults and testData
    // const metrics = await dataDogProcessor.getMetrics(testResults, testData)
    // const serviceChecks = await dataDogProcessor.getServiceChecks(testResults, testData)
    // IMPLEMENTED - Send the metrics and service checks
    // await dataDogClient.sendMetrics(metrics)
    // await dataDogClient.sendServiceChecks(serviceChecks)
  } catch (error) {
    core.setFailed(`Run failed: ${error.message}`)
  }
}
