
/**
 * 前端自定义错误消息，格式如下：
 *  {
      1010103: '该商品正在授课，请稍后操作',
      1010101: '该商品退费金额为0，不可发起退费',
      1010106: '该商品已退费',
      1011802: '该课堂不满足补课条件～',
      1102208: '老师时间冲突',
    }
 */
export const customErrorMessages = {
};

// 错误码白名单(不需要弹出toast的错误码)
/**
 * 错误码白名单(不需要弹出toast的错误码)，格式如下：
 * [1018101, 1018005, 1011606]
 */
export const errorWhiteList = [];