// eslint-disable-next-line @typescript-eslint/no-require-imports
import glob = require('@actions/glob')
import {stat} from 'fs'
import {promisify} from 'util'
const stats = promisify(stat)

export async function findTestReports(
  testReportFile: string
): Promise<string[]> {
  const globber = await glob.create(testReportFile)
  const searchResults = await globber.glob()
  const testReportFiles = new Array<string>()

  for (const searchResult of searchResults) {
    const fileStats = await stats(searchResult)

    if (!fileStats.isDirectory()) {
      testReportFiles.push(searchResult)
    }
  }

  return testReportFiles
}
