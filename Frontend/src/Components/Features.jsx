import React, { useEffect, useRef } from 'react';
import styles from '../Styles/GalaxyBackground.module.css'; 

const GalaxyBackground = () => {
    const galaxyRef = useRef(null); 

    useEffect(() => {
        const galaxy = galaxyRef.current;
        if (!galaxy) return; 

     
        galaxy.innerHTML = ''; 

        const starCount = 100;
        const shootingStarCount = 5;

      
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add(styles.star); 
            const size = Math.random() * 3 + 1; 
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.top = `${Math.random() * 100}vh`;
            star.style.left = `${Math.random() * 100}vw`;
            star.style.animationDuration = `${Math.random() * 2 + 3}s`; 
            galaxy.appendChild(star);
        }

       
        for (let i = 0; i < shootingStarCount; i++) {
            const shootingStar = document.createElement('div');
            shootingStar.classList.add(styles.shootingStar); 
            shootingStar.style.top = `${Math.random() * 100}vh`;
            shootingStar.style.left = `${Math.random() * 100}vw`; 
            shootingStar.style.animationDuration = `${Math.random() * 2 + 3}s`; 
            
            shootingStar.style.animationDelay = `${Math.random() * 5}s`; 
            galaxy.appendChild(shootingStar);
        }

        
        return () => {
            galaxy.innerHTML = ''; 
        };

    }, []); 

    return (
        <div ref={galaxyRef} className={styles.galaxy}>
            {/* Stars will be appended here by JavaScript */}
        </div>
    );
};

export default GalaxyBackground;