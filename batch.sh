#!/bin/sh

for file in ./*
  do
    if [ -d "$file" ]
      then
      echo "$file start update..."
      isMicro=$(echo $file | grep "micro")
      if [ $file != "./server-app-template-ts"] && [ $isMicro = "" ]; then
        cmd="cd $file && /Users/huyuqiong/future/base/fe-sea-cli/bin/cli.js update --content lint-rules && cd ../"
        eval $cmd
      fi
    fi
  done
