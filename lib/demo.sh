echo '当前工作路径为：'$1
git pull
echo '代码同步完成'
npm install
echo '依赖安装完成'
npm run build
echo '打包完成'

