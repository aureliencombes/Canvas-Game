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
        context.clearRect(0, 0, canvas.width, canvas.height)

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
           dh = this.height
        ) 
        
        // Draw the shadow
        context.beginPath()
        context.lineWidth="1"
        context.fillStyle = 'rgba(0, 0, 0, 0.24)'
        context.moveTo(moveX, moveY+123)
        context.ellipse(moveX+60, moveY+123, 5, 30, 90 * Math.PI/180, 0, 2 * Math.PI)
        context.fill()

        // Draw the horizontal line
        context.beginPath()
        context.moveTo(0,moveY+80)
        context.fillStyle = 'rgba(0, 0, 0, 1)'
        context.lineTo(window.innerWidth,moveY+80)
        context.stroke()
        context.fill()
    }

    return this   

}


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
            ticksPerFrame : 2,
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
    
}





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


    

    


// Start the game loop as soon as the sprite sheet is loaded
window.addEventListener('load', gameLoop)