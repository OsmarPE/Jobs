import { jobsApi } from '@/app/services/api';
import React, { useState, useRef, useEffect } from 'react';

export default function PriceRangeSlider({handleChangeRange}:{handleChangeRange?: (min: number, max: number) => void}) {
    const [range, setRange] = useState([0, 20000]);
    const [isDragging, setIsDragging] = useState<(null | number)>(null);
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const [values, setValues] = useState<{ min: number; max: number }>({ min: 0, max: 20000 });
    const time = useRef<NodeJS.Timeout | null>(null);
  
    const { min, max } = values;
    
    interface MouseEventHandler {
        (index: number, e: React.MouseEvent): void;
    }

    interface MouseMoveHandler {
        (e: MouseEvent): void;
    }

    const getPercentage = (value: number): number => ((value - min) / (max - min)) * 100;

    const handleMouseDown: MouseEventHandler = (index, e) => {
        e.preventDefault();
        setIsDragging(index);
    };

    const handleMouseMove: MouseMoveHandler = (e) => {
        if (isDragging === null || !sliderRef.current) return;

        const rect = sliderRef.current.getBoundingClientRect();
        const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        const value = Math.round(min + (percentage / 100) * (max - min));

        const newRange = [...range];
        newRange[isDragging] = value;

        // Asegurar que los valores no se crucen
        if (isDragging === 0 && value > range[1]) {
            newRange[1] = value;
        } else if (isDragging === 1 && value < range[0]) {
            newRange[0] = value;
        }

        if (time.current) {
            clearTimeout(time.current);
        }
        time.current = setTimeout(() => {
            handleChangeRange?.(newRange[0], newRange[1]);
        }, 300);
        setRange(newRange);
    };

    const handleMouseUp = () => {
        setIsDragging(null);
    };

    useEffect(() => {
        if (isDragging !== null) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, range]);

    useEffect(() => {
        jobsApi.getJobSalaryRange().then(({ data, success }) => {
            if (success) {
                console.log(data);
                
                setRange([0, data.max]);
                setValues({ min: 0, max: data.max });
            }     
        });
        
    }, []);
    

    const formatPrice = (price: number) => `$${price}`;

    return (
        <div className='grid gap-4'>

            <div className="relative ">
                {/* Histograma de fondo */}


                {/* Slider track */}
                <div
                    ref={sliderRef}
                    className="absolute  left-0 right-0 h-1 bg-white/15 rounded-full cursor-pointer"
                >
                    {/* Rango seleccionado */}
                    <div
                        className="absolute h-full bg-primary rounded-full"
                        style={{
                            left: `${getPercentage(range[0])}%`,
                            width: `${getPercentage(range[1]) - getPercentage(range[0])}%`
                        }}
                    />

                    {/* Handle izquierdo */}
                    <div
                        className="absolute size-4 bg-primary  rounded-full cursor-grab active:cursor-grabbing transform -translate-y-1/2 -translate-x-1/2 shadow-lg"
                        style={{ left: `${getPercentage(range[0])}%`, top: '50%' }}
                        onMouseDown={(e) => handleMouseDown(0, e)}
                    />

                    {/* Handle derecho */}
                    <div
                        className="absolute size-4 bg-primary  rounded-full cursor-grab active:cursor-grabbing transform -translate-y-1/2 -translate-x-1/2 shadow-lg"
                        style={{ left: `${getPercentage(range[1])}%`, top: '50%' }}
                        onMouseDown={(e) => handleMouseDown(1, e)}
                    />

                    {/* Tooltip izquierdo */}
                    <div
                        className="absolute transform -translate-x-1/2 -translate-y-full mb-3"
                        style={{ left: `${getPercentage(range[0])}%`, top: '0%' }}
                    >

                    </div>

                    {/* Tooltip derecho */}
                    <div
                        className="absolute transform -translate-x-1/2 -translate-y-full mb-3"
                        style={{ left: `${getPercentage(range[1])}%`, top: '0%' }}
                    >
                    </div>
                </div>
            </div>
            <div className="price-labels">
                <span className="price-label" id="min-price">{formatPrice(range[0])}</span>
                <span className="price-label" id="max-price">{formatPrice(range[1])}</span>
            </div>

        </div>
    );
}