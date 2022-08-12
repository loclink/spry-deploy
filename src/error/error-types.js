const errorTypes = {
  // 未找到执行文件
  NO_EXECUTION_FILE: "no_execution_file",
  // 工作路径不存在
  WORK_PATH_NOT_EXIST:'work_path_not_exist',
  // 用户名或密码为空
  USERNAME_OR_PASSWORD_IS_REQUIRED: "username_or_password_is_required",

  // 用户名或密码不合法
  USERNAME_OR_PASSWORD_ILLEGAL: "username_or_password_illegal",

  // 用户已存在
  USER_ALREADY_EXISTS: "mh_user.username must be unique",

  // 账号或密码错误
  INCORRECT_USERNAME_OR_PASSWORD: "incorrect_username_or_password",

  // token验签失败
  TOKEN_CHECK_FAILED: "token_check_failed",

  // 缺少参数
  MISSING_PARAMETER: "missing_parameter",

  // 内容不存在
  CONTENT_DOES_NOT_EXIST: "content_does_not_exist",

  // 仓库不存在
  REPOSITORY_DOES_NOT_EXIST: "repository_does_not_exist",

  // 参数不合法
  PARAMETER_IS_NOT_LEGAL: "parameter_is_not_legal",

  // 禁止删除
  PROHIBIT_DELETION: "prohibit_deletion",

  // 不支持的文件类型
  NOT_SUPPORTED_FILE_TYPE: "not_supported_file_type",

  // 内容不可为空
  CONTENT_MUST_NOT_BE_EMPTY: "content_must_not_be_empty",
};

module.exports = {
  errorTypes,
};
