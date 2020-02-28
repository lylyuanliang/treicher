/**
 * js执行入口
 */
import Tips from "./pagejs/tips.js";

layui.use(["element", "form"], function () {
    let treicher = new Treicher();
    treicher.init();
});
import Common from "./common/common.js";
import Button from "./pagejs/button.js";
import Ready from "./pagejs/ready.js";
import Testing from "./pagejs/testing.js";
import Constants from "./common/constants.js";
class Treicher {
    constructor() {
        this.valid = {};
        //最大试次数 16
        this.maxTestNum = Constants.MAX_TEST_NUM;
        //反馈页面url
        this.feedbackUrl = Common.getContextPath() + "/feedback";
    }

    /**
     * 初始化
     */
    init() {
        let button = new Button();
        let ready = new Ready();

        let tips = new Tips();
        let testing = new Testing(tips);

        button.init(this.valid);

        // ready.init(this.valid);

        tips.init();
        testing.init();

        this.bindEvent();

    }



    /**
     * 事件绑定
     */
    bindEvent() {
        let _this = this;
        $("#next-testing").on("click", function () {
            Common.getTestingInfo(function (data) {
                let rtnCode = data["returnCode"];
                if(Constants.RTN_CODE.SUCCESS == rtnCode) {
                    let res = data["data"];
                    let testNum = res["testNum"];
                    if(testNum >= _this.maxTestNum) {
                        //最多 maxTestNum 次 实验，去往最终反馈页面
                        window.location.href = _this.feedbackUrl;
                    }else {
                        testNum ++;
                        //设置实验信息 ，第testNum+1试次，第一轮
                        Common.setTestingInfo({testNum: testNum , roundNum: 1}, function (res) {
                            let resCode = res["returnCode"];
                            if(Constants.RTN_CODE.SUCCESS != resCode) {
                                Common.showMessage(res["returnMessage"]);
                            }else {
                                // window.location.href = Common.getContextPath() + "/transition";
                                window.location.href = Common.getContextPath() + "/treicher";
                            }
                        });
                    }
                }
            });
        });
    }
}