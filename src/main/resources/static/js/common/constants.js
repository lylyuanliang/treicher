/**
 * 路由规则表
 * @type {{ROUTER_TREICHER: {"1": string, "2": string}, ROUTER_INDEX: {"1": string, "2": string, "3": string, "4": string}}}
 */
import {VIRTUAL_DATA} from "./virtualDataConstants.js"
import {QUESTIONS} from "./questionConstants.js";

const ROUTER = {
    /**
     * 主页路由
     */
    ROUTER_INDEX: {
        /**
         * 实验介绍页面
         */
        1: "profile",
        2: "profile2",
        /**
         * 举例说明页面
         */
        3: "example",
        /**
         * 实验奖励页面
         */
        4: "reward",
        /**
         * 实验规则检测
         */
        5: "check"
    },
    /**
     * 实验页面路由
     */
    ROUTER_TREICHER: {
        /**
         * 准备页面
         */
        1: "ready",
        /**
         * 实验测试 页面
         */
        2: "testing"
    }
};

/**
 * 返回码常量
 * @type {{SUCCESS: number}}
 */
const RTN_CODE = {
    /**
     * 成功
     */
    SUCCESS: 1
};

/**
 * 最大试次 10次
 * @type {number}
 */
const MAX_TEST_NUM = 16;

/**
 * 是否有空 index，对应虚拟被试数据excel里面 自变量水平是否有空值，默认false
 * @type {boolean}
 */
const HAS_EMPTY_INDEX = false;

/**
 * 定义常量类
 */
export default class Constants {
    /**
     * 获取路由规则表
     * @returns {{ROUTER_TREICHER: {"1": string, "2": string}, ROUTER_INDEX: {"1": string, "2": string, "3": string, "4": string, "5": string}}}
     * @constructor
     */
    static get ROUTER() {
        return ROUTER;
    }

    /**
     * 返回码
     * @returns {{SUCCESS: number}}
     * @constructor
     */
    static get RTN_CODE() {
        return RTN_CODE;
    }

    /**
     * 虚拟被试数据常量
     * @returns {{DATA: *[], SEQUENCE: *[]}}
     * @constructor
     */
    static get VIRTUAL_DATA() {
        return VIRTUAL_DATA;
    }

    /**
     * 获取最大试次
     * @returns {number}
     * @constructor
     */
    static get MAX_TEST_NUM() {
        return MAX_TEST_NUM;
    }

    /**
     * 获取问题类型常量
     * @returns {{QUESTIONS_AND_ANSWERS: {q1: {answer: string, options: string, type: string, questionDescribe: string}, q2: {answer: string, options: string, type: string, questionDescribe: string}, q3: {answer: string, options: string, type: string, questionDescribe: string}, q4: {answer: string, options: string, type: string, questionDescribe: string}, q5: {answer: string, options: string, type: string, questionDescribe: string}, q6: {answer: string, options: string, type: string, questionDescribe: string}, q7: {answer: {answer2: string, answer1: string}, options: string, type: string, questionDescribe: string}}, QUESTION_TYPE: {SINGLE_CHOICE_QUESTION: string, TRUE_OR_FALSE_QUESTIONS: string, FILL_IN_THE_BLANK_QUESTIONS: string, MULTIPLE_CHOICE_QUESTION: string}}}
     * @constructor
     */
    static get QUESTIONS() {
        return QUESTIONS;
    }

    /**
     * 获取 是否有空index
     * @returns {boolean}
     * @constructor
     */
    static get HAS_EMPTY_INDEX() {
        return HAS_EMPTY_INDEX;
    }
}