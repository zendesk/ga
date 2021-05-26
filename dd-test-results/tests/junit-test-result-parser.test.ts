import path from 'path'
import * as parser from '../src/junit-test-result-parser'

describe('JUnit Test Result Parser', () => {
  it('should parse Android JUnit4 test results', done => {
    parser
      .parse(
        path.join(__dirname, 'resources', 'android-junit-test-results.xml')
      )
      .then(r => {
        expect(r).toEqual(
          expect.objectContaining({
            testSuites: expect.arrayContaining([
              expect.objectContaining({
                name: 'com.example.SampleTests',
                testCases: expect.arrayContaining([
                  expect.objectContaining({
                    name: 'sampleTestName',
                    duration: 1.4,
                    result: 'succeeded'
                  })
                ])
              })
            ])
          })
        )
        done()
      })
      .catch(e => {
        done(e)
      })
  })

  it('should parse iOS test results', done => {
    parser
      .parse(path.join(__dirname, 'resources', 'ios-xctest-test-results.xml'))
      .then(r => {
        expect(r).toEqual(
          expect.objectContaining({
            testSuites: expect.arrayContaining([
              expect.objectContaining({
                name: 'MessagingIntegration_SPMAPITests.ConversationKitAPIContractTests',
                testCases: expect.arrayContaining([
                  expect.objectContaining({
                    name: 'testItCanSetupConversationKit',
                    duration: 0.49,
                    result: 'succeeded'
                  }),
                  expect.objectContaining({
                    name: 'testItCreatesAnonymousUser',
                    duration: 0.515,
                    result: 'succeeded'
                  }),
                  expect.objectContaining({
                    name: 'testItGetsConversation',
                    duration: 0,
                    result: 'failed'
                  })
                ])
              }),
              expect.objectContaining({
                name: 'MessagingIntegration_SPMAPITests.MessagingAPIContractTests',
                testCases: expect.arrayContaining([
                  expect.objectContaining({
                    name: 'testItInitializesMessaging',
                    duration: 1.314,
                    result: 'succeeded'
                  })
                ])
              })
            ])
          })
        )
        done()
      })
      .catch(e => {
        done(e)
      })
  })
})
