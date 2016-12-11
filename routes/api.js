/**
 * Created by linhao on 2016/11/19.
 */
var request = require('request');
var cheerio = require('cheerio');

//图片
/**
 * @param req
 * @param res
 * picNum ：
 * 9 ： 偷拍自拍
 * 1：亚洲图片
 * 2 ：欧美图片
 * 3 ：卡通动漫
 * 4：乱伦性爱
 * 6：另类图片
 * 7：美腿丝袜
 * 8：清纯唯美
 *
 * pageNum : 图片的当前页码
 */
var BASE_URL = "https://www.aa286.com/htm/";
exports.picture = function (req, res) {
    var pageNum = req.query.pageNum || 1;
    var picNum = req.query.picNum || 1;
    var mailUrl = BASE_URL + "piclist$picNum/$pageNum.htm"
    mailUrl = mailUrl.replace("$pageNum", pageNum).replace("$picNum", picNum);
    console.log('url' + mailUrl);
    request(mailUrl, function (error, response, body) {
        if (body != null) {
            var $ = cheerio.load(body);
            var titleList = [];
            var weekUpdatesHtml = $(".box.list.channel")
            if (weekUpdatesHtml!=null) {
                weekUpdatesHtml.find('li').map(function (i, e) {
                    var title1 = $(e).find("a").text();
                    title1 = title1.substring(5, title1.length);
                    var url1 = $(e).find('a').attr('href');
                    var time = new Date().getFullYear() + '-' + $(e).find('a').find('span').text();
                    titleList.push({
                            title: title1,
                            url: url1,
                            time: time
                        }
                    )
                });
                res.send(titleList);
            }
        }
    });
};

//小说
/**
 * @param req
 * @param res
 * novelNum :
 * 1 : 情感小说
 * 2 ：校园春色
 * 10：人妻女友
 * 4 ：武侠古典
 * 5： 家庭乱伦
 * 6 ：另类小说
 * 8 ：性爱技巧
 * 9 ：情色笑话
 * pageNum : 小说当前页码
 */
exports.novel = function (req, res) {
    var pageNum = req.query.pageNum || 1;
    var novelNum = req.query.novelNum || 1;
    console.log("novelNum");
    var mailUrl = BASE_URL + "novellist$novelNum/$pageNum.htm";
    mailUrl = mailUrl.replace("$pageNum", pageNum).replace("$novelNum", novelNum);
    console.log('url' + mailUrl);
    request(mailUrl, function (error, response, body) {
        if (body != null) {
            var $ = cheerio.load(body);
            var titleList = [];
            var weekUpdatesHtml = $(".box.list.channel")
            if (weekUpdatesHtml!=null) {
                weekUpdatesHtml.find('li').map(function (i, e) {
                    var title1 = $(e).find("a").text();
                    title1 = title1.substring(5, title1.length);
                    var url1 = $(e).find('a').attr('href');
                    var time = new Date().getFullYear() + '-' + $(e).find('a').find('span').text();
                    titleList.push({
                            title: title1,
                            url: url1,
                            time: time
                        }
                    )
                });
                res.send(titleList);
            }
        }
    });
};
//视频
/**
 * @param req
 * @param res
 * classify : dylist
 * vedioNum :
 * 1 :视频偷拍
 * 3 ：欧美电影
 * classify : vodlist
 * 1 : 网友自拍
 * 2 ： 亚洲视频
 * 3 ： 欧美视频
 * 4 ： 动漫视频
 * 5 ： 其他视频
 * pageNum : 视频当前页码
 */
