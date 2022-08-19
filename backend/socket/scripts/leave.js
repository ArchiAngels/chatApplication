function leavePublicRoom(usersInRoom,myRoom,id){
    let activeUsers = usersInRoom.filter(e => e.id !== id);
    usersInRoom = activeUsers;
    myRoom.emit('freshUserList',usersInRoom);
}

module.exports = {leavePublicRoom};