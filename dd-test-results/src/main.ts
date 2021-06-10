import * as core from '@actions/core'
import {DataDogClient} from './client'
import {run} from './run'
import glob from '@actions/glob'
import {stat} from 'fs'
import {promisify} from 'util'
const stats = promisify(stat)

async function findTestReports(testReportFile: string): Promise<string[]> {
  const globber = await glob.create(testReportFile)
  const searchResults = await globber.glob()
  const testReportFiles = new Array<string>()

  for (const searchResult of searchResults) {
    const fileStats = await stats(searchResult)

    if (!fileStats.isDirectory) {
      core.info(`Test report file found: ${searchResult}`)
      testReportFiles.push(searchResult)
    }
  }

  return testReportFiles
}

run(new DataDogClient(core.getInput('dd-api-key', {required: true})), {
  metricName: core.getInput('dd-metric-name', {required: true}),
  tags: core.getMultilineInput('dd-tags', {required: false}),
  host: core.getInput('dd-host', {required: true}),
  testFramework: core.getInput('test-framework', {required: true}),
  testReportFiles: findTestReports(
    core.getInput('test-report-file', {required: true})
  ),
  testTagsFile: core.getInput('test-tags-file', {required: true})
})
