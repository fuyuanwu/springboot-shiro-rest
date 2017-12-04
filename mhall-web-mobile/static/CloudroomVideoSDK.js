if (window['000a0180686911e78dd0a45d36bb8c5c'] === undefined) {
  /**
   * 录制布局
   * @enum { number }
   */
  var CRVideo_ToolBarUI = {
    BTN_Pause: 0, /** 暂停播放按钮 */
    BTN_STOP: 1 /** 停止播放按钮 */
  }

  /**
   * 云屋web直播sdk
   * @version 1.3.0
   */
  var CRVideo = (function () {
    var doc = document
    var nav = navigator
    var w3cdom = typeof doc.getElementById !== 'undefined' && typeof doc.getElementsByTagName !== 'undefined' && typeof doc.createElement !== 'undefined'
    var u = nav.userAgent.toLowerCase()
    var p = nav.platform.toLowerCase()
    var windows = p ? /win/.test(p) : /win/.test(u)
    var mac = p ? /mac/.test(p) : /mac/.test(u)
    var webkit = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, '$1')) : false // returns either the webkit version or false if not webkit
    var ff = u.indexOf('firefox') > -1 // 是否是火狐
    var ie = nav.appName === 'Microsoft Internet Explorer'

    var agent = navigator.userAgent.toLowerCase()
    var regStr_ie = /msie ([\d.])+/gi
    if (ie) {
      var vArrStr = agent.match(regStr_ie)[0]
      var v = vArrStr.split(' ')[1]
    }
    return {'w3': w3cdom, 'wk': webkit, 'ie': ie, 'ff': ff, 'win': windows, 'mac': mac, 'v': v}
  }())
  CRVideo.addEventListener = function (target, name, fun) {
    if (target.addEventListener) { // 所有主流浏览器，除了 IE 8 及更早 IE版本
      target.addEventListener(name, fun)
    } else if (target.attachEvent) { // IE 8 及更早 IE 版本
      target.attachEvent('on' + name, fun)
    };
  }
  CRVideo.scroll = (function () {
    var timeOutHandler = -1
    CRVideo.addEventListener(window, 'scroll', function () {
      clearTimeout(timeOutHandler)
      timeOutHandler = setTimeout(function () {
        for (var i in CRVideo._containerList) {
          var container = CRVideo._containerList[i]
          var node = container.handler()
          if (node && node.parentNode) {
            var parent = node.parentNode
            if (parent.lastChild === node) {
              parent.removeChild(node)
              parent.appendChild(node)
            } else {
              var index = Array.from(parent.childNodes).indexOf(node)
              parent.removeChild(node)
              parent.insertBefore(node, parent.childNodes[index])
            }
          }
          if (container instanceof CRVideo.VideoContainer) {
            if (typeof (node.setVideo) === 'function') {
              node.setVideo(container._usrID, container._videoID)
            }
            if (typeof (node.setVisibleNickName) === 'function') {
              node.setVisibleNickName(container._visibleNickName)
            }
          }
        }
      }, 200)
    })
    return 0
  }())
  /**
   * @class
   */
  CRVideo.CbProxy = function (name) {
    this.name = name
    this.callback = null
  }
  /**
   * 显示容器的基类
   * @class
   */
  CRVideo.Container = function () {

  }

  /**
   * object对象
   */
  CRVideo.Container.prototype.handler = function (value) {
    if (value === undefined) {
      return this._handler
    } else {
      this._handler = value
    }
  }
  /**
   * id
   */
  CRVideo.Container.prototype.id = function (value) {
    if (value === undefined) {
      return this._handler.id
    } else {
      this._handler.id = value
    }
  }

  CRVideo.Container.prototype.__addCallBack = function () {

  }
  /**
   * 容器的宽度
   */
  CRVideo.Container.prototype.width = function (value) {
    if (value === undefined) {
      return parseInt(this._handler.style.width)
    } else {
      this._handler.style.width = value + 'px'
    }
  }
  /**
   * 容器的高度
   */
  CRVideo.Container.prototype.height = function (value) {
    if (value === undefined) {
      return parseInt(this._handler.style.height)
    } else {
      this._handler.style.height = value + 'px'
    }
  }
  /**
   * 容器的样式
   */
  CRVideo.Container.prototype.style = function (key, value) {
    this._handler.style.display = 'none'
    if (key === undefined) {
      return this._handler.style
    } else {
      if (value === undefined) {
        return this._handler.style[key]
      } else {
        this._handler.style[key] = value
      }
    }
  }
  CRVideo._containerList = []
  /**
   * 影音播放的呈现容器
   * @class
   * @extends CRVideo.Container
   */
  CRVideo.MediaContainer = function () {
    CRVideo._containerList.push(this)
  }
  CRVideo.MediaContainer.prototype = new CRVideo.Container()

  CRVideo.MediaContainer.prototype.__addCallBack = function () {

  }
  /**
   * 工具条是否可用
   * @param {number} bDisable -  0:可用; 非0:不可用;
   */
  CRVideo.MediaContainer.prototype.disableToolBar = function (disable) {
    this._handler.disableToolBar(disable)
  }
  /**
   * 保存播放影音画面到图片文件
   * @param {string} pathFileName - 本地绝对路径文件名(支持格式：bmp, png, gif, jpg, jpeg)
   * @return {number} 0成功，非0失败
   */
  CRVideo.MediaContainer.prototype.savePicToFile = function (pathFileName) {
    return this._handler.savePicToFile(pathFileName)
  }
  /**
   * 保存播放影音画面到图片文件
   * @param {string} format - 支持格式:bmp, png, gif, jpg, jpeg
   * @return {string} Base64字符串
   */
  CRVideo.MediaContainer.prototype.savePicToBase64 = function (format) {
    return this._handler.savePicToBase64(format)
  }
  /**
   * 绘制模式，是否拉伸绘制
   * @param {bool} value - 是否拉伸
   */
  CRVideo.MediaContainer.prototype.keepAspectRatio = function (value) {
    if (value === undefined) {
      return this._handler.keepAspectRatio
    } else {
      this._handler.keepAspectRatio = value
    }
  }
  /**
   * 显示隐藏播放工具条上的界面元素
   * @access public
   * @param {CRVideo_ToolBarUI} UIElement  -  界面元素
   * @param {bool } isVisible   -  是否可见
   */
  CRVideo.MediaContainer.prototype.setToolBarUIElementVisible = function (UIElement, isVisible) {
    this._handler.setToolBarUIElementVisible(UIElement, isVisible)
  }

  /**
   * 视频的呈现容器
   * @class
   * @extends CRVideo.Container
   */
  CRVideo.VideoContainer = function () {
    this._videoID = -1
    this._usrID = ''
    this._visibleNickName = true
    CRVideo._containerList.push(this)
  }
  CRVideo.VideoContainer.prototype = new CRVideo.Container()
  /**
   * 设置显示的目标用户视频
   * @access public
   * @param {string} userID - 目标用户ID
   * @param {number } videoID - 用户的指定视频设备（-1，代表用户的默认视频设备）
   */
  CRVideo.VideoContainer.prototype.setVideo = function (usrID, videoID) {
    if (videoID === undefined) {
      videoID = -1
    }
    this._usrID = usrID
    this._videoID = videoID
    this._handler.setVideo(usrID, videoID)
  }
  /**
   * 获取当前显示的用户的视频设备
   * @access public
   * @return {string} 视频ID
   */
  CRVideo.VideoContainer.prototype.getVideoID = function () {
    return this._handler.getVideoID()
  }
  /**
   * 清理当前图像
   * @access public
   */
  CRVideo.VideoContainer.prototype.clear = function () {
    return this._handler.clear()
  }
  /**
   * 设置是否显示昵称
   * @access public
   * @param {bool} value - 否显示昵称
   */
  CRVideo.VideoContainer.prototype.setVisibleNickName = function (value) {
    this._visibleNickName = value
    this._handler.visibleNickName = value
  }
  /**
   * 获取是否显示昵称
   * @access public
   * @return {bool} 否显示昵称
   */
  CRVideo.VideoContainer.prototype.getVisibleNickName = function () {
    return this._handler.visibleNickName
  }
  /**
   * 拍照
   * @access public
   * @param {string} pathFileName - 本地绝对路径文件名(支持格式：bmp, png, gif, jpg, jpeg)
   * @return {bool} 0:成功； 非0：保存遇到的错误码；
   */
  CRVideo.VideoContainer.prototype.savePic = function (pathFileName) {
    return this._handler.savePic(pathFileName)
  }
  /**
   * 检查图像是否为空
   * @return {bool} 图像是否为空
   */
  CRVideo.VideoContainer.prototype.isPicEmpty = function () {
    return this._handler.isPicEmpty
  }
  /**
   * 绘制模式，是否拉伸绘制
   * @param {bool} value - 是否拉伸
   */
  CRVideo.VideoContainer.prototype.keepAspectRatio = function (value) {
    if (value === undefined) {
      return this._handler.keepAspectRatio
    } else {
      this._handler.keepAspectRatio = value
    }
  }
}

