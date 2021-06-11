import {findTestReports} from '../src/search'

describe('search', () => {
  it('should find README', async () => {
    const searchResults = await findTestReports('README.md')
    expect(searchResults).toContain(process.cwd() + '/README.md')
  })
})
