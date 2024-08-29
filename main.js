const c = math.complex(-0.5, 0.5)
const divN = 1500
const threshold = 50

function draw() {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
   
    // a + bi
    for (let i = 0; i < window.innerWidth; i++) {
        for (let j = 0; j < window.innerHeight; j++) {
            var a = i/divN
            var b = j/divN
            var mandleBrotVal = getMandlebrotVal(a, b)
            if (mandleBrotVal == 0) {
                ctx.fillStyle = `white`
            } else {
                ctx.fillStyle = `hsl(
                    ${360/threshold * mandleBrotVal}
                    100%
                    30%
                )`
            }
            ctx.fillRect(i,j,1,1);
        } 
    }

}

window.addEventListener('load', function() {
    console.log('All assets are loaded, drawing')
    draw()
})

window.addEventListener("resize", function() {
    draw()
})

function getMandlebrotVal(a, b) {
    var cmplexN = math.complex(a, b)
    for (let i = 0; i < threshold; i++) {
        cmplexN = math.add(math.multiply(cmplexN, cmplexN), c)
        if (Math.abs(cmplexN.re > 2) || Math.abs(cmplexN.im > 2)) {
            return i
        }
    }
    return 0
}  