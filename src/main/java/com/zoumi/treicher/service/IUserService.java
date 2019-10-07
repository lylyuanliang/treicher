package com.zoumi.treicher.service;

import com.zoumi.treicher.vo.UserVo;

import java.util.List;

public interface IUserService {
    /**
     * 获取用户列表
     * @return
     */
    List<UserVo> getUserList() ;
}
