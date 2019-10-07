package com.zoumi.treicher.vo;

import com.zoumi.treicher.common.IsNeeded;

public class LoginVo {
    @IsNeeded
    private String userName;
    @IsNeeded
    private String password;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
