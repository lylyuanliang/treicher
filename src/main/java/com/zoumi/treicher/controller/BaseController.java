package com.zoumi.treicher.controller;

import com.zoumi.treicher.bean.FileConfigBean;
import com.zoumi.treicher.common.FileConfigUtils;
import com.zoumi.treicher.common.FilePathUtils;
import com.zoumi.treicher.common.OtherConstants;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.ResourceUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.*;

public class BaseController {

    private static final String PARAM_PATH = "/params/maxUserNum";
    private static final Logger LOG = LoggerFactory.getLogger(BaseController.class);

    /**
     * 获取session
     *
     * @return
     */
    protected HttpSession getSession() {
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = requestAttributes.getRequest();
        HttpSession session = request.getSession();
        return session;
    }

    /**
     * 获取用户编号
     *
     * @return
     * @throws FileNotFoundException
     */
    protected String getUserNum() throws FileNotFoundException {
        HttpSession session = getSession();
        String userName = (String) session.getAttribute(OtherConstants.LOGIN.SESSION_KEY_USER_NAME);
        String key = userName + OtherConstants.LOGIN.LAST_WARDS_USER_NUM;
        String userNum = (String) session.getAttribute(key);
        if (StringUtils.isBlank(userNum)) {
            userNum = getMaxUserNum();
            session.setAttribute(key, userNum);
        }
        return userNum;
    }

    /**
     * 获取最大用户号
     * 没有并发，可以用这个方法
     *
     * @return
     */
    private String getMaxUserNum() throws FileNotFoundException {
        String jarPath = FilePathUtils.getJarPath();
        String paramPath = jarPath + PARAM_PATH;
        File file = ResourceUtils.getFile(paramPath);
        BufferedReader reader = null;
        StringBuffer sbf = new StringBuffer();
        try {
            Integer max = 0;
            if (!file.exists()) {
                //不存在
                File parentFile = file.getParentFile();
                FileUtils.forceMkdir(parentFile);
            } else {
                reader = new BufferedReader(new FileReader(file));
                String tempStr;
                while ((tempStr = reader.readLine()) != null) {
                    sbf.append(tempStr);
                }
                reader.close();
                String maxUserNum = sbf.toString();
                max = Integer.parseInt(maxUserNum);
            }
            FileConfigBean configFromOutSide = FileConfigUtils.getConfigFromOutSide();
            Integer realTestNums = configFromOutSide.getRealTestNums();

            //增一
            max++;
            max = max % realTestNums;

            if (max == 0) {
                max = realTestNums;
            }


            String maxStr = String.valueOf(max);
            //保存最大值
            WriteMaxUserNum(maxStr, paramPath);
            return maxStr;
        } catch (IOException e) {
            LOG.error("获取最大用户号异常", e);
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e1) {
                    e1.printStackTrace();
                    LOG.error("反正就是异常了", e1);
                }
            }
        }
        return sbf.toString();
    }

    /**
     * 保存最大用户号
     *
     * @param maxUserNum
     * @param url
     */
    private void WriteMaxUserNum(String maxUserNum, String url) throws IOException {
        File file = new File(url);//url 如果不存在需要创建一个
        BufferedWriter bw = null;
        FileWriter fileWriter = null;
        try {
            file.createNewFile();//创建一个新的文件

            fileWriter = new FileWriter(file);
            bw = new BufferedWriter(fileWriter);
            bw.write(maxUserNum);
            bw.flush();// 把缓存区内容压入文件
            bw.close();//关闭文件
        } catch (IOException e) {
            LOG.error("反正就是异常了", e);
        } finally {
            if (fileWriter != null) {
                fileWriter.close();
            }
            if (bw != null) {
                bw.close();
            }
        }
    }
}
