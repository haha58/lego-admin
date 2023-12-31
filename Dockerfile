# 基于哪个镜像的基础上进行构建
FROM node:18
# 工作目录
WORKDIR /app
# 拷贝当前目录下的文件 到 /app 中  .dockerignore 文件中可以声明忽略拷贝的文件
COPY  . /app

# 构建镜像时, 一般用于做一些系统配置, 安装必备的软件, 可有多个 RUN
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' > /etc/timezone
RUN npm set registry  https://registry.npmmirror.com
RUN npm install
RUN npm install -g pm2
# 启动容器时, 只能有一个 CMD
# npx pm2 log  cmd 最后的命令是一个阻塞控制台的程序
CMD echo $SERVER_NAME && echo $SERVER_NAME && npm run pm-dev && npx pm2 log

# 环境变量
ENV SERVER_NAME='lego-editor-server-docker'
ENV AUTHOR_NAME='mwy'
