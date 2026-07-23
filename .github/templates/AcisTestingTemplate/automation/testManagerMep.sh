#!/bin/bash
/home/RECONQUISTA/t024776/bitbucketPorjects/mep-automation-frontend/automation/node_modules/.bin/tm \
  --namespace argentina \
  --app mep \
  --env qa \
  --branch develop \
  /home/RECONQUISTA/t024776/bitbucketPorjects/mep-automation-frontend/automation/results \
  -r '*-testsuite.xml' \
  --type e2e \
  --framework cucumber \
  --sourceurl ssh://git@globaldevtools.bbva.com:7999/amep/mep-automation-frontend.git \
  --tm  https://bot-testmanager-ar-devops:FAYrKXNwFF1CBXCMmkt1b9UFw9XJPowq9Z0Hsyjj@testmanager.globaldevtools.bbva.com/test-manager-api