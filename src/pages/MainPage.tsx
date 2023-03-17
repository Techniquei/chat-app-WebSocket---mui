import { Bookmark, FollowTheSigns, Message } from "@mui/icons-material"
import { Avatar, Box, Button, Card, CardActions, CardContent, CircularProgress, Container, IconButton, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { userAPI } from "../api/axios"
import { Photos } from "../store"

export interface UserItem {
  name: string
  id: number
  uniqueUrlName: any
  photos: Photos
  status: any
  followed: boolean
}
export function MainPage() {
  const [usersState, setUsersState] = useState<[UserItem]  | null>(null)
  useEffect(()=>{
    userAPI.getUsers().then((res)=>setUsersState(res.data.items))
  }, [])
  if(usersState === null) return <CircularProgress sx={{width:'auto'}} />
  console.log(usersState)
  return (
    <Container sx={{padding: 2}}>
      <Box sx={{display: 'flex', gap: 2, flexWrap: 'wrap'}}>
        {usersState.map((user)=><Card elevation={3} sx={{width: 132}}>
          <CardContent sx={{p: 0}}>
            <Avatar variant="rounded" src={user.photos.small} sx={{width: '132px', height: '100px', mb: 1}} />
            <Typography textAlign={'center'} variant="body1" fontWeight={600}>{user.name}</Typography>
          </CardContent>
          <CardActions disableSpacing sx={{justifyContent: 'flex-end'}}>
            <IconButton><Bookmark /></IconButton>
            <IconButton><Message /></IconButton>
          </CardActions>
        </Card>)}
      </Box>
    </Container>
  )
  
}