if (window['000a0180686911e78dd0a45d36bb8c5c'] === undefined) {
  /**
   * sdk错误码
   * @module cr/error
   */

  // 没有错误
  /**
   * 没有错误
   * @static
   */
  var CRVideo_NOERR = 0
  // ------------------------------------------
  //
  // 基础错误
  //
  // ------------------------------------------
  // 未知错误
  /**
   * 未知错误
   * @static
   */
  var CRVideo_UNKNOWERR = 1
  // 内存不足
  /**
   * 内存不足
   * @static
   */
  var CRVideo_OUTOF_MEM = 2
  // sdk内部错误
  /**
   * sdk内部错误
   * @static
   */
  var CRVideo_INNER_ERR = 3
  // 不支持的sdk版本
  /**
   * 不支持的sdk版本
   * @static
   */
  var CRVideo_MISMATCHCLIENTVER = 4
  // 参数错误
  /**
   * 参数错误
   * @static
   */
  var CRVideo_MEETPARAM_ERR = 5
  // 无效数据
  /**
   * 无效数据
   * @static
   */
  var CRVideo_ERR_DATA = 6
  // 帐号密码不正确
  /**
   * 帐号密码不正确
   * @static
   */
  var CRVideo_ANCTPSWD_ERR = 7
  // 服务异常
  /**
   * 服务异常
   * @static
   */
  var CRVideo_SERVER_EXCEPTION = 8
  // 登录用户被踢下线
  /**
   * 登录用户被踢下线
   * @static
   */
  var CRVideo_CRVideoSDK_USER_BEEN_KICKOUT = 10

  // ------------------------------------------
  //
  // 网络错误
  //
  // ------------------------------------------
  // 网络初始化失败
  /**
   * 网络初始化失败
   * @static
   */
  var CRVideo_NETWORK_INITFAILED = 200
  // 没有服务器信息
  /**
   * 没有服务器信息
   * @static
   */
  var CRVideo_NO_SERVERINFO = 201
  // 服务器没有响应
  /**
   * 服务器没有响应
   * @static
   */
  var CRVideo_NOSERVER_RSP = 202
  // 创建连接失败
  /**
   * 创建连接失败
   * @static
   */
  var CRVideo_CREATE_CONN_FAILED = 203
  // socket异常
  /**
   * socket异常
   * @static
   */
  var CRVideo_SOCKETEXCEPTION = 204
  // 网络超时
  /**
   * 网络超时
   * @static
   */
  var CRVideo_SOCKETTIMEOUT = 205
  // 连接被关闭
  /**
   * 连接被关闭
   * @static
   */
  var CRVideo_FORCEDCLOSECONNECTION = 206
  // 连接丢失
  /**
   * 连接丢失
   * @static
   */
  var CRVideo_CONNECTIONLOST = 207

  // ------------------------------------------
  //
  // 队列错误
  //
  // ------------------------------------------
  // 队列ID错误
  /**
   * 队列ID错误
   * @static
   */
  var CRVideo_QUE_ID_INVALID = 400
  // 没有用户在排队
  /**
   * 没有用户在排队
   * @static
   */
  var CRVideo_QUE_NOUSER = 401
  // 排队用户已取消
  /**
   * 排队用户已取消
   * @static
   */
  var CRVideo_QUE_USER_CANCELLED = 402
  // 队列服务还未开启
  /**
   * 队列服务还未开启
   * @static
   */
  var CRVideo_QUE_SERVICE_NOT_START = 403
  // 已在其它队列排队(客户只能在一个队列排队)
  /**
   * 已在其它队列排队(客户只能在一个队列排队)
   * @static
   */
  var CRVideo_ALREADY_OTHERQUE = 404

  // ------------------------------------------
  //
  // 呼叫错误
  //
  // ------------------------------------------
  // 无效的呼叫ID
  /**
   * 无效的呼叫ID
   * @static
   */
  var CRVideo_INVALID_CALLID = 600
  // 已在呼叫中
  /**
   * 已在呼叫中
   * @static
   */
  var CRVideo_ERR_CALL_EXIST = 601
  // 对方忙
  /**
   * 对方忙
   * @static
   */
  var CRVideo_ERR_BUSY = 602
  // 对方不在线
  /**
   * 对方不在线
   * @static
   */
  var CRVideo_ERR_OFFLINE = 603
  // 对方无应答
  /**
   * 对方无应答
   * @static
   */
  var CRVideo_ERR_NOANSWER = 604
  // 用户不存在
  /**
   * 用户不存在
   * @static
   */
  var CRVideo_ERR_USER_NOT_FOUND = 605
  // 对方拒接
  /**
   * 对方拒接
   * @static
   */
  var CRVideo_ERR_REFUSE = 606

  // ------------------------------------------
  //
  // 会话业务错误
  //
  // ------------------------------------------
  // 会议不存在或已结束
  /**
   * 会议不存在或已结束
   * @static
   */
  var CRVideo_MEETNOTEXIST = 800
  // 会议密码不正确
  /**
   * 会议密码不正确
   * @static
   */
  var CRVideo_AUTHERROR = 801
  // 会议终端数量已满（购买的license不够)
  /**
   * 会议终端数量已满（购买的license不够)
   * @static
   */
  var CRVideo_MEMBEROVERFLOWERROR = 802
  // 分配会议资源失败
  /**
   * 分配会议资源失败
   * @static
   */
  var CRVideo_RESOURCEALLOCATEERROR = 803
  // 会议掉线
  /**
   * 会议掉线
   * @static
   */
  var CRVideo_MEETOFFLINE = 804

  // ------------------------------------------
  //
  // web错误
  //
  // ------------------------------------------
  // ocx未安装
  /**
   * ocx未安装
   * @static
   */
  var CRVideo_WEB_OCX_NOTINSTALLED = 1001
  // 不支持的浏览器
  /**
   * 不支持的浏览器
   * @static
   */
  var CRVideo_WEB_BROWER_NOTUPPORTED = 1002
  // 不支持的插件版本
  /**
   * 不支持的插件版本
   * @static
   */
  var CRVideo_OCX_VERSION_NOTUPPORTED = 1003
}
if (window['000a0180686911e78dd0a45d36bb8c5c'] === undefined) {
  /**
   * sdk回调接口
   * @module cr/callback
   */
  // ------------------------------------------------------------------------
  //
  // 会议创建管理的回调接口
  //
  // -------------------------------------------------------------------------
  /**
   * @typedef {object} CRVideo_MeetInfoObj - 区域
   * @property {number} ID - 会议号，0时代表会议信息为空
   * @property {number} pswd - 会议密码；（空代表会议无密码）
   * @property {number} subject - 会议主题
   * @property {number} pubMeetUrl - 会议公共链接
   */
  /**
   * 登录成功响应
   * @callback CRVideo.CbProxy~CRVideo_LoginSuccess
   * @param {string} usrID - 用户账户
   * @param {string} cookie - 自定义用户数据
   */
  var CRVideo_LoginSuccess = new CRVideo.CbProxy('CRVideo_LoginSuccess')
  /**
   * 登录失败响应
   * @callback CRVideo.CbProxy~CRVideo_LoginFail
   * @param {number} sdkErr - 操作失败代码,定义见cr/error
   * @param {string} cookie - 自定义用户数据
   */
  var CRVideo_LoginFail = new CRVideo.CbProxy('CRVideo_LoginFail')
  /**
   * SDK通知自己掉线
   * @callback CRVideo.CbProxy~CRVideo_LineOff
   * @param {number} sdkErr - 操作失败代码,定义见cr/error
   */
  var CRVideo_LineOff = new CRVideo.CbProxy('CRVideo_LineOff')
  /**
   * 客户端设置免打扰状态操作成功响应
   * @callback CRVideo.CbProxy~CRVideo_SetDNDStatusSuccess
   * @param {string} cookie - 自定义用户数据
   */
  var CRVideo_SetDNDStatusSuccess = new CRVideo.CbProxy('CRVideo_SetDNDStatusSuccess')
  /**
   * 客户端设置免打扰状态操作失败响应
   * @callback CRVideo.CbProxy~CRVideo_SetDNDStatusFail
   * @param {number} sdkErr - 操作失败代码,定义见cr/error
   * @param {string} cookie - 自定义用户数据
   */
  var CRVideo_SetDNDStatusFail = new CRVideo.CbProxy('CRVideo_SetDNDStatusFail')
  /**
   * 创建会议成功响应
   * @callback CRVideo.CbProxy~CRVideo_CreateMeetingSuccess
   * @param {CRVideo_MeetInfoObj} meetObj - 会议信息
   * @param {string} cookie - 自定义用户数据
   */
  var CRVideo_CreateMeetingSuccess = new CRVideo.CbProxy('CRVideo_CreateMeetingSuccess')
  /**
   * 创建会议失败响应
   * @callback CRVideo.CbProxy~CRVideo_CreateMeetingFail
   * @param {number} sdkErr - 操作失败代码,定义见cr/error
   * @param {string} cookie - 自定义用户数据
   */
  var CRVideo_CreateMeetingFail = new CRVideo.CbProxy('CRVideo_CreateMeetingFail')
  /**
   * 呼叫他人操作成功响应
   * @callback CRVideo.CbProxy~CRVideo_CallSuccess
   * @param {string} callID - 呼叫全局标识
   * @param {string} cookie - 自定义用户数据
   */
  var CRVideo_CallSuccess = new CRVideo.CbProxy('CRVideo_CallSuccess')
  /**
   * 呼叫他人操作失败响应
   * @callback CRVideo.CbProxy~CRVideo_CallFail
   * @param {string} callID - 呼叫全局标识
   * @param {number} sdkErr - 操作失败代码,定义见cr/error
   * @param {string} cookie - 自定义用户数据
   */
  var CRVideo_CallFail = new CRVideo.CbProxy('CRVideo_CallFail')
  /**
   * 接受他人呼叫操作成功响应
   * @callback CRVideo.CbProxy~CRVideo_AcceptCallSuccess
   * @param {string} callID - 呼叫全局标识
   * @param {string} cookie - 自定义用户数据
   */
  var CRVideo_AcceptCallSuccess = new CRVideo.CbProxy('CRVideo_AcceptCallSuccess')
  /**
   * 接受他人呼叫操作失败响应
   * @callback CRVideo.CbProxy~CRVideo_AcceptCallFail
   * @param {string} callID - 呼叫全局标识
   * @param {number} sdkErr - 操作失败代码,定义见cr/error
   * @param {string} cookie - 自定义用户数据
   */
  var CRVideo_AcceptCallFail = new CRVideo.CbProxy('CRVideo_AcceptCallFail')
  /**
   * 拒绝他人的呼叫成功响应
   * @callback CRVideo.CbProxy~CRVideo_RejectCallSuccess
   * @param {string} callID - 呼叫全局标识
   * @param {string} cookie - 自定义用户数据
   */
  var CRVideo_RejectCallSuccess = new CRVideo.CbProxy('CRVideo_RejectCallSuccess')
  /**
   * 拒绝他人的呼叫失败响应
   * @callback CRVideo.CbProxy~CRVideo_RejectCallFail
   * @param {string} callID - 呼叫全局标识
   * @param {number} sdkErr - 操作失败代码,定义见cr/error
   * @param {string} cookie - 自定义用户数据
   */
  var CRVideo_RejectCallFail = new CRVideo.CbProxy('CRVideo_RejectCallFail')
  /**
   * 挂断呼叫操作成功响应
   * @callback CRVideo.CbProxy~CRVideo_HangupCallSuccess
   * @param {string} callID - 呼叫全局标识
   * @param {string} cookie - 自定义用户数据
   */
  var CRVideo_HangupCallSuccess = new CRVideo.CbProxy('CRVideo_HangupCallSuccess')
  /**
   * 挂断呼叫操作失败响应
   * @callback CRVideo.CbProxy~CRVideo_HangupCallFail
   * @param {string} callID - 呼叫全局标识
   * @param {number} sdkErr - 操作失败代码,定义见cr/error
   * @param {string} cookie - 自定义用户数据
   */
  var CRVideo_HangupCallFail = new CRVideo.CbProxy('CRVideo_HangupCallFail')
  /**
   * SDK通知自己被呼叫
   * @callback CRVideo.CbProxy~CRVideo_NotifyCallIn
   * @param {string} callID - 呼叫全局标识
   * @param {CRVideo_MeetInfoObj} meetObj - 会议信息
   * @param {string} callerID - 呼叫人员的标识ID
   * @param {string} usrExtDat - 自定义扩展参数
   */
  var CRVideo_NotifyCallIn = new CRVideo.CbProxy('CRVideo_NotifyCallIn')

  /**
   * SDK通知自己视频呼叫被对方接受
   * @callback CRVideo.CbProxy~CRVideo_NotifyCallAccepted
   * @param {string} callID - 呼叫全局标识
   * @param {CRVideo_MeetInfoObj} meetObj - 会议信息
   * @param {string} usrExtDat - 自定义扩展参数
   */
  var CRVideo_NotifyCallAccepted = new CRVideo.CbProxy('CRVideo_NotifyCallAccepted')
  /**
   * SDK通知自己呼叫被对方拒绝
   * @callback CRVideo.CbProxy~CRVideo_NotifyCallRejected
   * @param {string} callID - 呼叫全局标识
   * @param {number} sdkErr - 呼叫被对方拒绝的原因代码,定义见cr/error
   * @param {string} usrExtDat - 自定义扩展参数
   */
  var CRVideo_NotifyCallRejected = new CRVideo.CbProxy('CRVideo_NotifyCallRejected')
  /**
   * SDK通知自己呼叫被挂断
   * @callback CRVideo.CbProxy~CRVideo_NotifyCallHungup
   * @param {string} callID - 呼叫全局标识
   * @param {string} usrExtDat - 自定义扩展参数
   */
  var CRVideo_NotifyCallHungup = new CRVideo.CbProxy('CRVideo_NotifyCallHungup')
  /**
   * 发送数据时，SDK通知发送结果
   * @callback CRVideo.CbProxy~CRVideo_SendCmdRlst
   * @param {string} taskID - 发送任务id
   * @param {number} sdkErr - 操作失败代码,定义见cr/error
   * @param {string} cookie - 自定义用户数据
   */
  var CRVideo_SendCmdRlst = new CRVideo.CbProxy('CRVideo_SendCmdRlst')
  /**
   * 发送数据时，SDK通知发送结果
   * @callback CRVideo.CbProxy~CRVideo_SendBufferRlst
   * @param {string} taskID - 发送任务id
   * @param {number} sdkErr - 操作失败代码,定义见cr/error
   * @param {string} cookie - 自定义用户数据
   */
  var CRVideo_SendBufferRlst = new CRVideo.CbProxy('CRVideo_SendBufferRlst')
  /**
   * 发送文件时，SDK通知发送结果
   * @callback CRVideo.CbProxy~CRVideo_SendFileRlst
   * @param {string} taskID - 发送任务id
   * @param {number} fileName - 文件名
   * @param {number} sdkErr - 操作失败代码,定义见cr/error
   * @param {string} cookie - 自定义用户数据
   */
  var CRVideo_SendFileRlst = new CRVideo.CbProxy('CRVideo_SendFileRlst')
  /**
   * 发送数据时，SDK通知发送进度
   * @callback CRVideo.CbProxy~CRVideo_SendProgress
   * @param {string} taskID - 发送任务id
   * @param {number} sendedLen  - 已发送的数据长度
   * @param {number} totalLen   - 需要发送的总长度
   * @param {string} cookie - 自定义用户数据
   */
  var CRVideo_SendProgress = new CRVideo.CbProxy('CRVideo_SendProgress')
  /**
   * 取消发送响应
   * @callback CRVideo.CbProxy~CRVideo_CancelSendRlst
   * @param {string} taskID - 发送任务id
   * @param {number} sdkErr - 操作失败代码,定义见cr/error
   * @param {string} cookie - 自定义用户数据
   */
  var CRVideo_CancelSendRlst = new CRVideo.CbProxy('CRVideo_CancelSendRlst')
  /**
   * SDK通知收到小块数据
   * @callback CRVideo.CbProxy~CRVideo_NotifyCmdData
   * @param {string} sourceUserId - 数据来源
   * @param {string} data - 数据
   */
  var CRVideo_NotifyCmdData = new CRVideo.CbProxy('CRVideo_NotifyCmdData')
  /**
   * SDK通知收到大块数据
   * @callback CRVideo.CbProxy~CRVideo_NotifyBufferData
   * @param {string} sourceUserId - 数据来源
   * @param {string} data - 数据
   */
  var CRVideo_NotifyBufferData = new CRVideo.CbProxy('CRVideo_NotifyBufferData')
  /**
   * SDK通知收到文件数据（收到的文件生成在系统临时目录下，请尽快移走对应文件）
   * @callback CRVideo.CbProxy~CRVideo_NotifyFileData
   * @param {string} sourceUserId - 数据来源
   * @param {string} tmpFile - 临时文件，不需要时，请移除或删除对应文件
   * @param {string} orgFileName  - 源始文件名
   */
  var CRVideo_NotifyFileData = new CRVideo.CbProxy('CRVideo_NotifyFileData')
  /**
   * SDK通知取消发送文件数据
   * @callback CRVideo.CbProxy~CRVideo_NotifyCancelSend
   * @param {number} taskID - 取消的任务id
   */
  var CRVideo_NotifyCancelSend = new CRVideo.CbProxy('CRVideo_NotifyCancelSend')
  /**
   * 获取会议列表成功响应
   * @callback CRVideo.CbProxy~CRVideo_GetMeetingsSuccess
   * @param {CRVideo_MeetInfoObj} jsonMeetings - 会议列表信息
   * @param {string} cookie - 自定义用户数据
   */
  var CRVideo_GetMeetingsSuccess = new CRVideo.CbProxy('CRVideo_GetMeetingsSuccess')
  /**
   * 获取会议列表成功响应
   * @callback CRVideo.CbProxy~CRVideo_GetMeetingsFail
   * @param {number} sdkErr - 操作失败代码,定义见cr/error
   * @param {string} cookie - 自定义用户数据
   */
  var CRVideo_GetMeetingsFail = new CRVideo.CbProxy('CRVideo_GetMeetingsFail')

  // ------------------------------------------------------------------------
  //
  // 会议管理类的回调接口
  //
  // -------------------------------------------------------------------------
  /**
   * 进入会议完成响应
   * @callback CRVideo.CbProxy~CRVideo_EnterMeetingRslt
   * @param {number} sdkErr - 操作失败代码,定义见cr/error
   */
  var CRVideo_EnterMeetingRslt = new CRVideo.CbProxy('CRVideo_EnterMeetingRslt')
  /**
   * 某用户进入了会议
   * @callback CRVideo.CbProxy~CRVideo_UserEnterMeeting
   * @param {string} usrID - 进入会议的用户ID
   */
  var CRVideo_UserEnterMeeting = new CRVideo.CbProxy('CRVideo_UserEnterMeeting')

  /**
   * 某用户离开了会议
   * @callback CRVideo.CbProxy~CRVideo_UserLeftMeeting
   * @param {number} id - 离开会议的用户ID
   */
  var CRVideo_UserLeftMeeting = new CRVideo.CbProxy('CRVideo_UserLeftMeeting')

  /**
   * 通知结束视频会议结果
   * @callback CRVideo.CbProxy~CRVideo_EndMeetingRslt
   * @param {number} sdkErr - 操作失败代码,定义见cr/error
   */
  var CRVideo_EndMeetingRslt = new CRVideo.CbProxy('CRVideo_EndMeetingRslt')
  /**
   * 会议已被结束
   * @callback CRVideo.CbProxy~CRVideo_MeetingStopped
   */
  var CRVideo_MeetingStopped = new CRVideo.CbProxy('CRVideo_MeetingStopped')
  /**
   * SDK通知从会议里掉线了
   * @callback CRVideo.CbProxy~CRVideo_MeetingDropped
   */
  var CRVideo_MeetingDropped = new CRVideo.CbProxy('CRVideo_MeetingDropped')

  /**
   * SDK通知我的网络变化
   * @callback CRVideo.CbProxy~CRVideo_NetStateChanged
   * @param {number} level - 网络状况等级(0~10，10分为最佳网络)
   */
  var CRVideo_NetStateChanged = new CRVideo.CbProxy('CRVideo_NetStateChanged')
  /**
   * SDK通知本地音频设备有变化
   * @callback CRVideo.CbProxy~CRVideo_AudioDevChanged
   */
  var CRVideo_AudioDevChanged = new CRVideo.CbProxy('CRVideo_AudioDevChanged')
  /**
   * SDK通知打开本地音频状态变化
   * @callback CRVideo.CbProxy~CRVideo_AudioStatusChanged
   * @param {string} userID - 会话中设备的所有者ID
   * @param {CRVideo_ASTATUS} oldStatus - oldStatus 旧状态
   * @param {CRVideo_ASTATUS} newStatus - newStatus 新状态
   */
  var CRVideo_AudioStatusChanged = new CRVideo.CbProxy('CRVideo_AudioStatusChanged')
  /**
   * SDK通知用户的说话声音强度更新
   * @callback CRVideo.CbProxy~CRVideo_MicEnergyUpdate
   * @param {string} userID - 用户ID
   * @param {number} oldLevel - 原来的说话声音强度
   * @param {number} newLevel - 现在的说话声音强度
   */
  var CRVideo_MicEnergyUpdate = new CRVideo.CbProxy('CRVideo_MicEnergyUpdate')
  /**
   * SDK通知打开本地视频状态变化
   * @callback CRVideo.CbProxy~CRVideo_VideoStatusChanged
   * @param {string} userID - 会话中设备的所有者ID
   * @param {CRVideo_VSTATUS} oldStatus - oldStatus 旧状态
   * @param {CRVideo_VSTATUS} newStatus - newStatus 新状态
   */
  var CRVideo_VideoStatusChanged = new CRVideo.CbProxy('CRVideo_VideoStatusChanged')
  /**
   * SDK通知用户有新的视频数据
   * @callback CRVideo.CbProxy~CRVideo_NotifyVideoData
   * @param {string} userID -  用户标识ID
   * @param {string} videoId -  用户的摄像头ID
   * @param {number} frmTime - frmTime 图像的创建时戳
   */
  var CRVideo_NotifyVideoData = new CRVideo.CbProxy('CRVideo_NotifyVideoData')
  /**
   * SDK通知用户的视频设备有变化
   * @callback CRVideo.CbProxy~CRVideo_VideoDevChanged
   * @param {string} userID - 设备变化的用户ID
   */
  var CRVideo_VideoDevChanged = new CRVideo.CbProxy('CRVideo_VideoDevChanged')
  /**
   * SDK通知用户的视频默认设备有变化
   * @callback CRVideo.CbProxy~CRVideo_DefVideoChanged
   * @param {string} userID - 设备变化的用户ID
   * @param {number} videoID - 默认设备id
   */
  var CRVideo_DefVideoChanged = new CRVideo.CbProxy('CRVideo_DefVideoChanged')
  /**
   * 录制异常，录制将自动停止
   * @callback CRVideo.CbProxy~CRVideo_RecordErr
   * @param {number} sdkErr - 操作失败代码,定义见cr/error
   */
  var CRVideo_RecordErr = new CRVideo.CbProxy('CRVideo_RecordErr')
  /**
   * 录制状态更改通知
   * @callback CRVideo.CbProxy~CRVideo_RecordStateChanged
   * @param {CRVideo_RECORD_STATE} state - 录制状态,数值请参考定义RECORD_STATE
   */
  var CRVideo_RecordStateChanged = new CRVideo.CbProxy('CRVideo_RecordStateChanged')
  /**
   * 录制异常，录制将自动停止
   * @callback CRVideo.CbProxy~CRVideo_RecordErr
   * @param {number} sdkErr - 操作失败代码,定义见cr/error
   */
  var CRVideo_RecordErr = new CRVideo.CbProxy('CRVideo_RecordErr')
  /**
   * 上传录制文件错误通知
   * @callback CRVideo.CbProxy~CRVideo_UploadRecordFileErr
   * @param {string} fileName - 本地文件路径
   * @param {number} sdkErr - 操作失败代码,定义见cr/error
   */
  var CRVideo_UploadRecordFileErr = new CRVideo.CbProxy('CRVideo_UploadRecordFileErr')

  /**
   * SDK通知录制文件状态更改
   * @callback CRVideo.CbProxy~CRVideo_NotifyRecordFileStateChanged
   * @param {string} fileName - 本地文件路径
   * @param {number} state - 状态 0 未上传 1 上传中 2已上传
   */
  var CRVideo_NotifyRecordFileStateChanged = new CRVideo.CbProxy('CRVideo_NotifyRecordFileStateChanged')
  /**
   * SDK通知上传录制文件进度
   * @callback CRVideo.CbProxy~CRVideo_NotifyRecordFileUploadProgress
   * @param {string} fileName - 文件名
   * @param {number} percent - 进度0-100
   */
  var CRVideo_NotifyRecordFileUploadProgress = new CRVideo.CbProxy('CRVideo_NotifyRecordFileUploadProgress')
  /**
   * 开启屏幕共享的响应事件
   * @callback CRVideo.CbProxy~CRVideo_StartScreenShareRslt
   * @param {number} sdkErr - 操作失败代码,定义见cr/error
   */
  var CRVideo_StartScreenShareRslt = new CRVideo.CbProxy('CRVideo_StartScreenShareRslt')
  /**
   * 停止屏幕共享的响应事件
   * @callback CRVideo.CbProxy~CRVideo_StopScreenShareRslt
   * @param {number} sdkErr - 操作失败代码,定义见cr/error
   */
  var CRVideo_StopScreenShareRslt = new CRVideo.CbProxy('CRVideo_StopScreenShareRslt')
  /**
   * 通知他人开启了屏幕共享
   * @callback CRVideo.CbProxy~CRVideo_NotifyScreenShareStarted
   */
  var CRVideo_NotifyScreenShareStarted = new CRVideo.CbProxy('CRVideo_NotifyScreenShareStarted')
  /**
   * 通知他人停止了屏幕共享
   * @callback CRVideo.CbProxy~CRVideo_NotifyScreenShareStopped
   */
  var CRVideo_NotifyScreenShareStopped = new CRVideo.CbProxy('CRVideo_NotifyScreenShareStopped')
  /**
   * @typedef {object} CRVideo_Rect - 区域
   * @property {number} left - 区域右上角x坐标
   * @property {number} top - 区域右上角y坐标
   * @property {number} width - 区域宽度
   * @property {number} height - 区域高度
   */
  /**
   * 通知对端屏幕图像有变化
   * @callback CRVideo.CbProxy~CRVideo_NotifyScreenShareData
   * @param {string} userID - 用户ID
   * @param {CRVideo_Rect} rect - 变化的区域；（可以只重绘这块区域）
   */
  var CRVideo_NotifyScreenShareData = new CRVideo.CbProxy('CRVideo_NotifyScreenShareData')
  /**
   * 自定义抓屏时，SDK通知使用者抓屏（在收到通知时， 一定要及时CRVideo_SetCustomizeScreenImg，如果没图像时，可以先送入空图像）
   * @callback CRVideo.CbProxy~CRVideo_NotifyCatchScreen
   */
  var CRVideo_NotifyCatchScreen = new CRVideo.CbProxy('CRVideo_NotifyCatchScreen')
  /**
   * SDK通知远程控制权限给予了某人
   * @callback CRVideo.CbProxy~CRVideo_NotifyGiveCtrlRight
   * @param {string} operId - 操作的用户ID
   * @param {string} targetId - 控制权限给予了谁
   */
  var CRVideo_NotifyGiveCtrlRight = new CRVideo.CbProxy('CRVideo_NotifyGiveCtrlRight')
  /**
   * SDK通知收回远程控制
   * @callback CRVideo.CbProxy~CRVideo_NotifyReleaseCtrlRight
   * @param {string} operId - 操作的用户ID
   * @param {string} targetId - 收回了谁的控制权限
   */
  var CRVideo_NotifyReleaseCtrlRight = new CRVideo.CbProxy('CRVideo_NotifyReleaseCtrlRight')
  /**
   * 发送IM消息，SDK通知使用者发送结果
   * @callback CRVideo.CbProxy~CRVideo_SendIMmsgRlst
   * @param {string} taskID - 发送任务id
   * @param {number} sdkErr - 操作结果代码,定义见cr/error
   * @param {string} cookie - 自定义用户数据
   */
  var CRVideo_SendIMmsgRlst = new CRVideo.CbProxy('CRVideo_SendIMmsgRlst')
  /**
   * SDK通知收到IM消息
   * @callback CRVideo.CbProxy~CRVideo_NotifyIMmsg
   * @param {string} fromUserID - 消息来源
   * @param {string} text - 消息内容
   */
  var CRVideo_NotifyIMmsg = new CRVideo.CbProxy('CRVideo_NotifyIMmsg')
  /**
   * @typedef {object} CRVideo_SubPage - 队列状态信息
   * @property {number} userID - 用户ID
   * @property {number} boardID - 白板id
   */
  /**
   * SDK通知功能切换
   * @callback CRVideo.CbProxy~CRVideo_NotifySwitchToPage
   * @param {CRVideo_MAIN_PAGE_TYPE} mainPage  - 功能类型
   * @param {CRVideo_SubPage} data - 消息内容
   */
  var CRVideo_NotifySwitchToPage = new CRVideo.CbProxy('CRVideo_NotifySwitchToPage')
  /**
   * SDK通知视频分屏模式切换
   * @callback CRVideo.CbProxy~CRVideo_NotifyVideoWallMode
   * @param {CRVideo_VIDEOLAYOUTMODE} model  - 分屏模式
   */
  var CRVideo_NotifyVideoWallMode = new CRVideo.CbProxy('CRVideo_NotifyVideoWallMode')
  /**
   * SDK通知主视频更改
   * @callback CRVideo.CbProxy~CRVideo_NotifyMainVideo
   * @param {number} userID - 用户ID
   */
  var CRVideo_NotifyMainVideo = new CRVideo.CbProxy('CRVideo_NotifyMainVideo')

  /**
   * @typedef {object} CRVideo_Board - 白板信息
   * @property {string} userID - 用户ID
   * @property {number} boardID - 白板id
   * @property {string} title - 白板名称
   * @property {number} width - 白板宽度
   * @property {number} height - 白板高度
   */
  /**
   * SDK通知之前已经创建好的白板
   * @callback CRVideo.CbProxy~CRVideo_NotifyInitBoards
   * @param {CRVideo_Board[]} boards - 已经创建好的白板列表
   */
  var CRVideo_NotifyInitBoards = new CRVideo.CbProxy('CRVideo_NotifyInitBoards')
  /**
   * SDK通知之前已经创建好的白板上的图元数据
   * @callback CRVideo.CbProxy~CRVideo_NotifyInitBoardElements
   * @param {CRVideo_SubPage} subPage - 白板信息
   * @param {string[]} elementDatas - 图元数据
   * @param {string} bkImgID - 背景图片
   */
  var CRVideo_NotifyInitBoardElements = new CRVideo.CbProxy('CRVideo_NotifyInitBoardElements')
  /**
   * SDK通知创建白板
   * @callback CRVideo.CbProxy~CRVideo_NotifyCreateBoard
   * @param {CRVideo_SubPage} subPage - 白板信息
   * @param {string[]} title - 白板名称
   * @param {string} width - 白板宽度
   * @param {string} height - 白板高度
   * @param {string} operatorID - 创建白板的用户ID
   */
  var CRVideo_NotifyCreateBoard = new CRVideo.CbProxy('CRVideo_NotifyCreateBoard')
  /**
   * SDK通知关闭白板
   * @callback CRVideo.CbProxy~CRVideo_NotifyCloseBoard
   * @param {CRVideo_SubPage} subPage - 白板信息
   * @param {string} operatorID - 关闭白板的用户ID
   */
  var CRVideo_NotifyCloseBoard = new CRVideo.CbProxy('CRVideo_NotifyCloseBoard')
  /**
   * SDK通知白板背景
   * @callback CRVideo.CbProxy~CRVideo_NotifyBoardBkImage
   * @param {CRVideo_SubPage} subPage - 白板信息
   * @param {string} imgFileID  - 背景图片文件，通过downloadNetDiskFile可下载到本地显示。
   * @param {string} operatorID  - 操作用户ID
   */
  var CRVideo_NotifyBoardBkImage = new CRVideo.CbProxy('CRVideo_NotifyBoardBkImage')
  /**
   * SDK通知添加图元信息
   * @callback CRVideo.CbProxy~CRVideo_NotifyAddBoardElement
   * @param {CRVideo_SubPage} subPage - 白板信息
   * @param {string[]} elementDatas - 图元信息
   * @param {string} operatorID  - 添加图元的用户ID
   */
  var CRVideo_NotifyAddBoardElement = new CRVideo.CbProxy('CRVideo_NotifyAddBoardElement')
  /**
   * SDK通知删除图元
   * @callback CRVideo.CbProxy~CRVideo_NotifyDelBoardElement
   * @param {CRVideo_SubPage} subPage - 白板信息
   * @param {string[]} elementDatas - 图元信息
   * @param {string} operatorID  - 删除图元的用户ID
   */
  var CRVideo_NotifyDelBoardElement = new CRVideo.CbProxy('CRVideo_NotifyDelBoardElement')
  /**
   * SDK通知设置鼠标热点消息
   * @callback CRVideo.CbProxy~CRVideo_NotifyMouseHotSpot
   * @param {CRVideo_SubPage} subPage - 白板信息
   * @param {number} x - 屏幕横坐标
   * @param {number} y - 屏幕纵坐标
   * @param {string} operatorID  - 操作者的用户ID
   */
  var CRVideo_NotifyMouseHotSpot = new CRVideo.CbProxy('CRVideo_NotifyMouseHotSpot')
  /**
   * SDK通知删除网盘文件结果
   * @callback CRVideo.CbProxy~CRVideo_NotifyNetDiskFileDeleteRslt
   * @param {string} fileID - 网盘文件id
   * @param {number} isSucceed - 是否成功 1 成功 0 失败
   */
  var CRVideo_NotifyNetDiskFileDeleteRslt = new CRVideo.CbProxy('CRVideo_NotifyNetDiskFileDeleteRslt')
  /**
   * SDK通知网盘上传或下载进度
   * @callback CRVideo.CbProxy~CRVideo_NotifyNetDiskTransforProgress
   * @param {string} fileID - 网盘文件id
   * @param {number} percent - 进度0-100
   * @param {number} isUpload -  是否是上传 1 上传 0 下载
   */
  var CRVideo_NotifyNetDiskTransforProgress = new CRVideo.CbProxy('CRVideo_NotifyNetDiskTransforProgress')
  /**
   * SDK通知影音文件打开
   * @callback CRVideo.CbProxy~CRVideo_NotifyMediaOpened
   * @param {number} totalTime - 影音时长(秒)
   * @param {number} w - 宽度
   * @param {number} h - 高度
   */
  var CRVideo_NotifyMediaOpened = new CRVideo.CbProxy('CRVideo_NotifyMediaOpened')
  /**
   * SDK通知影音开始播放
   * @callback CRVideo.CbProxy~CRVideo_NotifyMediaStart
   * @param {string} userid - 操作者的用户id
   */
  var CRVideo_NotifyMediaStart = new CRVideo.CbProxy('CRVideo_NotifyMediaStart')
  /**
   * SDK通知影音播放停止
   * @callback CRVideo.CbProxy~CRVideo_NotifyMediaStop
   * @param {string} userid - 操作者的用户id
   * @param {CRVideo_STOP_REASON} reason - 播放停止原因
   */
  var CRVideo_NotifyMediaStop = new CRVideo.CbProxy('CRVideo_NotifyMediaStop')
  /**
   * SDK通知设置鼠标热点消息
   * @callback CRVideo.CbProxy~CRVideo_NotifyMediaPause
   * @param {string} userid - 操作者的用户id
   * @param {number} pause - 是否暂停 1暂停 0播放
   */
  var CRVideo_NotifyMediaPause = new CRVideo.CbProxy('CRVideo_NotifyMediaPause')
  /**
   * SDK通知播放进度已设置完成
   * @callback CRVideo.CbProxy~CRVideo_NotifyPlayPosSetted
   * @param {number} setPTS - 播放进度
   */
  var CRVideo_NotifyPlayPosSetted = new CRVideo.CbProxy('CRVideo_NotifyPlayPosSetted')
  /**
   * SDK通知影音帧数据已解码完毕
   * @callback CRVideo.CbProxy~CRVideo_NotifyMemberMediaData
   * @param {string} userid  - 操作者的用户id
   * @param {number} curPos  - 当前播放进度
   */
  var CRVideo_NotifyMemberMediaData = new CRVideo.CbProxy('CRVideo_NotifyMemberMediaData')
  /**
   * 第3方呼叫操作结果
   * @callback CRVideo.CbProxy~CRVideo_ClientInviteRslt
   * @param {string} inviteID   - 操作者的用户id
   * @param {number} sdkErr - 操作结果代码,定义见cr/error
   * @param {string} cookie   - 自定义用户数据
   */
  var CRVideo_ClientInviteRslt = new CRVideo.CbProxy('CRVideo_ClientInviteRslt')
  /**
   * 取消第3方呼叫操作结果
   * @callback CRVideo.CbProxy~CRVideo_ClientCancelInviteRslt
   * @param {string} inviteID  - 邀请标识码（邀请ID
   * @param {number} sdkErr - 操作结果代码,定义见cr/errorsdkErr，CRVIDEOSDK_NOERR为成功操作
   * @param {string} cookie - 自定义数据 (在回调时，回传给调用者)
   */
  var CRVideo_ClientCancelInviteRslt = new CRVideo.CbProxy('CRVideo_ClientCancelInviteRslt')
  /**
   * SDK通知第3方呼叫状态改变
   * @callback CRVideo.CbProxy~CRVideo_NotifyInviteStatus
   * @param {string} inviteID  - 邀请标识码（邀请ID
   * @param {number} status - 第3方呼叫状态码,0-振铃 1-接通 2-拒绝 3-未应答 4-挂断
   */
  var CRVideo_NotifyInviteStatus = new CRVideo.CbProxy('CRVideo_NotifyInviteStatus')

  // ------------------------------------------------------------------------
  //
  // 队列类的回调接口
  //
  // -------------------------------------------------------------------------
  /**
   * 队列初始化操作结果
   * @callback CRVideo.CbProxy~CRVideo_InitQueueDatRslt
   * @param {number} sdkErr - 操作结果代码,定义见cr/error
   * @param {string} cookie - 自定义用户数据
   */
  var CRVideo_InitQueueDatRslt = new CRVideo.CbProxy('CRVideo_InitQueueDatRslt')
  /**
   * @typedef {object} CRVideo_QueStatus - 队列状态
   * @property {number} queID - 队列id
   * @property {number} agent_num - 坐席数量
   * @property {number} wait_num - 排队客户数量
   * @property {number} srv_num - 正在服务的客户数量
   */
  /**
   * 队列状态变化通知
   * @callback CRVideo.CbProxy~CRVideo_QueueStatusChanged
   * @param {CRVideo_QueStatus} queStatus  -队列状态
   */
  var CRVideo_QueueStatusChanged = new CRVideo.CbProxy('CRVideo_QueueStatusChanged')
  /**
   * @typedef {object} CRVideo_QueInfo - 队列信息
   * @property {number} queID - 队列id
   * @property {number} name - 队列名称
   * @property {string} desc - 队列描述
   * @property {number} prio - 优先级，值越小优先级越高
   */
  /**
   * 排队信息变化通知
   * @callback CRVideo.CbProxy~CRVideo_QueuingInfoChanged
   * @param {CRVideo_QueInfo} queuingInfo - 队列信息
   */
  var CRVideo_QueuingInfoChanged = new CRVideo.CbProxy('CRVideo_QueuingInfoChanged')
  /**
   * 开始排队操作结果
   * @callback CRVideo.CbProxy~CRVideo_StartQueuingRslt
   * @param {number} sdkErr - 操作结果代码,定义见cr/error
   * @param {string} cookie - 自定义用户数据
   */
  var CRVideo_StartQueuingRslt = new CRVideo.CbProxy('CRVideo_StartQueuingRslt')
  /**
   * 停止排队操作结果
   * @callback CRVideo.CbProxy~CRVideo_StopQueuingRslt
   * @param {number} sdkErr - 操作结果代码,定义见cr/error
   * @param {string} cookie - 自定义用户数
   */
  var CRVideo_StopQueuingRslt = new CRVideo.CbProxy('CRVideo_StopQueuingRslt')/**
   * 开始服务队列操作结果
   * @callback CRVideo.CbProxy~CRVideo_StartServiceRslt
   * @param {number} queID  - 服务的队列ID
   * @param {number} sdkErr - 操作结果代码,定义见cr/error
   * @param {string} cookie - 自定义用户数
   */
  var CRVideo_StartServiceRslt = new CRVideo.CbProxy('CRVideo_StartServiceRslt')
  /**
   * 停止服务队列操作结果
   * @callback CRVideo.CbProxy~CRVideo_StopServiceRslt
   * @param {number} queID  - 服务的队列ID
   * @param {number} sdkErr - 操作结果代码,定义见cr/error
   * @param {string} cookie - 自定义用户数
   */
  var CRVideo_StopServiceRslt = new CRVideo.CbProxy('CRVideo_StopServiceRslt')
  /**
   * 响应分配客户操作结果
   * @callback CRVideo.CbProxy~CRVideo_ResponseAssignUserRslt
   * @param {number} sdkErr - 操作结果代码,定义见cr/error
   * @param {string} cookie - 自定义用户数
   */
  var CRVideo_ResponseAssignUserRslt = new CRVideo.CbProxy('CRVideo_ResponseAssignUserRslt')
  /**
   * @typedef {object} CRVideo_QueUser - 队列用户信息
   * @property {number} queID - 队列ID
   * @property {string} usrID - 用户ID
   * @property {string} name - 用户昵称
   * @property {string} param - 用户呼叫时的私有数据
   */
  /**
   * 系统自动安排客户
   * @callback CRVideo.CbProxy~CRVideo_AutoAssignUser
   * @param {CRVideo_QueUser} user - 队列用户信息
   */
  var CRVideo_AutoAssignUser = new CRVideo.CbProxy('CRVideo_AutoAssignUser')
  /**
   * 请求分配客户操作结果
   * @callback CRVideo.CbProxy~CRVideo_ReqAssignUserRslt
   * @param {number} sdkErr - 操作结果代码,定义见cr/error
   * @param {CRVideo_QueUser} user  - 队列用户信息
   * @param {string} cookie - 自定义用户数
   */
  var CRVideo_ReqAssignUserRslt = new CRVideo.CbProxy('CRVideo_ReqAssignUserRslt')
  /**
   * 系统取消已经安排的客户
   * @callback CRVideo.CbProxy~CRVideo_CancelAssignUser
   * @param {string} queID - 服务的队列
   * @param {string} userid - 用户id
   */
  var CRVideo_CancelAssignUser = new CRVideo.CbProxy('CRVideo_CancelAssignUser')

  /**
   * 通知用户文件状态更改
   * @callback CRVideo.CbProxy~CRVideo_FileStateChanged
   * @param {string} fileName	 - 文件名
   * @param {CRVideo_HTTP_TRANSFER_STAT} state - 状态
   */
  var CRVideo_FileStateChanged = new CRVideo.CbProxy('CRVideo_FileStateChanged')
  /**
   * 通知用户文件http响应头
   * @callback CRVideo.CbProxy~CRVideo_FileHttpRspHeader
   * @param {string} fileName	 - 文件名
   * @param {string} rspHeader - http响应头
   */
  var CRVideo_FileHttpRspHeader = new CRVideo.CbProxy('CRVideo_FileHttpRspHeader')
  /**
   * 通知用户文件http响应结果
   * @callback CRVideo.CbProxy~CRVideo_FileHttpRspContent
   * @param {string} fileName	 - 文件名
   * @param {string} rspHeader - http响应结果
   */
  var CRVideo_FileHttpRspContent = new CRVideo.CbProxy('CRVideo_FileHttpRspContent')
  /**
   * 系统取消已经安排的客户
   * @callback CRVideo.CbProxy~CRVideo_FileProgress
   * @param {string} fileName	 - 文件名
   * @param {number} finisedSize - 已传输大小
   * @param {number} totalSize - 文件大小
   */
  var CRVideo_FileProgress = new CRVideo.CbProxy('CRVideo_FileProgress')
  /**
   * 通知用户文件传输结束
   * @callback CRVideo.CbProxy~CRVideo_FileFinished
   * @param {string} fileName -文件名
   * @param {CRVideo_HTTP_TRANSFER_RESULT} rslt - 传输结果
   */
  var CRVideo_FileFinished = new CRVideo.CbProxy('CRVideo_FileFinished')
  /**
   * 通知屏幕共享大小改变
   * @callback CRVideo.CbProxy~CRVideo_NotifyShareRectChanged
   * @param {string} w -宽度
   * @param {number} h - 高度
   */
  var CRVideo_NotifyShareRectChanged = new CRVideo.CbProxy('CRVideo_NotifyShareRectChanged')
}

