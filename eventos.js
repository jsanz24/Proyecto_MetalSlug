document.onkeydown = function(e){
    switch(e.keyCode){
        case 38:
            if(!arrPlayers[0].isJumping) arrPlayers[0].jump();
            break;

        case 39:
            keyState.keyRight = true;
            break;
            
        case 37:
            keyState.keyLeft = true;
            break;

        case 87:
            if(arrPlayers[1] && !arrPlayers[1].isJumping) arrPlayers[1].jump()
            break;
        
        case 65:
            keyState.keyA = true;
            break;
        
        case 68:
            keyState.keyD = true;
            break;
    }
}
document.onkeyup = function(e){
    
    switch(e.keyCode){
        case 39:
            keyState.keyRight = false;
            break;
        
        case 37:
            keyState.keyLeft = false;
            break;
        
        case 99:    
            arrPlayers[0].shoot();
            break;
        
        case 65:
            keyState.keyA = false;
            break;
        
        case 68:
            keyState.keyD = false;
            break;
        
        case 71:    
            arrPlayers[1].shoot();
            break;
    }
}