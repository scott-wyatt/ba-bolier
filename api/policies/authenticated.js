module.exports = function (req, res, ok) {
 
  // User is allowed, proceed to controller
  var is_auth = req.isAuthenticated()
  
  if (is_auth){
  	 console.log("Yup");
  	 return next();
  }
  // User is not allowed
  else{
  	console.log("Yup Else");
  	return res.redirect("/login");
  }
};