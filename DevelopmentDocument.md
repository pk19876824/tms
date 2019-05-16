# 机票管理系统(Ticket Management System)-设计文档


## 1 技术选型 
### 1.1 系统架构

  本系统采用 `WEB` 实现， `Java Servlet` 作为 `WEB服务端` (WEB后端)， `网页浏览器` 作为 `WEB客户端` (WEB前端)。使用网页开发的可视化页面，比桌面应用程序更轻便，快捷。而且一般PC都装有浏览器，客户（使用者）不需要格外安装应用程序。
  
  WEB前端采用 `React` 框架，使用 `Ant Design` 作为UI组件。React是一个用于构建用户界面的 `JavaScript` 库，由Facebook公司自主研发和内部使用，并于2013年5月开源，目前已成为web前端主流框架之一，其特点为声明式设计、组件化、高效、灵活。Ant Design是由 `蚂蚁金服` 设计的React UI组件库，提供了一系列开箱即用的高质量React组件，提炼自企业级中后台产品的交互语言和视觉风格，使用者为包括蚂蚁金服、阿里巴巴、腾讯、百度、口碑、美团、滴滴、饿了么等众多大型企业。
  
  WEB后端采用 `SSM` (Spring+SpringMVC+mybatis)架构。`Spring`就像是整个项目中装配bean的大工厂，在配置文件中可以指定使用特定的参数去调用实体类的构造方法来实例化对象。Spring的核心思想是IoC（控制反转），即不再需要程序员去显式地"new"一个对象，而是让Spring框架帮你来完成这一切；`SpringMVC`在项目中拦截用户请求，它的核心Servlet即DispatcherServlet承担中介或是前台这样的职责，将用户请求通过HandlerMapping去匹配Controller，Controller就是具体对应请求所执行的操作；`mybatis`是对jdbc的封装，它让数据库底层操作变的透明。mybatis的操作都是围绕一个sqlSessionFactory实例展开的。mybatis通过配置文件关联到各实体类的Mapper文件，Mapper文件中配置了每个类对数据库所需进行的sql语句映射。在每次与数据库交互时，通过sqlSessionFactory拿到一个sqlSession，再执行sql命令。

### 1.2 MySQL

  `MySQL`是一个关系型数据库管理系统，由瑞典 MySQL AB 公司开发，目前属于 Oracle 旗下产品。MySQL 是最流行的关系型数据库管理系统之一，在 WEB 应用方面，MySQL是最好的 RDBMS (Relational Database Management System，关系数据库管理系统) 应用软件。
  
  MySQL所使用的 SQL 语言是用于访问数据库的最常用标准化语言。MySQL 软件采用了双授权政策，分为社区版和商业版，由于其体积小、速度快、总体拥有成本低，尤其是`开放源码`这一特点，一般中小型网站的开发都选择 MySQL 作为网站数据库。
  
### 1.3 开发工具
#### 1.3.1 IntelliJ IDEA

  `IntelliJ IDEA` 是java编程语言开发的集成环境。IntelliJ在业界被公认为最好的java开发工具之一，尤其在智能代码助手、代码自动提示、重构、J2EE支持、各类版本工具(git、svn等)、JUnit、CVS整合、代码分析、 创新的GUI设计等方面的功能可以说是超常的。IDEA是JetBrains公司的产品，这家公司总部位于捷克共和国的首都布拉格，开发人员以严谨著称的东欧程序员为主。它的旗舰版本还支持HTML，CSS，PHP，MySQL，Python等。
  
  IDEA所提倡的是智能编码，以减少程序员的工作，其特色功能有:
  * 智能的选取
  * 丰富的导航模式
  * 历史记录功能
  * JUnit的完美支持
  * 对重构的优越支持
  * 编码辅助
  * 灵活的排版功能
  * XML的完美支持
  * 动态语法检测
  * 代码检查
  * 对JSP的完全支持
  * 代码输入过程中，自动补充方法或类。
  * 不需要任何插件完全支持EJB
  * 列编辑模式
  * 预置模板
  * 完美的自动代码完成
  * 版本控制完美支持
  * 不使用代码的检查
  * 智能代码
  * 正则表达式的查找和替换功能
  * JavaDoc预览支持
  * 程序员编码时IDEA时时检测你的意图，或提供建议，或直接帮你完成代码。
  
  本系统主要使用 IntelliJ IDEA 来编写Java Web后端程序。
  
