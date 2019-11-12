package com.zoumi.treicher.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.zoumi.treicher.bean.VirtualDataBean;
import com.zoumi.treicher.common.ExcelUtil;
import com.zoumi.treicher.common.OtherConstants;
import com.zoumi.treicher.common.ResponseUtil;
import com.zoumi.treicher.vo.TaskVo;
import com.zoumi.treicher.vo.TestingVo;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.*;

@RestController
public class TestingController extends BaseController {

    private static final String LAST_WARDS = "_testing";

    /**
     * 试次后缀
     */
    private static final String LAST_WARDS_TEST_NUM = "_test_num";
    /**
     * 轮次后缀
     */
    private static final String LAST_WARDS_ROUND_NUM = "_round_num";

    @Autowired
    private VirtualDataBean virtualDataBean;

    private static final Logger LOG = LoggerFactory.getLogger(TestingController.class);

    /**
     * 实验提交
     * @param personal 个人池币
     * @param commonality 公共池 币
     * @param other 剩余任务币
     * @param testNum 试次
     * @param roundNum 轮次
     * @return
     */
    @PostMapping("/submit")
    public String submitTesting(String personal, String commonality, String other, String testNum, String roundNum) {
        try {
            HttpSession session = getSession();
            String userName = (String)session.getAttribute(OtherConstants.LOGIN.SESSION_KEY_USER_NAME);
            if(StringUtils.isBlank(userName)) {
                return ResponseUtil.error("请重新登录");
            }

            String userNum = getUserNum();

            TaskVo taskVo = new TaskVo();
            taskVo.setPersonal(personal);
            taskVo.setCommonality(commonality);
            taskVo.setOther(other);
            taskVo.setRoundNum(roundNum);

            List<TaskVo> taskVos = new ArrayList<>(2);
            taskVos.add(taskVo);

            LOG.info("【{}】的实验提交请求报文：{}", userName, JSONObject.toJSONString(taskVo));

            String key = userName + LAST_WARDS;
            List<TestingVo> testingVoList = (List<TestingVo>) session.getAttribute(key);
            if(testingVoList == null) {
                testingVoList = new ArrayList<>(16);
            }
            boolean find = false;
            for(TestingVo testingVo: testingVoList) {
                String testId = testingVo.getTestNum();
                if(testId.equals(testNum)) {
                    //属于同一试次
                    List<TaskVo> taskVoList = testingVo.getTaskVoList();
                    taskVoList.add(taskVo);

                    testingVo.setTaskVoList(taskVoList);
                    testingVo.setTestNum(testNum);
                    testingVo.setUserNum(userNum);
                    find = true;
                    break;
                }
            }

            //没有找到，直接加入
            if(!find) {
                TestingVo testingVo = new TestingVo();
                testingVo.setUserNum(userNum);
                testingVo.setTestNum(testNum);
                testingVo.setTaskVoList(taskVos);
                testingVoList.add(testingVo);
            }

            //重新放入session
            session.setAttribute(key, testingVoList);

            return ResponseUtil.success(taskVo);
        }catch (Exception e) {
            LOG.error("实验提交系统异常", e);
            return ResponseUtil.error("实验提交失败");
        }
    }

    /**
     * 获取实验数据
     */
    @GetMapping("/getTestingData")
    public String getTestingData() {
        try {
            HttpSession session = getSession();
            String userName = (String)session.getAttribute(OtherConstants.LOGIN.SESSION_KEY_USER_NAME);
            if(StringUtils.isBlank(userName)) {
                return ResponseUtil.error("请重新登录");
            }
            String key = userName + LAST_WARDS;

            Object testingDataList = session.getAttribute(key);
            return ResponseUtil.success(testingDataList);
        }catch (Exception e) {
            LOG.error("获取实验数据异常", e);
            return ResponseUtil.error("获取实验数据异常");
        }
    }

    /**
     * 获取实验信息
     * @return
     */
    @GetMapping("/getTestingInfo")
    public String getTestingInfo() {
        try {
            HttpSession session = getSession();
            String userName =(String)session.getAttribute(OtherConstants.LOGIN.SESSION_KEY_USER_NAME);

            String key4TestNum = userName + LAST_WARDS_TEST_NUM;
            String key4RoundNum = userName + LAST_WARDS_ROUND_NUM;

            String testNum = (String) session.getAttribute(key4TestNum);
            String roundNum = (String) session.getAttribute(key4RoundNum);

            if(StringUtils.isBlank(testNum)) {
                testNum = "1";
            }
            if(StringUtils.isBlank(roundNum)) {
                roundNum = "1";
            }

            String userNum = getUserNum();

            Map<String, String> map = new HashMap<>();
            map.put("testNum", testNum);
            map.put("roundNum", roundNum);
            map.put("userNum", String.valueOf(userNum));
            return ResponseUtil.success(map);
        }catch (Exception e) {
            LOG.error("获取实验信息失败", e);
            return ResponseUtil.error("获取实验信息失败");
        }
    }

