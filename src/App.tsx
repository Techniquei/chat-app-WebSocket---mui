import { Menu } from "@mui/icons-material"
import {
  IconButton,
  Toolbar,
  Typography,
  Button,
  List,
  ListItemButton,
  ListItemText,
  Drawer,
  Avatar,
  Link,
} from "@mui/material"
import AppBar from "@mui/material/AppBar"
import { Box, Container } from "@mui/system"
import React, { useState, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { AuthModal } from "./components/authModal"
import { fetchUserProfile, useAppDispatch, useAppSelector } from "./store"

function App() {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  useEffect(() => {
    const myId = localStorage.getItem("myId")
    if (myId !== null) {
      dispatch(fetchUserProfile(myId))
    }
  }, [])

  function handleDrawerToggle() {
    setMobileOpen((prevState) => !prevState)
  }

  function handleToggleAuth() {
    setAuthOpen(!authOpen)
  }

  const name = useAppSelector((state) => {
        return state.profile ? state.profile.fullName : undefined
  })
  console.log(name)
  const photo = useAppSelector((state) => {
    return state.profile ? state.profile.photos?.small : undefined
  })

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        <ListItemButton
          sx={{ textAlign: "center" }}
          onClick={() => navigate("/")}
        >
          <ListItemText primary={"main"} />
        </ListItemButton>
        <ListItemButton
          sx={{ textAlign: "center" }}
          onClick={() => navigate("chat")}
        >
          <ListItemText primary={"chat"} />
        </ListItemButton>
      </List>
    </Box>
  )

  return (
    <Box>
      <AppBar position="static">
        <Container>
          <Toolbar sx={{gap: 1}}  >
            <IconButton
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <Menu sx={{ color: "white" }} />
            </IconButton>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Онлайн чат
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Button
                key={"main"}
                sx={{ color: "white" }}
                size="large"
                onClick={() => navigate("/")}
              >
                main
              </Button>
              <Button
                key={"chat"}
                sx={{ color: "white" }}
                size="large"
                onClick={() => navigate("chat")}
              >
                chat
              </Button>
            </Box>
            {name !== undefined ? (
              <Button sx={{color: 'white', textTransform: 'none', gap: 1}} onClick={()=>navigate(`profile/${localStorage.getItem("myId")}`)}>
                <Typography>{name}</Typography>
                <Avatar src={photo} />
              </Button>
              
            ) : (
              <Button
                variant="contained"
                color="warning"
                size="large"
                onClick={handleToggleAuth}
              >
                Log In
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: "block", sm: "none" } }}
          PaperProps={{ sx: { width: 240 } }}
        >
          {drawer}
        </Drawer>
      </Box>
      <AuthModal authOpen={authOpen} handleToggleAuth={handleToggleAuth} />
      <Outlet />
    </Box>
  )
}

export default App
