# 部署配置文档

EPUB阅读器项目采取完全的前后端分离策略，其中项目主体分为两个部分: 使用React、Redux、Webpack、Less 等技术开发的前端和使用SpringBoot、SpringMVC、Mybatis搭建的后端部分。数据库采用 MySQL

## 一. 项目部署

项目前端目录可以直接放到Nginx、Apache或者Tomcat中运行。

后端项目部署命令:

```
java -jar mybatis-spring-boot-1.0.6-SNAPSHOT.jar
```

## 二. 参数格式

```
http://localhost:8989/?r={url:'test/books/mzhxz/',probation:50,uid:1}
```

前期为了测试方便 使用一个json字符串的形式传输参数，后期可以传入加密后的json串。

1. url: 表示图书地址，可以是epub文件不过最好还是解压过的epub文件夹，url第一次被加载的时候会将图书的基本信息存入数据库，第二次即可从数据库读取数据。需要将epub文件发布到服务器上，并且解决epub服务器跨域访问的问题，并且url内不能有中文。

2. bid: 图书id bid 和 url同时存在的时候，会优先读取bid对应的图书数据

3. uid: 如果uid字段为空，则添加书签时会提示请登录

4. probation: 试读百分比，默认为20%

## 三. 测试书籍地址

以下是我事先生成好的 四本书的测试地址

1. [毛泽东选集](http://h.tefact.com:8888/epub/?r={url:'test/books/mzdxj/',probation:50,uid:1})

2. [草菌菇养殖](http://h.tefact.com:8888/epub/?r={url:'test/books/cgzn/',probation:50,uid:1})

3. [直道而行 孟子与荀子](http://h.tefact.com:8888/epub/?r={url:'test/books/mzhxz/',probation:50,uid:1})

4. [弘法利生 南传佛教史](http://h.tefact.com/epub/?r={bid:23,probation:50,uid:1})

## 四. 开发环境搭建

### 前端项目 fz-epub

下载开发依赖环境:

进入到 fz-epub 项目根目录下 (需要安装NodeJS 7.0+ 及 npm)

```
npm install
npm start
```

编译打包:

```
npm run build
```

### 后端项目 fz-epub-services

```
mvn clean && mvn install
```

编译打包

```
mvn clean package
```
