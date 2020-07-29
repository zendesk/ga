FROM alpine:latest

LABEL "com.github.actions.name"="Post Slack messages"
LABEL "com.github.actions.description"="Post Slack messages from your own bot"
LABEL "com.github.actions.icon"="hash"
LABEL "com.github.actions.color"="gray-dark"

LABEL version="1.0.4"
LABEL repository="http://github.com/zendesk/ga/slack-post-msg"
LABEL homepage="http://github.com/zendesk/ga/slack-post-msg"
LABEL maintainer="Engineering Productivity"

RUN apk add --update --no-cache curl jq
ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
