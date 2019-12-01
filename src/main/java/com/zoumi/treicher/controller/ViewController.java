package com.zoumi.treicher.controller;

import com.zoumi.treicher.common.ExcelUtil;
import com.zoumi.treicher.common.OtherConstants;
import com.zoumi.treicher.common.ResponseUtil;
import com.zoumi.treicher.common.ViewPageConstants;
import com.zoumi.treicher.service.IUserService;
import com.zoumi.treicher.property.ExcelProperty;
import com.zoumi.treicher.vo.UserVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
public class ViewController extends BaseController {

    @Autowired
    private IUserService userService;

    @Autowired
    private ExcelProperty excelProperty;

    private static final Logger LOG = LoggerFactory.getLogger(ViewController.class);

    /**
     * 首页
     * @param modelAndView
     * @return
     */
    @GetMapping(value = {"/", "/index"})
    public ModelAndView index(ModelAndView modelAndView) {

        modelAndView.setViewName(ViewPageConstants.INDEX.getUrl());

        return modelAndView;
    }

    /**
     * 登陆页
     * @param modelAndView
     * @return
     */
    @GetMapping(value = {"/login"})
    public ModelAndView login(ModelAndView modelAndView) {
        modelAndView.setViewName(ViewPageConstants.LOGIN.getUrl());
        return modelAndView;
    }

    /**
     * 过渡页
     * @param modelAndView
     * @return
     */
    @GetMapping(value = "/transition")
    public ModelAndView transition(ModelAndView modelAndView) {
        modelAndView.setViewName(ViewPageConstants.TRANSITION.getUrl());
        return modelAndView;
    }

    /**
     * 实验页
     * @param modelAndView
     * @return
     */
    @GetMapping(value = "/treicher")
    public ModelAndView treicher(ModelAndView modelAndView) {
        HttpSession session = getSession();
        //获取当前登录用户名
        String userName = (String) session.getAttribute(OtherConstants.LOGIN.SESSION_KEY_USER_NAME);
        String key = userName + OtherConstants.LOGIN.LAST_WARDS_USER_NUM;
        String userNum = (String) session.getAttribute(key);

        List<UserVo> userList = userService.getUserList();
        UserVo userVo = new UserVo();
        userVo.setUserName(userName);
        userList.add(userVo);

        modelAndView.addObject("userList", userList);
        modelAndView.addObject("currentUser", userName);
        modelAndView.addObject("userNum", userNum);
        modelAndView.setViewName(ViewPageConstants.TREICHER.getUrl());
        return modelAndView;
    }

    /**
     * 反馈页面
     * @param modelAndView
     * @return
     */
    @GetMapping("/feedback")
    public ModelAndView feedback(ModelAndView modelAndView) {

        modelAndView.setViewName(ViewPageConstants.FEEDBACK.getUrl());
        return  modelAndView;
    }

    /**
     * 虚拟数据相关的页面
     * @param modelAndView
     * @return
     */
    @GetMapping("/virtual")
    public ModelAndView virtual(ModelAndView modelAndView) {
        String res ;
        try {
            String virtualData = ExcelUtil.importData(excelProperty.getVirtualDataPath(), excelProperty.getVirtualDataName());
            res = ResponseUtil.success(virtualData);
        }catch (Exception e) {
            LOG.error("展示虚拟数据异常", e);
            res = ResponseUtil.error("数据获取异常");
        }
        modelAndView.addObject("virtualRes", res);
        modelAndView.setViewName(ViewPageConstants.VIRTUAL.getUrl());
        return  modelAndView;
    }
}
