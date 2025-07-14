import React, { useEffect, useRef } from 'react';
import styles from '../Styles/GalaxyBackground.module.css'; // Corrected path based on your folder structure

const GalaxyBackground = () => {
    const galaxyRef = useRef(null); // Ref to the div element

    useEffect(() => {
        const galaxy = galaxyRef.current;
        if (!galaxy) return; // Ensure the element is mounted

        // Clear any previously created stars if the component re-renders (important for dev mode)
        galaxy.innerHTML = ''; 

        const starCount = 100;
        const shootingStarCount = 5;

        // Create regular stars
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add(styles.star); // Use CSS module class
            const size = Math.random() * 3 + 1; // Random size between 1 and 4px
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.top = `${Math.random() * 100}vh`; // Random vertical position
            star.style.left = `${Math.random() * 100}vw`; // Random horizontal position
            star.style.animationDuration = `${Math.random() * 2 + 3}s`; // Random twinkle duration
            star.style.animationDelay = `${Math.random() * 5}s`; // Stagger twinkle
            galaxy.appendChild(star);
        }

        // Create shooting stars
        for (let i = 0; i < shootingStarCount; i++) {
            const shootingStar = document.createElement('div');
            shootingStar.classList.add(styles.shootingStar); // Use CSS module class
            // Start shooting stars from random top and left positions
            shootingStar.style.top = `${Math.random() * 80}vh`; // 0-80vh to ensure they fall across the screen
            shootingStar.style.left = `${Math.random() * 100}vw`; 
            shootingStar.style.animationDuration = `${Math.random() * 2 + 3}s`; // Random duration for shooting
            shootingStar.style.animationDelay = `${Math.random() * 5}s`; // Stagger their appearance
            galaxy.appendChild(shootingStar);
        }

        // Cleanup function to remove stars if component unmounts (good practice)
        return () => {
            galaxy.innerHTML = '';
        };

    }, []); // Empty dependency array means this effect runs only once after the initial render

    return (
        <div ref={galaxyRef} className={styles.galaxy}>
            {/* Stars and shooting stars will be programmatically added here */}
        </div>
    );
};

export default GalaxyBackground;