/**
 * 虚拟数据工具类
 */
import Constants from "./constants.js";
import Common from "./common.js";

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
     * 获取sequenceNum
     * @param testNum
     * @param userNum
     * @returns {string}
     */
    static getSequenceNUm(testNum, userNum) {
        let sequenceNum = "";
        let sequenceDetail = this.getSequenceDetail(userNum);
        let partNum = this.getPartNum(testNum);
        $.each(sequenceDetail, function (index, detail) {
            if(detail.SEQUENCE_NUM == partNum) {
                //找到
                sequenceNum = detail.SEQUENCE_NUM;
                return false;
            }
        });
        return sequenceNum;
    }

    /**
     * 获取partNum
     * @param testNum
     */
    static getPartNum(testNum) {
        let list = this.getVirtualDataFromService();
        return this.countNotNUll(list, testNum);
    }

    /**
     * 从后台读取数据
     * @returns {*[]|Array}
     */
    static getVirtualDataFromService() {
        let url = `${Common.getContextPath()}/getVirtualData`;
        let virtualData = []
        Common.$ajax({
            url: url,
            type: "get",
            async: false,
            data: {},
            success(data) {
                let rtnCode = data["returnCode"];
                if(Constants.RTN_CODE.SUCCESS == rtnCode) {
                    // Common.showMessage("成功");
                    let virData = data["data"];
                    virtualData = Constants.VIRTUAL_DATA.DATA;
                    if(virData) {
                        //virData不为空，表示读取的excel文件
                        virtualData = JSON.parse(virData);
                    }
                    return virtualData
                }else {
                    Common.showMessage(data["returnMessage"]);
                    return [];
                }
            }
        });
        return virtualData;
    }

    /**
     * 获取虚拟被试数据
     */
    static getVirtualDataList(sequenceNum, testNum) {
        let _this = this;
        let virtualData = this.getVirtualDataFromService();
        let virtualDataList = _this.getValueInList(virtualData, sequenceNum);
        //增加一个逻辑，如果sequenceNum在 virtualData中没有找到，则返回 sequenceNum = testNum 的数据
        if(testNum) {
            let seqIsNull = _this.isNullIndex(virtualData, testNum);
            if(seqIsNull) {
                //虚拟被试数据 自变量水平为空，则sequenceNum = testNum
                virtualDataList = _this.getValueInListWithIndex(virtualData, testNum);
            }
        }
        return virtualDataList;
    }

    /**
     * 找到被试虚拟数据
     * @param list
     * @param key
     * @returns {Array}
     */
    static getValueInList(list, key) {
        let virtualDataList = [];
        $.each(list, function (index, data) {
            if(key == data.SEQUENCE_NUM) {
                //找到被试虚拟数据
                virtualDataList = data.TEST_DATA;
                return false;
            }
        });
        return virtualDataList;
    }
    /**
     * 找到被试虚拟数据
     * @param list
     * @param key
     * @returns {Array}
     */
    static getValueInListWithIndex(list, index) {
        let virtualDataList = [];
        $.each(list, function (i, data) {
            if(index == (i+1)) {
                virtualDataList = data.TEST_DATA;
                return false;
            }
        });
        return virtualDataList;
    }

    /**
     * 判断是否为空
     * @param list
     * @param index
     * @returns {boolean}
     */
    static isNullIndex(list, index) {
        let nullFlag = false;
        $.each(list, function (i, data) {
            if(index == (i+1) && !data.SEQUENCE_NUM) {
                nullFlag = true;
                return false;
            }
        });
        return nullFlag;
    }

    /**
     * 计算非空数量
     * @param list
     * @param index
     */
    static countNotNUll(list, index) {
        let partNum = 0;
        $.each(list, function (i, data) {
            if(i <= index && data.SEQUENCE_NUM) {
                partNum ++;
            }
        });
        //将partNum的值赋值给 静态属性
        VirtualDataUtil.partNum = partNum;
        return partNum;
    }

    /**
     * 获取虚拟被试数据(入参不一样)
     */
    static getVirtualDataListAnother(testNum, userNum) {
        let sequenceNum = this.getSequenceNUm(testNum, userNum);
        let virtualDataList = this.getVirtualDataList(sequenceNum, testNum);
        return virtualDataList;
    }

    /**
     * 获取虚拟数据详情
     */
    static getVirtualDataDetail(sequenceNum, index, testNum) {
        let virtualDataList = this.getVirtualDataList(sequenceNum, testNum);
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
        let virtualDataDetail = this.getVirtualDataDetail(sequenceNum, index, testNum);
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
    // static getPersonalTotal(userNum, testNum) {
    //     let total = this.getTotal(PERSONAL, userNum, testNum);
    //     return total;
    // }

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

/**
 * 定义静态属性
 * @type {number}
 */
VirtualDataUtil.partNum = 1;