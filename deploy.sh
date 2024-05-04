#!/bin/bash
# Remove the old directory
rm -rf /c/inspectex/inspectex/test-101
echo "تم تنضيف الملفات "

# Clone the repository
git clone https://github.com/ktsyr1/test-101.git

echo "تم تنزيل الملفات"
# Move files
mv /c/inspectex/inspectex/test-101/* /c/inspectex/inspectex/

echo "تم استخراج الملفات "
# Wait for 30 seconds
# sleep 5

# Remove the old directory
# rm -rf /c/inspectex/inspectex/test-101

echo "تم نشر التحديث  ❤😎 "
# Wait for 30 seconds
sleep 10