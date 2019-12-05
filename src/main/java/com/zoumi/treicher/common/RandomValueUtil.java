package com.zoumi.treicher.common;

/****
 *
 * Project Name:recruit-helper-util
 * <p>随机数生成工具类,主要包括<br>
 *  中文姓名，性别，Email，手机号，住址
 * @ClassName: RandomValueUtil
 * @date 2018年5月23日  下午2:11:12
 *
 * @author youqiang.xiong
 * @version 1.0
 * @since
 */
public class RandomValueUtil {

    public static String BASE = "abcdefghijklmnopqrstuvwxyz0123456789";
    private static String FIRST_NAME = "赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳史唐费岑薛雷贺倪汤滕殷罗毕郝邬安常乐于时傅皮齐康";
    private static String GIRL = "秀娟英华慧巧美娜静淑惠珠翠雅芝玉萍红娥玲芬芳燕彩春菊兰凤洁梅琳素云莲真环雪荣爱妹霞香月莺媛艳瑞凡佳嘉琼勤珍贞莉桂娣叶璧璐娅琦晶妍茜秋珊莎锦黛青倩婷姣婉娴瑾颖露瑶怡婵雁蓓纨仪荷丹蓉眉君琴蕊薇菁梦岚苑婕馨瑗琰韵融园艺咏卿聪澜纯悦昭冰爽琬茗羽希宁欣飘育晓欢霄枫芸菲寒伊亚宜可姬舒影荔枝思丽 ";
    public static String BOY = "伟刚勇毅俊峰强军平保东文辉力明永健世广志义兴良海山仁波宁贵福生龙元全国胜学祥才发武新利清飞彬富顺信子杰涛昌成康星光天达安岩中茂进林有坚和彪博诚先敬震振壮会思群豪心邦承乐绍功松善厚庆磊民友裕河哲江超浩亮政谦亨奇固之轮翰朗伯宏言若鸣朋斌梁栋维启克伦翔旭鹏泽晨辰士以建家致树炎德行时泰盛雄琛钧冠策腾楠榕风航弘";
    public static final String[] EMAIL_SUFFIX = "@gmail.com,@yahoo.com,@msn.com,@hotmail.com,@aol.com,@ask.com,@live.com,@qq.com,@0355.net,@163.com,@163.net,@263.net,@3721.net,@yeah.net,@googlemail.com,@126.com,@sina.com,@sohu.com,@yahoo.com.cn".split(",");

    public static int getNum(int start, int end) {
        return (int) (Math.random() * (end - start + 1) + start);
    }

    /***
     *
     * Project Name: recruit-helper-util
     * <p>随机生成Email
     *
     * @author youqiang.xiong
     * @date 2018年5月23日  下午2:13:06
     * @version v1.0
     * @since
     * @param lMin
     *         最小长度
     * @param lMax
     *         最大长度
     * @return
     */
    public static String getEmail(int lMin, int lMax) {
        int length = getNum(lMin, lMax);
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < length; i++) {
            int number = (int) (Math.random() * BASE.length());
            sb.append(BASE.charAt(number));
        }
        sb.append(EMAIL_SUFFIX[(int) (Math.random() * EMAIL_SUFFIX.length)]);
        return sb.toString();
    }

    private static String[] telFirst = "134,135,136,137,138,139,150,151,152,157,158,159,130,131,132,155,156,133,153".split(",");

    /***
     *
     * Project Name: recruit-helper-util
     * <p>随机生成手机号码
     *
     * @author youqiang.xiong
     * @date 2018年5月23日  下午2:14:17
     * @version v1.0
     * @since
     * @return
     */
    public static String getTelephone() {
        int index = getNum(0, telFirst.length - 1);
        String first = telFirst[index];
        String second = String.valueOf(getNum(1, 888) + 10000).substring(1);
        String thrid = String.valueOf(getNum(1, 9100) + 10000).substring(1);
        return first + second + thrid;
    }

    /***
     *
     * Project Name: recruit-helper-util
     * <p>随机生成8位电话号码
     *
     * @author youqiang.xiong
     * @date 2018年5月23日  下午2:15:31
     * @version v1.0
     * @since
     * @return
     */
    public static String getLandline() {
        int index = getNum(0, telFirst.length - 1);
        String first = telFirst[index];
        String second = String.valueOf(getNum(1, 888) + 10000).substring(1);
        String thrid = String.valueOf(getNum(1, 9100) + 10000).substring(1);
        return first + second + thrid;
    }


    /**
     * 返回中文姓名
     */
    public static String name_sex = "";

    /***
     *
     * Project Name: recruit-helper-util
     * <p>返回中文姓名
     *
     * @author youqiang.xiong
     * @date 2018年5月23日  下午2:16:16
     * @version v1.0
     * @since
     * @return
     */
    public static String getChineseName() {
        int index = getNum(0, FIRST_NAME.length() - 1);
        String first = FIRST_NAME.substring(index, index + 1);
        int sex = getNum(0, 1);
        String str = BOY;
        int length = BOY.length();
        if (sex == 0) {
            str = GIRL;
            length = GIRL.length();
            name_sex = "女";
        } else {
            name_sex = "男";
        }
        index = getNum(0, length - 1);
        String second = str.substring(index, index + 1);
        int hasThird = getNum(0, 1);
        String third = "";
        if (hasThird == 1) {
            index = getNum(0, length - 1);
            third = str.substring(index, index + 1);
        }
        return first + second + third;
    }

    public static void main(String[] args) {
        for(int i=100; i-->0;) {
            String userName = RandomValueUtil.getChineseName();
            System.out.println(userName);
        }
    }
}