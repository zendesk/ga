import parser from 'junitxml-to-javascript'

export async function parse(testResultPath: string): Promise<TestResults> {
  const promise = new parser().parseXMLFile(testResultPath)
  const result = await promise
  return {testSuites: result.testsuites}
}
