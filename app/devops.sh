npm run build
echo '[building]: Deleting old build...'
cp -r .htaccess build 
ssh vnudc@103.88.122.57 "sudo  rm -r /var/www/html/app_modern"
echo '[building]: Start upload build...'
 scp -r /Users/nguyenhuuhao/Developer/Project/Demo-ban-hang-basic-modern-frontend/app/build vnudc@103.88.122.57:/var/www/html/app_modern
de