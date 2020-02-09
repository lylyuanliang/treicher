package com.zoumi.treicher.common;

/**
 * 页面路径 常量类
 */
public enum ViewPageConstants {
    INDEX("index", "首页"),
    LOGIN("login/login", "登陆页"),
    TRANSITION("transition/transition", "过渡页面"),
    TREICHER("treicher/treicher", "实验页面"),
    FEEDBACK("feedback/feedback", "反馈页面"),
    VIRTUAL("virtual/virtual", "虚拟数据展示页面"),
    CONFIG("config/config", "配置页面");

    private String url;
    private String name;

    ViewPageConstants(String url, String name) {
        this.url = url;
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
