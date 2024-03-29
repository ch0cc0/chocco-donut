import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, useFBX } from "@react-three/drei";
import './home.css';
import { Container, Typography } from '@mui/material';

const Donut = () => {
    const fbx = useFBX('./donut/pink_donut.fbx')
    const donutRef = useRef();

    useFrame(() => {
        if (donutRef.current) {
            // Increase rotation angle (adjust speed as needed)
            donutRef.current.rotation.y += 0.01;
        }
    });

    return <primitive object={fbx} scale={0.37} ref={donutRef}/>
}

const Home = () => {

    return (
        <>
        <Canvas>
            <Suspense fallback={null}>
                <ambientLight intensity={0.5}/>
                <Donut />
                <OrbitControls enableZoom={false} enablePan={false}/>
                <Environment preset='sunset' />
            </Suspense>
        </Canvas>
        <Container>
            <Typography paragraph variant='h3' align='center'>
            <span style={{ color: '#e58300', fontWeight: 'bold' }}>Indulge</span> in the Delight of Freshly Baked Donuts, Delivered to Your Doorstep
            </Typography>
        </Container>
        </>
    );
};

export default Home;