"use client"
import React, { useEffect, useRef, useState, useCallback } from 'react'
import '../styles/globals.css'

const poorIcons = [
  `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M467.683,215.354c0,0-9.061-13.494-21.09-27.673C359.507,84.936,234.247,15.521,92.922,1.583 C75.595-0.132,61.159,0.025,61.159,0.025C55.713-0.248,50.384,1.73,46.426,5.494c-3.942,3.763-6.185,8.991-6.185,14.445v29.495 v119.877v320.654c0,8.164,4.519,15.66,11.733,19.477c7.214,3.817,15.955,3.334,22.702-1.255l265.121-180.403l101.981-69.393 l21.253-14.468c4.535-3.077,7.588-7.876,8.469-13.283C472.38,225.233,470.994,219.71,467.683,215.354z M100.051,231.778 c0-19.936,16.166-36.095,36.094-36.095c19.944,0,36.103,16.158,36.103,36.095s-16.158,36.102-36.103,36.102 C116.217,267.88,100.051,251.714,100.051,231.778z M174.103,377.099c-12.271,0-22.22-9.949-22.22-22.212 c0-12.27,9.949-22.219,22.22-22.219c12.262,0,22.211,9.948,22.211,22.219C196.313,367.15,186.365,377.099,174.103,377.099z M222.903,307.348l-6.451-23.185l60.636-16.875l6.459,23.185L222.903,307.348z M348.834,272.375 c-67.515-80.33-163.592-131.166-267.863-141.738V41.41c133.487,11.11,256.784,76.428,341.44,180.894L348.834,272.375z"/></svg>`,
  `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#FFFFFF" d="M21.601,8.071C21.38,6.992,21.095,5.665,20.72,4h-2.051c1.434,6.318,1.664,8.149,1.664,8.667 C20.333,15.056,18.39,17,16,17s-4.333-1.944-4.333-4.333c0-0.517,0.23-2.349,1.664-8.667H11.28c-0.374,1.66-0.658,2.984-0.879,4.061 C7.929,8.361,6,10.448,6,13c0,2.757,2.243,5,5,5c0.458,0,0.897-0.072,1.318-0.191C13.357,18.555,14.626,19,16,19 c1.372,0,2.64-0.443,3.679-1.188C20.099,17.932,20.541,18,21,18c2.757,0,5-2.243,5-5C26,10.45,24.071,8.372,21.601,8.071z M8,13 c0-1.3,0.832-2.396,1.988-2.813c-0.317,1.762-0.321,2.251-0.321,2.479c0,1.207,0.345,2.332,0.934,3.293C9.135,15.763,8,14.52,8,13z M21.399,15.96c0.588-0.961,0.934-2.086,0.934-3.293c0-0.227-0.004-0.716-0.32-2.471C23.169,10.61,24,11.701,24,13 C24,14.52,22.865,15.763,21.399,15.96z M12,20c0,2.763-2,2.97-2,4.795c0,1.47,1.086,1.682,1.704,3.205H9.365 C8.545,27,8,26.285,8,24.795c0-2.764,2-2.968,2-4.795H12z M24,20c0,2.763-2,2.97-2,4.795c0,1.47,1.086,1.682,1.704,3.205h-2.339 C20.545,27,20,26.285,20,24.795c0-2.764,2-2.968,2-4.795H24z M18,20c0,2.763-2,2.97-2,4.795c0,1.47,1.086,1.682,1.704,3.205h-2.339 C14.545,27,14,26.285,14,24.795c0-2.764,2-2.968,2-4.795H18z"/></svg>`,
  `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#FFFFFF" d="M317.727 108.904l-95.192 96.592-26.93 86.815 17.54 36.723 20.417 9.287 33.182-55.082 11.297-3.61 61.75 26.85 20.26-12.998 4.47-43.7 11.42 53.634-10.622 14.162 3.772 1.64 5.238 6.5 6.832 34.343 55.977-66.775 13.98.23 22.397 28.575-9.453-52.244L434.01 166.81l-116.28-57.906zM123.61 120.896L94.08 173l-4.603 27.62 25.98-8.442 11.704 7.377.084.634 28.295 59.865 13.773-4.543 10.94 4.668 3.922 8.21 19.517-62.917-1.074-33.336-40.15-.522-29.732-23.78 34.06 10.888 42.49-7.727 26.034 15.88 36.282-36.815c-2.777-1.18-5.615-2.356-8.58-3.52l-79.58 10.126-3.528-.25-56.307-15.52zm249.33 36.422l47.058 66.02 2.107 62.51-25.283-59.698-65.322-60.404 41.44-8.428zm-262.2 55.32l-64.234 20.876-16.71 78.552 50.794 5.582.596-7.14 37.662-36.707-8.108-61.16zm56.688 62.45l-36.44 12.016-31.644 30.84 22.588 30.867 57.326 1.74 16.5-16.16-28.33-59.302zm110.666 24.19l-44.307 73.546-.033 57.14 97.264 12.216 44.242-19.528-17.666-88.806-79.5-34.567zM443.8 313.36l-46.843 55.876.287 1.774 65.147 13.887 25.78-14.926-44.37-56.613zm-138.382 15.89l39.23 22.842 13.41 50.658-26.82 23.838-45.015-2.553 38.562-28.242 2.483-39.23-21.85-27.312zm-238.37 53.838l-8.77 28.51 13.152 48.498 91.037-11.91 1.32-26.418-62.582-31.995-34.156-6.684z"/></svg>`,
]

