# Samson inbound webhook

GitHub Action to call a Samson generic inbound webhook URL.

## Usage

```yaml
- name: Notify Samson
  uses: zendesk/ga/samson-inbound-webhook@v2
  with:
    webhook-url: https://HOSTNAME/integrations/generic/TOKEN
```

## Inputs

- `webhook-url`: The generic Samson inbound webhook URL (required)
- `message`: A human readable message to pass onto Samson (optional)

## Examples

Within a workflow, a test and release job step only triggered for a `master` branch:

``` yaml
steps:
  - name: Deploy build
    if: github.ref == 'refs/heads/master'
    uses: zendesk/ga/samson-inbound-webhook@v2
    with:
      webhook-url: https://HOSTNAME/integrations/generic/TOKEN
      message: Triggered deployment
```
