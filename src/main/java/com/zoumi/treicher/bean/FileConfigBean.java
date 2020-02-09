package com.zoumi.treicher.bean;

/**
 * 外部配置文件对应bean
 *      此配置文件为用户自定义配置文件，默认优先级最高
 * @author liurl
 */
public class FileConfigBean {
    private String filePath;
    private String fileName;
    private int realTestNums;

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public int getRealTestNums() {
        return realTestNums;
    }

    public void setRealTestNums(int realTestNums) {
        this.realTestNums = realTestNums;
    }
}
