import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls, useFBX } from "@react-three/drei";
import './home.css';

const Donut = () => {
    const fbx = useFBX('./donut/pink_donut.fbx')
    return <primitive object={fbx} scale={0.37}/>
}

const Home = () => {
    return (
        <Canvas>
            <Suspense fallback={null}>
                <ambientLight intensity={0.5}/>
                <Donut />
                <OrbitControls enableZoom={false}/>
                <Environment preset='sunset' />
            </Suspense>
        </Canvas>
    );
};

export default Home;