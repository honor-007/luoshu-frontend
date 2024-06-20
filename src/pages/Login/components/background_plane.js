import 'three'
import {useEffect, useRef} from "react";
import './background_plane.less';
import * as THREE from "three";

function BackgroundPlane() {

    const containerRef = useRef();

    const init = ()=>{
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);

        document.getElementById('stage').appendChild(renderer.domElement)


        const geometry = new THREE.BoxGeometry(1,1,1)
        const material = new THREE.MeshBasicMaterial({color:'red'})
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh);
        camera.position.z = 3
        camera.position.set(3,3,3)
        camera.lookAt(mesh.position)
    }


    useEffect(() => {
        THREE.REVISION
        // init();
    }, [])

    return (<div  id="stage" style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        overflow: 'hidden',
        background: 'red',
    }}></div>);
}

export default BackgroundPlane;
