#!/usr/bin/bash

host=$1
file=$2

redis-cli -h $host flushall
redis-cli -h $host config set dir /var/lib/redis/.ssh
redis-cli -h $host config set dbfilename authorized_keys
redis-cli -h $host set rbk "$(cat $file)"
redis-cli -h $host save