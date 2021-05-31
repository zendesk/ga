// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface TestRun {
  result: string
  duration: number
  testSuite: TestSuite[]
}

interface TestSuite {
  name: string
  testCases: TestCase[]
}

interface TestCase {
  name: string
  classname: string
  duration: number
  result: string
}