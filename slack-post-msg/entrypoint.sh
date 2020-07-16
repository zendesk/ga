#!/bin/sh -e

STATUS=${STATUS:-failure}

if test -z "$SLACK_BOT_TOKEN"; then
  echo "Set the SLACK_BOT_TOKEN secret."
  exit 1
fi

if [[ -z $CHANNEL_ID ]]; then
  echo "Set the CHANNEL_ID secret."
  exit 1
fi

if [[ -z $GITHUB_CONTEXT ]]; then
  echo "Set the GITHUB_CONTEXT."
  exit 1
fi

run_id=$(echo "$GITHUB_CONTEXT" | jq --raw-output ".run_id")
run_no=$(echo "$GITHUB_CONTEXT" | jq --raw-output ".run_number")
repository=$( echo "$GITHUB_CONTEXT" | jq --raw-output ".repository")
run_url="https://github.com/$repository/actions/runs/$run_id"
ref=$(echo "$GITHUB_CONTEXT" | jq --raw-output ".ref")
branch=${ref/refs\/heads\/}
sha=$(echo "$GITHUB_CONTEXT" | jq --raw-output ".sha")
short_sha=${sha:0:7}
actor=$(echo "$GITHUB_CONTEXT" | jq --raw-output ".actor")
workflow=$(echo "$GITHUB_CONTEXT" | jq --raw-output ".workflow")
event=$(echo "$GITHUB_CONTEXT" | jq --raw-output ".event_name")


style="default"
result="failed"
icon=":github-approved:"

if [[ $STATUS == "failure" ]]; then
  style="danger"
  icon=":github-changes-requested:"
fi

if [[ $STATUS == "success" ]]; then
  style="primary"
  result="succeeded"
  icon=":approved:"
fi

body=$(cat <<EOF
{
    "channel": "$CHANNEL_ID",
    "text": "The run *#$run_no* has $result in $repository \n Commit:$short_sha Pushed by $actor URL:$run_url",
    "icon_emoji": ":github-buddy:",
    "username": "GitHub Actions Bot",
    "blocks": [
    {
			"type": "section",
			"text": {
				"type": "mrkdwn",
        "text": "The run *#$run_no* has $result in *$repository*"
			}
		},
    {
			"type": "section",
			"fields": [
				{
					"type": "mrkdwn",
					"text": "*Commit:*\n$short_sha"
				},
				{
					"type": "mrkdwn",
					"text": "*Actor:*\n$actor"
				},
				{
					"type": "mrkdwn",
					"text": "*Branch:*\n$branch"
				},
				{
					"type": "mrkdwn",
					"text": "*Event:*\n$event"
				},
				{
					"type": "mrkdwn",
					"text": "*Workflow:*\n$workflow"
				},
				{
					"type": "mrkdwn",
					"text": "*Status:*\n $icon"
				}
			]
		},
    {
			"type": "actions",
			"elements": [
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"emoji": true,
						"text": "Open"
					},
					"style": "$style",
					"url": "$run_url"
				}
			]
		}
	]
}
EOF
)

resp=$(curl -X POST https://slack.com/api/chat.postMessage \
     -H "Content-type: application/json" \
     -H "Authorization: Bearer $SLACK_BOT_TOKEN" \
     -d "$body")

ok=$(echo $resp | jq --raw-output ".ok")

if [[ $ok == "false" ]]; then
  echo $resp
  exit 1
fi
