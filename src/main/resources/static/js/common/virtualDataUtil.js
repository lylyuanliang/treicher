/**
 * 虚拟数据工具类
 */
import Constants from "./constants.js";

/**
 * 个人池
 * @type {string}
 */
const PERSONAL = "PERSONAL";
/**
 * 公共池
 * @type {string}
 */
const COMMONALITY = "COMMONALITY";
export default class VirtualDataUtil {
    /**
     * 获取实验顺序
     * @param userNum
     */
    static getSequenceDetail(userNum) {
        let sequenceDetail = [];
        $.each(Constants.VIRTUAL_DATA.SEQUENCE, function (index, sequence) {
            if(sequence.USER_NUM == userNum) {
                //找到顺序
                sequenceDetail = sequence.SEQUENCE_DETAIL;
                return false;
            }
        });
        return sequenceDetail;
    }

    /**
     * 获取sequencenum
     * @param testNum
     * @param userNum
     * @returns {string}
     */
    static getSequenceNUm(testNum, userNum) {
        let sequenceNum = "";
        let sequenceDetail = this.getSequenceDetail(userNum);
        $.each(sequenceDetail, function (index, detail) {
            if(detail.TEST_NUM == testNum) {
                //找到
                sequenceNum = detail.SEQUENCE_NUM;
                return false;
            }
        });
        return sequenceNum;
    }

    /**
     * 获取虚拟被试数据
     */
    static getVirtualDataList(sequenceNum) {
        let virtualDataList = [];
        $.each(Constants.VIRTUAL_DATA.DATA, function (index, data) {
            if(sequenceNum == data.SEQUENCE_NUM) {
                //找到被试虚拟数据
                virtualDataList = data.TEST_DATA;
                return false;
            }
        });
        return virtualDataList;
    }

    /**
     * 获取虚拟被试数据(入参不一样)
     */
    static getVirtualDataListAnother(testNum, userNum) {
        let sequenceNum = this.getSequenceNUm(testNum, userNum);
        let virtualDataList = this.getVirtualDataList(sequenceNum);
        return virtualDataList;
    }

    /**
     * 获取虚拟数据详情
     */
    static getVirtualDataDetail(sequenceNum, index) {
        let virtualDataList = this.getVirtualDataList(sequenceNum);
        let data = {};
        $.each(virtualDataList, function (i, virtualData) {
            let personNum = virtualData.PERSON_NUM;
            if(personNum == index) {
                data = virtualData;
            }
        });
        return data;
    }

    /**
     * 获取虚拟数据详情(入参不一样)
     */
    static getVirtualDataDetailAnother(userNum, testNum, index) {
        let sequenceNum = this.getSequenceNUm(testNum, userNum);
        let virtualDataDetail = this.getVirtualDataDetail(sequenceNum, index);
        return virtualDataDetail;
    }

    /**
     * 获取总数
     * @param key
     * @param userNum
     * @param testNum
     */
    static getTotal(key, userNum, testNum) {
        let virtualDataList = this.getVirtualDataListAnother(testNum, userNum);
        let total = 0;
        $.each(virtualDataList, function (index, testData) {
            total += parseInt(testData[key]);
        });
        return total;
    }

    /**
     * 获取当前试次 个人池总数
     * @param userNum
     * @param testNum
     * @returns {number}
     */
    static getPersonalTotal(userNum, testNum) {
        let total = this.getTotal(PERSONAL, userNum, testNum);
        return total;
    }

    /**
     * 获取公共池总数
     * @param userNum
     * @param testNum
     * @returns {number}
     */
    static getCommonalityTotal(userNum, testNum) {
        let total = this.getTotal(COMMONALITY, userNum, testNum);
        return total;
    }

    /**
     * 获取第二轮公共池虚拟数据
     * @param testNum
     */
    static getCommonalityFeedbackVirtualData(testNum) {
        let commonality = 0;
        $.each(Constants.VIRTUAL_DATA.FEEDBACK_VIRTUAL_DATA, function (i, data) {
            if(testNum == data.TEST_NUM) {
                commonality = data.COMMONALITY;
                return false;
            }
        });
        return commonality;
    }


}