/**
 * 准备
 */
import Common from "../common/common.js";
import Constants from "../common/constants.js";
import Valid from "./valid.js";

export default class Check {
    /**
     * 构造函数
     */
    constructor() {
    }

    init(valid) {
        this.bindClick4Button();
        //表单验证，
        this.validObj = new Valid(this.validInput());
    }


    /**
     * 表单验证
     */
    validInput() {
        return {
            /**
             * 单选框校验
             * @param item
             * @returns {boolean}
             */
            validInputRadio: (item) => {
                // let va = $(item).find("input[type='radio']:checked").val();
                // if (!va) {
                //     Common.showMessage("请先完成问题作答");
                //     return false;
                // }
                return true;
            },
            /**
             * 校验输入框
             * @param item
             * @returns {boolean}
             */
            validInput: (item) => {
                // let va = $(item).val();
                // if (!va) {
                //     Common.showMessage("请先完成问题作答");
                //     return false;
                // }
                return true;
            }
        }
    }


    /**
     * 校验
     *      这个方法需要优化
     * @returns {boolean}
     */
    submit(_this) {
        return (_this) => {
            //问题及答案
            let questAndResult = Constants.QUESTIONS.QUESTIONS_AND_ANSWERS;
            let flag = true;

            $.each(questAndResult, (qId, questionAndAnswer) => {
                let questionType = questionAndAnswer.type;
                let answer = questionAndAnswer.answer;
                if (questionType == Constants.QUESTIONS.QUESTION_TYPE.FILL_IN_THE_BLANK_QUESTIONS) {
                    //如果是填空题，则单独校验
                    $.each(answer, (answerId, result) => {
                        debugger;
                        let qValue = $(`[name=${qId}] [name=${answerId}]`).val();
                        if (!this.validAnswer(qValue, answer[answerId])) {
                            flag = false;
                            return false;
                        }
                    });
                } else {
                    let qValue = $(`[name=${qId}]:checked`).val();
                    if (!this.validAnswer(qValue, answer)) {
                        flag = false;
                        return false;
                    }
                }
                if (!flag) {
                    return false;
                }
            });

            // 修改 为true
            flag = true;
            if (flag) {
                this.goLoginPage();
            }
        }
    }

    /**
     * 答案校验
     */
    validAnswer(qValue, answer) {
        // if(!qValue) {
        //     Common.showMessage("请先完成问题作答！");
        //     return false;
        // }
        //
        // if(qValue != answer) {
        //     //正确结果校验
        //     Common.showMessage("答案不正确，实验规则理解不透彻，请联系主试");
        //     return false;
        // }
        return true;
    }

    /**
     * 按钮绑定事件
     */
    bindClick4Button() {
        let _this = this;
        $("[name=check-submit]").on("click", function () {
            _this.validObj.submit(_this.submit(_this), "check");
        });
    }

    /**
     * 去登陆页
     */
    goLoginPage() {
        window.location.href = `${Common.getContextPath()}/login`;
    }
}