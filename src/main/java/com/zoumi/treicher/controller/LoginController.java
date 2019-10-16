package com.zoumi.treicher.controller;

import com.zoumi.treicher.common.OtherConstants;
import com.zoumi.treicher.common.ResponseUtil;
import com.zoumi.treicher.property.ExcelProperty;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

/**
 * 登陆
 */
@RestController
public class LoginController extends BaseController {
    private static final Logger LOG = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private ExcelProperty excelProperty;
    /**
     * 登陆
     * @return
     */
    @PostMapping(value = "/doLogin")
    public String doLogin(String userName, String password) {
        HttpSession session = getSession();
        String pwd = (String) session.getAttribute(userName);
        if(StringUtils.isNotBlank(pwd) && pwd.equals(password)) {
            //当前登录用户放入session
            session.setAttribute(OtherConstants.LOGIN.SESSION_KEY_USER_NAME, userName);
            return ResponseUtil.success(null);
        }else {
            return ResponseUtil.error("登陆失败,账号或密码错误");
        }
    }

    /**
     * 注册
     * @return
     */
    @PostMapping(value = "/doLogon")
    public String doLogon(String userName, String password) {
        HttpSession session = getSession();
        session.setAttribute(userName, password);
        return ResponseUtil.success("注册成功");
    }
}
