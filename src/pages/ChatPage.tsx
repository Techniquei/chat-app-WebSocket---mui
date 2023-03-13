import { Send } from "@mui/icons-material"
import { Avatar, IconButton, InputBase, Paper, Typography } from "@mui/material"
import { Box, Container, Stack } from "@mui/system"
import React from "react"
import { useState, useRef, useEffect } from "react"

const messages = [
  { message: "message1", author: "me" },
  { message: "message2", author: "Ivan" },
  { message: "message3", author: "me" },
  { message: "message4", author: "Ivan" },
  { message: "message5", author: "Ivan" },
  { message: "message6", author: "me" },
  { message: "message7", author: "me" },
  { message: "message8", author: "Ivan" },
]

// const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export function ChatPage() {
  const myRef = useRef<null | HTMLDivElement>(null)
  const [messagesState, setMessagesState] = useState(messages)
  const [inputState, setInputState] = useState("")
  const windowHeight = window.innerHeight
  function sumbit(e: any) {
    e.preventDefault()
    setMessagesState([...messagesState, { author: "me", message: inputState }])
    setInputState("")
  }
  useEffect(() => {
    if (myRef.current) {
      myRef.current.scrollIntoView({
        behavior: "smooth",
      })
      console.log("YES")
    }
  }, [messagesState])

  return (
    <Container sx={{ paddingY: 2 }}>
      <Stack
        spacing={3}
        margin={2}
        sx={{ overflow: "auto", padding: 2 }}
        height={windowHeight - 200}
        minWidth={300}
      >
        {messagesState.map((e) => (
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "row",
              gap: 2,
              width: "70%",
              alignSelf: e.author === "me" ? "end" : "start",
              borderRadius: 3,
              minWidth: '200px'
            }}
            elevation={10}
          >
            <Avatar
              src="https://www.w3schools.com/howto/img_avatar.png"
              sx={{ width: 100, height: 100 }}
            />
            <Box>
              <Typography variant="h6">{e.author}</Typography>
              <Typography>{e.message}</Typography>
            </Box>
          </Paper>
        ))}
        <div ref={myRef} />
      </Stack>
      <Paper component="form" sx={{ display: "flex", margin: '16px' }} onSubmit={sumbit}>
        <InputBase
          placeholder="message"
          sx={{ flex: 1, padding: 1 }}
          value={inputState}
          onChange={(e) => setInputState(e.target.value)}
        />
        <IconButton>
          <Send />
        </IconButton>
      </Paper>
    </Container>
  )
}
