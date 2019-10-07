package com.zoumi.treicher.vo;

/**
 * 实验（任务） vo
 */
public class TaskVo {
    /**
     * 个人池 任务币数量
     */
    private String personal;
    /**
     * 公共池任务币数量
     */
    private String commonality;
    /**
     * 剩余任务币数量
     */
    private String other;

    /**
     * 轮次
     */
    private String roundNum;

    public String getPersonal() {
        return personal;
    }

    public void setPersonal(String personal) {
        this.personal = personal;
    }

    public String getCommonality() {
        return commonality;
    }

    public void setCommonality(String commonality) {
        this.commonality = commonality;
    }

    public String getOther() {
        return other;
    }

    public void setOther(String other) {
        this.other = other;
    }

    public String getRoundNum() {
        return roundNum;
    }

    public void setRoundNum(String roundNum) {
        this.roundNum = roundNum;
    }
}

