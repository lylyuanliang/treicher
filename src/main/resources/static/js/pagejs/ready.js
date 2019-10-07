/**
 * 准备
 */
import Common from "../common/common.js";

export default class Ready {
    /**
     * 构造函数
     */
    constructor() {}

    init(valid) {
        Common.showMessage("10后自动准备");
        this.bindClick4Button();
        this.toReady4Others();
        valid['readyValid'] = this.valid;
    }

    bindClick4Button() {
        let _this = this;
        $("body").on("click", "[name=read-button]", function () {
            _this.toReady();
        });

        $(".count-down").on("webkitAnimationEnd", function () {
            _this.toReady();

            $("[name=readying-text-part-others]").hide();
            $("[name=ready-text-part-others]").show();
        });
    }

    /**
     * 准备
     */
    toReady() {
        $("[name=ready-text-part]").show();
        $("[name=ready-text-part]").removeClass("hide");
        $("[name=ready-button-part]").hide();
        $(".count-down").hide();
    }

    /**
     * 其他人准备
     */
    toReady4Others() {
        this.timer = setInterval( () => {
            let readyDivs = $("[name=ready-text-part-others].hide");
            let length = readyDivs.length;
            if(length <= 0) {
                clearInterval(this.timer);
            }else {
                let index = Math.floor(Math.random() * length);
                let readyDiv = readyDivs[index];
                $(readyDiv).removeClass("hide");
                $(readyDiv).parent().find("[name=readying-text-part-others]").hide();
            }
        }, 30 + Math.random()*1000)
    }

    /**
     * 页面校验
     */
    valid() {
        let readyDivs = $("[name=ready-text-part-others].hide");
        if(readyDivs.length > 0) {
            Common.showMessage("还有人未准备就绪，请稍等");
            return false;
        }
        let ready = $("[name=ready-text-part].hide");
        if(ready.length > 0) {
            Common.showMessage("请先准备");
            return false;
        }
        return true;
    }
}