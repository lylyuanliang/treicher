/**
 *
 */
import Common from "../common/common.js";
import Constants from "../common/constants.js";

export default class Tips {
    /**
     * 构造函数
     */
    constructor() {
        //userNum去看treicher.html页面底部
        this.userNum = 0;
        //试次
        this.testNum = 0;
        //轮次
        this.roundNum = 0;
    }

    init(valid) {
        this.getTestingInfo();
        this.onlineNumChange();
        this.showTips();
    }

    /**
     * 展示
     */
    showTips() {
        $("[name=tips]").show();
    }

    /**
     * 获取实验信息
     */
    getTestingInfo() {
        let _this = this;
        //获取实验信息
        Common.getTestingInfo(function (data) {
            let rtnCode = data["returnCode"];
            if(Constants.RTN_CODE.SUCCESS == rtnCode) {
                let res = data["data"];
                let testNum = res["testNum"];
                let roundNum = res["roundNum"];
                let userNum = res["userNum"];
                $("[name=testNum]").text(testNum);
                $("[name=roundNum]").text(roundNum);

                _this.testNum = testNum;
                _this.roundNum = roundNum;
                _this.userNum = userNum;
            }
        });
    }

    /**
     * 在线人数变化
     */
    onlineNumChange() {
        setInterval(function () {
            let changedNum = Common.getRndInteger(1, 31);
            $("[name=person_online]").html(250 + changedNum);
        }, 2000);
    }
}