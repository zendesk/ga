import path from 'path'
import * as parser from '../src/nunit-test-result-parser'

describe('NUnit Test Result Parser', () => {
  it('should parse Unity Test Runner test results', done => {
    parser
      .parse(
        path.join(__dirname, 'resources', 'unity-nunit-test-results.xml')
      )
      .then(r => {
        console.log(r);
        done()
      })
      .catch(e => {
        done(e)
      })
  })
})


// describe('NUnit Test Result Parser', () => {
//   it('should parse Unity Test Runner test results', done => {
//     parser
//       .parse(
//         path.join(__dirname, 'resources', 'unity-nunit-test-results.xml')
//       )
//       .then(r => {
//         expect(r).toEqual(
//           expect.objectContaining({
//             testSuites: expect.arrayContaining([
//               expect.objectContaining({
//                 name: 'com.example.SampleTests',
//                 testCases: expect.arrayContaining([
//                   expect.objectContaining({
//                     name: 'sampleTestName',
//                     duration: 1.4,
//                     result: 'succeeded'
//                   })
//                 ])
//               })
//             ])
//           })
//         )
//         done()
//       })
//       .catch(e => {
//         done(e)
//       })
//   })
// })