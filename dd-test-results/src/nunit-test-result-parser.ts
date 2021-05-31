import fs from 'fs'
import xml2js from 'xml2js'

export async function parse(testResultPath: string): Promise<TestRun> {
  const xmlString = await fs.promises.readFile(testResultPath);
  const result = await new xml2js.Parser().parseStringPromise(xmlString)
  console.log(result);
  return {result: result.result, duration: result.duration, testSuite: result.testSuite}
}
