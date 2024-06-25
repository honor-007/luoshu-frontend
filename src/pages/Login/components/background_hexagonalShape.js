import React, {useEffect, useRef} from "react";


function BackgroundHexagonalShape() {
    const canvasRef = useRef(null);


    useEffect(() => {
        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

        let c = canvasRef.current;
        let w = c.width = window.innerWidth;
        let h = c.height = window.innerHeight;
        let ctx = c.getContext("2d");

        let maxParticles = 30;
        let particles = [];
        let hue = 183;

        let mouse = {};
        mouse.size = 200;
        mouse.x = mouse.tx = w / 2;
        mouse.y = mouse.ty = h / 2;

        let clearColor = "rgba(0, 0, 0, .2)";

        function random(min, max) {
            return Math.random() * (max - min) + min
        }

        function distance(x1, y1, x2, y2) {
            return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        }

        function P() {
        }

        P.prototype = {
            init: function () {
                this.size = this.origSize = random(10, 100);
                this.x = random(0, w);
                this.y = Math.random() > .5 ? -this.size : h + this.size;
                this.speed = this.origSpeed = random(.01, .03);
            },

            draw: function () {
                this.distanceFromMouse = distance(this.x, this.y, mouse.x, mouse.y);
                ctx.strokeStyle = "hsla(" + hue + ", 90%, 50%, 1)";
                ctx.shadowColor = "hsla(" + hue + ", 100%, 55%, 1)";
                ctx.shadowBlur = this.size * 2;
                ctx.beginPath();
                ctx.moveTo(this.x + this.size * Math.cos(0), this.y + this.size * Math.sin(0));

                for (var i = 0; i < 6; i++) {
                    ctx.lineTo(this.x + this.size * Math.cos(i * 2 * Math.PI / 6), this.y + this.size * Math.sin(i * 2 * Math.PI / 6));
                }

                ctx.closePath();
                ctx.lineWidth = 3;
                ctx.stroke();
                this.update();
            },

            update: function () {
                if (this.distanceFromMouse > 20) {
                    this.x += (mouse.x - this.x) * this.speed;
                    this.y += (mouse.y - this.y) * this.speed;
                    if (this.distanceFromMouse < mouse.size) {
                        this.size += (0 - this.size) * this.speed;
                        this.speed += .01;
                    } else {
                        this.size += (this.origSize - this.size) * this.speed;
                    }
                } else {
                    this.init();
                }
            }
        }


        mouse.move = function () {
            if (!distance(mouse.x, mouse.y, mouse.tx, mouse.ty) <= .1) {
                mouse.x += (mouse.tx - mouse.x) * .2;
                mouse.y += (mouse.ty - mouse.y) * .2;
            }
        };

        mouse.touches = function (e) {
            let touches = e.touches;
            if (touches) {
                mouse.tx = touches[0].clientX;
                mouse.ty = touches[0].clientY;
            } else {
                mouse.tx = e.clientX;
                mouse.ty = e.clientY;
            }
            e.preventDefault();
        };

        mouse.mouseleave = function (e) {
            mouse.tx = w / 2;
            mouse.ty = h / 2;
        };

        window.addEventListener("mousemove", mouse.touches);
        window.addEventListener("touchstart", mouse.touches);
        window.addEventListener("touchmove", mouse.touches)

        c.addEventListener("mouseleave", mouse.mouseleave)

        window.addEventListener("resize", function () {
            w = c.width = window.innerWidth;
            h = c.height = window.innerHeight;
        });

        for (let i = 1; i <= maxParticles; i++) {
            setTimeout(function () {
                let p = new P();
                p.init();
                particles.push(p);
            }, i * 50);
        }


        function anim() {
            ctx.fillStyle = clearColor;
            ctx.shadowColor = clearColor;
            ctx.shadowBlur = 0;
            ctx.globalCompositeOperation = "source-over";
            ctx.fillRect(0, 0, w, h);
            mouse.move();

            for (let i in particles) {
                if (particles.hasOwnProperty(i)) {
                    let p = particles[i];
                    p.draw();
                }
            }
            hue++;
            requestAnimationFrame(anim);
        }

        anim();
    }, [])


    return (
        <canvas ref={canvasRef}/>
    );
}

export default BackgroundHexagonalShape;