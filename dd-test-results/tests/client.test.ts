import * as client from '../src/client'
jest.mock('@actions/http-client')

describe('client-tests', () => {
    const baseURL = 'https://test.com'
    let httpSpy: jest.SpyInstance
    let ddClient: client.DataDogClient

    beforeEach(() => {
        ddClient = new client.DataDogClient('123', baseURL)
        httpSpy = jest.spyOn(ddClient.client, 'post')
    })

    afterEach(() => {
        httpSpy.mockClear()
        jest.clearAllMocks()
    })

    it('should send metrics with correct path and body', async () => {
        const now = Date.now() / 1000
        const m = { type: 'count', name: 'test.count', value: 1, tags: ['test:tag'], host: 'zendesk.com' }
        try {
            await ddClient.sendMetrics([m])
        } catch (err) { }

        expect(httpSpy).toHaveBeenCalledWith(
            `${baseURL}/api/v1/series`,
            JSON.stringify({
                series: [{
                    metric: m.name,
                    points: [[now, m.value]],
                    type: m.type,
                    host: m.host,
                    tags: m.tags
                }]
            })
        )
    })

    it('should send events with correct path and body', async () => {
        const now = Date.now() / 1000
        const e = { title: 'test', text: 'test', alert_type: "test.type", tags: ['test:tag'], host: 'zendesk.com' }
        try {
            await ddClient.sendEvents([e])
        } catch (err) { }

        expect(httpSpy).toHaveBeenCalledWith(
            `${baseURL}/api/v1/events`,
            JSON.stringify(e)
        )
    })

    it('should send service checks with correct path and body', async () => {
        const now = Date.now() / 1000
        const sc = { check: 'test.check', status: 0, message: "test", tags: ['test:tag'], host_name: 'zendesk' }
        try {
            await ddClient.sendServiceChecks([sc])
        } catch (err) { }

        expect(httpSpy).toHaveBeenCalledWith(
            `${baseURL}/api/v1/check_run`,
            JSON.stringify(sc)
        )
    })

})

