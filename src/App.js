import React from "react";
import Stack from "@mui/material/Stack";
import { connect } from "react-redux";
import { StyledEngineProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
//LOCAL IMPORTS
import SnackBarAlerts from "./Shared/AlertMessages/snackBarAlerts";
import { showSnackBar } from "./Store/AlertMessages/actionCreator";
import NotificationStack from "./Components/notificationStack";

const cahce = createCache({
  key: "css",
  prepend: true,
});

function App(props) {
  const alertReducer =
    props &&
    props.alertReducer &&
    props.alertReducer.notifications &&
    props.alertReducer.notifications;
  return (
    <CacheProvider value={cahce}>
      <StyledEngineProvider injectFirst>
        <div className="App">
          <NotificationStack />
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-end"
            spacing={3}
          >
            {alertReducer &&
              alertReducer.map((data, index) => {
                return <SnackBarAlerts {...data} key={index} />;
              })}
          </Stack>
        </div>
      </StyledEngineProvider>
    </CacheProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    alertReducer: state.alertReducer,
  };
};

export default connect(mapStateToProps, { showSnackBar })(App);
