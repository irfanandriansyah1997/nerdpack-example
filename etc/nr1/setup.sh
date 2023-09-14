#!/bin/bash

set -e

BASE_REPO_URL="https://cli.nr-ext.net"

install_sdk () {
    echo -e "\e[34mDownload File\e[0m"
    curl -o nr1.deb https://cli.nr-ext.net/deb/binary/nr1_1.2.2-1_amd64.deb

    echo -e "\e[34mInstall NR1\e[0m"
    dpkg -i nr1.deb

    echo -e "\e[34mInstall Account NR1\e[0m"
    nr1 profiles:add --name account-3630237 --api-key NRAK-6JAYP3DLP7O7KDSY170BT56QOE4 --region us
}

install_sdk