#### 1.3.2 WebStrom

  `WebStorm` 是jetbrains公司旗下一款JavaScript 开发工具。目前已经被广大中国JS开发者誉为“Web前端开发神器”、“最强大的HTML5编辑器”、“最智能的JavaScript IDE”等。与IntelliJ IDEA同源，继承了IntelliJ IDEA强大的JS部分的功能。
  
  WebStrom也包括许多强大的便捷功能，包括:
  * 智能的代码补全
  * 代码格式化
  * html提示
  * 联想查询
  * 代码重构
  * 代码检查和快速修复
  * 代码调试
  * 代码结构浏览
  * 代码折叠
  * 包裹或者去掉外围代码
  
  本系统主要使用 WebStrom 来编写Web前端程序。
  
* * *

## 2 设计方案
### 2.1 业务结构

![93a33302adcab43b4b4f9037f3f02581.png](evernotecid://CE5C7BCE-9844-450F-A5FE-FD0CDC7452D3/appyinxiangcom/24639860/ENResource/p5)@w=400h=120

  该机票管理系统由 `飞机、航线、机票` 3个模块组成。

#### 2.1.1 飞机

  `飞机` 是机票管理系统的基础组件。有了飞机才能够安排航线，产生机票。
  
  飞机这个实体应该包括飞机的共有特性，如 `飞机机型`（如波音737-800）、`大小类型`（大型、中型、小型）、`舱位配置`（经济舱、商务舱）、`其他配置`（电视、无线网络、餐饮等）。
  
  可以对飞机进行 `增加`（服役）、`修改`（更换配置）、`删除`（退役）、`查找` 操作。
  
#### 2.1.2 航线

  `航线` 是机票管理系统的业务核心组件，表示一次航班的具体航行信息。可对空闲的飞机安排航线，并由航线和飞机产生特定机票。
  
  航线应包括一次航行的共有信息，如 `飞机ID`、`始发地`、`目的地`、`起飞时间`、`降落时间`、`航行状态`（未出发、正在飞行、已结束）、`票价`等。
  
  设置完航线后，系统根据该航线和飞机的舱位配置自动产生符合数量的机票。
  
  购票者可根据起飞时间、始发地和目的地来搜索航线，以购买机票。
  
  可以对航线进行`增加`、`修改`、`删除`、`查找` 操作。
  
#### 2.1.3 机票

  `机票` 是机票管理系统的业务顶层模块，处于正在售票状态的机票可被购买。
  
  机票的共有属性有 `飞机ID`、`航线ID`、`购买者ID`、`机票状态`、`座位席别`、`票价`等。
  
  可以对机票进行`增加`、`修改`、`删除`、`查找` 操作。
  
  
### 2.2 数据库设计
#### 2.2.1 aircraft

| 字段名 | 字段类型 | 是否可为NULL | 默认值 | 是否主键 | 备注 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| id | varchar(50) | 否 | 无 | 是 | 主键 |
| model | varchar(50) | 否 | 无 | 否 | 机型 |
| type | varchar(20) | 否 | 无 | 否 | 类型 |
| config | text | 是 | 无 | 否 | 飞机配置，json字符串 |
| create_time | timestamp | 否 | CURRENT_TIMESTAMP | 否 | 创建时间 |
| update_time | timestamp | 否 | CURRENT_TIMESTAMP | 否 | 修改时间 |


  建表SQL
  
```SQL
CREATE TABLE `aircraft` (
  `id` varchar(50) NOT NULL,
  `model` varchar(50) NOT NULL COMMENT '机型',
  `type` varchar(20) NOT NULL COMMENT '类型',
  `config` text,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci 
```

  `id` 为varchar类型是为了记录飞机的机名，如南方航空CZ6171。本系统默认飞机机名无重复。
  
  `config` 为json字符串，该设计是为了使飞机的配置更灵活。
  
  `create_time` 用来记录该条记录被创建的时间。
  
  `update_time` 用来记录该条记录最后一次被修改的时间。
  
#### 2.2.2 airline

| 字段名 | 字段类型 | 是否可为NULL | 默认值 | 是否主键 | 备注 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| id | bigint(20) | 否 | 无 | 是 | auto_increment |
| aircraft_id | varchar(50) | 是 | 无 | 否 | 飞机Id |
| start_location | varchar(20) | 是 | 无 | 否 | 始发地 |
| end_location | varchar(20) | 是 | 无 | 否 | 目的地 |
| start_time | timestamp | 是 | 无 | 否 | 起飞时间 |
| end_time | timestamp | 是 | 无 | 否 | 降落时间 |
| status | int | 否 | 0 | 否 | 当次航程状态。0:未开始;1:途中;2:已结束 |
| ticket_status | int | 否 | 0 | 否 | 是否已开启售票.0:未开启;1:已开启 |
| economy_price | int | 否 | 0 | 否 | 经济舱价格 |
| business_price | int | 否 | 0 | 否 | 商务舱价格 |
| delete_flag | int | 否 | 0 | 否 | 删标志.0:未删除;1:已删除 |
| create_time | timestamp | 否 | CURRENT_TIMESTAMP | 否 | 创建时间 |

建表SQL

```SQL
CREATE TABLE `airline` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `aircraft_id` varchar(50) DEFAULT NULL,
  `start_location` varchar(20) DEFAULT NULL COMMENT '出发点',
  `end_location` varchar(20) DEFAULT NULL COMMENT '目的地',
  `start_time` timestamp NULL DEFAULT NULL COMMENT '起飞时间',
  `end_time` timestamp NULL DEFAULT NULL COMMENT '到达时间',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '当次航程状态。0:未开始;1:途中;2:已结束',
  `ticket_status` int(11) NOT NULL DEFAULT '0' COMMENT '是否已开启售票.0:未开启;1:已开启',
  `economy_price` int(11) NOT NULL DEFAULT '0' COMMENT '经济舱价格',
  `business_price` int(11) NOT NULL DEFAULT '0' COMMENT '商务舱价格',
  `delete_flag` tinyint(4) NOT NULL DEFAULT '0',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `airline_aircraft_id_index` (`aircraft_id`),
  KEY `airline_start_location_end_location_start_time_index` (`start_location`,`end_location`,`start_time`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```

  `airline_aircraft_id_index` 对aircraft_id建立索引，是为了加快由飞机来查找航线时的查询速度。
  
  `airline_start_location_end_location_start_time_index` 对start_location、end_location、start_time建立组合索引，是为了加快根据搜索条件搜索航线时的速度。
  
  `aircraft_id` 是aircraft表的id，不给该字段设定外键是为了降低表之间的耦合性，外键特性由业务逻辑来保证。
  
#### 2.2.3 ticket

| 字段名 | 字段类型 | 是否可为NULL | 默认值 | 是否主键 | 备注 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| id | bigint(20) | 否 | 无 | 是 | auto_increment |
| aircraft_id | varchar(50) | 是 | 无 | 否 | 飞机Id |
| airline_id | bigint(20) | 是 | 无 | 否 | 航线Id |
| owner_id | bigint(20) | 否 | 0 | 否 | 购买者Id |
| status | tinyint | 否 | 0 | 否 | 票的状态。0:未售出;1:已售出;2:已过期 |
| seat_type | tinyint | 否 | 0 | 否 | 座位类别.0:经济仓;1:商务舱 |
| price | int | 否 | 0 | 否 | 价格 |
| delete_flag | tinyint | 否 | 0 | 否 | 删标志.0:未删除;1:已删除 |
| create_time | timestamp | 否 | CURRENT_TIMESTAMP | 否 | 创建时间 |
| create_time | timestamp | 否 | CURRENT_TIMESTAMP | 否 | 修改时间 |

建表SQL

```SQL
CREATE TABLE `ticket` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `aircraft_id` varchar(50) DEFAULT NULL,
  `airline_id` bigint(20) DEFAULT NULL,
  `owner_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '购买者id',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '票的状态。0:未售出;1:已售出;2:已过期',
  `seat_type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '座位类别.0:经济仓;1:商务舱',
  `price` int(11) NOT NULL DEFAULT '0' COMMENT '价格',
  `delete_flag` tinyint(4) NOT NULL DEFAULT '0',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ticket_airline_id_index` (`airline_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1451 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```
 `ticket_airline_id_index` 对airline_id建立索引是为了根据航线快速搜索票务信息。
 
 `delete_flag` 使用字段来记录删除状态以达到软删除的目的。

  