const richIcons = [
  `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 16H13C13.6667 16 15 15.6 15 14C15 12.4 13.6667 12 13 12H11C10.3333 12 9 11.6 9 10C9 8.4 10.3333 8 11 8H12M12 16H9M12 16V18M15 8H12M12 8V6M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  `<svg fill="#ffffff" viewBox="0 0 512.001 512.001" xmlns="http://www.w3.org/2000/svg"><path d="M87.772,299.886H65.829H43.886v131.657H21.943C9.826,431.544,0,441.368,0,453.486s9.826,21.943,21.943,21.943h43.886 h80.457v-21.943v-21.943V299.886H87.772z"/><path d="M490.057,431.544h-21.943V299.886h-21.943h-21.943h-58.514v131.657v21.943v21.943h80.457h43.886 c12.12,0,21.943-9.825,21.943-21.943S502.179,431.544,490.057,431.544z"/><path d="M510.11,225.145L451.596,93.487c-3.521-7.923-11.381-13.03-20.053-13.03h-65.829V58.515 c0-12.118-9.823-21.943-21.943-21.943c-12.117,0-21.943,9.825-21.943,21.943v21.943H80.457c-8.672,0-16.53,5.107-20.051,13.03 L1.892,225.145c-3.018,6.788-2.395,14.642,1.654,20.871c4.045,6.227,10.97,9.985,18.397,9.985h21.943h21.943h21.943h58.514 v-21.943c0-6.908,3.253-13.41,8.777-17.554l5.851-4.389l81.92-61.44c7.803-5.851,18.533-5.851,26.333,0l81.92,61.44l5.851,4.389 c5.525,4.144,8.777,10.647,8.777,17.554v21.943h58.514h21.943h21.943h21.943c7.428,0,14.352-3.758,18.4-9.985 C512.505,239.786,513.127,231.932,510.11,225.145z"/><path d="M307.202,234.058l-29.257-21.943L256,195.658l-21.943,16.457L204.8,234.058l-14.629,10.971v10.971v175.543v21.943v21.943 h43.886v-21.943v-21.943v-21.952c0-12.12,9.826-21.943,21.943-21.943c12.121,0,21.944,9.823,21.944,21.943v21.952v21.943v21.943 h43.886v-21.943v-21.943V256.001v-10.971L307.202,234.058z"/></svg>`,
  `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 2H3.58579C4.49129 2 5.35971 2.35971 6 3C6.64029 3.64029 7 4.50871 7 5.41421V11H9V5.41421C9 4.50871 9.35971 3.64029 10 3C10.6403 2.35971 11.5087 2 12.4142 2H16V13H11L9 15H7L5 13H0V2Z" fill="#ffffff"/></svg>`,
]

const SHIFT = 0.20
const SPACING = 120
const TILT_OFFSET = 0

type ShiftState = 'center' | 'shift-right' | 'shift-left'

function lineDecimal(state: ShiftState): number {
  if (state === 'shift-right') return 0.5 + SHIFT
  if (state === 'shift-left') return 0.5 - SHIFT
  return 0.5
}

