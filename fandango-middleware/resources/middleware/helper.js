
module.exports={
    getExtraForAnalytics,
}

function getExtraForAnalytics(req){
    var res={};

    res.url=req.url;
    res.originalUrl=req.originalUrl;
    res.sessionID=req.sessionID;
    res.session = req.session;
    res.user = req.user;
    res.headers=req.headers;
    res.params=req.params;

    return res;

}