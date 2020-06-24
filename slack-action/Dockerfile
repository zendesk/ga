FROM curlimages/curl:7.68.0

LABEL "com.github.actions.name"="Post Slack messages"
LABEL "com.github.actions.description"="Post Slack messages from your own bot"
LABEL "com.github.actions.icon"="hash"
LABEL "com.github.actions.color"="gray-dark"

LABEL version="1.0.0"
LABEL repository="http://github.com/zendesk/ga/slack-action"
LABEL homepage="http://github.com/zendesk/ga/slack-action"
LABEL maintainer="Engineering Productivity"

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
