FROM curlimages/curl:7.69.1

LABEL "com.github.actions.name"="Create Samson releases"
LABEL "com.github.actions.description"="create samson releases"
LABEL "com.github.actions.icon"="hash"
LABEL "com.github.actions.color"="gray-dark"

LABEL version="1.0.3"
LABEL repository="http://github.com/zendesk/ga/samson-create-release"
LABEL homepage="http://github.com/zendesk/ga/samson-create-release"
LABEL maintainer="Engineering Productivity"

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
