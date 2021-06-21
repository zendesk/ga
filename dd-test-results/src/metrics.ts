import {Metric} from './client'

export function buildAllMetrics(
  taggedTestCases: TaggedTestCase[],
  metricName: string,
  host: string
): Metric[] {
  return taggedTestCases
    .filter(ttc => ttc.result !== 'skipped')
    .map(ttc => buildMetrics(includeRequiredTags(ttc), metricName, host))
    .reduce((total, current) => [...total, ...current])
}

function buildMetrics(
  taggedTestCase: TaggedTestCase,
  metricName: string,
  host: string
): Metric[] {
  return [
    {
      type: 'count',
      name: `${metricName}.count`,
      value: 1,
      tags: Object.keys(taggedTestCase.tags).map(
        key => `${key}:${taggedTestCase.tags[key]}`
      ),
      host: host
    },
    {
      type: 'gauge',
      name: `${metricName}.avg`,
      value: taggedTestCase.duration * 1000, //converting seconds to ms
      tags: Object.keys(taggedTestCase.tags).map(
        key => `${key}:${taggedTestCase.tags[key]}`
      ),
      host: host
    }
  ]
}

function includeRequiredTags(taggedTestCase: TaggedTestCase): TaggedTestCase {
  const tags = taggedTestCase.tags
  tags['success'] = taggedTestCase.result === 'succeeded'

  if (!(`test_case` in tags)) {
    tags['test_case'] = taggedTestCase.name
  }

  return {
    ...taggedTestCase,
    tags: tags
  }
}
