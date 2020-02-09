package com.zoumi.treicher.common;

/**
 * 文件路径工具类
 *
 * @author liurl
 */
public class FilePathUtils {
    public static final String JAR = "jar";
    public static final String OS_NAME = "os.name";
    public static final String DOWS = "dows";

    /**
     * 获取当前jar包所在路径
     *
     * @return jar：返回jar所在目录，ide环境：classes目录
     */
    public static String getJarPath() {
        String path = FilePathUtils.class.getProtectionDomain().getCodeSource().getLocation().getPath();
        if (path.contains(JAR)) {
            path = path.substring(0, path.lastIndexOf("."));
            path = path.substring(0, path.lastIndexOf("/") + 1);
            return path.replace("file:", "");
        }
        return path;
    }
}
