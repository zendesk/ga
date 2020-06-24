FROM curlimages/curl:7.68.0

LABEL "com.github.actions.name"="Post Samson messages"
LABEL "com.github.actions.description"="Post Samson messages from your own bot"
LABEL "com.github.actions.icon"="hash"
LABEL "com.github.actions.color"="gray-dark"

LABEL version="1.0.0"
LABEL repository="http://github.com/zendesk/ga/samson-action"
LABEL homepage="http://github.com/zendesk/ga/samson-action"
LABEL maintainer="Engineering Productivity"

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
