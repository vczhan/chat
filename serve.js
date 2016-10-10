var io = require('socket.io')(8888)
var users = []

function isQQ(n) {
  return /^[1-9]\d{4,11}$/.test(n)
}

function isExist(uin) {
  return users.some(function(v) {
    return v.uin === uin
  })
}

io.on('connection', function(socket) {
  socket.on('login', function(data) {
    const uin = data.uin

    if ( !isQQ(uin) ) {
      socket.emit('loginErr', 'Wrong account')
      socket.disconnect()
      return
    }

    if ( isExist(uin) ) {
      socket.emit('loginErr', 'This account has been login in')
      socket.disconnect()
      return
    }

    socket.uin = uin
    users.push(data)

    socket.emit('login', 'join success')

    // sending to all clients, include sender
    io.sockets.emit('usersUpdate', users)
    // 通知有新登录用户
    socket.broadcast.emit('join', data)

  })

  // get message and sending to all clients, don't store
  socket.on('message', function(data) {
    io.sockets.emit('message',
      Object.assign(data, {
        timestamp: Date.now()
      })
    )
  })

  socket.on('disconnect', function() {
    // users = users.filter(function(v) {
    //   return v.uin !== socket.uin
    // })

    const idx = users.findIndex(function(v) {
      return v.uin === socket.uin
    })

    if (!~idx) return

    const user = users.splice(idx, 1)[0]

    socket.broadcast.emit('logout', user)
    socket.broadcast.emit('usersUpdate', users)
  })
})