function generateIcons(container: HTMLDivElement, icons: string[]) {
  container.innerHTML = ''
  const vw = window.innerWidth + 800
  const vh = window.innerHeight * 5 + 600
  const cols = Math.ceil(vw / SPACING) + 12
  const rows = Math.ceil(vh / SPACING) + 8
  const startX = -SPACING * 6
  let n = 0
  for (let row = -2; row < rows; row++) {
    for (let col = -4; col < cols; col++) {
      const wrap = document.createElement('div')
      wrap.innerHTML = icons[n % icons.length]
      const svg = wrap.firstElementChild as SVGElement | null
      if (!svg) continue
      const x = startX + col * SPACING - row * TILT_OFFSET
      const y = row * SPACING
      svg.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:48px;height:48px;`
      container.appendChild(svg)
      n++
    }
  }
}

export default function VisualStage() {
  const poorRef = useRef<HTMLDivElement>(null)
  const richRef = useRef<HTMLDivElement>(null)
  const [shiftState, setShiftState] = useState<ShiftState>('center')
  const [headerH, setHeaderH] = useState(0)
  const ld = lineDecimal(shiftState)

  useEffect(() => {
    const measure = () => {
      const h = document.querySelector('header')?.getBoundingClientRect().height ?? 0
      setHeaderH(h)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const regenerate = useCallback(() => {
    if (poorRef.current) generateIcons(poorRef.current, poorIcons)
    if (richRef.current) generateIcons(richRef.current, richIcons)
  }, [])

  useEffect(() => {
    regenerate()
    window.addEventListener('resize', regenerate)
    return () => window.removeEventListener('resize', regenerate)
  }, [regenerate])

  function handleLeftClick() {
    setShiftState(prev => {
      if (prev === 'center') return 'shift-right'
      if (prev === 'shift-left') return 'center'
      return prev
    })
  }

  function handleRightClick() {
    setShiftState(prev => {
      if (prev === 'center') return 'shift-left'
      if (prev === 'shift-right') return 'center'
      return prev
    })
  }

  const ldPct = `${ld * 100}%`
  const clipTransition = 'clip-path 0.5s ease'

  return (
    <div style={{ position: 'relative', minHeight: '500vh' }}>
      {/* Poor icons — absolute, full width, clipped to LEFT of dividing line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '500vh',
          overflow: 'hidden',
          opacity: 0.15,
          zIndex: 0,
          pointerEvents: 'none',
          clipPath: `inset(0 ${(1 - ld) * 100}% 0 0)`,
          transition: clipTransition,
        }}
      >
        <div ref={poorRef} className="icon-inner" />
      </div>

      {/* Rich icons — absolute, full width, clipped to RIGHT of dividing line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '500vh',
          overflow: 'hidden',
          opacity: 0.15,
          zIndex: 0,
          pointerEvents: 'none',
          clipPath: `inset(0 0 0 ${ld * 100}%)`,
          transition: clipTransition,
        }}
      >
        <div ref={richRef} className="icon-inner" />
      </div>

      {/* Dashed dividing line — absolute, starts below header, extends through full scroll space */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          height: '500vh',
          left: ldPct,
          transform: 'translateX(-50%)',
          width: 4,
          borderLeft: '4px dashed #fff',
          zIndex: 100,
          pointerEvents: 'none',
          transition: 'left 0.5s ease',
        }}
      />

      {/* Left click zone — fixed, shift right or return from left */}
      <div
        onClick={handleLeftClick}
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          width: ldPct,
          zIndex: 200,
          cursor: shiftState === 'shift-right' ? 'default' : 'pointer',
          pointerEvents: shiftState === 'shift-right' ? 'none' : 'auto',
          transition: 'left 0.5s ease, width 0.5s ease',
        }}
      />

      {/* Right click zone — fixed, shift left or return from right */}
      <div
        onClick={handleRightClick}
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: ldPct,
          width: `${(1 - ld) * 100}%`,
          zIndex: 200,
          cursor: shiftState === 'shift-left' ? 'default' : 'pointer',
          pointerEvents: shiftState === 'shift-left' ? 'none' : 'auto',
          transition: 'left 0.5s ease, width 0.5s ease',
        }}
      />

      {/* Stage — only the scrollable content shifts */}
      <div className={`stage${shiftState !== 'center' ? ' ' + shiftState : ''}`}>
        <div className="content-wrapper">
          <main>
            <section className="content">
              <div className="container">
                <div className="image-gallery">

                  <div className="image-section">
                    <div className="text-blocks left-text">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <img src="/Poster Line.png" alt="Poster Line" />
                    <div className="text-blocks right-text">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                    </div>
                  </div>

                  <div className="image-section">
                    <div className="text-blocks left-text">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <img src="/Window Line.png" alt="Window Line" />
                    <div className="text-blocks right-text">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                    </div>
                  </div>

                  <div className="image-section">
                    <div className="text-blocks left-text">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <img src="/Pillar Line.png" alt="Pillar Line" />
                    <div className="text-blocks right-text">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                    </div>
                  </div>

                  <div className="image-section">
                    <div className="text-blocks left-text">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <img src="/Breaking 180 Scene.gif" alt="Breaking 180 Scene" />
                    <div className="text-blocks right-text">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                    </div>
                  </div>

                  <div className="image-section">
                    <div className="text-blocks left-text">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <img src="/Staircase.png" alt="Staircase" />
                    <div className="text-blocks right-text">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
