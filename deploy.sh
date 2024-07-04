#!/bin/bash

# Clone the repository
git pull

echo "تم تنزيل الملفات"
# Wait for 30 seconds
# sleep 5
pm2 stop app 
npm run build 
pm2 start app 

# Remove the old directory
# rm -rf /c/inspectex/inspectex/test-101

echo "تم نشر التحديث  ❤😎 "
# Wait for 30 seconds 