package com.zoumi.treicher.common;

import com.zoumi.treicher.bean.FileConfigBean;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 外部配置文件工具类
 *
 * @author liurl
 */
public class FileConfigUtils {
    private static FileConfigBean fileConfigBean;

    private static final Logger LOG = LoggerFactory.getLogger(FileConfigUtils.class);

    public static final String ENCODING_UTF8 = "UTF-8";
    /**
     * 配置文件路径
     */
    private static final String CONFIG_PATH = "/data/fileConfig.txt";

    static {
        fileConfigBean = readConfig(CONFIG_PATH);
    }

    /**
     * 获取配置
     *
     * @return
     */
    public static FileConfigBean getConfigFromOutSide() {
        if (fileConfigBean == null) {
            fileConfigBean = readConfig(CONFIG_PATH);
        }
        return fileConfigBean;
    }

    /**
     * 读取配置
     *
     * @param configPath
     * @return
     */
    public static FileConfigBean readConfig(String configPath) {
        FileConfigBean fileConfigBean = null;
        try {
            String jarPath = FilePathUtils.getJarPath();
            LOG.info("jar包路径:" + jarPath);
            String path = jarPath + configPath;
            File file = new File(path);
            List list = FileUtils.readLines(file, ENCODING_UTF8);
            Map map = changeListToMap(list);
            fileConfigBean = BeanReflectUtil.fromMap(map, FileConfigBean.class);
        } catch (Exception e) {
            LOG.error("外部配置读取失败", e);
        }
        return fileConfigBean;
    }

    /**
     * 将list转为map
     *
     * @param configString
     * @return
     */
    public static Map<String, Object> changeListToMap(List<String> configString) {
        Map<String, Object> map = new HashMap<>(4);
        for (String configLine : configString) {
            String[] split = configLine.split("=");
            //数组只有两个值 [0]key,[1]value
            map.put(split[0], split[1]);
        }
        return map;
    }

    /**
     * 保存外部配置
     * @param filePath
     * @param fileName
     * @param realTestNums
     * @return
     */
    public static boolean saveFileConfigBean(String filePath, String fileName, int realTestNums) throws IOException {
        List<String> config = new ArrayList<>();
        config.add("filePath=" + filePath);
        config.add("fileName=" + fileName);
        config.add("realTestNums=" + realTestNums);

        String jarPath = FilePathUtils.getJarPath();
        String path = jarPath + CONFIG_PATH;
        File file = new File(path);
        FileUtils.writeLines(file, ENCODING_UTF8, config);
        return true;
    }
}