exports.vedio = function (req, res) {
    var pageNum = req.query.pageNum || 1;
    var vedioNum = req.query.vedioNum || 1;
    var classify = req.query.classify || "dylist";
    var mailUrl = BASE_URL + "$classify$vedioNum/$pageNum.htm";
    mailUrl = mailUrl.replace("$vedioNum", vedioNum).replace("$pageNum", pageNum).replace("$classify", classify);
    console.log('url' + mailUrl);
    request(mailUrl, function (error, response, body) {
        if (body != null) {
            var $ = cheerio.load(body);
            var titleList = [];
            var weekUpdatesHtml = $(".box.dy_list")
            if (weekUpdatesHtml != null) {
                weekUpdatesHtml.find('li').map(function (i, e) {
                    var title1 = $(e).find("h3").text();
                    var url1 = $(e).find('a').attr('href');
                    var img1 = $(e).find('img').attr('src');
                    var time1 = $(e).find('span').text();
                    titleList.push({
                            title: title1,
                            img: img1,
                            time: time1,
                            url: url1
                        }
                    )
                });
                res.send(titleList);
            }
        }
    });
};
//电影
/**
 * @param req
 * @param res
 * movieNum :
 * 1 : 中文无码
 * 2 ：中文有码
 * 3：欧美无码
 * 4 ：韩国无码
 * 5 ：日本无码
 * 6 ：日本有码
 * 7 ：偷拍自拍
 * pageNum : 电影当前页码
 */
exports.movie = function (req, res) {
    var pageNum = req.query.pageNum || 1;
    var movieNum = req.query.movieNum || 1;
    var mailUrl = BASE_URL + "mp4list$movieNum/$pageNum.htm";
    mailUrl = mailUrl.replace("$movieNum", movieNum).replace("$pageNum", pageNum);
    console.log('url' + mailUrl);
    request(mailUrl, function (error, response, body) {
        if (body != null) {
            var $ = cheerio.load(body);
            var titleList = [];
            var weekUpdatesHtml = $(".thumbs")
            if (weekUpdatesHtml != null) {
                weekUpdatesHtml.find('div').map(function (i, e) {
                    var title1 = $(e).find("a").attr('title');
                    var url1 = $(e).find('a').attr('href');
                    var img1 = $(e).find('img').attr('src');
                    var time1 = $(e).find('.time').text();
                    titleList.push({
                            title: title1,
                            img: img1,
                            time: time1,
                            url: url1
                        }
                    )
                });
                res.send(titleList);
            }
        }
    });
};

//查询图片
/**
 * @param req
 * @param res
 * picNum :
 *  9 ： 偷拍自拍
 * 1：亚洲图片
 * 2 ：欧美图片
 * 3 ：卡通动漫
 * 4：乱伦性爱
 * 6：另类图片
 * 7：美腿丝袜
 * 8：清纯唯美
 * pageNum :
 * 图片当前页码
 */
exports.queryPicture = function (req, res) {
    var picNum = req.query.picNum || 9;
    var pageNum = req.query.pageNum || 99332;
    var mailUrl = BASE_URL + "pic$picNum/$pageNum.htm";
    mailUrl = mailUrl.replace("$picNum", picNum).replace("$pageNum", pageNum);
    console.log('url' + mailUrl);
    request(mailUrl, function (error, response, body) {
        if (body != null) {
            var $ = cheerio.load(body);
            var titleList = [];
            var weekUpdatesHtml = $(".pics")
            if (weekUpdatesHtml != null) {
                weekUpdatesHtml.find('img').map(function (i, e) {
                    var img1 = $(e).attr('src');
                    titleList.push({
                            img: img1
                        }
                    )
                });
                res.send(titleList);
            }
        }
    });
};
//查询小说
/**
 * @param res
 * @param req
 * novelNum
 * 1 : 情感小说
 * 2 ：校园春色
 * 10：人气女友
 * 4 ：武侠古典
 * 5： 家庭乱伦
 * 6 ：另类小说
 * 8 ：性爱技巧
 * 9 ：情色笑话
 * pageNum : 小说当前的页码
 */
