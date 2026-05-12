#!/bin/bash

git add .
git commit -m "x"

max_retries=10
retry_count=0

while [ $retry_count -lt $max_retries ]; do
    if git push origin main; then
        echo "Push succeeded!"
        exit 0
    else
        retry_count=$((retry_count+1))
        echo "Push failed, retry $retry_count/$max_retries in 5 seconds..."
        sleep 5
    fi
done

echo "Push failed after $max_retries attempts."
exit 1