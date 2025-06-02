#include <node_api.h>
#include <string.h>

// Native function to count characters in a JS string
napi_value CountChars(napi_env env, napi_callback_info info) {
  size_t argc = 1;
  napi_value args[1];
  napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

  if (argc < 1) {
    napi_throw_type_error(env, nullptr, "Expected one argument");
    return nullptr;
  }

  // Ensure argument is a string
  napi_valuetype argType;
  napi_typeof(env, args[0], &argType);
  if (argType != napi_string) {
    napi_throw_type_error(env, nullptr, "Expected a string");
    return nullptr;
  }

  // Get string length and actual string
  size_t str_len;
  napi_get_value_string_utf8(env, args[0], nullptr, 0, &str_len);
  char* buffer = new char[str_len + 1];
  napi_get_value_string_utf8(env, args[0], buffer, str_len + 1, &str_len);

  // Count characters (here it's just the length of the UTF-8 string)
  napi_value result;
  napi_create_int32(env, static_cast<int32_t>(str_len), &result);

  delete[] buffer;
  return result;
}

// Export method
napi_value Init(napi_env env, napi_value exports) {
  napi_value fn;
  napi_create_function(env, nullptr, 0, CountChars, nullptr, &fn);
  napi_set_named_property(env, exports, "countChars", fn);
  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init);
