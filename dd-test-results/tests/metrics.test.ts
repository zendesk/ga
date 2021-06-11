import {buildAllMetrics} from '../src/metrics'

describe('metrics', () => {
  it('should build all metrics', async () => {
    const taggedTestCases: TaggedTestCase[] = [
      {
        name: 'send_message',
        duration: 42,
        result: 'succeeded',
        tags: {
          test_type: 'api',
          test_case: 'custom_send_message_test_case_name_here'
        }
      },
      {
        name: 'receive_message',
        duration: 12,
        result: 'failed',
        tags: {test_type: 'browser'}
      }
    ]

    const metrics = buildAllMetrics(taggedTestCases, 'sample.tests', 'acme')

    expect(metrics).toEqual([
      {
        type: 'rate',
        name: 'sample.tests.count',
        value: 1,
        tags: [
          'test_type:api',
          'test_case:custom_send_message_test_case_name_here',
          'success:true'
        ],
        host: 'acme'
      },
      {
        type: 'gauge',
        name: 'sample.tests.avg',
        value: 42000,
        tags: [
          'test_type:api',
          'test_case:custom_send_message_test_case_name_here',
          'success:true'
        ],
        host: 'acme'
      },
      {
        type: 'rate',
        name: 'sample.tests.count',
        value: 1,
        tags: [
          'test_type:browser',
          'success:false',
          'test_case:receive_message'
        ],
        host: 'acme'
      },
      {
        type: 'gauge',
        name: 'sample.tests.avg',
        value: 12000,
        tags: [
          'test_type:browser',
          'success:false',
          'test_case:receive_message'
        ],
        host: 'acme'
      }
    ])
  })
})
