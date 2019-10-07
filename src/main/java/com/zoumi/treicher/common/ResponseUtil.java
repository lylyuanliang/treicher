package com.zoumi.treicher.common;

import com.alibaba.fastjson.JSONObject;
import com.zoumi.treicher.vo.ResponseVo;
import org.apache.commons.lang.StringUtils;

import javax.xml.crypto.Data;

public class ResponseUtil {
    public static final String SUCCESS_CODE = "1";
    public static final String ERROR_CODE = "99";

    public static ResponseVo createResponseVo(String rtnCode, String rtnMessage, Object data) {
        ResponseVo responseVo = new ResponseVo(rtnCode, rtnMessage, data);

        return responseVo;
    }

    public static String success(Object data) {
        ResponseVo responseVo = createResponseVo(SUCCESS_CODE, "", data);
        String rtn = JSONObject.toJSONString(responseVo);
        return rtn;
    }

    public static String error(String errorStr) {
        if(StringUtils.isBlank(errorStr)) {
            errorStr = "系统异常";
        }
        ResponseVo responseVo = createResponseVo(ERROR_CODE, errorStr, null);
        return JSONObject.toJSONString(responseVo);
    }

}
