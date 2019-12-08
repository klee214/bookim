const hasAccess = (req,res,next)=>
{
    if(req.session.userInfo==null)
    {
        res.redirect("/user/register");
    }
    else
    {
        next();
    }
}

module.exports=hasAccess;