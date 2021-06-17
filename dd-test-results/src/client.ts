import * as core from '@actions/core'
import * as http from '@actions/http-client'

export interface Metric {
  type: string
  name: string
  value: number
  tags: string[]
  host: string
}

export interface Event {
  title: string
  text: string
  alert_type: string
  tags: string[]
  host: string
}

export interface ServiceCheck {
  check: string
  status: number
  message: string
  tags: string[]
  host_name: string
}

export class DataDogClient {
  private _client: http.HttpClient
  private _baseURL: string

  constructor(apiKey: string, baseURL?: string) {
    this._client = new http.HttpClient('dd-http-client', [], {
      headers: {
        'DD-API-KEY': apiKey,
        'Content-Type': 'application/json'
      }
    })
    this._baseURL = baseURL ?? 'https://api.datadoghq.com'
  }

  async sendMetrics(metrics: Metric[]): Promise<void> {
    const s = {series: Array()}
    const now = Date.now() / 1000

    for (const m of metrics) {
      s.series.push({
        metric: m.name,
        points: [[now, m.value]],
        type: m.type,
        host: m.host,
        tags: m.tags
      })
    }

    core.debug(`About to send ${metrics.length} metrics`)

    const response: http.HttpClientResponse = await this._client.post(
      `${this._baseURL}/api/v1/series`,
      JSON.stringify(s)
    )

    if (
      response === undefined ||
      response.message.statusCode === undefined ||
      response.message.statusCode >= 400
    ) {
      throw new Error(`HTTP request failed`)
    }
  }

  async sendEvents(events: Event[]): Promise<void> {
    let errors = 0

    core.debug(`About to send ${events.length} events`)
    for (const ev of events) {
      const response: http.HttpClientResponse = await this._client.post(
        `${this._baseURL}/api/v1/events`,
        JSON.stringify(ev)
      )
      if (
        response === undefined ||
        response.message.statusCode === undefined ||
        response.message.statusCode >= 400
      ) {
        errors++
        core.error(`HTTP request failed`)
      }
    }

    if (errors > 0) {
      throw new Error(`Failed sending ${errors} out of ${events.length} events`)
    }
  }

  async sendServiceChecks(serviceChecks: ServiceCheck[]): Promise<void> {
    let errors = 0

    core.debug(`About to send ${serviceChecks.length} service checks`)
    for (const sc of serviceChecks) {
      const response: http.HttpClientResponse = await this._client.post(
        `${this._baseURL}/api/v1/check_run`,
        JSON.stringify(sc)
      )
      if (
        response === undefined ||
        response.message.statusCode === undefined ||
        response.message.statusCode >= 400
      ) {
        errors++
        core.error(`HTTP request failed`)
      }
    }

    if (errors > 0) {
      throw new Error(
        `Failed sending ${errors} out of ${serviceChecks.length} events`
      )
    }
  }

  get client(): http.HttpClient {
    return this._client
  }
}
