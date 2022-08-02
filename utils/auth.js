const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect("/signIn");
  } else {
    next();
  }
};

const withAuthLogged = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (req.session.logged_in) {
    res.redirect("/");
  } else {
    next();
  }
};

// const with

module.exports = { withAuth, withAuthLogged };
