import * as core from '@actions/core'
import {DataDogClient} from './client'
import {run} from './run'
import {findTestReports} from './search'

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
