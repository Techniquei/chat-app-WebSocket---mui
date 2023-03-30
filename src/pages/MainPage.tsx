import { Bookmark, FollowTheSigns, Message } from "@mui/icons-material"
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  IconButton,
  Pagination,
  Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { userAPI, UserItem } from "../api/axios"
import { Photos } from "../store"

export function MainPage() {
  const [usersState, setUsersState] = useState<UserItem[]>([])
  const [totalPageState, setTotalPageState] = useState<number>(1)
  const [loadingState, setLoadingState] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    userAPI.getUsers(1).then((res) => {
      setUsersState(res.data.items)
      setTotalPageState(Math.ceil(res.data.totalCount / 21))
    })
  }, [])
  function paginationHandler(page: number) {
    setLoadingState(true)
    console.log("true")
    userAPI.getUsers(page).then((res) => {
      setUsersState(res.data.items)
      setLoadingState(false)
    })
  }
  if (usersState === null) return <CircularProgress sx={{ width: "auto" }} />
  console.log(usersState)
  return (
    <Container
      sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        mb: 3,
      }}
    >
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", minHeight: 595 }}>
        {loadingState ? (
          <CircularProgress sx={{ width: "auto"}} />
        ) : (
          usersState.map((user) => (
            <Card elevation={3} sx={{ width: 132, cursor: "pointer" }} onClick={()=>navigate(`/profile/${user.id}`)} >
              <CardContent sx={{ p: 0 }}>
                <Avatar
                  variant="rounded"
                  src={user.photos.small}
                  sx={{ width: "132px", height: "100px", mb: 1 }}
                />
                <Typography
                  textAlign={"center"}
                  variant="body1"
                  fontWeight={600}
                >
                  {user.name}
                </Typography>
              </CardContent>
              <CardActions disableSpacing sx={{ justifyContent: "flex-end" }}>
                <IconButton>
                  <Bookmark />
                </IconButton>
                <IconButton>
                  <Message />
                </IconButton>
              </CardActions>
            </Card>
          ))
        )}
      </Box>
      <Pagination
        count={totalPageState}
        onChange={(e, page) => paginationHandler(page)}
      />
    </Container>
  )
}
