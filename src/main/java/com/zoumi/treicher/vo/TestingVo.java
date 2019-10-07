package com.zoumi.treicher.vo;

import java.util.List;

/**
 * 试次Vo
 */
public class TestingVo {
    /**
     * 试次
     */
    private String testNum;
    /**
     * 用户号
     */
    private String userNum;
    /**
     * 任务
     */
    private List<TaskVo> taskVoList;

    public String getTestNum() {
        return testNum;
    }

    public void setTestNum(String testNum) {
        this.testNum = testNum;
    }

    public List<TaskVo> getTaskVoList() {
        return taskVoList;
    }

    public void setTaskVoList(List<TaskVo> taskVoList) {
        this.taskVoList = taskVoList;
    }

    public String getUserNum() {
        return userNum;
    }

    public void setUserNum(String userNum) {
        this.userNum = userNum;
    }
}
