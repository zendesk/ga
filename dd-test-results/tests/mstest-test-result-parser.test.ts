import path from 'path'
import * as parser from '../src/mstest-test-result-parser'

describe('MSTest Test Result Parser', () => {
  it('should parse unity ui test results', done => {
    parser
      .parse(path.join(__dirname, 'resources', 'unity-mstest-test-results.xml'))
      .then(r => {
        // Expect 1 test suite with name "ui"
        expect(r.testSuites.length).toEqual(2)
        expect(r.testSuites[0].name).toEqual(
          'UnityUITests.Tests.RequestUiTestSuite'
        )
        expect(r.testSuites[1].name).toEqual(
          'UnityUITests.Tests.HelpCenterUiTestSuite'
        )
        // Expect 2 test cases, for each test suite
        expect(r.testSuites[0].testCases.length).toEqual(1)
        expect(r.testSuites[1].testCases.length).toEqual(1)
        // First test case
        expect(r.testSuites[0].testCases[0].name).toEqual(
          'CreateNewTicket_VerifyTicketShownInRequestList'
        )
        expect(r.testSuites[0].testCases[0].duration).toEqual(34)
        expect(r.testSuites[0].testCases[0].result).toEqual('Passed')
        // Second test case
        expect(r.testSuites[1].testCases[0].name).toEqual(
          'OpenHelpCenter_OpenArticle_VerifyContentsDisplayed'
        )
        expect(r.testSuites[1].testCases[0].duration).toEqual(47)
        expect(r.testSuites[1].testCases[0].result).toEqual('Passed')
        done()
      })
      .catch(e => {
        done(e)
      })
  })
})
