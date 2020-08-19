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
- `branch`: Branch name for commit (optional default: `master`)
- `message`: Human readable message to pass onto Samson (optional)

## Examples

Within a workflow, an inbound webhook step only triggered for the `master` branch:

```yaml
steps:
  - name: Deploy build
    if: github.ref == 'refs/heads/master'
    uses: zendesk/ga/samson-inbound-webhook@v2
    with:
      webhook-url: https://SAMSON.HOSTNAME/integrations/generic/TOKEN
      message: Triggered deployment
```
