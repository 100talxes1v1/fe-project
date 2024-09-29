#!/bin/bash

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")"; pwd)

OUTPUT=${SCRIPT_DIR}/fe-project

# 创建上传目录
mkdir ${OUTPUT}

for ITEM in ${SCRIPT_DIR}/*
do
  if test -d ${ITEM}
  then
    DIRNAME=$(basename "${ITEM}")
    if test $DIRNAME != "fe-project"
    then
      cp -r ${ITEM} ${OUTPUT}
    fi
  else
    FILENAME=$(basename "${ITEM}")
    if test $FILENAME = "manifest.json"
    then
      cp ${ITEM} ${OUTPUT}
    fi
  fi
done

# # 压缩成zip
# zip -0 -q -r fe-project.zip fe-project

# rm -drf ${OUTPUT}
