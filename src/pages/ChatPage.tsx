import { Send } from "@mui/icons-material"
import { Avatar, CircularProgress, IconButton, InputBase, Paper, Typography } from "@mui/material"
import { Box, Container, Stack } from "@mui/system"
import React from "react"
import { useState, useRef, useEffect } from "react"

export type ChatMessageType = {
  message: string
  photo: string
  userId: number
  userName: string
}

export function ChatPage() {
  const ws = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
  )
  const myRef = useRef<null | HTMLDivElement>(null)
  const [messagesState, setMessagesState] = useState<ChatMessageType[]>([])
  console.log(messagesState)
  const [inputState, setInputState] = useState("")
  const [readyStatus, setReadyStatus] = useState<'pending'|'ready'>('pending')

  function submit(e: any) {
    e.preventDefault()
    ws.send(inputState)
    setInputState("")
  }

  function webSocketHandler(e : MessageEvent<any>){
    const ar = JSON.parse(e.data)
      setMessagesState((prev) => {
        return [...(prev.slice(-20)), ...(ar.slice(-20))]
      })
  }

  useEffect(() => {
    ws.addEventListener('open', ()=>{
      setReadyStatus('ready')
    })
    ws.addEventListener("message", webSocketHandler)
    return (()=>{
      ws.removeEventListener("message", webSocketHandler);
      ws.close()
    })
  }, [])

  useEffect(() => {
    if (myRef.current) {
      myRef.current.scrollIntoView({
        behavior: "smooth",
      })
    }
  }, [messagesState])

  return (
    <Container sx={{ paddingY: 2, display: 'flex', flexDirection: 'column', alignItems:'center' }}>
      <Stack
        spacing={3}
        margin={2}
        sx={{ overflow: "auto", padding: 2 }}
        height='calc(100vh - 250px)'
        minWidth={300}
        width={'100%'}
      >
        {messagesState.map((e, index) => (
          <Paper
            key={index}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "row",
              gap: 2,
              width: "70%",
              alignSelf: e.userName === "me" ? "end" : "start",
              borderRadius: 3,
              minWidth: "200px",
            }}
            elevation={10}
          >
            <Avatar src={e.photo} sx={{ width: 60, height: 60 }} />
            <Box>
              <Typography variant="h6">{e.userName}</Typography>
              <Typography>{e.message}</Typography>
            </Box>
          </Paper>
        ))}
        <div ref={myRef} />
      </Stack>
      
       {readyStatus === 'ready' ? <Paper
        component="form"
        sx={{ display: "flex", margin: "16px", width: '100%' }}
        onSubmit={submit}
      >
        <InputBase
          placeholder="message"
          sx={{ flex: 1, padding: 1 }}
          value={inputState}
          onChange={(e) => setInputState(e.target.value)}
        />
        <IconButton onClick={submit}>
          <Send />
        </IconButton>
      </Paper> : <CircularProgress sx={{width:'auto'}} />} 
    </Container>
  )
}
