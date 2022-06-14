import React, { useContext } from "react";
import Container from "@mui/material/Container";
import Hidden from "@mui/material/Hidden";
import useMediaQuery from "@mui/material/useMediaQuery";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import clsx from "clsx";
import { AppContext } from "../utils";
import { Paper } from "@mui/material";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
    alignItems: "center",
  },
  paper: {
    background: "#1C0D38 !important",
    justifyContent: "center",
  },
  hover: {
    "&:hover": {
      color: "#FFB800",
    },
  },
});

export default function Header() {
  const { account, connect, disconnect } = useContext(AppContext);

  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const matches = useMediaQuery("(max-width:960px)");
  const matches1 = useMediaQuery("(max-width:1279px)");

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box mt={-20} display="flex" justifyContent="center">
        <img width="100px" src="/logo.png" alt="" />
      </Box>
      <List>
        {["About", "Services", "Roadmap", "FAQ", "Statistic"].map(
          (text, index) => (
            <ListItem
              button
              style={{
                justifyContent: "center",
                borderBottom: "1px solid #bbb8b8",
              }}
              key={text}
            >
              <ListItemText
                style={{
                  textTransform: "capitalize",
                  textAlign: "center",
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "#ffffff",
                }}
                primary={text}
              />
            </ListItem>
          )
        )}
      </List>
      <Box mb={1} display="flex" justifyContent="center">
        {account ? (
          <Box
            width="90%"
            height="42px"
            bgcolor="#098CDC"
            borderRadius="8px"
            sx={{ cursor: "pointer" }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            color="#ffffff"
            fontWeight="500"
            fontSize="16px"
            onClick={() => disconnect()}
            style={{ zIndex: 1 }}
          >
            {account.slice(0, 4) + "..." + account.slice(-4)}
          </Box>
        ) : (
          <Box
            zIndex={1}
            style={{
              cursor: "pointer",
            }}
            bgcolor="#098CDC"
            width="90%"
            height="42px"
            fontWeight="500"
            borderRadius="8px"
            fontSize="20px"
            color="#ffffff"
            display="flex"
            justifyContent="center"
            alignItems="center"
            onClick={() => connect()}
          >
            Connect
          </Box>
        )}
      </Box>
    </div>
  );
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        style={{
          background: "transparent",
          zIndex: "100px",
        }}
        height="92px"
        width="100%"
      >
        <Container maxWidth="xl">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pl={matches ? 0 : 5}
            pr={matches ? 0 : 5}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              // flexBasis="20%"
            >
              <Box
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "#000000",
                  fontSize: "20px",
                }}
              >
                Logo
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent={matches1 ? "end" : "space-between"}
              alignItems="center"
              // flexBasis={matches1 ? "45px" : "78%"}
            >
              <Box
                display="flex"
                justifyContent="space-around"
                // flexBasis={matches1 ? "0px" : "70%"}
                alignItems="center"
              >
                <Hidden mdDown>
                  <Box
                    mr={6}
                    fontSize="20px"
                    style={{
                      textDecoration: "none",
                      cursor: "pointer",
                      color: "#000000",
                    }}
                  >
                    About
                  </Box>
                  <Box
                    mr={6}
                    fontSize="20px"
                    zIndex="1"
                    style={{
                      textDecoration: "none",
                      cursor: "pointer",
                      color: "#000000",
                    }}
                  >
                    Services
                  </Box>

                  <Box
                    mr={6}
                    fontSize="20px"
                    zIndex="1"
                    style={{
                      textDecoration: "none",
                      cursor: "pointer",
                      color: "#000000",
                    }}
                  >
                    Roadmap
                  </Box>
                  <Box
                    mr={6}
                    fontSize="20px"
                    zIndex="1"
                    style={{
                      textDecoration: "none",
                      cursor: "pointer",
                      color: "#000000",
                    }}
                  >
                    FAQ
                  </Box>
                  <Box
                    mr={6}
                    fontSize="20px"
                    zIndex="1"
                    style={{
                      textDecoration: "none",
                      cursor: "pointer",
                      color: "#000000",
                    }}
                  >
                    Statistic
                  </Box>
                  {account ? (
                    <Box
                      width="130px"
                      height="42px"
                      bgcolor="#098CDC"
                      borderRadius="8px"
                      sx={{ cursor: "pointer" }}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      color="#ffffff"
                      fontWeight="500"
                      fontSize="16px"
                      onClick={() => disconnect()}
                      style={{ zIndex: 1 }}
                    >
                      {account.slice(0, 4) + "..." + account.slice(-4)}
                    </Box>
                  ) : (
                    <Box
                      zIndex={1}
                      style={{
                        cursor: "pointer",
                      }}
                      bgcolor="#098CDC"
                      width="130px"
                      height="42px"
                      fontWeight="500"
                      borderRadius="8px"
                      fontSize="20px"
                      color="#ffffff"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      onClick={() => connect()}
                    >
                      Connect
                    </Box>
                  )}
                </Hidden>
              </Box>

              <Hidden mdUp>
                {["left"].map((anchor) => (
                  <React.Fragment key={anchor}>
                    <Button
                      onClick={toggleDrawer(anchor, true)}
                      style={{ zIndex: 1 }}
                    >
                      <MenuIcon
                        style={{
                          fontSize: "38px",
                          cursor: "pointer",
                          color: "#000000",
                        }}
                      ></MenuIcon>
                    </Button>
                    <Paper style={{ background: "#1C0D38" }}>
                      <SwipeableDrawer
                        classes={{ paper: classes.paper }}
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                      >
                        {list(anchor)}
                      </SwipeableDrawer>
                    </Paper>
                  </React.Fragment>
                ))}
              </Hidden>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
