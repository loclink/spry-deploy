

## MihuDeploy v1.0.0

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)[![forthebadge](https://forthebadge.com/images/badges/uses-git.svg)](https://forthebadge.com)![image](https://tvax2.sinaimg.cn/large/0087ufIQgy1h2rjcjd1q3j306z00zglk.jpg)

### 一、概述：

MihuDeploy 是一款为 github、gitee 所提供的轻量级 webhooks 服务，用于自动化部署前后端等项目，并实现本地推送后远程服务器自动同步仓库代码。目前支持的远端仓库有：github、gitee。

### 二、依赖：

1. 项目运行环境需依赖 nodejs，centos 如何搭建 node 运行环境：

   ```shell
   dnf install nodejs
   npm install n -g
   n install lts
   n install latest
   n
   ```

   ![image](https://tva4.sinaimg.cn/large/0087ufIQgy1h2qc31y5xcj30i302vgm7.jpg)

   选择 16.15.0 后回车，之后输入`node -v`查看版本号是否切换成功。

2. 安装 pm2 管理器，pm2 是 nodejs 的高级生产流程管理器，详情查看：[pm2](https://pm2.keymetrics.io/)

   i. 全局安装 pm2 管理器：`npm install pm2 -g`

   ii. 执行`pm2 -v`查看是否安装成功

   ![image](https://tvax3.sinaimg.cn/large/0087ufIQgy1h2qczvzvi7j306w00wmx6.jpg)

### 三、部署项目：

1. clone 项目至服务器：`git clone`

2. 下载安装依赖：进入项目根目录执行`npm install`

3. 修改配置文件：`vim config.js`

   <img src="https://tvax3.sinaimg.cn/large/0087ufIQgy1h2qcazi785j30dr05fdiq.jpg" alt="image" width="495" data-width="495" data-height="195">

4. 配置文件描述说明：

   ```javascript
   module.exports = {
     port: 6666, // port:Number webhooks服务启动端口，默认为7777，非必填
     password: "123456", // password:String webhooks校验密码，必填
   
     // libPath:String shell脚本执行文件的存放路径，非必填，默认指向项目根目录下的lib文件夹下。
     //shell脚本的名称必须与仓库名一致，即：需要监听的仓库名若为：demo1，那么在lib文件夹下你需要创建一个与之同名的.sh文件：demo01.sh；在该文件中编写你想执行的仍和linux操作。
     // 在该shell脚本文件中，你无需手动cd到你想操作的工作路径中，该服务会自动根据workPathMap配置去找到对应的工作路径，并在该路径下执行脚本指令（详情请查看workPathMap配置的描述）。
     // 当然，如果你需要在脚本中拿到当前的工作路径，则可以使用变量：$1，例如：echo $1 这条命令将会输出打印当前的工作路径。
     libPath: "/codermihu/mihu_project_node/mihu_deploy/lib",
   
     // workPathMap:Object 工作路径，必填，对象的键名必须与git仓库名称保持一致。
     // 值为该仓库在服务器中的工作路径，即：仓库名如果为demo1。
     // 那么在接收到该仓库的webhooks请求之后则会找到对应的工作路径，并在这个工作路径下执行libPath下与之同名的shell脚本。
     workPathMap: {
       // 键（需要监听的git仓库名）:值（该仓库（项目）对应服务器的所在路径）
       mihu_cms: "/codermihu/mihu_project_source/mihu_cms",
       // more...
     },
   };
   ```
   
   【日志文件默认存储至：项目根目录下的 logs 文件夹中，报错日志：mihu_deploy_err.log，执行日志：mihu_deploy_info.log】
   
5. 启动服务：

   ```shell
   npm start # 启动webhooks服务
   pm2 status # 查看运行状态
   pm2 save # 保存任务
   pm2 startup # 将保存的任务生成开机自启动服务
   systemctl enable pm2-root # 设置开机自启动
   pm2 restart mihu_deploy # 重启服务
   ```
   
   配置完成后，在重启系统时，服务器则会自启动该服务。
   
6. 停止服务：

   `pm2 stop mihu_deploy `

### 四、应用示范 — github：

1. 创建仓库：

   <img src="https://tvax1.sinaimg.cn/large/0087ufIQgy1h2qdmlirjkj30m60cygp2.jpg" alt="image" width="798" data-width="798" data-height="466">

2. 配置 webhooks：

   ![image](https://tvax1.sinaimg.cn/large/0087ufIQgy1h2qdn6zxs2j30y30k1wmu.jpg)

   ![image](https://tvax2.sinaimg.cn/large/0087ufIQgy1h2qdo9bdlkj317e0o0ah9.jpg)

   添加 webhooks：

   ![image](https://tvax3.sinaimg.cn/large/0087ufIQgy1h2qm17f2afj30xu0gtdjw.jpg)

   配置过程：

   ![image](https://tvax3.sinaimg.cn/large/0087ufIQgy1h2qdyap40cj30wn0mr48b.jpg)

   接下来你就可以在 Recent Deliveries => request 中测试请求发送的各项参数了。

   ![image](https://tvax1.sinaimg.cn/large/0087ufIQgy1h2qe2meg1tj30vz0jywlk.jpg)

   在 Recent Deliveries => response 中可以查看相应结果，结果显示未找到执行文件，说明我们还未配置该仓库所对应的执行文件。

   ![image](https://tvax3.sinaimg.cn/large/0087ufIQgy1h2qe2srsspj30zq0ix7ar.jpg)

3. 配置执行文件：在任意文件夹下 clone 该项目：

   例如：

   ```shell
   [root@mihu ~]# git clone git@github.com:mihu915/demo1.git
   Cloning into 'demo1'...
   warning: You appear to have cloned an empty repository.
   [root@mihu ~]# ll
   total 4
   drwxr-xr-x 3 root root 4096 May 30 14:11 demo1
   [root@mihu ~]#
   ```

4. 将该项目路径配置到 webhooks 依赖中：

​	示例：

```shell
[root@mihu ~]# cd demo1/
[root@mihu demo1]# pwd
/root/demo1
[root@mihu demo1]# cd /codermihu/mihu_project_node/mihu_deploy/
[root@mihu mihu_deploy]# vim config.js
```

​	编辑项目根目录下的config.js文件

```javascript
module.exports = {
  port: 6666,
  password: "tj991118",
  workPathMap: {
    demo1: "/root/demo1",
  },
};
```

4. 接下来配置执行脚本文件，编写至项目根目录中 lib 文件夹下，并保存。

   ```shell
   [root@mihu mihu_deploy]# vim lib/demo1.sh
   # 编辑内容为
   echo '当前工作路径为：'$1
   git pull
   echo '代码同步完成'
   ```

   在项目中新增或修改文件，服务会自动重启，你无需在添加demo1.sh文件后手动重启项目

5. 测试 webhooks 是否配置成功，在本地提交并推送代码：

   ![image](https://tva4.sinaimg.cn/large/0087ufIQgy1h2qevllbx8j30sg0lc0vu.jpg)

   提交代码并推送，推送操作成功后，在服务器中执行`pm2 logs`即可查看这次代码同步执行文件的结果：

   ```shell
   0|mihu_deploy  | 2022-05-30 14:39: 当前工作路径为：/root/demo1
   0|mihu_deploy  | 2022-05-30 14:39:
   0|mihu_deploy  | 2022-05-30 14:39: warning: Pulling without specifying how to reconcile divergent branches is
   0|mihu_deploy  | 2022-05-30 14:39: discouraged. You can squelch this message by running one of the following
   0|mihu_deploy  | 2022-05-30 14:39: commands sometime before your next pull:
   0|mihu_deploy  | 2022-05-30 14:39:
   0|mihu_deploy  | 2022-05-30 14:39:   git config pull.rebase false  # merge (the default strategy)
   0|mihu_deploy  | 2022-05-30 14:39:   git config pull.rebase true   # rebase
   0|mihu_deploy  | 2022-05-30 14:39:   git config pull.ff only       # fast-forward only
   0|mihu_deploy  | 2022-05-30 14:39:
   0|mihu_deploy  | 2022-05-30 14:39: You can replace "git config" with "git config --global" to set a default
   0|mihu_deploy  | 2022-05-30 14:39: preference for all repositories. You can also pass --rebase, --no-rebase,
   0|mihu_deploy  | 2022-05-30 14:39: or --ff-only on the command line to override the configured default per
   0|mihu_deploy  | 2022-05-30 14:39: invocation.
   0|mihu_deploy  | 2022-05-30 14:39:
   0|mihu_deploy  | 2022-05-30 14:39:
   0|mihu_deploy  | 2022-05-30 14:39: From github.com:mihu915/demo1
   0|mihu_deploy  | 2022-05-30 14:39:    30f0397..a074a22  main       -> origin/main
   0|mihu_deploy  | 2022-05-30 14:39:
   0|mihu_deploy  | 2022-05-30 14:39: Updating 30f0397..a074a22
   0|mihu_deploy  | 2022-05-30 14:39: Fast-forward
   0|mihu_deploy  | 2022-05-30 14:39:
   0|mihu_deploy  | 2022-05-30 14:39:  test-webhooks.js | 2 +-
   0|mihu_deploy  | 2022-05-30 14:39:  1 file changed, 1 insertion(+), 1 deletion(-)
   0|mihu_deploy  | 2022-05-30 14:39:
   0|mihu_deploy  | 2022-05-30 14:39: 代码同步完成
   0|mihu_deploy  | 2022-05-30 14:39:
   0|mihu_deploy  | 2022-05-30 14:39: [demo1] 任务执行结束!
   0|mihu_deploy  | 2022-05-30 14:39: 子进程退出代码：0
   
   ```

   你也可以在项目根目录下使用`tail -fn 50 ./logs/mihu_deploy_info.log `来查看后 50 行的执行日志。

   查看项目同步结果：

   ```shell
   [root@mihu ~]# cd demo1/
   [root@mihu demo1]# ll
   total 4
   -rw-r--r-- 1 root root 19 May 30 14:39 test-webhooks.js
   [root@mihu demo1]# cat test-webhooks.js
   console.log('test')[root@mihu demo1]#
   ```

   结果显示同步成功。



### 五、应用示范 — gitee：

![image](https://tva1.sinaimg.cn/large/0087ufIQgy1h2rj8t7bblj31sm0tah4i.jpg)

![image](https://tvax4.sinaimg.cn/large/0087ufIQgy1h2rj8fakoij31gj0u8q9j.jpg)

![image](https://tva4.sinaimg.cn/large/0087ufIQgy1h2rj96mhewj31q60s1nc6.jpg)

![image](https://tvax1.sinaimg.cn/large/0087ufIQgy1h2rj9h6n60j31l611tng1.jpg)

接下里配置config.js文件以及添加shell执行脚本文件，与github的配置方法一样。

### 六、更新日志 v1.0.0

1. 脚本执行文件路径可配
2. 工作路径分别配置
3. webhooks密码校验
