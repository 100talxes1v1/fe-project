#!/bin/bash
for file in ./*
do
    if [ -d "$file" ]
      echo "$file start update..."
      then
      if [ $file != "./server-app-template-ts" ]; then
        cmd="cd $file && seacli update --content lint-rules && cd ../"
        eval $cmd
      fi
    fi
done