if (window['000a0180686911e78dd0a45d36bb8c5c'] === undefined) {
  // ---------------------------------------
  //
  // 私有对象
  //
  // ---------------------------------------
  // ocx对象
  var CRVideo_Is_ActiveXObject = !!window.ActiveXObject || 'ActiveXObject' in window

  var CRVideo_Version_OCX = '303000'
  /**
   * 录制布局
   * @enum { number }
   */
  var CRVideo_RECORD_VLAYOUT =
    {
      /** 表格类型 */
      REC_VLAYOUT_GRID: 1,
      /** 画中画类型(只有在录两个视频时有效) */
      REC_VLAYOUT_PIP: 2
    }
  /**
   * 录制视频类型
   * @enum { number }
   */
  var CRVideo_RECORD_VIDEO_TYPE =
    {
      /** 无 */
      REC_VCONTENT_NULL: 0,
      /** 录制屏幕 */
      RECORD_VIDEO_TYPE_SCREEN: 1,
      /** 录制摄像头 */
      REC_VCONTENT_VIDEOS: 3
    }
  /**
   * 录制音频类型
   * @enum { number }
   */
  var CRVideo_RECORD_AUDIO_TYPE =
    {
      /** 无 */
      REC_AUDIO_TYPE_NULL: 0,
      /** 录制本地 */
      REC_AUDIO_TYPE_LOC: 1,
      /** 录制他人 */
      REC_AUDIO_TYPE_OTHER: 2,
      /** 录制所有 */
      REC_AUDIO_TYPE_ALL: 3
    }
  /**
   * 视频尺寸定义
   * @enum { number }
   */
  var CRVideo_VIDEO_SHOW_SIZE =
    {
      VIDEO_SZ_80: 1,
      VIDEO_SZ_128: 2,
      VIDEO_SZ_160: 3,
      VIDEO_SZ_192: 4,
      VIDEO_SZ_256: 5,
      VIDEO_SZ_288: 6,
      VIDEO_SZ_320: 7,
      VIDEO_SZ_360: 8,
      VIDEO_SZ_400: 9,
      VIDEO_SZ_480: 10,
      VIDEO_SZ_576: 11,
      VIDEO_SZ_720: 12,
      VIDEO_SZ_1080: 13
    }
  /**
   * 视频尺寸定义
   * @enum { number }
   */
  var CRVideo_VIDEO_WH_RATE =
    {
      /** 16:9宽高比 */
      RATE_16_9: 0,
      /** 4:3宽高比 */
      RATE_4_3: 1,
      /** 1:1宽高比 */
      RATE_1_1: 1
    }
  /**
   * 视频图像格式
   * @enum { number }
   */
  var CRVideo_VIDEO_FORMAT =
    {
      /** yuv420p */
      VFMT_YUV420P: 0,
      /** 32-bit ARGB format (0xAARRGGBB) */
      VFMT_ARGB32: 1
    }
  /**
   * 麦克风状态
   * @enum { number }
   */
  var CRVideo_ASTATUS =
    {
      /** 音频状态未知 */
      AUNKNOWN: 0,
      /** 没有麦克风设备 */
      ANULL: 1,
      /** 麦克风处于关闭状态（软开关） */
      ACLOSE: 2,
      /** 麦克风处于打开状态（软开关） */
      AOPEN: 3,
      /** 向服务器发送打开消息中 */
      AOPENING: 4
    }
  /**
   * 视频状态
   * @enum { number }
   */
  var CRVideo_VSTATUS =
    {
      /** 视频状态未知 */
      VUNKNOWN: 0,
      /** 没有视频设备 */
      VNULL: 1,
      /** 视频处于关闭状态（软开关） */
      VCLOSE: 2,
      /** 视频处于打开状态（软开关） */
      VOPEN: 3,
      /** 向服务器发送打开消息中	*/
      VOPENING: 4
    }
  /**
   * 录制的内容类型
   * @enum { number }
   */
  var CRVideo_REC_DATATYPE =
    {
      /** 录制所有 */
      REC_AV_DEFAULT: 0,
      /** 录制本地音频 */
      REC_AUDIO_LOC: 1,
      /** 录制其它音频 */
      REC_AUDIO_OTHER: 2,
      /** 录制视频 */
      REC_VIDEO: 4
    }
  /**
   * 录制类型
   * @enum { number }
   */
  var CRVideo_REC_VCONTENT_TYPE =
    {
      /** 摄像头 */
      RECVTP_VIDEO: 0,
      /** 图像 */
      RECVTP_PIC: 1,
      /** 屏幕共享 */
      RECVTP_SCREEN: 2,
      /** 影音 */
      RECVTP_MEDIA: 3,
      /** 时间戳水印 */
      RECVTP_TIMESTAMP: 4	// 时间戳水印，_itemDat中应有：resourceid=xxx;
    }
  /**
   * 录制的状态
   * @enum { number }
   */
  var CRVideo_RECORD_STATE =
    {
      /** 录制未启动 */
      NO_RECORD: 0,
      /** 录制正在开启 */
      STARTING: 1,
      /** 正在录制 */
      RECORDING: 2,
      /** 录制已暂停 */
      PAUSED: 3,
      /** 录制正在结束 */
      STOPPING: 4
    }

  /**
   * 视频墙分屏模式
   * @enum { number }
   */
  var CRVideo_VIDEOLAYOUTMODE =
    {
      /** 互看 */
      VLO_1v1_M: 0,
      /** 1分屏 */
      VLO_WALL1_M: 1,
      /** 2分屏 */
      VLO_WALL2: 2,
      /** 4分屏 */
      VLO_WALL4: 3,
      /** 5分屏 */
      VLO_WALL5_M: 4,
      /** 6分屏 */
      VLO_WALL6_M: 5,
      /** 9分屏 */
      VLO_WALL9: 6,
      /** 13分屏 */
      VLO_WALL13_M: 7,
      /** 16分屏 */
      VLO_WALL16: 8,
      /** 25分屏 */
      VLO_WALL25: 9
    }
  /**
   * 影音结束原因（STOP_REASON）
   * @enum { number }
   */
  var CRVideo_STOP_REASON =
    {
      /** 文件关闭 */
      MEDIA_CLOSE: 0,
      /** 播放到文件尾部 */
      MEDIA_FINI: 1,
      /** 打开文件失败 */
      MEDIA_FILEOPEN_ERR: 2,
      /** 文件格式错误 */
      MEDIA_FORMAT_ERR: 3,
      /** 影音格式不支持 */
      MEDIA_UNSUPPORT: 4,
      /** 其他异常 */
      MEDIA_EXCEPTION: 5
    }
  /**
   * 屏幕共享的编码类型
   * @enum { number }
   */
  var CRVideo_ENCODE_TYPE =
    {
      /** 云屋科技私有编码格式（清晰度更高，带宽大） */
      ENC_CLOUDROOM: 0,
      /** (清晰度差一些，带宽小) */
      ENC_H264: 1
    }
  /**
   * 鼠标键类型
   * @enum { number }
   */
  var CRVideo_MOUSE_KEY_TYPE =
    {
      /** 无 */
      MOUSEKEY_NULL: 0,
      /** 鼠标左键 */
      MOUSEKEY_L: 1,
      /** 鼠标中键 */
      MOUSEKEY_M: 2,
      /** 鼠标右键 */
      MOUSEKEY_R: 3,
      /** 鼠标滚轮 */
      MOUSEKEY_WHEEL: 4,
      /** 鼠标侧键 */
      MOUSEKEY_X: 5
    }
  /**
   * 鼠标事件类型
   * @enum { number }
   */
  var CRVideo_MOUSE_MSG_TYPE =
    {
      /** 鼠标移动 */
      MOUSE_MOVE: 0,
      /** 鼠标键按下 */
      MOUSE_DOWN: 1,
      /** 鼠标键弹起 */
      MOUSE_UP: 2,
      /** 鼠标双击 */
      MOUSE_DBCLICK: 3
    }
  /**
   * 键盘事件类型
   * @enum { number }
   */
  var CRVideo_KEY_MSG_TYPE =
    {
      /** 键值按下 */
      KEYT_DWON: 0,
      /** 键值弹起 */
      KEYT_UP: 1

    }

  /**
   * 功能类型
   * @enum { number }
   */
  var CRVideo_MAIN_PAGE_TYPE =
    {
      /** 视频墙 */
      MAINPAGE_VIDEOWALL: 0,
      /** 共享 */
      MAINPAGE_SHARE: 1,
      /** 白板 */
      MAINPAGE_WHITEBOARD: 2

    }
  /**
   * Http文件传输状态
   * @enum { number }
   */
  var CRVideo_HTTP_TRANSFER_STAT =
    {
      /** 未开始 */
      HTTPFS_NULL: 0,
      /** 排队中 */
      HTTPFS_QUEUE: 1,
      /** 传输中 */
      HTTPFS_TRANSFERING: 2,
      /** 传输完成 */
      HTTPFS_FINISHED: 3

    }
  /**
   * Http文件传输结果
   * @enum { number }
   */
  var CRVideo_HTTP_TRANSFER_RESULT =
    {
      /** 成功 */
      HTTPR_Success: 0,
      /** 内部错误 */
      HTTPR_InnerErr: 1,
      /** 参数错误 */
      HTTPR_ParamErr: 2,
      /** 网络不通/地址不对 */
      HTTPR_NetworkFail: 3,
      /** 超时失败 */
      HTTPR_NetworkTimeout: 4,
      /** 文件操作失败 */
      HTTPR_FileOperationFail: 5,
      /** 不支持的路径 */
      HTTPR_PathNotSupprot: 6,
      /** 文件正在传输 */
      HTTPR_FileTransfering: 7,
      /** http错误码启始 */
      HTTPR_HTTPERR_BEGIN: 1000,
      /** http错误码结束 */
      HTTPR_HTTPERR_END: 1999

    }
  /**
   * SDK初始化
   * @access public
   * @param {string} oemID - 向云屋申请的开发商ID
   * @param {string} sdkUsePath -  sdk配置、临时文件存放位置，可为空
   * @param {number} statCallSer -  是否启用callSer模块 0为不启用，1为启用,默认为1
   * @param {number} statMediaSer -  是否启用mediaSer模块 0为不启用，1为启用,默认为1
   * @param {number} statHttp -  是否启用http模块 0为不启用，1为启用,默认为0

   * @returns {number} 返回错误码（错误码为CRVideo_NOERR表示没有错误）
   */
  var CRVideo_Init = function (oemID, sdkUsePath, statCallSer, statMediaSer, statHttp) {
    if (statCallSer === undefined) {
      statCallSer = 1
    }
    if (statMediaSer === undefined) {
      statMediaSer = 1
    }
    if (statHttp === undefined) {
      statHttp = 0
    }
    try {
      if (CRVideo._isinit) {
        if (!CRVideo.ie || CRVideo.v == 10.0) {
          document.body.appendChild(CRVideo._handler)
        }
        return 0
      }
      if (!CRVideo.ie || CRVideo.v == 10.0) {
        CRVideo._handler = document.createElement('div')

        CRVideo._crSdk = document.createElement('object')
        CRVideo._crSdk.id = 'crVideoObj'

        CRVideo._crMgr = document.createElement('object')
        CRVideo._crMgr.id = 'crMgrObj'

        CRVideo._crMeet = document.createElement('object')
        CRVideo._crMeet.id = 'crMeetObj'

        CRVideo._crQueue = document.createElement('object')
        CRVideo._crQueue.id = 'crQueueObj'

        CRVideo._crHttp = document.createElement('object')
        CRVideo._crHttp.id = 'crHttpObj'

        CRVideo._crScreenShare = document.createElement('object')
        CRVideo._crScreenShare.id = 'crScreenShareObj'

        if (CRVideo_Is_ActiveXObject) {
          CRVideo._crSdk.classid = 'clsid:07EFD662-A1BB-4d8d-9BEE-F7E43E5FEBF5'
          CRVideo._crMgr.classid = 'clsid:120AD2B0-68F2-46c6-88D8-52173F501C0F'
          CRVideo._crMeet.classid = 'clsid:9E9DD983-A9F8-4dff-B694-B1AE1C708B1E'
          CRVideo._crQueue.classid = 'clsid:9AAD199D-A02F-4513-875D-AA81091E44B9'
          CRVideo._crHttp.classid = 'clsid:7E44F8C9-7C8D-4004-8F45-D9819D78663C'
          CRVideo._crScreenShare.classid = 'clsid:6FF142C5-8A36-49d7-B627-D60B803550FC'
        } else {
          CRVideo._crSdk.type = 'application/x-cloudroom-videosdk'
          CRVideo._crMgr.type = 'application/x-cloudroom-videomgr'
          CRVideo._crMeet.type = 'application/x-cloudroom-videomeeting'
          CRVideo._crQueue.type = 'application/x-cloudroom-queue'
          CRVideo._crHttp.type = 'application/x-cloudroom-httpfilemgr'
          CRVideo._crScreenShare.type = 'application/x-cloudroom-screenshareui'
        }

        CRVideo._handler.appendChild(CRVideo._crSdk)
        CRVideo._crSdk.style.width = '1px'
        CRVideo._crSdk.style.height = '1px'

        CRVideo._handler.appendChild(CRVideo._crMgr)
        CRVideo._crMgr.style.width = '1px'
        CRVideo._crMgr.style.height = '1px'

        CRVideo._handler.appendChild(CRVideo._crMeet)
        CRVideo._crMeet.style.width = '1px'
        CRVideo._crMeet.style.height = '1px'

        CRVideo._handler.appendChild(CRVideo._crQueue)
        CRVideo._crQueue.style.width = '1px'
        CRVideo._crQueue.style.height = '1px'

        CRVideo._handler.appendChild(CRVideo._crHttp)
        CRVideo._crHttp.style.width = '1px'
        CRVideo._crHttp.style.height = '1px'

        CRVideo._handler.appendChild(CRVideo._crScreenShare)
        CRVideo._crScreenShare.style.width = '1px'
        CRVideo._crScreenShare.style.height = '1px'

        document.body.appendChild(CRVideo._handler)
      } else {
        CRVideo._crSdk = document.getElementById('crVideoObj')
        CRVideo._crMgr = document.getElementById('crMgrObj')
        CRVideo._crMeet = document.getElementById('crMeetObj')
        CRVideo._crQueue = document.getElementById('crQueueObj')
        CRVideo._crHttp = document.getElementById('crHttpObj')
        CRVideo._crScreenShare = document.getElementById('crScreenShareObj')
      }

      var versionStr = CRVideo._crSdk.Version
      var versionArr = versionStr.split(' ')
      versionArr = versionArr[0].split('.')
      version = versionArr[0] * 100 * 100 + versionArr[1] * 100 + versionArr[2]

      if (CRVideo_Version_OCX > version) {
        return CRVideo_OCX_VERSION_NOTUPPORTED
      }

      // 关联回调事件
      if (!CRVideo.ie || CRVideo.v == 10.0) {
        // -----------------------------
        // 会议创建管理的回调
        // -----------------------------
        __crVideo_RegisterCallBack(CRVideo._crMgr, 'loginSuccess', CRVideo_LoginSuccess)
        __crVideo_RegisterCallBack(CRVideo._crMgr, 'loginFail', CRVideo_LoginFail)
        __crVideo_RegisterCallBack(CRVideo._crMgr, 'lineOff', CRVideo_LineOff)

        __crVideo_RegisterCallBack(CRVideo._crMgr, 'setDNDStatusSuccess', CRVideo_SetDNDStatusSuccess)
        __crVideo_RegisterCallBack(CRVideo._crMgr, 'setDNDStatusFail', CRVideo_SetDNDStatusFail)

        __crVideo_RegisterCallBack(CRVideo._crMgr, 'createMeetingSuccess', CRVideo_CreateMeetingSuccess)
        __crVideo_RegisterCallBack(CRVideo._crMgr, 'createMeetingFail', CRVideo_CreateMeetingFail)

        __crVideo_RegisterCallBack(CRVideo._crMgr, 'getMeetingsSuccess', CRVideo_GetMeetingsSuccess)
        __crVideo_RegisterCallBack(CRVideo._crMgr, 'getMeetingsFail', CRVideo_GetMeetingsFail)

        __crVideo_RegisterCallBack(CRVideo._crMgr, 'callSuccess', CRVideo_CallSuccess)
        __crVideo_RegisterCallBack(CRVideo._crMgr, 'callFail', CRVideo_CallFail)
        __crVideo_RegisterCallBack(CRVideo._crMgr, 'acceptCallSuccess', CRVideo_AcceptCallSuccess)
        __crVideo_RegisterCallBack(CRVideo._crMgr, 'acceptCallFail', CRVideo_AcceptCallFail)
        __crVideo_RegisterCallBack(CRVideo._crMgr, 'rejectCallSuccess', CRVideo_RejectCallSuccess)
        __crVideo_RegisterCallBack(CRVideo._crMgr, 'rejectCallFail', CRVideo_RejectCallFail)
        __crVideo_RegisterCallBack(CRVideo._crMgr, 'hangupCallSuccess', CRVideo_HangupCallSuccess)
        __crVideo_RegisterCallBack(CRVideo._crMgr, 'hangupCallFail', CRVideo_HangupCallFail)
        __crVideo_RegisterCallBack(CRVideo._crMgr, 'notifyCallIn', CRVideo_NotifyCallIn)
        __crVideo_RegisterCallBack(CRVideo._crMgr, 'notifyCallAccepted', CRVideo_NotifyCallAccepted)
        __crVideo_RegisterCallBack(CRVideo._crMgr, 'notifyCallRejected', CRVideo_NotifyCallRejected)
        __crVideo_RegisterCallBack(CRVideo._crMgr, 'notifyCallHungup', CRVideo_NotifyCallHungup)

        __crVideo_RegisterCallBack(CRVideo._crMgr, 'sendCmdRlst', CRVideo_SendCmdRlst)
        __crVideo_RegisterCallBack(CRVideo._crMgr, 'sendBufferRlst', CRVideo_SendBufferRlst)
        __crVideo_RegisterCallBack(CRVideo._crMgr, 'sendFileRlst', CRVideo_SendFileRlst)
        __crVideo_RegisterCallBack(CRVideo._crMgr, 'sendProgress', CRVideo_SendProgress)
        __crVideo_RegisterCallBack(CRVideo._crMgr, 'cancelSendRlst', CRVideo_CancelSendRlst)
        __crVideo_RegisterCallBack(CRVideo._crMgr, 'notifyCmdData', CRVideo_NotifyCmdData)
        __crVideo_RegisterCallBack(CRVideo._crMgr, 'notifyBufferData', CRVideo_NotifyBufferData)
        __crVideo_RegisterCallBack(CRVideo._crMgr, 'notifyFileData', CRVideo_NotifyFileData)
        __crVideo_RegisterCallBack(CRVideo._crMgr, 'notifyCancelSend', CRVideo_NotifyCancelSend)

        // -----------------------------
        // 会议管理的回调接口
        // -----------------------------
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'enterMeetingRslt', CRVideo_EnterMeetingRslt)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'userEnterMeeting', CRVideo_UserEnterMeeting)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'userLeftMeeting', CRVideo_UserLeftMeeting)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'endMeetingRslt', CRVideo_EndMeetingRslt)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'meetingStopped', CRVideo_MeetingStopped)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'meetingDropped', CRVideo_MeetingDropped)

        __crVideo_RegisterCallBack(CRVideo._crMeet, 'netStateChanged', CRVideo_NetStateChanged)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'audioDevChanged', CRVideo_AudioDevChanged)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'audioStatusChanged', CRVideo_AudioStatusChanged)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'micEnergyUpdate', CRVideo_MicEnergyUpdate)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'videoStatusChanged', CRVideo_VideoStatusChanged)

        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifyVideoData', CRVideo_NotifyVideoData)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'videoDevChanged', CRVideo_VideoDevChanged)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'defVideoChanged', CRVideo_DefVideoChanged)

        __crVideo_RegisterCallBack(CRVideo._crMeet, 'recordErr', CRVideo_RecordErr)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'recordStateChanged', CRVideo_RecordStateChanged)

        __crVideo_RegisterCallBack(CRVideo._crMeet, 'uploadRecordFileErr', CRVideo_UploadRecordFileErr)

        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifyRecordFileStateChanged', CRVideo_NotifyRecordFileStateChanged)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifyRecordFileUploadProgress', CRVideo_NotifyRecordFileUploadProgress)

        __crVideo_RegisterCallBack(CRVideo._crMeet, 'startScreenShareRslt', CRVideo_StartScreenShareRslt)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'stopScreenShareRslt', CRVideo_StopScreenShareRslt)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifyScreenShareStarted', CRVideo_NotifyScreenShareStarted)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifyScreenShareStopped', CRVideo_NotifyScreenShareStopped)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifyScreenShareData', CRVideo_NotifyScreenShareData)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifyCatchScreen', CRVideo_NotifyCatchScreen)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifyGiveCtrlRight', CRVideo_NotifyGiveCtrlRight)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifyReleaseCtrlRight', CRVideo_NotifyReleaseCtrlRight)

        // -----------------------------
        // 屏幕共享接口
        // -----------------------------
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifyShareRectChanged', CRVideo_NotifyShareRectChanged)

        __crVideo_RegisterCallBack(CRVideo._crMeet, 'sendIMmsgRlst', CRVideo_SendIMmsgRlst)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifyIMmsg', CRVideo_NotifyIMmsg)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifySwitchToPage', CRVideo_NotifySwitchToPage)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifyVideoWallMode', CRVideo_NotifyVideoWallMode)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifyMainVideo', CRVideo_NotifyMainVideo)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifyInitBoards', CRVideo_NotifyInitBoards)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifyInitBoardElements', CRVideo_NotifyInitBoardElements)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifyCreateBoard', CRVideo_NotifyCreateBoard)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifyCloseBoard', CRVideo_NotifyCloseBoard)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifyBoardBkImage', CRVideo_NotifyBoardBkImage)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifyAddBoardElement', CRVideo_NotifyAddBoardElement)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifyDelBoardElement', CRVideo_NotifyDelBoardElement)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifyMouseHotSpot', CRVideo_NotifyMouseHotSpot)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifyNetDiskFileDeleteRslt', CRVideo_NotifyNetDiskFileDeleteRslt)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifyNetDiskTransforProgress', CRVideo_NotifyNetDiskTransforProgress)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifyMediaOpened', CRVideo_NotifyMediaOpened)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifyMediaStart', CRVideo_NotifyMediaStart)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifyMediaStop', CRVideo_NotifyMediaStop)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifyMediaPause', CRVideo_NotifyMediaPause)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifyPlayPosSetted', CRVideo_NotifyPlayPosSetted)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifyMemberMediaData', CRVideo_NotifyMemberMediaData)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'clientInviteRslt', CRVideo_ClientInviteRslt)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'clientCancelInviteRslt', CRVideo_ClientCancelInviteRslt)
        __crVideo_RegisterCallBack(CRVideo._crMeet, 'notifyInviteStatus', CRVideo_NotifyInviteStatus)

        // -----------------------------
        // 队列类的回调接口
        // -----------------------------
        __crVideo_RegisterCallBack(CRVideo._crQueue, 'initQueueDatRslt', CRVideo_InitQueueDatRslt)
        __crVideo_RegisterCallBack(CRVideo._crQueue, 'queueStatusChanged', CRVideo_QueueStatusChanged)
        __crVideo_RegisterCallBack(CRVideo._crQueue, 'queuingInfoChanged', CRVideo_QueuingInfoChanged)
        __crVideo_RegisterCallBack(CRVideo._crQueue, 'startQueuingRslt', CRVideo_StartQueuingRslt)
        __crVideo_RegisterCallBack(CRVideo._crQueue, 'stopQueuingRslt', CRVideo_StopQueuingRslt)
        __crVideo_RegisterCallBack(CRVideo._crQueue, 'startServiceRslt', CRVideo_StartServiceRslt)
        __crVideo_RegisterCallBack(CRVideo._crQueue, 'stopServiceRslt', CRVideo_StopServiceRslt)
        __crVideo_RegisterCallBack(CRVideo._crQueue, 'responseAssignUserRslt', CRVideo_ResponseAssignUserRslt)
        __crVideo_RegisterCallBack(CRVideo._crQueue, 'autoAssignUser', CRVideo_AutoAssignUser)
        __crVideo_RegisterCallBack(CRVideo._crQueue, 'reqAssignUserRslt', CRVideo_ReqAssignUserRslt)
        __crVideo_RegisterCallBack(CRVideo._crQueue, 'cancelAssignUser', CRVideo_CancelAssignUser)

        // -----------------------------
        // http管理接口
        // -----------------------------

        __crVideo_RegisterCallBack(CRVideo._crHttp, 'fileStateChanged', CRVideo_FileStateChanged)
        __crVideo_RegisterCallBack(CRVideo._crHttp, 'fileHttpRspHeader', CRVideo_FileHttpRspHeader)
        __crVideo_RegisterCallBack(CRVideo._crHttp, 'fileHttpRspContent', CRVideo_FileHttpRspContent)
        __crVideo_RegisterCallBack(CRVideo._crHttp, 'fileProgress', CRVideo_FileProgress)
        __crVideo_RegisterCallBack(CRVideo._crHttp, 'fileFinished', CRVideo_FileFinished)
      }

      var setSDKParams = {'NoCallSvr': 0, 'NoMediaDatToSvr': 0}
      if (statCallSer == 0) {
        setSDKParams['NoCallSvr'] = 1
      }
      if (statMediaSer == 0) {
        setSDKParams['NoMediaDatToSvr'] = 1
      }
      CRVideo._crSdk.setSDKParams(JSON.stringify(setSDKParams))

      var r = CRVideo._crSdk.init(oemID, sdkUsePath)
      if (r == 0) {
        CRVideo._isinit = true
        var nuinit_fun = function () {
          CRVideo._crMgr.logout()
          CRVideo._crSdk.uninit()
          CRVideo._isinit = false
        }
        if (window.addEventListener) {                    // 所有主流浏览器，除了 IE 8 及更早 IE版本
          window.addEventListener('beforeunload', nuinit_fun)
        } else if (window.attachEvent) {                  // IE 8 及更早 IE 版本
          window.attachEvent('onbeforeunload', nuinit_fun)
        };
      }

      if (statHttp) {
        CRVideo._crHttp.startMgr()
      }
      return r
    } catch (e) {
      return CRVideo_WEB_OCX_NOTINSTALLED
    }
  }
  // 回调包装 将json字符转换成json对象
  function __crVideo_CallBack () {
    var proxy = this['proxy']
    if (proxy && proxy.callback && typeof (proxy.callback) === 'function') {
      var numargs = arguments.length
      var args = []
      for (var i = 0; i < numargs; i++) {
        var arg = arguments[i]
        if (arg && typeof (arg) === 'string') {
          try {
            // console.log(arg);
            var json_arg = JSON.parse(arg)
            var json_type = typeof (json_arg)
            if (json_type == 'object' || json_type == 'array') {
              arg = json_arg
            }
          } catch (e) {
            // console.log(e);
          }
        }
        args.push(arg)
      }
      if (CRVideo.ff) {
        setTimeout(proxy.callback.apply(null, args), 2000)
      } else {
        proxy.callback.apply(null, args)
      }
    }
  }
  // 注册回调事件
  function __crVideo_RegisterCallBack (obj, name, proxy) {
    if (CRVideo_Is_ActiveXObject) {
      var handler
      try {
        handler = document.createElement('script')
      } catch (ex) {
        handler = document.createElement('<script>')
      }
      handler.type = 'text/javascript'
      var functionName = proxy.name
      // handler.appendChild(document.createTextNode("function "+obj.id+"::"+name+"(){console.log(arguments.length)}"));
      var funStr = 'try' +
        '\n{' +
        '\n    if(' + functionName + '.callback && typeof(' + functionName + '.callback) == "function")' +
        '\n    {' +
        '\n        var numargs = arguments.length;' +
        '\n        var args = [];' +
        '\n        for (i = 0; i < numargs; i++)' +
        '\n        {' +
        '\n           var arg =  arguments[i]' +
        '\n           if(arg && typeof(arg) == "string")' +
        '\n           {' +
        '\n              try' +
        '\n                {' +
        '\n                    //console.log(arg);' +
        '\n                    var json_arg = JSON.parse(arg);' +
        '\n                    var json_type = typeof(json_arg)' +
        '\n                    if(json_type == "object"|| json_type == "array")' +
        '\n                    {' +
        '\n                        arg = json_arg' +
        '\n                    }' +
        '\n                }catch(e)' +
        '\n                {' +
        '\n                    //console.log(e);' +
        '\n                }' +
        '\n           }' +
        '\n        args.push(arg);' +
        '\n        }' +
        '\n        ' + functionName + '.callback.apply(null,args);' +
        '\n    }' +
        '\n}catch(ex)' +
        '\n{' +
        '\n    throw new Error("' + functionName + '("+ex.toString()+")");' +
        '\n}'

      handler.appendChild(document.createTextNode('function ' + obj.id + '::' + name + '(){\n' + funStr + '\n}'))
      CRVideo._handler.appendChild(handler)
      // window[obj.id+"::"+name] = callbackFun
    } else {
      obj[name] = __crVideo_CallBack.bind({'proxy': proxy})
    }
  }
  /**
   * SDK反初始化
   * @access public
   */
  var CRVideo_Uninit = function () {
    // CRVideo._crSdk.uninit();
  }
  /**
   * 文件上传的流量控制(SDK默认不开启流控,目前对文件上传控制的功能有：录制文件上传、网盘文件上传。)
   * @access public
   * @param {number} maxbps - 每秒上传的最大字节数，小于等于0表示不开启流控
   */
  var CRVideo_SetFileUploadRate = function (maxbps) {
    CRVideo._crSdk.setFileUploadRate(maxbps)
  }
  /**
   * 获取Plugin版本号
   * @access public
   * @returns {string} 返回Plugin版本号
   */
  var CRVideo_PluginVersion = function () {
    return CRVideo._crSdk.Version
  }
  /**
   * 获取sdk所在的目录
   * @access public
   * @returns {string} 返回sdk所在的目录
   */
  var CRVideo_SdkPath = function () {
    return CRVideo._crSdk.sdkPath
  }
  /**
   * 设置服务器地址
   * @access public
   * @param {string} serverList -  服务器地址,多个服务器地址使用冒号隔开（如：www.cloudroom.com:8080;183.60.47.52:8080;）;
   */
  var CRVideo_SetServerAddr = function (serverList) {
    CRVideo._crSdk.serverAddr = serverList
  }
  /**
   * 获取服务器地址
   * @access public
   * @returns {string} 返回服务器地址
   */
  var CRVideo_GetServerAddr = function () {
    return CRVideo._crSdk.serverAddr
  }

  /**
   * 登录
   * 操作成功则回调CRVideo_LoginSuccess,失败则回调CRVideo_LoginFail
   * @access public
   * @param {string} authAcnt - 云屋鉴权帐号
   * @param {string} authPswd - 云屋鉴权密码
   * @param {string} nickName - 昵称
   * @param {string} privAcnt - 自定义帐号，不需要时传空字符串
   * @param {string} privAuthCode -  自定义验证码(有复杂要求的，可以使用json格式)，不需要时传空字符串
   * @param {string} cookie - 自定义数据 (在回调时，回传给调用者)
   */
  var CRVideo_Login = function (authAcnt, authPswd, nickName, privAcnt, privAuthCode, cookie) {
    if (cookie === undefined) {
      cookie = ''
    }
    if (!CRVideo.ie || CRVideo.v == 10.0) {
      document.body.appendChild(CRVideo._handler)
    }
    CRVideo._crMgr.login(authAcnt, authPswd, nickName, privAcnt, privAuthCode, cookie)
  }
  /**
   * 注销本次登陆
   * @access public
   */
  var CRVideo_Logout = function () {
    if (CRVideo._isinit) {
      _containerList = []
      CRVideo._crMgr.logout()
      if (!CRVideo.ie || CRVideo.v == 10.0) {
        document.body.removeChild(CRVideo._handler)
      }
    }
  }
  /**
   * 设置免打扰状态。
   * 操作成功则回调CRVideo_SetDNDStatusSuccess,失败则回调CRVideo_SetDNDStatusFail。
   * @access public
   * @param {number} DNDStatus - 0代表关闭免打扰， 其它值代表开启免打扰，含义自由定义
   * @param {string} cookie -  自定义数据 (在回调时，回传给调用者)
   */
  var CRVideo_SetDNDStatus = function (DNDStatus, cookie) {
    if (cookie === undefined) {
      cookie = ''
    }
    CRVideo._crMgr.setDNDStatus(DNDStatus, cookie)
  }
  /**
   * 创建会议
   * 操作成功则回调CRVideo_CreateMeetingSuccess,失败则回调CRVideo_CreateMeetingFail。
   * @access public
   * @param {string} meetSubject - 会议主题（字符长度最大值50）
   * @param {number} createPswd - 是否创建会议密码（=0时：会议无密码，>0时：密码由系统自动生成）
   * @param {string} cookie - 自定义数据 (在回调时，回传给调用者)
   */
  var CRVideo_CreateMeeting = function (meetSubject, createPswd, cookie) {
    if (createPswd === undefined) {
      createPswd = 0
    }
    if (cookie === undefined) {
      cookie = ''
    }
    CRVideo._crMgr.createMeeting(meetSubject, createPswd, cookie)
  }
  /**
   * 发起呼叫，邀请用户参加视频会话。
   * 操作成功则回调CRVideo_CallSuccess,失败则回调CRVideo_CallFail。
   * 呼叫时，对方迟迟不响应，30秒后系统自动结束呼叫。
   * @access public
   * @param {string} calledUserID -  被叫用户的账户ID
   * @param {CRVideo_MeetInfoObj} meetObj - 会议信息
   * @param {string} usrExtDat - 自定义扩展参数
   * @param {string} cookie - 自定义数据(在回调时，回传给调用者)
   * @returns {string} 返回本次呼叫标识码（呼叫ID）
   */
  var CRVideo_Call = function (calledUserID, meetObj, usrExtDat, cookie) {
    if (cookie === undefined) {
      cookie = ''
    }
    if (usrExtDat === undefined) {
      usrExtDat = ''
    }
    return CRVideo._crMgr.call(calledUserID, JSON.stringify(meetObj), usrExtDat, cookie)
  }
  /**
   * 接受对方发起的视频请求，开始进入视频会话
   * 操作成功则回调CRVideo_AcceptCallSuccess,失败则回调CRVideo_AcceptCallFail。
   * @access public
   * @param {string} callID  -  呼叫ID
   * @param {CRVideo_MeetInfoObj} meetObj - 会议信息
   * @param {string} usrExtDat - 自定义扩展参数
   * @param {string} cookie - 自定义数据 (在回调时，回传给调用者)
   */
  var CRVideo_AcceptCall = function (callID, meetObj, usrExtDat, cookie) {
    if (cookie === undefined) {
      cookie = ''
    }
    if (usrExtDat === undefined) {
      usrExtDat = ''
    }
    CRVideo._crMgr.acceptCall(callID, JSON.stringify(meetObj), usrExtDat, cookie)
  }
  /**
   * 拒绝对方的视频请求
   * 操作成功则回调CRVideo_RejectCallSuccess,失败则回调CRVideo_RejectCallFail。
   * @access public
   * @param {string} callID  - 呼叫ID
   * @param {string} usrExtDat - 自定义扩展参数
   * @param {string} cookie - 自定义数据 (在回调时，回传给调用者)
   */
  var CRVideo_RejectCall = function (callID, usrExtDat, cookie) {
    if (cookie === undefined) {
      cookie = ''
    }
    if (usrExtDat === undefined) {
      usrExtDat = ''
    }
    CRVideo._crMgr.rejectCall(callID, usrExtDat, cookie)
  }
  /**
   * 挂断正在进行的视频呼叫或视频通话
   * 操作成功则回调CRVideo_HangupCallSuccess,失败则回调CRVideo_HangupCallFail。
   * @access public
   * @param {string} callID  - 呼叫ID
   * @param {string} usrExtDat - 自定义扩展参数
   * @param {string} cookie - 自定义数据 (在回调时，回传给调用者)
   */
  var CRVideo_HungupCall = function (callID, usrExtDat, cookie) {
    if (cookie === undefined) {
      cookie = ''
    }
    if (usrExtDat === undefined) {
      usrExtDat = ''
    }
    CRVideo._crMgr.hungupCall(callID, usrExtDat, cookie)
  }
  /**
   * 发送小块数据(一次性发送不会有进度通知,发送结果事件CRVideo_SendCmdRlst,CRVideo_SendCmd不能被CRVideo_CancelSend)
   * @access public
   * @param {string} targetUserId  - 目标用户ID
   * @param {string} data - 发送的数据
   * @returns {string} 分配的任务ID
   */
  var CRVideo_SendCmd = function (targetUserId, data) {
    return CRVideo._crMgr.sendCmd(targetUserId, data)
  }
  /**
   * 发送大块数据(分块发送，进度通知事件CRVideo_SendProgress,发送结果事件CRVideo_SendBufferRlst,取消发送CRVideo_CancelSend)
   * @access public
   * @param {string} targetUserId  - 目标用户ID
   * @param {string} data - 发送的数据
   * @returns {string} 分配的任务ID
   */
  var CRVideo_SendBuffer = function (targetUserId, data) {
    return CRVideo._crMgr.sendBuffer(targetUserId, data)
  }
  /**
   * 发送文件(分块发送，进度通知事件CRVideo_SendProgress,发送结果事件CRVideo_SendFileRlst,取消发送CRVideo_CancelSend)
   * @access public
   * @param {string} targetUserId  - 目标用户ID
   * @param {string} fileName - 需要发送的文件名
   * @returns {string} 分配的任务ID
   */
  var CRVideo_SendFile = function (targetUserId, data) {
    return CRVideo._crMgr.sendBuffer(targetUserId, data)
  }
  /**
   * 取消数据发送
   * 操作完成则回调CRVideo_CancelSendRlst。
   * @access public
   * @param {string} taskID - 任务ID
   */
  var CRVideo_CancelSend = function (targetUserId) {
    return CRVideo._crMgr.cancelSend(targetUserId)
  }
  /**
   * 取消数据发送
   * 操作完成则回调CRVideo_CancelSendRlst。
   * @access public
   * @param {string} taskID - 任务ID
   */

  /**
   * 呼叫成功，双方开始进入本次视频会话
   * 操作完成则回调CRVideo_EnterMeetingRslt。
   * @access public
   * @param {number} meetID  - 视频会话ID
   * @param {string} pswd - 本次会议中的密码（系统自动生成，在呼叫回调中取得）
   * @param {string} userID  - 用户id
   * @param {string} nickName - 昵称
   * @param {string} cookie - 自定义数据 (在回调时，回传给调用者)
   */
  var CRVideo_EnterMeeting = function (meetID, pswd, userID, nickName, cookie) {
    if (cookie === undefined) {
      cookie = ''
    }

    CRVideo._crMeet.enterMeeting(meetID, pswd, userID, nickName, cookie)
  }
  /**
   * 判断某个用户是否在会话中
   * @access public
   * @param {string} userID - 用户的id
   * @returns {bool} 如果用户存在则返回true,否则返回false
   */
  var CRVideo_IsUserInMeeting = function (userID) {
    return CRVideo._crMeet.isUserInMeeting(userID)
  }
  /**
   * 结束会话
   * 响应事件CRVideo_EndMeetingRslt，会话被他人结束回调事件CRVideo_MeetingStopped
   * @access public
   * @param {number} meetID - 会议id
   * @param {string} cookie - 自定义数据 (在回调时，回传给调用者)
   */
  var CRVideo_StopMeeting = function (meetID, cookie) {
    if (cookie === undefined) {
      cookie = ''
    }
    CRVideo._crMeet.stopMeeting(meetID, cookie)
  }
  /**
   * 获取会议列表
   * 响应事件CRVideo_GetMeetingsSuccess，会话被他人结束回调事件CRVideo_GetMeetingsFail
   * @param {string} cookie - 自定义数据 (在回调时，回传给调用者)
   * @access public
   */
  var CRVideo_GetMeetings = function (cookie) {
    if (cookie === undefined) {
      cookie = ''
    }
    CRVideo._crMeet.getMeetings(cookie)
  }
  /**
   * 离开会话
   * 他人离开会话的回调事件CRVideo_UserLeftMeeting
   * @access public
   */
  var CRVideo_ExitMeeting = function () {
    CRVideo._crMeet.exitMeeting()
  }
  /**
   * @typedef {object} CRVideo_MemberInfo - 成员信息
   * @property {string} userID - 用户ID
   * @property {string} nickname - 昵称
   * @property {CRVideo_ASTATUS} audioStatus - 音频状态,数值参考麦克风状态
   * @property {CRVideo_VSTATUS} videoStatus - 视频状态,数值参考视频状态定义
   */
  /**
   * 获取所有用户的信息
   * @access public
   * @return {CRVideo_MemberInfo[]} 返回含多个成员信息
   */
  var CRVideo_GetAllMembers = function () {
    return CRVideo._crMeet.getAllMembers()
  }
  /**
   * 获取指定用户的信息
   * @access public
   * @param {string} userID - 用户ID
   * @return {CRVideo_MemberInfo} info - 返回用户userID的成员信息

   */
  var CRVideo_GetMemberInfo = function (userID) {
    return CRVideo._crMeet.getMemberInfo(userID)
  }
  /**
   * 获取某个用户的昵称
   * @access public
   * @param {string} userID	 - 用户ID
   * @returns {string} 返回用户userID的昵称
   */
  var CRVideo_GetMemberNickName = function (userID) {
    return CRVideo._crMeet.getMemberNickName(userID)
  }

  /**
   * 获取系统上的麦克风设备列表
   * @access public
   * @returns {string[]} 返回麦克风设备字符串列表
   */
  var CRVideo_GetAudioMicNames = function () {
    return CRVideo._crMeet.getAudioMicNames().split('\n')
  }
  /**
   * 获取系统上的扬声器设备列表
   * @access public
   * @returns {string[]} 返回扬声器设备列表
   */
  var CRVideo_GetAudioSpkNames = function () {
    return CRVideo._crMeet.getAudioSpkNames().split('\n')
  }
  /**
   * @typedef {object} CRVideo_AudioCfg - 音频参数
   * @property {string} micName - 麦克风设备名称
   * @property {string} speakerName - 扬声器名称
   * @property {number} privEC - 是否开启云屋私有回声消息0：不开启；1：开启
   * @property {number} privAgc - 是否开启云屋私有语音自动增益0：不开启；1：开启
   */
  /**
   * 获取音频参数
   * @access public
   * @returns {CRVideo_AudioCfg} 返回cfg对象
   */
  var CRVideo_GetAudioCfg = function () {
    return JSON.parse(CRVideo._crMeet.getAudioCfg())
  }
  /**
   * 系统音频参数设置
   * @access public
   * @param {CRVideo_AudioCfg} cfg - 设置参数
   */
  var CRVideo_SetAudioCfg = function (cfg) {
    CRVideo._crMeet.setAudioCfg(JSON.stringify(cfg))
  }

  /**
   * 设置麦克风音量大小
   * @access public
   * @param {number} level - 音量等级（ 取值范围：0~255）
   * @returns {bool} 设置成功则返回true,否则返回false
   */
  var CRVideo_SetMicVolume = function (level) {
    return CRVideo._crMeet.micVolume = level
  }

  /**
   * 获取麦克风音量
   * @access public
   * @returns {number} 返回麦克风音量（0~255）
   */
  var CRVideo_GetMicVolume = function () {
    return CRVideo._crMeet.micVolume
  }
  /**
   * 设置本地扬声器音量
   * @access public
   * @param {number} level - 音量等级（ 取值范围：0~255）
   * @returns {bool} 设置成功则返回true,否则返回false
   */
  var CRVideo_SetSpeakerVolume = function (value) {
    return CRVideo._crMeet.speakerVolume = value
  }
  /**
   * 获取本地扬声器音量
   * @access public
   * @returns {number} 返回扬声器音量（0~255）
   */
  var CRVideo_GetSpeakerVolume = function () {
    return CRVideo._crMeet.speakerVolume
  }
  /**
   * 获取用户说话声音大小
   * @access public
   * @param {string} userID - 登录成功后分配的userID
   * @returns {number} 返回音量（0~10）
   */
  var CRVideo_GetMicEnergy = function (userID) {
    return CRVideo._crMeet.getMicEnergy(userID)
  }
  /**
   * 打开自己的麦克风
   * 打开自已的麦克风时，先会进入到AOPENING状态，等服务器处理后才会进入AOPEN状态，此时说话才能被采集到；
   * @param {string} userID - 用户的ID
   * @access public
   */
  var CRVideo_OpenMic = function (userid) {
    CRVideo._crMeet.openMic(userid)
  }
  /**
   * 关闭自己的麦克风
   * 关麦操作是立即生效的，本地会立即停止采集；
   * @access public
   * @param {string} userID - 登录成功后分配的userID
   */
  var CRVideo_CloseMic = function (userid) {
    CRVideo._crMeet.closeMic(userid)
  }
  /**
   * 获取用户的麦状态
   * 麦克风设备状态
   * @access public
   * @param {string} userID - 登录成功后分配的userID
   * @returns {CRVideo_ASTATUS} 返回麦克风状态
   */
  var CRVideo_GetAudioStatus = function (userID) {
    return CRVideo._crMeet.getAudioStatus(userID)
  }
  /**
   * 关闭所有用户的麦克风
   * @access public
   */
  var CRVideo_SetAllAudioClose = function () {
    CRVideo._crMeet.setAllAudioClose()
  }
  /**
   * @typedef {object} CRVideo_VideoCfg - 视频参数
   * @property {CRVideo_VIDEO_WH_RATE} sizeType - 视频尺寸
   * @property {number} fps - 帧率：视频帧率(5~30)
   * @property {number} maxbps - 视频码率（1~100*1000*1000）;(未配置则使用内部默认值，请参见VIDEO_SHOW_SIZE)
   * @property {number} qp_min - 最佳质量(18~51, 越小质量越好) (未配置则使用内部默认值25)
   * @property {number} qp_max - 最差质量(18~51, 越大质量越差) (未配置则使用内部默认值36)
   * @property {number} wh_rate - 视频宽高比(0对应16:9,1对应4:3,2对应1:1) (未配置则使用内部默认值0)
   * @property {CRVideo_VIDEO_WH_RATE} wh_rate - 视频宽高比例
   */
  /**
   * 系统视频参数设置
   * @access public
   * @param {CRVideo_VideoCfg} cfg - 设置参数
   */
  var CRVideo_SetVideoCfg = function (cfg) {
    CRVideo._crMeet.setVideoCfg(JSON.stringify(cfg))
  }
  /**
   * 开始pcm文件录制
   * @access public
   * @param {string} filePathName - 录制文件存储文件绝对路径
   * @param {number} recordObject - 录制对象，0：自己的麦克风，1：扬声器，即会议内其他人的声音
   * @returns {number} 返回值 整形数值，0：正常，-1：失败，1：录制已经开始
   */
  var CRVideo_StartPcmRecord = function (recordObject, filePathName) {
    if (recordObject == undefined) {
      recordObject = 0
    }
    if (filePathName == undefined) {
      filePathName = '0'
    }
    var recordPCM = {}
    recordPCM.recordObject = recordObject
    recordPCM.filePathName = filePathName
    return CRVideo._crMeet.startPcmRecord(recordObject, filePathName)
  }
  /**
   * 停止pcm文件录制
   * @access public
   * @param 无返回值
   */
  var CRVideo_StopPcmRecord = function (type) {
    var pcmType = parseInt(type)
    CRVideo._crMeet.stopPcmRecord(pcmType)
  }
  /**
   * 获取视频参数
   * @access public
   * @returns {CRVideo_VideoCfg} 返回cfg对象
   */
  var CRVideo_GetVideoCfg = function () {
    return JSON.parse(CRVideo._crMeet.getVideoCfg())
  }
  /**
   * 获取用户的摄像头状态
   * @access public
   * @param {string} userID - 用户ID
   * @returns {CRVideo_VSTATUS} 麦克风摄像头状态
   */
  var CRVideo_GetVideoStatus = function (userID) {
    return CRVideo._crMeet.getVideoStatus(userID)
  }

  /**
   * 打开用户的摄像头，以便本地、远端显示视频图像
   * @access public
   * @param {string} userID - 用户ID
   */
  var CRVideo_OpenVideo = function (userID) {
    CRVideo._crMeet.openVideo(userID)
  }
  /**
   * 关闭用户的摄像头
   * @access public
   * @param {string} userID - 用户ID
   */
  var CRVideo_CloseVideo = function (userID) {
    CRVideo._crMeet.closeVideo(userID)
  }
  /**
   * @typedef {object} CRVideo_VideoImgObj - 视频参数
   * @property {number} format - 视频尺寸，请参见：CRVideo_VIDEO_FORMAT
   * @property {string} dat - 图像数据Base64编码
   * @property {number} width - 图像宽度
   * @property {number} height - 图像高度
   */
  /**
   * 获取指定用户的最新图像
   * @access public
   * @property {string} userID - 用户ID
   * @property {number} videoID - 设备id
   * @returns {CRVideo_VideoImgObj} 返回frame视频数据
   */
  var CRVideo_GetVideoImg = function (userID, videoID) {
    return CRVideo._crMeet.getVideoImg(userID, videoID)
  }

  /**
   * 设置默认的摄像头
   * @access public
   * @param {string} userID - 用户ID
   * @param {number} videoID - 摄像头ID
   */
  var CRVideo_SetDefaultVideo = function (userID, videoID) {
    CRVideo._crMeet.setDefaultVideo(userID, videoID)
  }
  /**
   * 获取指定用户的默认摄像头
   * 如果用户没有摄像头，返回0；
   * @access public
   * @param {string} userID - 用户ID
   * @returns {number} 返回摄像头ID
   */
  var CRVideo_GetDefaultVideo = function (userID) {
    return CRVideo._crMeet.getDefaultVideo(userID)
  }
  /**
   * 查询用户是否启用多摄像头
   * @access public
   * @param {string} userID - 用户ID
   * @returns {bool} 返回用户是否多摄像头
   */
  var CRVideo_GetEnableMutiVideo = function (userID) {
    return CRVideo._crMeet.getEnableMutiVideo(userID)
  }
  /**
   * 设置用户是否打开多摄像头
   * @access public
   * @param {string} userID - 登录成功后分配的userID
   * @param {bool} enable - 是否打开多摄像头
   */
  var CRVideo_SetEnableMutiVideo = function (userID, enable) {
    CRVideo._crMeet.setEnableMutiVideo(userID, enable)
  }
  /**
   * @typedef {object} CRVideo_VideoDeviceInfo - 视频设备信息
   * @property {string} userID - 用户ID
   * @property {string} videoID - 设备id
   * @property {string} videoName - 设备名称
   */
  /**
   * 获取用户所有的摄像头信息
   * @access public
   * @returns {CRVideo_VideoDeviceInfo[]} 返回设备列表
   */
  var CRVideo_GetAllVideoInfo = function (userID) {
    return JSON.parse(CRVideo._crMeet.getAllVideoInfo(userID))
  }
  /**
   * @typedef {object} CRVideo_VideoIDsObj - 视频设备对象
   * @property {string} userID - 用户ID
   * @property {string} videoID - 设备id
   */
  /**
   * 获取会议内所有可观看的摄像头
   * 只有摄像头打开才能被获取到,能获取到自已的和会议里其他人的；
   * @access public
   * @returns {CRVideo_VideoIDsObj[]} 对象VideoIDArray
   */
  var CRVideo_GetWatchableVideos = function () {
    return CRVideo._crMeet.getWatchableVideos()
  }
  /**
   * 暂未定义
   * @access public
   * @param {string} picID -
   * @param {object} jsonval -
   */
  var CRVideo_SetPicResource = function (picID, jsonval) {
    CRVideo._crMeet.setPicResource(picID, JSON.stringify(jsonval))
  }
  /**
   * @typedef {object} CRVideo_ScreenShareCfgObj - 屏幕共享配置对象
   * @property {number} encodeType - 编码类型,详见屏幕共享的编码类型CRVideo_ENCODE_TYPE
   * @property {object} catchRect - {"left":xx,"top":xx,"width":xx,"height":xx}用于实现区域共享
   * @property {number} catchWnd - 共享窗口的窗口句柄，用于实现窗口共享
   * @property {number} maxFPS - 最大帧率, 缺省为8 (当网络发不动时，帧率会自动下降)
   * @property {number} maxKbps - 最大码率，缺省800kbps
   */
  /**
   * 获取当前屏幕共享配置
   * @access public
   * @returns {CRVideo_ScreenShareCfgObj} 屏幕共享配置
   */
  var CRVideo_GetScreenShareCfg = function () {
    return JSON.parse(CRVideo._crMeet.getScreenShareCfg())
  }
  /**
   * 设置屏幕共享配置
   * @access public
   * @param {CRVideo_ScreenShareCfgObj} jsonCfg 屏幕共享配置
   */
  var CRVideo_SetScreenShareCfg = function (jsonCfg) {
    CRVideo._crMeet.setScreenShareCfg(JSON.stringify(jsonCfg))
  }
  /**
   * 开启屏幕共享
   * 操作完成则回调CRVideo_StartScreenShareRslt
   * @access public
   */
  var CRVideo_StartScreenShare = function () {
    CRVideo._crMeet.startScreenShare()
  }
  /**
   * 停止屏幕共享
   * @access public
   */
  var CRVideo_StopScreenShare = function () {
    CRVideo._crMeet.stopScreenShare()
  }
  /**
   * 获取屏幕共享解码图像
   * @access public
   * @returns {CRVideo_VideoImgObj}
   */
  var CRVideo_GetShareScreenDecodeImg = function () {
    return CRVideo._crMeet.getShareScreenDecodeImg()
  }
  /**
   * 设置自定义的抓屏图像数据
   * @access public
   * @param {CRVideo_VIDEO_FORMAT} format - 视频格式
   * @param {number} width - 图像的宽度
   * @param {number} heigh - 图像的高度
   * @param {string} dat - 承载argb数据,base64编码
   */
  var CRVideo_SetCustomizeScreenImg = function (format, width, heigh, dat) {
    return CRVideo._crMeet.getShareScreenDecodeImg(format, width, heigh, dat)
  }
  /**
   * 赋予控制权限
   * @access public
   * @param {string} userID -  用户ID
   */
  var CRVideo_GiveCtrlRight = function (userID) {
    return CRVideo._crMeet.giveCtrlRight(userID)
  }
  /**
   * 收回控制权限
   * @access public
   * @param {string} userID -  用户ID
   */
  var CRVideo_ReleaseCtrlRight = function (userID) {
    return CRVideo._crMeet.releaseCtrlRight(userID)
  }
  /**
   * 发送鼠标控制消息
   * @access public
   * @param {CRVideo_MOUSE_MSG_TYPE} msgType -  鼠标事件类型
   * @param {CRVideo_MOUSE_KEY_TYPE} mouseMsgType -  鼠标键类型
   * @param {number} x -  鼠标在屏幕中的横坐标
   * @param {number} y -  鼠标在屏幕中的纵坐标
   */
  var CRVideo_SendMouseCtrlMsg = function (msgType, mouseMsgType, x, y) {
    return CRVideo._crMeet.sendMouseCtrlMsg(msgType, mouseMsgType, x, y)
  }
  /**
   * 发送键盘控制消息
   * @access public
   * @param {CRVideo_KEY_MSG_TYPE} keyMsgType -  键盘事件类型
   * @param {number} vk -   键盘虚拟键值
   * @param {number} bExtendedKey -
   */
  var CRVideo_SendKeyCtrlMsg = function (keyMsgType, vk, extendedKey) {
    return CRVideo._crMeet.sendKeyCtrlMsg(keyMsgType, vk, extendedKey)
  }
  /**
   * 开始录制
   * @access public
   * @param {string} recordPath - 录像存储的路径
   * @param {CRVideo_RECORD_AUDIO_TYPE} audioType - 音频类型
   * @param {number} frameRate - 帧率，建议不要太高；(取值1~24)
   * @param {number} recordWidth - 视频宽度
   * @param {number} recordHeight - 视频高度
   * @param {number} bitRate - 录制的最高码率，当图像变化小时，实际码率会低于此值。建议：640*360: 500000; (500kbps)，1280*720：1000000; (1mbps)，1920*1080: 2000000; (2mbps)
   * @param {number} defaultQP - 目标质量(推荐:36, 中:28,  高:22)
   * @param {CRVideo_REC_DATATYPE} recDataType - 录制内容类型（视频+音频）
   * @param {number} recDataType - 录制内容类型（视频+音频）
   * @param {number} isUploadOnRecording - 是否录制的同时上传 1为是，0为否
   */
  var CRVideo_StartRecordIng = function (recordPath, audioType, frameRate, recordWidth, recordHeight, bitRate, defaultQP, recDataType, isUploadOnRecording) {
    if (recDataType == undefined) {
      recDataType = 3
    }
    if (isUploadOnRecording == undefined) {
      isUploadOnRecording = 0
    }
    var recordCFG = {}
    recordCFG.filePathName = recordPath
    recordCFG.audioType = audioType
    recordCFG.frameRate = frameRate
    recordCFG.recordWidth = recordWidth
    recordCFG.recordHeight = recordHeight
    recordCFG.bitRate = bitRate
    recordCFG.defaultQP = defaultQP
    recordCFG.recDataType = recDataType
    recordCFG.isUploadOnRecording = isUploadOnRecording
    CRVideo._crMeet.startRecording(JSON.stringify(recordCFG))
  }
  /**
   * @typedef {object} CRVideo_RecordVideoInfo - 需要录制的视频信息
   * @property {number} left - 左
   * @property {number} top - 上
   * @property {number} width - 宽
   * @property {number} height - 高
   * @property {object} param - 附加参数
   * @property {CRVideo_REC_VCONTENT_TYPE} param.type - 录制类型
   * @property {number} keepAspectRatio - 1、表示内容保持比例居中显示，0、表示内容拉伸
   * @property {string} param.camid - 用户id.摄像头id,示例中c90d98e2-e50d-4abe-a318-104271a47cb6为用户id，1为摄像头id
   */
  /**
   * 设置录制视频 (录制过程中可随时设置，改变录制内容)
   * @access public
   * @param {CRVideo_RecordVideoInfo[]} value - 需要录制的视频数组
   */
  var CRVideo_SetRecordVideos = function (value) {
    return CRVideo._crMeet.setRecordVideos(JSON.stringify(value))
  }

  /**
   * 停止录制
   * @access public
   */
  var CRVideo_StopRecord = function () {
    return CRVideo._crMeet.stopRecording()
  }
  /**
   * 获取当前录制的文件大小（以字节为单位）
   * @access public
   * @returns {number} 返回录制文件大小（以字节为单位）
   */
  var CRVideo_GetRecFileSize = function () {
    return CRVideo._crMeet.getRecFileSize()
  }
  /**
   * 获取录制的文件时长（以秒为单位）
   * @access public
   * @returns {number} 返回录制的文件时长（以秒为单位）
   */
  var CRVideo_GetRecDuration = function () {
    return CRVideo._crMeet.getRecDuration()
  }
  /**
   * 设置本地生成的录制文件是否加密
   * @access public
   * @param {number} encrypt - 1表示加密 0表示不加密
   */
  var CRVideo_SetRecordFileEncrypt = function (encrypt) {
    CRVideo._crMeet.setRecordFileEncrypt(encrypt)
  }
  /**
   * @typedef {object} CRVideo_RecordFileInfo - 录制文件信息
   * @property {string} fileName - 文件名，全路径
   * @property {number} state - 0 没有上传，1上传中，2 上传完毕
   * @property {number} uploadPercent - 上传进度，state为1时关注此字段
   */
  /**
   * 取得所有录制文件信息
   * @access public
   * @return {CRVideo_RecordFileInfo[]} - 返回含多个录制文件信息
   */
  var CRVideo_GetAllRecordFiles = function () {
    return JSON.parse(CRVideo._crMeet.getAllRecordFiles())
  }
  /**
   * 删除本地的录制文件，上传中的文件会被取消上传
   * @access public
   * @param {string} filename - 文件名，全路径
   */
  var CRVideo_RemoveFromFileMgr = function (filename) {
    CRVideo._crMeet.removeFromFileMgr(filename)
  }
  /**
   * @typedef {object} CRVideo_RecordUploadCfg - 上传配置参数
   * @property {number} type - 0:云屋网盘(默认), 1:http
   * @property {string} speakerName - 上传地址
   */
  /**
   * 上传录像文件
   * @access public
   * @param {CRVideo_RecordUploadCfg} jsonCfg - 上传配置参数
   */
  var CRVideo_SetRecordUploadCfg = function (jsonCfg) {
    CRVideo._crMeet.setRecordUploadCfg(JSON.stringify(jsonCfg))
  }
  /**
   * 上传录像文件
   * @access public
   * @param {string} filename - 文件名，全路径
   */
  var CRVideo_UploadRecordFile = function (fileName) {
    CRVideo._crMeet.uploadRecordFile(fileName)
  }
  /**
   * 取消上传录像文件
   * @access public
   * @param {string} filename - 文件名，全路径
   */
  var CRVideo_CancelUploadRecordFile = function (fileName) {
    CRVideo._crMeet.cancelUploadRecordFile(fileName)
  }

  /**
   * 回放录制文件
   * @access public
   * @param {number} filename - 文件名，全路径
   */
  var CRVideo_PlaybackRecordFile = function (filename) {
    CRVideo._crMeet.playbackRecordFile(filename)
  }
  /**
   * 发送IM消息
   * 响应事件CRVideo_SendIMmsgRlst
   * @access public
   * @param {string} text - 发送的文本消息
   * @param {string} UserID - 目标用户，如果用户ID为空，消息发送给会议内所有用户
   * @param {string} cookie - 自定义用户数据
   * @returns {string} - 任务id
   */
  var CRVideo_SendIMmsg = function (text, UserID, cookie) {
    return CRVideo._crMeet.sendIMmsg(text, UserID, cookie)
  }
  /**
   * 功能切换
   * @access public
   * @param {number} mainPage -功能类型
   * @param {CRVideo_SubPage} jsonSubPage - 白板信息
   */
  var CRVideo_Switchtopage = function (mainPage, jsonSubPage) {
    CRVideo._crMeet.switchToPage(mainPage, JSON.stringify(jsonSubPage))
  }
  /**
   * 获取当前主功能区
   * @access public
   * @returns {CRVideo_MAIN_PAGE_TYPE} 功能区
   */
  var CRVideo_Getcurrentmainpage = function () {
    return CRVideo._crMeet.getCurrentMainPage()
  }
  /**
   * 获取当前子功能区
   * @access public
   * @returns {CRVideo_SubPage} jsonSubPage - 子功能区信息
   */
  var CRVideo_Getcurrentsubpage = function () {
    return CRVideo._crMeet.getCurrentSubPage()
  }
  /**
   * 设置视频墙分屏模式
   * @access public
   * @param {CRVideo_VIDEOLAYOUTMODE} videoWallMode - 分屏模式
   */
  var CRVideo_Setvideowallmode = function (videoWallMode) {
    CRVideo._crMeet.setVideoWallMode(JSON.stringify(videoWallMode))
  }
  /**
   * 创建白板
   * @access public
   * @param {string} title -白板名称
   * @param {number} width - 白板宽度
   * @param {number} height -白板高度
   * @param {string} imgFileID -
   * @returns {CRVideo_SubPage} - 白板信息
   */
  var CRVideo_Createboard = function (title, width, height, imgFileID) {
    return CRVideo._crMeet.createBoard(title, width, height, imgFileID)
  }
  /**
   * 关闭白板
   * @access public
   * @param {CRVideo_SubPage} jsonBoardID -  白板信息
   */
  var CRVideo_Closeboard = function (jsonBoardID) {
    CRVideo._crMeet.closeBoard(JSON.stringify(jsonBoardID))
  }
  /**
   * 添加图元信息
   * @access public
   * @param {CRVideo_SubPage} jsonBoardID -白板信息
   * @param {string[]} elementData - 图元信息,base64编码
   * @returns {string}
   */
  var CRVideo_Addboardelement = function (jsonBoardID, elementData) {
    return CRVideo._crMeet.addBoardElement(JSON.stringify(jsonBoardID), elementData)
  }
  /**
   * 删除图元
   * @access public
   * @param {CRVideo_SubPage} jsonBoardID - 白板信息
   * @param {string} jsonElementIDs - 图元信息
   */
  var CRVideo_Delboardelement = function (jsonBoardID, jsonElementIDs) {
    CRVideo._crMeet.delBoardElement(JSON.stringify(jsonBoardID), jsonElementIDs)
  }
  /**
   * 设置鼠标热点消息
   * @access public
   * @param {CRVideo_SubPage} jsonBoardID -  白板信息
   * @param {number} x - 屏幕横坐标
   * @param {number} y - 屏幕纵坐标
   */
  var CRVideo_Setmousehotspot = function (jsonBoardID, x, y) {
    CRVideo._crMeet.setMouseHotSpot(JSON.stringify(jsonBoardID), x, y)
  }
  /**
   * 上传文件到网盘
   * @access public
   * @param {string} fileID - 网盘的路径名，如 /test/1.mp4 (网盘的test目录下，存储为1.mp4，路径可多级/test/dir1/1.mp4，如网盘中此目录不存在，会自动创建)
   * @param {string} localFilePath - 本地文件路径,全路径
   */
  var CRVideo_Uploadnetdiskfile = function (fileID, localFilePath) {
    CRVideo._crMeet.uploadNetDiskFile(fileID, localFilePath)
  }
  /**
   * 从网盘中下载文件
   * @access public
   * @param {string} fileID - 网盘路径
   * @param {string} localFilePath - 本地文件路径，全路径
   */
  var CRVideo_Downloadnetdiskfile = function (fileID, localFilePath) {
    CRVideo._crMeet.downloadNetDiskFile(fileID, localFilePath)
  }
  /**
   * 取消网盘文件操作（上传/下载）
   * @access public
   * @param {string} fileID -网盘路径
   */
  var CRVideo_Canclenetdiskfile = function (fileID) {
    CRVideo._crMeet.cancleNetDiskFile(fileID)
  }
  /**
   * 删除网盘文件
   * @access public
   * @param {string} fileID - 网盘路径
   */
  var CRVideo_Deletenetdiskfile = function (fileID) {
    CRVideo._crMeet.deleteNetDiskFile(fileID)
  }
  /**
   * 暂无描述
   * @access public
   * @param {string} jsonCfg -
   * @returns {bool}
   */
  var CRVideo_SetMediacfg = function (jsonCfg) {
    return CRVideo._crMeet.setMediaCfg(JSON.stringify(jsonCfg))
  }
  /**
   * 暂无描述
   * @access public
   * @returns {string}
   */
  var CRVideo_GetMediacfg = function () {
    return CRVideo._crMeet.getMediaCfg()
  }
  /**
   * 开始播放影音
   * @access public
   * 响应事件 如果播放成功，请关注通知事件notifyMediaOpened 如果播放失败，请关注通知事件notifyMediaStop
   * @param {string} filename  - 文件名，全路径
   * @param {number} locPlay  - 是否仅仅本地播放（1:本地播放，0：会议内播放）
   * @param {number} bPauseWhenFinished  - 是否播放完毕自动暂停在最后一帧
   */
  var CRVideo_StartPlayMedia = function (filename, locPlay, bPauseWhenFinished) {
    if (bPauseWhenFinished == undefined) {
      bPauseWhenFinished = 0
    }
    if (locPlay == undefined) {
      locPlay = 0
    }
    CRVideo._crMeet.startPlayMedia(filename, locPlay, bPauseWhenFinished)
  }
  /**
   * 停止播放影音
   * @access public
   */
  var CRVideo_StopPlayMedia = function () {
    CRVideo._crMeet.stopPlayMedia()
  }
  /**
   * 暂停或恢复播放影音
   * @access public
   * @param {bool} bPause - ture为暂停，false为恢复
   */
  var CRVideo_PausePlayMedia = function (bPause) {
    CRVideo._crMeet.pausePlayMedia(bPause)
  }
  /**
   * 设置播放进度
   * @access public
   * @param {number} pos - 设置播放位置，单位：秒
   */
  var CRVideo_SetMediaplaypos = function (pos) {
    CRVideo._crMeet.setMediaPlayPos(pos)
  }
  /**
   * @typedef {object} CRVideo_MediaInfoObj - 影音文件信息
   * @property {string} userID - 用户id
   * @property {number} state - 播放状态 0:播放 1:暂停 2:未播放
   * @property {string} mediaName - 影音文件名
   */
  /**
   * 取得影音文件信息
   * @access public
   * @param {string} userID - 用户id
   * @returns {CRVideo_MediaInfoObj} - 影音文件信息
   */
  var CRVideo_Getmediainfo = function (userID) {
    return CRVideo._crMeet.getMediaInfo(userID)
  }
  /**
   * 取得影音帧信息
   * @access public
   * @param {string} userID - 用户id
   * @returns {CRVideo_VideoImgObj} - 帧信息
   */
  var CRVideo_Getmediaimg = function (userID) {
    return CRVideo._crMeet.getMediaImg(userID)
  }
  /**
   * 取得播放路径下的所有可播放文件
   * @access public
   * @return {string[]} - 文件名列表；
   */
  var CRVideo_GetAllFilesInMediaPath = function () {
    return CRVideo._crMeet.getAllFilesInMediaPath().split('\n')
  }
  /**
   * 2方通话时呼叫第3方 结果事件CRVideo_ClientInviteRslt，根据sdkErr判断是否成功
   * @access public
   * @param {string} called  - 被叫用户的账户ID
   * @param {CRVideo_MeetInfoObj} meetObj - 当前会议信息(json结构体请参见MeetInfoObj)
   * @param {string} cookie - 自定义数据 (在回调时，回传给调用者)
   * @return {string} - 本次邀请标识码（邀请ID）
   */
  var
    CRVideo_ClientInvite = function (called, meetObj, cookie) {
      if (cookie === undefined) {
        cookie = ''
      }
      return CRVideo._crMeet.clientInvite(called, JSON.stringify(meetObj), cookie)
    }
  /**
   * 取消第3方呼叫 结果事件clientCancelInviteRslt，根据sdkErr判断是否成功
   * @access public
   * @param {string} inviteID  - 邀请标识码（邀请ID
   * @param {string} cookie - 自定义数据 (在回调时，回传给调用者)
   */
  var
    CRVideo_ClientCancelInvite = function (inviteID, cookie) {
      if (cookie === undefined) {
        cookie = ''
      }
      CRVideo._crMeet.clientCancelInvite(inviteID, cookie)
    }
  // ----------------------------------------
  //
  // 排队接口
  //
  // ---------------------------------------
  /**
   * 初始化用户队列功能数据。
   * 操作完成回调CRVideo_InitQueueDatRslt，初始化成功后才可获取队列队列相关信息。
   * @access public
   * @param {string} cookie -自定义数据 (在回调时，回传给调用者)
   */
  var CRVideo_InitQueueDat = function (cookie) {
    if (cookie === undefined) {
      cookie = ''
    }
    CRVideo._crQueue.initQueueDat(cookie)
  }
  /**
   * 刷新所有队列状态信息。
   * 操作完成则触发CRVideo_QueueStatusChanged（当前排队的队列，或服务的队列，sdk自动有状态变化回调； 其它队列则需要此函数来查询）。
   * @access public
   */
  var CRVideo_RefreshAllQueueStatus = function () {
    CRVideo._crQueue.refreshAllQueueStatus()
  }
  /**
   * @typedef {object} CRVideo_QueueInfo - 队列信息
   * @property {string} queID - 队列ID
   * @property {string} name - 队列名称
   * @property {string} desc - 队列描述
   * @property {number} prio - 优先级，值越小优先级越高
   */
  /**
   * 获取所有队列信息
   * @access public
   * @returns {CRVideo_QueueInfo[]} 返回所有队列信息
   */
  var CRVideo_GetAllQueueInfo = function () {
    return JSON.parse(CRVideo._crQueue.getAllQueueInfo())
  }
  /**
   * 获取队列状态
   * @access public
   * @param {string} queID  - 队列ID
   * @returns {CRVideo_QueueInfo} 返回队列信息
   */
  var CRVideo_GetQueueStatus = function (queId) {
    return JSON.parse(CRVideo._crQueue.getQueueStatus(queId))
  }
  /**
   * @typedef {object} CRVideo_QueuingInfo - 排队信息
   * @property {string} queID - 队列ID 我排的队列(-1:代表我没有排队；-2:代表我正在会话中,通过GetSessionInfo可获取相关信息)
   * @property {string} position - 我的位置
   * @property {string} queuingTime - 我排队的时长(单位s)
   */
  /**
   * 获取我的排队信息
   * @access public
   * @returns {CRVideo_QueuingInfo} 返回排队信息
   */
  var CRVideo_GetQueuingInfo = function () {
    return JSON.parse(CRVideo._crQueue.getQueuingInfo())
  }
  /**
   * 获取我服务的所有队列
   * @access public
   * @returns {string[]} 返回我服务的队列列表
   */
  var CRVideo_GetServingQueues = function () {
    return CRVideo._crQueue.getServingQueues().split('\n')
  }
  /**
   * @typedef {object} CRVideo_SessionInfo - 排队信息
   * @property {string} callID - 会话的呼叫ID
   * @property {string} peerID - 会话的目标用户ID
   * @property {string} peerName - 会话的目标用户昵称
   * @property {number} bCallAccepted - 呼叫是否被对方接受 0:暂未接受，1:已接受
   * @property {number} meetingID - 呼叫接受后，分配的会议ID
   * @property {string} meetingPswd - 会议密码
   * @property {number} duration - 会议持续的时长(单位s)
   */
  /**
   * 获取我的会话信息
   * @access public
   * @returns {CRVideo_SessionInfo} info - 返回会话信息

   */
  var CRVideo_GetSessionInfo = function () {
    return JSON.parse(CRVideo._crQueue.getSessionInfo())
  }
  /**
   * 客户开始排队
   * 操作完成回调CRVideo_StartQueuingRslt
   * @access public
   * @param {string} queID  - queID 队列ID
   * @param {string} cookie - cookie自定义数据 (在回调时，回传给调用者)
   */
  var CRVideo_StartQueuing = function (queID, cookie) {
    if (cookie === undefined) {
      cookie = ''
    }
    CRVideo._crQueue.startQueuing(queID, cookie)
  }
  /**
   * 客户停止排队
   * 操作完成回调CRVideo_StopQueuingRslt
   * @access public
   * @param {string} cookie - cookie自定义数据 (在回调时，回传给调用者)
   */
  var CRVideo_StopQueuing = function (cookie) {
    if (cookie === undefined) {
      cookie = ''
    }
    CRVideo._crQueue.stopQueuing(cookie)
  }
  /**
   * 开始服务某个队列(可以多次调用，开启对多个队列的服务)
   * 操作回调CRVideo_StartServiceRslt
   * 开启成功后：
   * a. 如果没有开启免打挽，那么系统会自动分配客户：VideoCall_Queue_CallBack::autoAssignUser；
   * b. 如果开启免打挽，系统就不会分配客户，如需服务客户可调用：reqAssignUser。
   * @access public
   * @param {string} queID  - 队列ID
   * @param {string} cookie - 自定义数据 (在回调时，回传给调用者)
   */
  var CRVideo_StartService = function (queID, cookie) {
    if (cookie === undefined) {
      cookie = ''
    }
    CRVideo._crQueue.startService(queID, cookie)
  }
  /**
   * 停止服务某个队列
   * 操作完成回调CRVideo_StopServiceRslt
   * @access public
   * @param {string} queID  - queID 队列ID
   * @param {string} cookie - cookie自定义数据 (在回调时，回传给调用者)
   */
  var CRVideo_StopService = function (queID, cookie) {
    if (cookie === undefined) {
      cookie = ''
    }
    CRVideo._crQueue.stopService(queID, cookie)
  }
  /**
   * 接受系统安排的客户
   * @access public
   * @param {string} queID  - 队列ID
   * @param {string} userID - 队列中的用户ID
   * @param {string} cookie - 自定义数据 (在回调时，回传给调用者)
   */
  var CRVideo_AcceptAssignUser = function (queID, userID, cookie) {
    if (cookie === undefined) {
      cookie = ''
    }
    CRVideo._crQueue.acceptAssignUser(queID, userID, cookie)
  }
  /**
   * 拒绝系统安排的客户
   * @access public
   * @param {string} queID  - 队列ID
   * @param {string} userID - 队列中的用户ID
   * @param {string} cookie - 自定义数据 (在回调时，回传给调用者)
   */
  var CRVideo_RejectAssignUser = function (queID, userID, cookie) {
    if (cookie === undefined) {
      cookie = ''
    }
    CRVideo._crQueue.rejectAssignUser(queID, userID, cookie)
  }
  /**
   * 请求分配一个客户
   * 当关闭免打扰时，系统将自动分配客户，无需调用此函数；
   * 当开启免打扰时，系统不再自动分配客户，座席如需服务客户可使用此函数分配；
   * @access public
   * @param {string} cookie - 自定义数据 (在回调时，回传给调用者)
   */
  var CRVideo_ReqAssignUser = function (cookie) {
    if (cookie === undefined) {
      cookie = ''
    }
    CRVideo._crQueue.reqAssignUser(cookie)
  }
  // ----------------------------
  //
  // http上传下载管理
  //
  // -------------------------------------------
  /**
   * @typedef {object} CRVideo_FileInfo - 排队信息(params详细说明：decodeCREEFile：取值0或1。此参数仅上传有效，为0时上传原始文件，为1时上传解密的文件)
   * @property {number} bUploadType - 传输类型，0:下载类型，1:上传类型
   * @property {string} filePathName - 本地完整路径文件名(路径中要求有“CloudroomVideoSDK”)
   * @property {string} fileVersion - 文件版本（可以填版本号，也可以md5，也可以为空）
   * @property {string} httpUrl - 目标URL
   * @property {object} params - 特殊参数，字典数据。
   * @property {number} fileSize - 文件大小
   * @property {number} finishedSize - 已传输大小
   * @property {CRVideo_HTTP_TRANSFER_STAT} state - 文件传输状态，详见：HTTP_TRANSFER_STATE
   */
  /**
   * 获取本地所有上传、下载文件信息
   * @access public
   * @returns {CRVideo_FileInfo[]} filelist - 返回文件信息列表
   */
  var CRVideo_GetAllTransferInfos = function () {
    return JSON.parse(CRVideo._crHttp.getAllTransferInfos())
  }
  /**
   * 获取本地上传、下载文件信息
   * @access public
   * @property {string} filePathName - 本地完整路径文件名(路径中要求有“CloudroomVideoSDK”)
   * @returns {CRVideo_FileInfo} fileinfo - 返回文件信息
   */
  var CRVideo_GetTransferInfo = function (filePathName) {
    return JSON.parse(CRVideo._crHttp.getTransferInfo(filePathName))
  }
  /**
   * 开始下载/上传文件
   * @access public
   * @property {CRVideo_FileInfo} fileinfo - 格式的文件信息
   */
  var CRVideo_StartTransferFile = function (fileinfo) {
    CRVideo._crHttp.startTransferFile(JSON.stringify(fileinfo))
  }
  /**
   * 取消传输，取消时，只是停止了传输任务，不清理记录及断点文件。
   * @access public
   * @property {string} fileName - 本地路径文件名
   */
  var CRVideo_CancelFileTransfer = function (fileName) {
    CRVideo._crHttp.cancelFileTransfer(fileName)
  }
  /**
   * 删除传输记录及相关文件
   * @access public
   * @property {string} fileName - 本地路径文件名
   * @property {number} bRemoveLocFile - 是否移除本地文件,为1时， 那么上传的源始文件、下载的临时文件或结果文件都将被移除。
   */
  var CRVideo_RmTransferInfo = function (fileName, bRemoveLocFile) {
    CRVideo._crHttp.rmTransferInfo(fileName, bRemoveLocFile)
  }

  // ----------------------------
  //
  //
  //
  // -------------------------------------------

  // ----------------------------
  //
  //
  //
  // -------------------------------------------

  /**
   * 创建video对象
   * @access public
   */
  var CRVideo_CreatVideoObj = function () {
    var handler
    if (CRVideo_Is_ActiveXObject) {
      if (CRVideo.ie && CRVideo.v == 8.0) {
        handler = document.createElement('<object classid="clsid:8A6BBBDC-C6BE-4a47-92F3-F9581C3FB95E" ></object>')
      } else {
        handler = document.createElement('object')
        handler.classid = 'clsid:8A6BBBDC-C6BE-4a47-92F3-F9581C3FB95E'
      }
    } else {
      handler = document.createElement('object')
      handler.type = 'application/x-cloudroom-videoui'
    }

    var video = new CRVideo.VideoContainer()
    video.handler(handler)
    return video
  }
  /**
   * 创建media对象
   * @access public
   */
  var CRVideo_CreatMediaObj = function () {
    var handler
    if (CRVideo_Is_ActiveXObject) {
      if (CRVideo.ie && CRVideo.v == 8.0) {
        handler = document.createElement('<object classid="clsid:93A618D5-2535-42d0-B72B-95705263F398" ></object>')
      } else {
        handler = document.createElement('object')
        handler.classid = 'clsid:93A618D5-2535-42d0-B72B-95705263F398'
      }
    } else {
      handler = document.createElement('object')
      handler.type = 'application/x-cloudroom-mediaui'
    }

    var media = new CRVideo.MediaContainer()
    media.handler(handler)
    return media
  }
}
window['000a0180686911e78dd0a45d36bb8c5c'] = true
