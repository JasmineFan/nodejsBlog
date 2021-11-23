#!/bin/sh
cd 这个文件的目录
cp access.log $(date +%Y-%m-%d).access.log 拷贝这个文件到
echo "" > access.log 删除这个文件