import { keyToValue } from '@/utils/util';

export const ERRORCODE = {
  VALID_CODE: {
    AUTHENTICATION_EXPIRED: 40100, //  token过期
    RESOURCE_CHANGE: 40010, //  资源改变
    NO_ACESS: 40104, //  用户角色无权限
    KOL_PRICE_CHANGE: 45006, //  达人报价改变
    NO_THIS_KOL: 45007, //  达人列表中无此达人

    INVALID_PARAMETERS: 40000, // 非法参数
    NAME_REPEATED_EXCEPTION: 40001, // 资源名字重复
    DISPLAY_TIMES_ILLEGAL_EXCEPTION: 40002, // 轮播信息错误
    RESOURCES_DELETED_EXCEPTION: 40003, // 资源已删除
    RESOURCE_FAILURE: 40004, // 资源失效

    UPDATE_SUM_DISPLAY_EXCEPTION: 40005, // 总展示量需大于当前展示量
    UPDATE_DAILY_DISPLAY_EXCEPTION: 40006, // 日展示量需大于当前日展示量
    AD_PLAN_TIME_EXCEPTION: 40007, // 选择时间异常
    RESOURCE_SCARCITY_EXCEPTION: 40010, // 资源不足

    UPDATE_POSITION_EXCEPTION: 40012, // 已在投放中的推广组，不能修改投放位置
    UPDATE_DISPLAY_WEIGHT_EXCEPTION: 40013, // 已在投放中的推广组，不能修改轮播数
    DSP_ID_EXCEPTION: 40014, // 当前订单ID对应的DSPID有误，请重新输入
    UPDATE_PROMOTION_TARGET_EXCEPTION: 40015, // 推广目标不支持修改
    UPDATE_BILLING_TYPE_EXCEPTION: 40016, // 计费模式不支持修改
    UPDATE_DELIVERY_TYPE_EXCEPTION: 40017, // 投放类型不支持修改
    UPDATE_REGIONAL_ORIENTATION_EXCEPTION: 40018, // 地域定向不支持修改
    UPDATE_CITY_EXCEPTION: 40019, // 城市不支持修改
    UPDATE_TIME_ORIENTATION_EXCEPTION: 40020, // 时间定向不支持修改
    UPDATE_TIME_EXCEPTION: 40021, // 投放时段不能修改
    UPDATE_HISTORY_DATE_EXCEPTION: 40022, // 过去时间不支持修改
    UPDATE_ADVERTISING_KEYWORDS_LIST_EXCEPTION: 40023, // 投放中和投放结束状态定向词不支持修改

    NULL_STATEMENT: 40007, // 报表为空
    AD_GROUP_PUT_IN_EXCEPTION: 40009, // 有在投的推广组，不可修改
    STYLE_AD_POSITION_NOT_SUPPORT_OPEN_SCREEN_RECEIVING_EXCEPTION: 400010, // 广告位不支持开屏，不可修改
    HISTORY_EXCEPTION_EXCEPTION: 400010, // 有历史投放的广告，不能删除

    //  权限登录相关
    NOT_LOGIN_IN: 40100, // 未登录
    AUTHENTICATION_FAILED: 40101, // 登录验证不通过
    TOKEN_INFO_ERROR: 40102, // token信息解析错误
    REGISTER_FAILED: 40103, // 注册失败
    ACCESS_DENIED: 40104, // 没有权限
    DATA_ACCESS_DENIED: 40105, // 没有该数据的访问权限

    //  For Content Marketing 45000 - 49999
    CONTENT_TAG_STILL_IN_USAGE: 45000, // 标签仍有达人在使用，不能删除
    CONTENT_TAG_IS_INVALID: 45001, // 标签无效，不能编辑
    CONTENT_TAG_NAME_EXIST: 45002, // 标签名字已存在
    APP_ACCOUNT_HAVE_TASK_ORDER: 45003, // 当前媒体账户已接单过任务，无法解绑
    APP_ACCOUNT_HAVE_UNFINISHED_TASK_ORDER: 45004, // 当前媒体账户存在未完成的商单
    HAVE_MODULE_IN_AUDITING: 45005, // 模块存在正审核的记录，不能保存
    PRICE_WRONG: 45006, // 价格不符
    KOL_STATUS_EXCEPTION: 45007, // 达人不存在或未在绑定状态
    REPEAT_BINDING: 45008, // 重复绑定

    CAN_NOT_DELETE: 45009, // 不能删除

    SHOWCASE_COMPONENT_IN_USING: 45010, // 橱窗组件有关联的任务或者词典动态
    CAN_NOT_UNBIND: 45011, // 无法解除绑定
    NO_SPONSOR_IN_BOUND: 45012, // 没有处在绑定状态的广告主账号

    CAN_NOT_UPDATE_POST_TASK_ORDER: 45013, // 当前投稿任务不支持编辑

    LIMIT_HAVE_TO_BIGGER_THAN_PICKED_UP_COUNT: 45014, // 投稿数量上限需≥已投稿人数

    POST_TASK_ORDER_HAVE_PUBLISHED_POST: 45015, // 投稿任务存在关联的动态
    SHOWCASE_COMPONENT_IN_AUDITING: 45016, // 组件正审核，不能编辑
    SHOWCASE_COMPONENT_INVALID: 45017, // 组件失效

    SHOWCASE_OR_TASK_LIVING: 45018, // 直播中, 不能更新
    ROLE_REPEAT: 40106, // 角色重复注册
    ROLE_MUTUALLY_EXCLUSIVE: 40107, // 角色注册互斥

    URS_COOKIE_REJECT: 50004, // URS Cookie错误
    TOKEN_INVALID: 50005, // token已失效
  },

  CONVERT_DATE_ERROR: 40036, // 转换数据格式出错
  AES_ENCRYPT_ERROR: 40037, // AES加密失败
  AES_DECRYPT_ERROR: 40038, // AES解密失败

  /**
   * 所有无法识别的异常默认的返回状态码
   */
  SERVICE_ERROR: 50000, // 服务器异常
  UPLOAD_FAIL: 50001, // 上传文件失败
  DICT_SERVICE_ERROR: 50002, // 词典接口不可用
  DRUID_QUERY_ERROR: 50003, // 统计数据查询失败
};

export const NotNeedToReportSentryErrorCode = {
  // 待补充
  ...ERRORCODE.VALID_CODE,
};

export const NotNeedToReportSentryErrorCodeOBJ = keyToValue(NotNeedToReportSentryErrorCode);
