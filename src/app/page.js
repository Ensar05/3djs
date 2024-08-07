"use client";
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as svgNodes from './svgNodes';

export default function Home() {
  const [isVisible, setIsVisible] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isFunctionsDropdownOpen, setIsFunctionsDropdownOpen] = useState(false);
  const canvasRef = useRef(null);
  const svgContainerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const gridSize = 20;

    const drawGrid = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = darkMode ? '#555' : '#ddd';
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.strokeRect(x, y, gridSize, gridSize);
        }
      }

      d3.select(svgContainerRef.current)
        .attr("width", canvas.offsetWidth)
        .attr("height", canvas.offsetHeight);
    };

    drawGrid();
    window.addEventListener('resize', drawGrid);

    return () => {
      window.removeEventListener('resize', drawGrid);
    };
  }, [darkMode]);

  const toggleDarkmode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  const toggleAllgemeinDropdown = () => {
    setIsVisible(!isVisible);
  };

  const toggleFunctionsDropdown = () => {
    setIsFunctionsDropdownOpen(!isFunctionsDropdownOpen);
  };

  const createStartSVG = () => svgNodes.createSVG(d3.select(svgContainerRef.current), canvasRef.current.offsetWidth, canvasRef.current.offsetHeight, "Start", "#3b82f6", darkMode);
  const createFunctionSVG = () => svgNodes.createSVG(d3.select(svgContainerRef.current), canvasRef.current.offsetWidth, canvasRef.current.offsetHeight, "Function", "#475569", darkMode);
  const createSwitchSVG = () => svgNodes.createSVG(d3.select(svgContainerRef.current), canvasRef.current.offsetWidth, canvasRef.current.offsetHeight, "Switch", "#16a34a", darkMode);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-y-hidden">
      <div className="flex w-full h-full text-sm">
        <div className="menuDiv flex flex-col items-start min-h-screen w-60 p-2 color dark:bg-zinc-900 dark:text-white dark:border-zinc-800 select-none">
          <input type="text" placeholder="Nodes suchen.." />
          <button onClick={toggleAllgemeinDropdown} className="block text-lg font-bold my-1">Allgemein
            <i className="fa-solid fa-caret-down"></i>
          </button>
          {isVisible && (
            <div className="nodeDropdown">
              <button onClick={createStartSVG} className="block bg-blue-500 text-white px-4 py-2 rounded mb-2">
                Start
              </button>
              <button onClick={createFunctionSVG} className="block bg-slate-500 text-white px-4 py-2 rounded mb-2">
                Function
              </button>
              <button onClick={createSwitchSVG} className="block bg-green-600 text-white px-4 py-2 rounded mb-2">
                Switch
              </button>
            </div>
          )}
          <button onClick={toggleFunctionsDropdown} className="block text-lg font-bold my-1">
            Funktionen
            <i className={`fa-solid fa-caret-${isFunctionsDropdownOpen ? 'up' : 'down'}`}></i>
          </button>
          {isFunctionsDropdownOpen && (
            <div className="nodeDropdown">
              <button onClick={createFunctionSVG} className="block bg-slate-500 text-white px-4 py-2 rounded mb-2">
                Function
              </button>
              <button onClick={createSwitchSVG} className="block bg-green-600 text-white px-4 py-2 rounded mb-2">
                Switch
              </button>
            </div>
          )}
          <button className="block text-lg font-bold my-1">Anderes</button>
          <label className="mt-auto flex">
            <input type="checkbox" className="sr-only peer" onChange={toggleDarkmode} />
            <p>{darkMode ? 'Lichtmodus aktivieren' : 'Dunkelmodus aktivieren'}</p>
            <div className="relative ml-1 w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="slider round"></span>
          </label>
        </div>
        <div id="deletebar" className='flex items-center color dark:bg-zinc-900'>
          <img id="test" className='opacity-0 transition-opacity duration-300 select-none' src='././icons/bin.png'/>
        </div>
        <div className="flex-1 relative flex select-none">
          <canvas ref={canvasRef} className="w-full h-full dark:bg-zinc-900 z-0"></canvas>
          <button className="absolute bottom-0 z-50 text-white px-4 py-2" onClick={svgNodes.clearAllNodes}>
          <img src="././icons/edit.png"/>
          </button>
          <svg ref={svgContainerRef} id="svg-container" className="absolute inset-0 flex items-center"></svg>
        </div>
      </div>
    </main>
  );
}
