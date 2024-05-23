***本文档由 Rap2 (https://github.com/thx/rap2-delos) 生成***

***本项目仓库：[http://rap2.taobao.org/repository/editor?id=318960](http://rap2.taobao.org/repository/editor?id=318960) ***

***生成日期：2024-05-22 06:50:13***

# 仓库：机审平台
## 模块：示例模块
### 接口：登录
* 地址：/login
* 类型：POST
* 状态码：200
* 简介：无
* Rap地址：[http://rap2.taobao.org/repository/editor?id=318960&mod=550574&itf=2472073](http://rap2.taobao.org/repository/editor?id=318960&mod=550574&itf=2472073)
* 请求接口格式：

```
├─ username: String (用户名)
└─ password: String (密码)

```

* 返回接口格式：

```
├─ code: Number (状态码)
└─ message: String (详细信息)

```


### 接口：上传文件
* 地址：/cases/upload
* 类型：POST
* 状态码：200
* 简介：无
* Rap地址：[http://rap2.taobao.org/repository/editor?id=318960&mod=550574&itf=2472076](http://rap2.taobao.org/repository/editor?id=318960&mod=550574&itf=2472076)
* 请求接口格式：

```
└─ file: Object (文件): Object (文件)

```

* 返回接口格式：

```
├─ code: Number 
└─ message: String 

```


### 接口：查询警情上传数据
* 地址：/cases
* 类型：GET
* 状态码：200
* 简介：无
* Rap地址：[http://rap2.taobao.org/repository/editor?id=318960&mod=550574&itf=2472080](http://rap2.taobao.org/repository/editor?id=318960&mod=550574&itf=2472080)
* 请求接口格式：

```
├─ page: Number (第几页)
├─ page_size: Number (每页多少数据)
├─ url: String (可选，查询url)
├─ source: String (可选，数据来源)
├─ start: String (开始日期)
└─ end: String (结束日期)

```

* 返回接口格式：

```
├─ code: Number 
├─ message: String 
├─ page: Number (第几页)
├─ per_page: Number (每页多少数据)
├─ total_page: Number (一共多少页)
├─ total: Number (一共多少数据)
└─ datas: Array (详细的数据)
   ├─ url: String 
   ├─ label: String (类型)
   ├─ source: String (来源)
   ├─ create_person: String (上传人)
   ├─ create_method: String (上传方式)
   ├─ create_time: String (上传时间)
   └─ remark: String (备注，可以为空)

```