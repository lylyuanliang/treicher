package com.zoumi.treicher.controller;

import com.zoumi.treicher.common.OtherConstants;
import com.zoumi.treicher.common.ViewPageConstants;
import com.zoumi.treicher.service.IUserService;
import com.zoumi.treicher.vo.UserVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
public class ViewController extends BaseController {

    @Autowired
    private IUserService userService;

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
}
