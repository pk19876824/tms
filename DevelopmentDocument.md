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

  
