package com.zoumi.treicher.property;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix="com.zm.excel")
public class ExcelProperty {
    private String path;

    private String virtualDataPath;

    private String virtualDataName;

    private String virtualDataLocal;

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getVirtualDataPath() {
        return virtualDataPath;
    }

    public void setVirtualDataPath(String virtualDataPath) {
        this.virtualDataPath = virtualDataPath;
    }

    public String getVirtualDataName() {
        return virtualDataName;
    }

    public void setVirtualDataName(String virtualDataName) {
        this.virtualDataName = virtualDataName;
    }

    public String getVirtualDataLocal() {
        return virtualDataLocal;
    }

    public void setVirtualDataLocal(String virtualDataLocal) {
        this.virtualDataLocal = virtualDataLocal;
    }
}
