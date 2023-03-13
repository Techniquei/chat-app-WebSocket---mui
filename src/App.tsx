import { Menu, Search, Send } from "@mui/icons-material"
import {
  IconButton,
  Toolbar,
  Typography,
  Button,
  Stack,
  ListItem,
  Card,
  CardContent,
  Paper,
  Avatar,
  TextField,
  InputBase,
  List,
  ListItemButton,
  ListItemText,
  Drawer,
} from "@mui/material"
import AppBar from "@mui/material/AppBar"
import { Box, Container } from "@mui/system"
import React, { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"

const messages = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis vitae dolor a ultrices. Suspendisse et sagittis enim. Ut non felis a lectus convallis tristique dignissim vitae felis. Etiam accumsan hendrerit nisi in tristique. Sed vel tempor eros. Nunc cursus nulla eu tortor dapibus sagittis. Praesent lorem felis, mollis in molestie vitae, elementum a tellus.",
  "Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas nisi tellus, gravida ac tincidunt at, dictum vel lorem. Donec euismod tempor ante vitae fermentum. Mauris nec ex cursus, dignissim mauris at, pulvinar mauris. Pellentesque nec nibh a nisi ultrices hendrerit a id leo. Curabitur euismod tortor ac nunc efficitur dapibus. Donec posuere, tellus eu egestas ultrices, velit nisi imperdiet sapien, sit amet elementum massa justo non nulla. Aenean et mollis lectus, vitae efficitur dolor. Do",
  " libero, vitae sollicitudin enim ullamcorper id. Fusce ut placerat nisl. In placerat, tortor et convallis pulvinar, diam massa vehicula ante, vel sodales metus metus non tor",
  "as nunc massa, malesuada et velit non, suscipit blandit nisi. Proin et orci vel elit tempus blandit. Pellentesque ante dolor, venenatis at finibus finibus, dapibus quis justo. Proin varius nisl eget lectus tempus fringilla. Vestibulum vitae neque ac nisi porta suscipit eget a metus. Ut ut tincidunt velit, ac dictum erat. Mauris eget erat eget felis bibendum element",
]

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)

  function handleDrawerToggle() {
    setMobileOpen((prevState) => !prevState)
  }

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
  const navigate = useNavigate()

  return (
    <Box>
      <AppBar position="static">
        <Container>
          <Toolbar>
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
            <Button variant="contained" color="warning" size="large">
              Log In
            </Button>
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
      <Outlet />
    </Box>
  )
}

export default App
