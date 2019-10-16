package com.zoumi.treicher.vo;

import java.util.List;

/**
 * 虚拟数据
 */
public class VirtualDataVo {
    /**
     * 顺序号
     */
    private String sequenceNum;
    /**
     * 虚拟实验数据
     */
    private List<TestingDataVo> testingDataVos;

    public String getSequenceNum() {
        return sequenceNum;
    }

    public void setSequenceNum(String sequenceNum) {
        this.sequenceNum = sequenceNum;
    }

    public List<TestingDataVo> getTestingDataVos() {
        return testingDataVos;
    }

    public void setTestingDataVos(List<TestingDataVo> testingDataVos) {
        this.testingDataVos = testingDataVos;
    }
}
