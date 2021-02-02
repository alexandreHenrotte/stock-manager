const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
    return (
      <Route
        path={path}
        {...rest}
        render={(props) => {
          return loggedIn ? (
            <Comp {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  prevLocation: path,
                  error: "You need to login first!",
                },
              }}
            />
          );
        }}
      />
    );
  };