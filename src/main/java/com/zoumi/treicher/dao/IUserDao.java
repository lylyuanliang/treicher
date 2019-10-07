package com.zoumi.treicher.dao;

import com.zoumi.treicher.vo.UserVo;

import java.util.List;

/**
 * 用户dao
 */
public interface IUserDao {
    /**
     * 获取用户列表
     * @return
     */
    List<UserVo> getUserList() ;
}
