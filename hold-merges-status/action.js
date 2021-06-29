const core = require('@actions/core')
const httpm = require('@actions/http-client')
const process = require('process')

const HOLD_MERGES_BASE_URL = 'http://hold-merges.internaltools-staging-use1.zende.sk'

async function fetchStatus() {
  const repo = core.getInput('repo') || process.env['GITHUB_REPOSITORY']
  const client = new httpm.HttpClient('hold-merges-action', undefined, { socketTimeout: 30000 });
  const response = await client.get(`${HOLD_MERGES_BASE_URL}/status/${repo}`)
  const body = await response.readBody()
  const json = {};

  try {
    json = JSON.parse(body)
  } catch (e) {
    return 'error'
  }

  return json.status
}

async function run() {
  const status = await fetchStatus()

  core.info(`Hold-merges status: ${status}`)
  core.setOutput('status', status)

  if (status == 'error') {
    core.setFailed('Error returned from server. Failing check.')
  } else if (status == 'hold' && core.getInput('fail_on_hold_status') != 'false') {
    core.setFailed('Hold status detected. Failing check.')
  }
}

try {
  run()
} catch (error) {
  core.setOutput('status', 'error')
  core.setFailed(`Action failed with error ${error}`)
}
