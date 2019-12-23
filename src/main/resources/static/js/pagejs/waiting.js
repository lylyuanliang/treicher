/**
 * 准备
 */
import Common from "../common/common.js";
import Result from "./result.js";
import Constants from "../common/constants.js";

export default class Waiting {
    /**
     * 构造函数
     */
    constructor() {
        this.timeOut = 500;
        this.result = new Result();
        this.getIndexUrl = Common.getContextPath() + "/getIndex";
    }

    init(valid) {
        this.result.init();
    }

    /**
     * 去结果页
     *  延时执行
     */
    toResult(personal, commonality, other, testNum) {
        let timeOut = this.timeOut + Common.getRndInteger(1, 2);
        // let timeOut = 1;
        let _this = this;
        Common.$ajax({
            url: this.getIndexUrl,
            type: "get",
            data: {},
            success(data) {
                let rtnCode = data["returnCode"];
                if(Constants.RTN_CODE.SUCCESS == rtnCode) {
                    let index = data["data"];
                    index = parseInt(index);
                    setTimeout(() => {
                        $("[name=waiting]").hide();
                        $("[name=result]").show();
                        _this.result.buildTable(personal, commonality, other, testNum, index);
                    }, timeOut)
                }else {
                    Common.showMessage(data["returnMessage"]);
                }
            }
        });

    }
}