import './background_particle.less';
import Particles from 'particlesjs'
import {useEffect} from "react";

function BackgroundParticle() {
    useEffect(()=>{
        window.onload = function() {
            Particles.init({
                selector: '.background'
            });
        };

        const particles = Particles.init({
            selector: ".background",
            color: ["#03dac6", "#ff0266", "#000000"],
            connectParticles: true,
            responsive: [
                {
                    breakpoint: 768,
                    options: {
                        color: ["#faebd7", "#03dac6", "#ff0266"],
                        maxParticles: 43,
                        connectParticles: false
                    }
                }
            ]
        });
    },[])

    return (
        <canvas className="background" ></canvas>
    );
}

export default BackgroundParticle;
