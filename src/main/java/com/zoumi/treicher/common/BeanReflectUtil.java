package com.zoumi.treicher.common;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.Map;

/**
 * 反射工具类
 */
public class BeanReflectUtil {
    /**
     * 把map转为java bean
     * 转至互联网
     *
     * @param map
     * @param clazz
     * @return
     */
    public static <T> T fromMap(Map<String, Object> map, Class<T> clazz) throws Exception {
        T t = clazz.newInstance();
        Field[] fields = clazz.getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true);
            if (Modifier.isFinal(field.getModifiers()) || Modifier.isStatic(field.getModifiers())
                    || field.isSynthetic()) {
                // 静态变量、synthetic和父类对象变量性忽略
                continue;
            }
            // boolean类型
            String type = field.getType().getName();
            if (type.equals("boolean")) {
                field.setBoolean(t, Boolean.valueOf((String) map.get(field.getName())));
            } else if (type.equals("java.lang.Integer") || "int".equals(type)) {
                if (null != map.get((field.getName()))) {
                    field.setInt(t, Integer.parseInt(String.valueOf(map.get(field.getName()))));
                }
            } else if (type.equals("java.lang.Long")) {
                if (null != map.get((field.getName()))) {
                    field.setLong(t, Long.parseLong(String.valueOf(map.get(field.getName()))));
                }
            } else { // 其他类型
                if (null != map.get((field.getName()))) {
                    field.set(t, map.get(field.getName()));
                }
            }
        }
        return t;
    }
}
