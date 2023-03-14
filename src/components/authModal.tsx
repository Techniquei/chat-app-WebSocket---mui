import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, TextField } from "@mui/material"
import React, { useState } from "react"
import { userAPI } from "../api/axios"

export function AuthModal(props : any){
    const [email, setEmail] = useState('')  
    const [password, setPassword] = useState('')
    const [incorrectAuthMessage, setIncorrectAuthMessage] = useState('')  

    function loginHandler(){
        userAPI.authUser(email, password).then(responce=>{
            const data = responce.data
            if(data.resultCode === 1){
                setIncorrectAuthMessage(data.messages.join('. '))
            }else{
                localStorage.setItem('myId', data.data.userId)
                setPassword('')
                setEmail('')
                setIncorrectAuthMessage('')
                props.handleToggleAuth()
            }
        })
    }

    return(
        <Dialog open={props.authOpen} onClose={props.handleToggleAuth}>
        <DialogTitle textAlign='center'>Авторизация</DialogTitle>
        <DialogContent sx={{maxWidth: 300}}>
          <DialogContentText textAlign='center' display={incorrectAuthMessage === '' ? 'none' : 'block'} color='red'>
            {incorrectAuthMessage}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <FormControlLabel control={<Checkbox defaultChecked />} label='Запомнить меня'/>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleToggleAuth}>Отмена</Button>
          <Button onClick={loginHandler}>Войти</Button>
        </DialogActions>
      </Dialog>
    )
}