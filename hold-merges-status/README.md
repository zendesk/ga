# Hold-merges status check

Check with the hold-merges app to see if merging is currently allowed

## Usage

```yaml
jobs:
  check_hold_merges:
    runs-on:
      - self-hosted
      - zendesk-general
    steps:
      - uses: zendesk/checkout@v2
      - uses: zendesk/ga/hold-merges-status@v2
        with:
          repo: GITHUB_REPOSITORY
```

## Inputs

- `repo`: The name of the repo to check in hold-merges. Default: $GITHUB_REPOSITORY
- `fail_on_hold_status`: Fail the check if the status from hold-merges is `hold`. Set `false` to keep this informative (not recommended). Default: `true`.

## Outputs

- `status`: The current merge status. Either "hold", "allow", or "error".
