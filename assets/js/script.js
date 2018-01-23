////////////////////////////////////////////////////
//                  Varriables                    //
////////////////////////////////////////////////////

const canvas = document.querySelector(".canvas")
const context = canvas.getContext('2d')

const shadow =  document.querySelector('.shadow')

const char1Right = new Image()
char1Right.src = "assets/img/spriteRight.png"
const char1Left = new Image()
char1Left.src = "assets/img/spriteLeft.png"
const char1Stop = new Image()
char1Stop.src = "assets/img/spriteStop.png"


//movement 
let moveState = 0

let moveX = 600
let moveY = 400

const up = 90
const right = 68
const down = 83
const left = 81

let frameIndex = 0
let tickCount = 0










////////////////////////////////////////////////////
//                    RESIZE                      //
////////////////////////////////////////////////////

const resize = () =>
{
    canvas.width = innerWidth
    canvas.height = innerHeight
}

resize()










////////////////////////////////////////////////////
//                Sprite Gestion                  //
////////////////////////////////////////////////////


const sprite = (options) => 
{
// Variables Declaration

    //base options for each sprites
    this.context = context
    this.width = options.width
    this.height = options.height
    this.image = options.image

    //updates options
    
    this.numberOfFrames = options.numberOfFrames || 1
    this.ticksPerFrame = options.ticksPerFrame || 0


// rendering

    //update function

    update = () => 
    {
        tickCount++
			
        if (tickCount > ticksPerFrame) 
        {
            tickCount = 0
        
            // If the current frame index is in range
            if (frameIndex < numberOfFrames - 1)
            {

                // Go to the next frame
                frameIndex++

            } else if (frameIndex = numberOfFrames)
            {
                frameIndex = 0
            }   
        }
    }

    //render function
    
    render = () => 
    {
        				
        // Clear the canvas
        context.clearRect(moveX, moveY, this.width, this.height);

        // Draw the animation
        this.context.drawImage
        (
           img = this.image,
           sx = frameIndex * this.width / numberOfFrames,
           sy = 0,
           sw = this.width / numberOfFrames,
           sh = this.height,
           dx = moveX,
           dy = moveY,
           dw = this.width / numberOfFrames,
           dh = this.height)
           
    }



    return this
           
}

////////////////




//sprite initialisation
const player1 = sprite({
    width : 896,
    height : 128,
    image : char1Stop,
    numberOfFrames : 7,
    ticksPerFrame : 1,

})






const move = () =>
{
    if (moveState == 0)
    {
        console.log('stop')
        moveX += 0
        const player1 = sprite({
            width : 896,
            height : 128,
            image : char1Stop,
            numberOfFrames : 7,
            ticksPerFrame : 1,
        })
    }
    if (moveState == 2)
    {
        console.log('right')
        moveX += 10
        const player1 = sprite({
            width : 2688,
            height : 128,
            image : char1Right,
            numberOfFrames : 21,
            ticksPerFrame : 1,
        })
        
    }
    if (moveState == 4)
    {
        console.log('left')
        moveX -= 10
        const player1 = sprite({
            width : 2688,
            height : 128,
            image : char1Left,
            numberOfFrames : 21,
            ticksPerFrame : 1,
        
        })
    }

}




const gameLoop = () =>
{
    window.requestAnimationFrame(gameLoop)
  
    player1.update()
    player1.render()
    move()
    shadow.style.transform = `translateX(${moveX+35}px)`
    console.log(moveX)
}




////////////////////////////////////////////////////
//                    Player                      //
////////////////////////////////////////////////////


// const player1 = sprite({
//     width : 2688,
//     height : 128,
//     image : char1Right,
//     numberOfFrames : 21,
//     ticksPerFrame : 1,
// })

// const player1Left = sprite({
//     width : 2688,
//     height : 128,
//     image : char1Left,
//     numberOfFrames : 21,
//     ticksPerFrame : 1,

// })

// const player1Stop = sprite({
//     width : 896,
//     height : 128,
//     image : char1Stop,
//     numberOfFrames : 7,
//     ticksPerFrame : 1,

// })





////////////////////////////////////////////////////
//                    controls                    //
////////////////////////////////////////////////////


    document.addEventListener('keydown', (event) => {
        if (event.keyCode == up){
            moveState = 1
        }
        if (event.keyCode == right){
            moveState = 2
        }
        if (event.keyCode == down){
            moveState = 3
        }
        if (event.keyCode == left){
            moveState = 4
        }
    })

    document.addEventListener('keyup', (event) => {
        if (event.keyCode == up){
            moveState = 0
        }
        if (event.keyCode == right){
            moveState = 0
        }
        if (event.keyCode == down){
            moveState = 0
        }
        if (event.keyCode == left){
            moveState = 0
        }
       
    })

    // moveX  =  0.5 + 0.5 * Math.sin((x - 0.5) * Math.PI)

    

    


// Start the game loop as soon as the sprite sheet is loaded
// char1.addEventListener("load", gameLoop)
window.addEventListener('load', gameLoop)