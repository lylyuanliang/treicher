/**
 * 准备
 */
import Common from "../common/common.js";

export default class Check {
    /**
     * 构造函数
     */
    constructor() {

    }

    init(valid) {
        this.bindClick4Button();
        valid['checkValid'] = this.valid;
    }



    /**
     * 校验
     * @returns {boolean}
     */
    valid() {
        //问题及答案, 注，这里的q1,q2,q3,q4...与页面单选框的name一一对应
        let questAndResult = {
            "q1": "F",
            "q2": "F",
            "q3": "F",
            "q4": "B",
            "q5": "A"
        }
        let flag = true;
        $.each(questAndResult, (qId, answer) => {
            let qValue = $(`[name=${qId}]:checked`).val();
            if(!qValue) {
                Common.showMessage("请先完成问题作答！");
                flag = false;
                return false;
            }

            if(qValue != answer) {
                //正确结果校验
                Common.showMessage("答案不正确，实验规则理解不透彻，请联系主试");
                flag = false;
                return false;
            }
        });
        return flag;
    }

    /**
     * 按钮绑定事件
     */
    bindClick4Button() {
        let _this = this;
        $("[name=check-submit]").on("click", function () {
            if(_this.valid()) {
                _this.goLoginPage();
            }
        });
    }

    /**
     * 去登陆页
     */
    goLoginPage() {
        window.location.href = `${Common.getContextPath()}/login`;
    }
}