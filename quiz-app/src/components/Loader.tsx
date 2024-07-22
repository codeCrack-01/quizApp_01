import React, { useEffect, useRef } from 'react';
import './static/Loading.css'

interface PropItems {
    nextQ: any,
    q_id: number,
    changeState: any
}
enum CheckResponse {
    CORRECT,
    WRONG,
    UNDEFINED
}

const LoaderComponent: React.FC<PropItems> = ({nextQ, q_id, changeState }) => {

    const loaderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleAnimationEnd = () => {
            console.log('Animation ended');
            // Call your function here
            myFunction();
        };

        const loader = loaderRef.current;
        if (loader) {
            loader.addEventListener('animationend', handleAnimationEnd);
        }

        // Clean up the event listener
        return () => {
            if (loader) {
                loader.removeEventListener('animationend', handleAnimationEnd);
            }
        };
    }, []);

    const myFunction = () => {
        // Your function logic here
        changeState(CheckResponse.UNDEFINED)
        nextQ(q_id + 1)
    };

    return (
        <div className="LoaderContainer">
            <div className="LoaderShadow"></div>
            <div className="Loader" ref={loaderRef}></div>
        </div>
    );
};

export default LoaderComponent;
