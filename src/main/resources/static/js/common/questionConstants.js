/**
 * 问题类型
 * @type {{SINGLE_CHOICE_QUESTION: string, TRUE_OR_FALSE_QUESTIONS: string, FILL_IN_THE_BLANK_QUESTIONS: string, MULTIPLE_CHOICE_QUESTION: string}}
 */
const QUESTION_TYPE = {
    /**
     * 判断题
     */
    TRUE_OR_FALSE_QUESTIONS: "trueOrFalseQuestions",
    /**
     * 选择题（单选）
     */
    SINGLE_CHOICE_QUESTION: "singleChoiceQuestion",
    /**
     * 选择题(多选)
     */
    MULTIPLE_CHOICE_QUESTION: "multipleChoiceQuestion",
    /**
     * 填空题
     */
    FILL_IN_THE_BLANK_QUESTIONS: "fillInTheBlankQuestions"
};
/**
 * 问题及答案
 *      这里有个优化没有用到，作为以后优化 “实验规则校验页面” 备用
 *      没有优化前，暂时这里的q1,q2,q3,q4...与页面单选框的name一一对应
 * @type {{q1: {answer: string, options: string, type: *, questionDescribe: string}, q2: {answer: string, options: string, type: *, questionDescribe: string}, q3: {answer: string, options: string, type: *, questionDescribe: string}, q4: {answer: string, options: string, type: *, questionDescribe: string}, q5: {answer: string, options: string, type: *, questionDescribe: string}, q6: {answer: string, options: string, type: *, questionDescribe: string}, q7: {answer: {answer2: string, answer1: string}, options: string, type: *, questionDescribe: string}}}
 */
const QUESTIONS_AND_ANSWERS = {
    "q1": {
        /**
         * 问题描述
         */
        questionDescribe: "",
        /**
         * 选项
         */
        options: "",
        /**
         * 包含的页面片段
         */
        includeFragment: "",
        /**
         * 问题类型
         */
        type: QUESTION_TYPE.TRUE_OR_FALSE_QUESTIONS,
        /**
         * 答案
         */
        answer: "F"
    },
    "q2": {
        questionDescribe: "",
        options: "",
        type: QUESTION_TYPE.SINGLE_CHOICE_QUESTION,
        answer: "F"
    },
    "q3": {
        questionDescribe: "",
        options: "",
        type: QUESTION_TYPE.SINGLE_CHOICE_QUESTION,
        answer: "F"
    },
    "q4": {
        questionDescribe: "",
        options: "",
        type: QUESTION_TYPE.SINGLE_CHOICE_QUESTION,
        answer: "B"
    },
    "q5": {
        questionDescribe: "",
        options: "",
        type: QUESTION_TYPE.SINGLE_CHOICE_QUESTION,
        answer: "A"
    },
    "q6": {
        questionDescribe: "",
        options: "",
        type: QUESTION_TYPE.SINGLE_CHOICE_QUESTION,
        answer: "D"
    },
    "q7": {
        questionDescribe: "",
        options: "",
        type: QUESTION_TYPE.FILL_IN_THE_BLANK_QUESTIONS,
        answer: {
            answer1: "6.5",
            answer2: "17.5"
        }
    }
};
export const QUESTIONS = {
    QUESTION_TYPE: QUESTION_TYPE,
    QUESTIONS_AND_ANSWERS: QUESTIONS_AND_ANSWERS
};