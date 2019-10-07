package com.zoumi.treicher.service.impl;

import com.zoumi.treicher.dao.IUserDao;
import com.zoumi.treicher.service.IUserService;
import com.zoumi.treicher.vo.UserVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements IUserService {
    @Autowired
    private IUserDao userDao;
    @Override
    public List<UserVo> getUserList() {
        List<UserVo> userList = userDao.getUserList();
        return userList;
    }
}
