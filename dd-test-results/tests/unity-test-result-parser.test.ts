import path from 'path'
import * as parser from '../src/nunit-test-result-parser'

describe('NUnit Test Result Parser', () => {
  it('should parse unity integration test results', done => {
    parser
      .parse(path.join(__dirname, 'resources', 'unity-nunit-test-results.xml'))
      .then(r => {
        expect.objectContaining({
          testSuites: expect.arrayContaining([
            expect.objectContaining({
              testCases: expect.arrayContaining([
                expect.objectContaining({
                  name: 'GetArticleById_ReturnsValidResponse',
                  result: 'succeeded'
                })
              ])
            })
          ])
        })
        done()
      })
      .catch(e => {
        done(e)
      })
  })
})
