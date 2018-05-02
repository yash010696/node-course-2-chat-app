

class Users{
    constructor(){
        this.users=[];
    }

    addUser(id,name,room){
        var user={id,name,room};
        this.users.push(user);
        return user;
    }
    removeUser(id){
        var user=this.getUser(id);
        if(user){
            this.users=this.users.filter((user)=> user.id !== id);
        }
        return user;
    }
    getUser(id){
        return this.users.filter((user)=> user.id === id)[0];
    }
    getUserList(room){
        var user1=this.users.filter((user)=> user.room === room);
        var namesArray=this.users.filter((user1)=> user1.name);
        // console.log('-------------',namesArray,'+++++++++++',user1);
        return namesArray;
    }
}

module.exports={Users};