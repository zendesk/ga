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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface TaggedTestCase extends TestCase {
  tags: Record<string, unknown>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface TestResultsTags {
  tags: Record<string, unknown>
  suites: TestSuiteTags[]
}

interface TestSuiteTags {
  name: string
  tags: Record<string, unknown>
  cases: TestCaseTags[]
}

interface TestCaseTags {
  name: string
  tags: Record<string, unknown>
}
