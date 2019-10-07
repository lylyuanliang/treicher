/**
 * 获取路由
 */
import Constants from "./constants.js";
export default class Router {
    constructor() {

    }

    /**
     * 获取路由路径（根据页号获取名称）
     * @param pageNum
     * @returns {string}
     */
    static getRouterPathByPageNum(name, pageNum) {
        let page = "";
        let routers = this.getRouterConstants(name);
        $.each(routers, function (pgNum, pageName) {
            if(pageNum == pgNum) {
                page = pageName;
                return false;
            }
        });
        return page;
    }

    /**
     * 获取路由常量
     * @param name
     * @returns {[]}
     */
    static getRouterConstants(name) {
        let routers = [];
        if("index" == name) {
            routers = Constants.ROUTER.ROUTER_INDEX;
        }else if("treicher" == name) {
            routers = Constants.ROUTER.ROUTER_TREICHER;
        }
        return routers;
    }

    /**
     * 根据名称获取页号
     * @param pageName
     * @returns {number}
     */
    static getPageNumByPageName(name, pageName) {
        let pageNum = 0;
        let routers = this.getRouterConstants(name);
        $.each(routers, function (pgNum, pgName) {
            if(pgName == pageName) {
                pageNum = pgNum;
                return false;
            }
        });
        return pageNum;
    }

    /**
     * 获取最大页码
     * @returns {number}
     */
    static getLastPage(name) {
        let lastPage = 1;
        let routers = this.getRouterConstants(name);
        $.each(routers, function (pgNum) {
            if(pgNum > lastPage) {
                lastPage = pgNum;
            }
        });
        return lastPage;
    }

    /**
     * 获取第一页
     * @returns {number}
     */
    static getFirstPage(name) {
        let firstPage = 1;
        let routers = this.getRouterConstants(name);
        $.each(routers, function (pgNum) {
            if(pgNum < firstPage) {
                firstPage = pgNum;
            }
        });
        return firstPage;
    }
}