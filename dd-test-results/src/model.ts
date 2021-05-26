// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface TestResults {
  testSuites: TestSuite[]
}

interface TestSuite {
  name: string
  testCases: TestCase[]
}

interface TestCase {
  name: string
  duration: number
  result: string
}
