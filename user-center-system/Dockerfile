# Docker 镜像构建
FROM openjdk:17

# Copy local code to the container image.
COPY target/user-manage-system-0.0.1-SNAPSHOT.jar /app.jar

# 暴露端口
EXPOSE 9001

# 入口，java项目的启动命令
ENTRYPOINT java -jar /tmp/user-manage-system-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod