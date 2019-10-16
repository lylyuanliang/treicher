package com.zoumi.treicher.bean;

import com.zoumi.treicher.common.ExcelUtil;
import com.zoumi.treicher.property.ExcelProperty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

/**
 * 虚拟数据bean
 */
@Configuration
public class VirtualDataBean implements CommandLineRunner {

    private static Logger LOG = LoggerFactory.getLogger(VirtualDataBean.class);

    /**
     * 虚拟被试数据
     */
    private String virtualDataVos;

    /**
     * 是否使用本地数据
     */
    private String virtualDataLocal;

    @Autowired
    private ExcelProperty excelProperty;

    @Override
    public void run(String... args) throws Exception {
        getVirtualDataBean();
    }

    /**
     * 获取虚拟被试数据
     */
    public void getVirtualDataBean() {
        try {
            String virtualData = ExcelUtil.importData(excelProperty.getVirtualDataPath(), excelProperty.getVirtualDataName());
            this.virtualDataVos = virtualData;
            this.virtualDataLocal = excelProperty.getVirtualDataLocal();
        }catch (Exception e) {
            LOG.error("虚拟数据获取异常", e);
        }
    }

    public String getVirtualDataVos() {
        return virtualDataVos;
    }

    public void setVirtualDataVos(String virtualDataVos) {
        this.virtualDataVos = virtualDataVos;
    }

    public String getVirtualDataLocal() {
        return virtualDataLocal;
    }

    public void setVirtualDataLocal(String virtualDataLocal) {
        this.virtualDataLocal = virtualDataLocal;
    }
}
