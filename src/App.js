import React from "react";
import { StyledEngineProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { makeStyles } from "@mui/styles";
//LOCAL IMPORTS
import MainLayout from "./MainLayout";

const useStlyes = makeStyles((theme) => ({
  roor: {
    fontFamily: "Arial, Helvetica, sans-serif",
    textAlign: "center",
  },
}));

const cahce = createCache({
  key: "css",
  prepend: true,
});

function App() {
  const classes = useStlyes();
  return (
    <CacheProvider value={cahce}>
      <StyledEngineProvider injectFirst>
        <div className={classes.root}>
          <MainLayout />
        </div>
      </StyledEngineProvider>
    </CacheProvider>
  );
}
export default App;
