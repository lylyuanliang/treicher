package com.zoumi.treicher.vo;

/**
 * 虚拟实验数据
 */
public class TestingDataVo {
    /**
     * 虚拟被试编号
     */
    private String personNum;
    /**
     * 公共池
     */
    private String commonality;
    /**
     * 个人池
     */
    private String personal;

    public String getPersonNum() {
        return personNum;
    }

    public void setPersonNum(String personNum) {
        this.personNum = personNum;
    }

    public String getCommonality() {
        return commonality;
    }

    public void setCommonality(String commonality) {
        this.commonality = commonality;
    }

    public String getPersonal() {
        return personal;
    }

    public void setPersonal(String personal) {
        this.personal = personal;
    }
}
