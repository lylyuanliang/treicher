package com.zoumi.treicher.common;

import java.util.ArrayList;
import java.util.List;

/**
 * 其他常量
 */
public class OtherConstants {
    public static class LOGIN {
        /**
         * session key
         */
        public static final String SESSION_KEY_USER_NAME = "userName";
        /**
         * 不需要登陆过滤的url  key
         */
        public static final String PARAM_NAME_EXCLUSIONS = "exclusions";

        /**
         * 最大用户号
         */
        public static final String MAX_USER_NUM = "maxUserNum";
        public static final String LAST_WARDS_USER_NUM = "_user_num";
    }

    /**
     * Excel 常量
     */
    public static class Excel {
        /**
         * 表头常量
         */
        public static final List<String> CELL_HEADS_TESTING = new ArrayList(4) {
            {
                this.add("试次");
                this.add("轮次");
                this.add("个人池");
                this.add("公共池");
                this.add("公共池被试投入");
                this.add("被试剩余");
            }
        };

        /**
         * 导出路径
         */
        public static final String path = "/excel/";
    }
}
