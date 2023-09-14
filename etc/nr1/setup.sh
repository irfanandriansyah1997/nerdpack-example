#!/bin/bash
set -e

while getopts p:k: flag
do
  case "${flag}" in
    p) profile=${OPTARG};;
    k) nrKey=${OPTARG};;
  esac
done

install_sdk () {
  echo -e "\e[34mInstall NR1 SDK\e[0m"
  curl -s https://cli.nr-ext.net/installer.sh | sudo bash
}

install_account () {
  echo -e "\e[34mInstall Account NR1\e[0m"
  nr1 profiles:add --name $profile --api-key $nrKey --region us
  nr1 profiles:default --name=$profile
}

publish_nerdpack () {
  echo -e "\e[34mPublish Nerdpack\e[0m"
  nr1 nerdpack:publish --profile=$profile
}

install_sdk
install_account
publish_nerdpack
