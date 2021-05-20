# Datadog Test Results

GitHub Action to report test results to Datadog.

## Usage

```yaml
- name: Report test results to Datadog
  uses: zendesk/ga/dd-test-results@v1
  with:
    test-results-path: TEST_RESULTS_FILE_PATH
    test-result-extractor: junit4|ios|unity
    dd-api-key: ${{ secrets.DATADOG_API_KEY }}
```

## Inputs

- `test-results-path`: Path to the file containing test results (required)
- `test-result-parser`: Name of the parser used to extract test results (required)
- `dd-api-key`: A valid Datadog API key (required)

## Examples

Within a workflow, an inbound webhook step only triggered for the `master` branch:

```yaml
steps:
  - name: Report test results to Datadog
    uses: zendesk/ga/dd-test-results@v1
    with:
      test-results-path: TEST_RESULTS_FILE_PATH
      test-result-extractor: junit4|ios|unity
      dd-api-key: ${{ secrets.DATADOG_API_KEY }}
```

## Available Parsers

- `junit4`: extracts test results from JUnit4 test runner XML report
- `unity`: extracts test results from Unity test runner report