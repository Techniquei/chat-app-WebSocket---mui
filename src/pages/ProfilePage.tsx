import {
  Avatar,
  CircularProgress,
  Grid,
  Link,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material"
import { useParams } from "react-router-dom"
import { userAPI } from "../api/axios"
import { useState, useEffect } from "react"
import { AxiosResponse } from "axios"
import { ProfileInterface } from "../store"
import { Container } from "@mui/system"

export function ProfilePage() {
  const { id } = useParams()
  const [profileState, setProfileState] = useState<ProfileInterface | null>(
    null
  )
  useEffect(() => {
    if (id) {
      userAPI.getProfile(id).then((res) => setProfileState(res.data))
    }
  }, [id])

  if (profileState === null) return <CircularProgress sx={{ width: "auto" }} />

  const con = profileState.contacts != null ? profileState.contacts : {}
  const contacts = []
  for (const [key, value] of Object.entries(con)) {
    if(value){
        contacts.push({net:  key, link: value})
    }
  }

  return (
    <Container sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={4}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Paper elevation={4} sx={{ width: "100%" }}>
            <Avatar
              variant="rounded"
              src={profileState.photos?.large}
              sx={{ width: "100%", height: "100%" }}
            />
          </Paper>
          <Typography variant="h4">{profileState.fullName}</Typography>
          <List>
            {contacts.map((e)=><ListItem key={e.net} sx={{paddingInline: 0, flexDirection: 'column', alignItems: 'flex-start'}}>
                <Typography variant="h6">{e.net}</Typography>
                <Link href={e.link} variant="subtitle1">{e.link}</Link>
            </ListItem>)}
          </List>
        </Grid>
        <Grid item xs={8}>
          {profileState.aboutMe ? (
            <Paper elevation={4} sx={{ backgroundColor: "white", padding: 1 }}>
              <Typography variant="h5">О себе:</Typography>
              <Typography variant="body1">{profileState.aboutMe}</Typography>
            </Paper>
          ) : (
            ""
          )}
          {
            profileState.lookingForAJob && profileState.lookingForAJobDescription ? (
                <Paper sx={{marginTop: 1, padding: 1}}><Typography variant="h5">Ищу работу:</Typography><Typography variant="body1">{profileState.lookingForAJobDescription}</Typography></Paper>
            ) : <Typography variant="h5" marginTop={1}>Информация отсутствует</Typography>
          }
        </Grid>
      </Grid>
    </Container>
  )
}
