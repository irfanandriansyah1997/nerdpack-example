#!/bin/bash
set -e


install_sdk () {
  echo -e "\e[34mInstall NR1 SDK\e[0m"
  curl -s https://cli.nr-ext.net/installer.sh | sudo bash
}

install_account () {
  echo -e "\e[34mInstall Account NR1\e[0m"
  nr1 profiles:add --name account-3630237 --api-key NRAK-6JAYP3DLP7O7KDSY170BT56QOE4 --region us
  nr1 profiles:default --name=account-3630237
}

install_sdk
install_account