    /**
     * 设置实验信息
     * @param testNum
     * @param roundNum
     * @return
     */
    @PostMapping("/setTestingInfo")
    public String setTestingInfo(String testNum, String roundNum) {
        try {
            HttpSession session = getSession();
            String userName =(String)session.getAttribute(OtherConstants.LOGIN.SESSION_KEY_USER_NAME);
            String key4TestNum = userName + LAST_WARDS_TEST_NUM;
            String key4RoundNum = userName + LAST_WARDS_ROUND_NUM;

            session.setAttribute(key4TestNum, testNum);
            session.setAttribute(key4RoundNum, roundNum);

            return ResponseUtil.success("");
        }catch (Exception e) {
            LOG.error("设置实验信息失败", e);
            return ResponseUtil.error("设置实验信息失败");
        }
    }

    /**
     * 清空session
     * @return
     */
    @GetMapping("/clear")
    public String clear() {
        HttpSession session = getSession();
        Enumeration em = session.getAttributeNames();
        while(em.hasMoreElements()){
            session.removeAttribute(em.nextElement().toString());
        }
        return ResponseUtil.success("重置成功，请重新做实验");
    }

    /**
     * 导出
     * @param exportData
     * @return
     */
    @PostMapping("/export")
    public String export(String exportData) {
        try {
            List<TestingVo> list = JSONArray.parseArray(exportData, TestingVo.class);
            HttpSession session = getSession();
            String userName =(String)session.getAttribute(OtherConstants.LOGIN.SESSION_KEY_USER_NAME);

            //获取用户号
            String userNum = getUserNum();

            long l = System.currentTimeMillis();
            String fileName = userNum + "-" + userName + "-" + l + ".xlsx";
            boolean b = ExcelUtil.exportData(list, OtherConstants.Excel.CELL_HEADS_TESTING, OtherConstants.Excel.path, fileName);
            if(b) {
                return ResponseUtil.success("导出成功");
            }
            return ResponseUtil.error("导出失败");
        }catch (Exception e) {
            LOG.error("导出失败", e);
            return ResponseUtil.error("导出失败");
        }
    }

    @GetMapping("/getIndex")
    public String getIndex() {

        HttpSession session = getSession();
        String userName =(String)session.getAttribute(OtherConstants.LOGIN.SESSION_KEY_USER_NAME);
        String key = userName + "_index";

        String index = (String) session.getAttribute(key);
        int num = 0;
        if(StringUtils.isNotBlank(index)) {
            num = Integer.parseInt(index);
        }
        num ++ ;

        String i = String.valueOf(num);
        session.setAttribute(key, i);

        return ResponseUtil.success(i);
    }

    @GetMapping("/getVirtualData")
    public String getVirtualData() {
        String useLocal = "Y";
        try {
            String virtualDataLocal = virtualDataBean.getVirtualDataLocal();
            String virtualDataVos = null;
            if(useLocal.equals(virtualDataLocal)) {
                //使用本地文件
                virtualDataVos = virtualDataBean.getVirtualDataVos();
                virtualDataVos = replaceKeyWords(virtualDataVos);
            }
            return ResponseUtil.success(virtualDataVos);
        }catch (Exception e) {
            LOG.error("获取虚拟被试数据异常", e);
            return ResponseUtil.error("获取虚拟被试数据异常");
        }
    }

    /**
     * 替换key
     *      因为之前使用virtualDataConstants.js里面的常量①，
     *      现在改成后台直接读取excel②，两种方式产生的对象key不一样，为了兼容①，就将②的key转①的
     * @param virtualData
     */
    private String replaceKeyWords(String virtualData) {
        virtualData = virtualData.replace("sequenceNum", "SEQUENCE_NUM")
                .replace("testingDataVos", "TEST_DATA")
                .replace("commonality", "COMMONALITY")
                .replace("personNum", "PERSON_NUM")
                .replace("personal", "PERSONAL");
        return virtualData;
    }
}
