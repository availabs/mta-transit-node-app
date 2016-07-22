#!/usr/bin/env bash

set -e

cd ../..

mkdir -p 'metadata-backups'

echo '*' > ./metadata-backups/.gitignore

BACKUP_NAME="Metatdata-$(date +'%Y-%m-%d-%H%M%S').tar.gz"

tar zcvf metadata-backups/${BACKUP_NAME} metadata/

