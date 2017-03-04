#!/bin/bash

harp compile public ./www
git add --all
git commit -m "$1"
git push
surge ./www