exports.queryNovel = function (req, res) {
    var novelNum = req.query.novelNum || 5;
    var pageNum = req.query.pageNum || 87398;
    var mailUrl = BASE_URL + "novel$novelNum/$pageNum.htm";
    mailUrl = mailUrl.replace("$novelNum", novelNum).replace("$pageNum", pageNum);
    console.log('url' + mailUrl);
    request(mailUrl, function (error, response, body) {
        if (body != null) {
            var $ = cheerio.load(body, {decodeEntities: false});
            var titleList = [];
            var weekUpdatesHtml = $(".content");
            var weekUpdateContent = weekUpdatesHtml.html();
            if (weekUpdateContent!=null){
            titleList.push({
                content: weekUpdateContent.replace(/\r/g, "</r>").replace(/\n/g, "</n>")
            });
            res.send(titleList);
            }
        }
    });
};
/**
 * 查询视频
 * @param req
 * @param resp
 * classify :
 * vodplay ： 偷拍2 欧美视频2  亚洲视频  动漫 其他视频
 *  dyplay : 偷拍1 欧美视频1
 *
 * pageNum : 视频当前页码
 * vedioNum : 视频编号
 */
exports.queryVedio = function (req, res) {
    var vedioNum = req.query.vedioNum || 1;
    var pageNum = req.query.pageNum || 34338;
    var classify = req.query.classify || 'dyplay';
    //https://www.aa286.com/htm/dyplay1/34338.htm
    var mailUrl = BASE_URL + "$classify$vedioNum/$pageNum.htm";
    mailUrl = mailUrl.replace("$vedioNum", vedioNum).replace("$pageNum", pageNum).replace("$classify", classify);
    console.log('url' + mailUrl);
    request(mailUrl, function (error, response, body) {
        if (body != null) {
            var $ = cheerio.load(body, {decodeEntities: false});
            var titleList = [];
            var addressHtml = $(".text").html();
            if (addressHtml != null) {
                var index1 = 0;
                var index2 = 0;
                var vedioId = 0;
                var vedioBase = '';
                var vedioAddress = ''
                if (classify == 'dyplay') {
                    index1 = addressHtml.indexOf('mp4/');
                    index2 = addressHtml.indexOf('.mp4');
                    vedioId = addressHtml.substring(index1 + 4, index2);
                    vedioBase = 'http://lao2.bb149.com/video3-mp4_water/'
                    vedioAddress = vedioBase + vedioId + '.mp4'
                } else {
                    index1 = addressHtml.indexOf('kele');
                    index2 = addressHtml.indexOf('.mp4');
                    vedioId = addressHtml.substring(index1 + 6, index2);
                    vedioBase = 'http://kele.bb149.com/vod_water/'
                    vedioAddress = vedioBase + vedioId + '.mp4'
                    console.log('vedioAddress : ' + vedioAddress)
                }
                titleList.push({
                    vedioAddress: vedioAddress
                });
                res.send(titleList);
            }
        }
    });
};

/**
 * 查询电影
 * @param req
 * @param res
 */
exports.queryMovie = function (req, res) {
    var movieNum = req.query.movieNum || 7;
    var pageNum = req.query.pageNum || 52972;
    //https://www.aa286.com/htm/dyplay1/34338.htm
    var mailUrl = BASE_URL + "mp4$movieNum/$pageNum.htm";
    mailUrl = mailUrl.replace("$movieNum", movieNum).replace("$pageNum", pageNum);
    console.log('url' + mailUrl);
    request(mailUrl, function (error, response, body) {
        if (body != null) {
            var $ = cheerio.load(body, {decodeEntities: false});
            var titleList = [];
            var addressHtml = $(".mox").html();
            if (addressHtml != '') {
                var index1 = addressHtml.indexOf('http');
                var index2 = addressHtml.indexOf('.mp4');
                var vedioAddress = addressHtml.substring(index1, index2 + 4);
                console.log('vedioAddress : ' + vedioAddress)
            }
            titleList.push({
                vedioAddress: vedioAddress
            });
            res.send(titleList);
        }
    });
};
