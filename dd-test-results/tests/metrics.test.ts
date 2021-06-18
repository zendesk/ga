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
        type: 'count',
        name: 'sample.tests.count',
        value: 1,
        tags: [
          'test_type:api',
          'test_case:custom_send_message_test_case_name_here',
          'success:true'
        ],
        host: 'acme',
        interval: 0
      },
      {
        type: 'gauge',
        name: 'sample.tests.avg',
        value: 42 * 1000,
        tags: [
          'test_type:api',
          'test_case:custom_send_message_test_case_name_here',
          'success:true'
        ],
        host: 'acme',
        interval: 0
      },
      {
        type: 'count',
        name: 'sample.tests.count',
        value: 1,
        tags: [
          'test_type:browser',
          'success:false',
          'test_case:receive_message'
        ],
        host: 'acme',
        interval: 0
      },
      {
        type: 'gauge',
        name: 'sample.tests.avg',
        value: 12 * 1000,
        tags: [
          'test_type:browser',
          'success:false',
          'test_case:receive_message'
        ],
        host: 'acme',
        interval: 0
      }
    ])
  })
})
