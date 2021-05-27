import * as junitTestResultParser from './junit-test-result-parser'
import core from '@actions/core'
import {tagTestResults} from './tagging'
import {DataDogClient, Metric} from './client'

function buildMetrics(taggedTestCases: TaggedTestCase[]): Metric[] {
  console.log(taggedTestCases)
  return []
}

async function main(
  junitTestResultsFile: string,
  tagsFile: string,
  client: DataDogClient
): Promise<void> {
  const testResults = await junitTestResultParser.parse(junitTestResultsFile)
  const taggedTestCases = tagTestResults(testResults, tagsFile)
  const metrics = buildMetrics(taggedTestCases)
  client.sendMetrics(metrics)
}

main(
  core.getInput('junit-test-results', {required: true}),
  core.getInput('test-results-tags', {required: true}),
  new DataDogClient(core.getInput('dd-api-key', {required: true}))
)
