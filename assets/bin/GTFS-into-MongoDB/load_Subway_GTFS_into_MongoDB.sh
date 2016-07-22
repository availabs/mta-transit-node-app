#!/usr/bin/env bash


set -e;


cd ../../Subway_GTFS_Data;


GTFS_DATA_FILES=$(ls *.txt);


for file in ${GTFS_DATA_FILES[@]};
do
    mongoimport -d mta_subway_gtfs -c ${file%.txt} --type csv --file ${file} --headerline  ;
done;
