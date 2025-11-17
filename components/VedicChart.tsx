import React from 'react'

interface Planet {
  name: string
  house: number
}

interface VedicChartProps {
  planets?: Planet[]
  showLabels?: boolean
  size?: number
  crossHouses?: number[]
  checkHouses?: number[]
  houseNumbers?: { [house: number]: number }
}

export default function VedicChart({ 
  planets = [], 
  showLabels = false,
  size = 300,
  crossHouses = [],
  checkHouses = [],
  houseNumbers = {}
}: VedicChartProps) {
  const viewBoxSize = size
  const squareSize = size * 0.67 // 200 in 300 viewBox
  const center = squareSize / 2 // 100 in 300 viewBox
  const midpoint = squareSize / 4 // 50 in 300 viewBox
  
  // House definitions based on learned structure
  const houses = [
    { points: `${center},${center} ${center+midpoint},${center-midpoint} ${center},0 ${center-midpoint},${center-midpoint}`, label: "1", center: { x: center, y: center * 0.4 } },
    { points: `0,0 ${center-midpoint},${center-midpoint} ${center},0`, label: "2", center: { x: center * 0.5, y: center * 0.2 } },
    { points: `0,0 ${center-midpoint},${center-midpoint} 0,${center}`, label: "3", center: { x: center * 0.15, y: center * 0.5 } },
    { points: `0,${center} ${center-midpoint},${center-midpoint} ${center},${center} ${center-midpoint},${center+midpoint}`, label: "4", center: { x: center * 0.5, y: center } },
    { points: `0,${center} ${center-midpoint},${center+midpoint} 0,${squareSize}`, label: "5", center: { x: center * 0.15, y: center * 1.5 } },
    { points: `0,${squareSize} ${center-midpoint},${center+midpoint} ${center},${squareSize}`, label: "6", center: { x: center * 0.5, y: center * 1.8 } },
    { points: `${center-midpoint},${center+midpoint} ${center},${center} ${center+midpoint},${center+midpoint} ${center},${squareSize}`, label: "7", center: { x: center, y: center * 1.5 } },
    { points: `${center},${squareSize} ${center+midpoint},${center+midpoint} ${squareSize},${squareSize}`, label: "8", center: { x: center * 1.5, y: center * 1.8 } },
    { points: `${squareSize},${squareSize} ${center+midpoint},${center+midpoint} ${squareSize},${center}`, label: "9", center: { x: center * 1.85, y: center * 1.5 } },
    { points: `${squareSize},${center} ${center+midpoint},${center+midpoint} ${center},${center} ${center+midpoint},${center-midpoint}`, label: "10", center: { x: center * 1.5, y: center } },
    { points: `${squareSize},${center} ${center+midpoint},${center-midpoint} ${squareSize},0`, label: "11", center: { x: center * 1.85, y: center * 0.5 } },
    { points: `${squareSize},0 ${center+midpoint},${center-midpoint} ${center},0`, label: "12", center: { x: center * 1.5, y: center * 0.2 } },
  ]

  const planetSymbols: { [key: string]: string } = {
    'Sun': 'Su',
    'Moon': 'Mo',
    'Mars': 'Ma',
    'Mercury': 'Me',
    'Jupiter': 'Ju',
    'Venus': 'Ve',
    'Saturn': 'Sa',
    'Rahu': 'Ra',
    'Ketu': 'Ke',
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <svg 
        width={viewBoxSize} 
        height={viewBoxSize} 
        viewBox={`-50 -50 ${viewBoxSize + 100} ${viewBoxSize + 100}`}
        style={{ maxWidth: '100%', height: 'auto' }}
      >
      {/* Draw houses */}
      {houses.map((house, index) => (
        <g key={index}>
          <polygon
            points={house.points}
            fill="none"
          />
          {showLabels && (
            <text
              x={house.center.x}
              y={house.center.y}
              fontSize="12"
              textAnchor="middle"
              fill="darkblue"
            >
              Bhava {house.label}
            </text>
          )}
        </g>
      ))}

      {/* Draw outer square */}
      <rect
        x="0"
        y="0"
        width={squareSize}
        height={squareSize}
        stroke="black"
        fill="none"
        strokeWidth="2"
      />

      {/* Draw diagonals */}
      <line
        x1="0"
        y1={squareSize}
        x2={squareSize}
        y2="0"
        stroke="black"
        strokeWidth="1.5"
      />
      <line
        x1={squareSize}
        y1={squareSize}
        x2="0"
        y2="0"
        stroke="black"
        strokeWidth="1.5"
      />

      {/* Draw inner square (midpoint connections) */}
      <line
        x1={center}
        y1={squareSize}
        x2={squareSize}
        y2={center}
        stroke="black"
        strokeWidth="1.5"
      />
      <line
        x1={squareSize}
        y1={center}
        x2={center}
        y2="0"
        stroke="black"
        strokeWidth="1.5"
      />
      <line
        x1={center}
        y1="0"
        x2="0"
        y2={center}
        stroke="black"
        strokeWidth="1.5"
      />
      <line
        x1="0"
        y1={center}
        x2={center}
        y2={squareSize}
        stroke="black"
        strokeWidth="1.5"
      />

      {/* Draw planets */}
      {planets.map((planet, index) => {
        const houseIndex = planet.house - 1
        const houseCenter = houses[houseIndex]?.center
        if (!houseCenter) return null

        return (
          <text
            key={`planet-${index}`}
            x={houseCenter.x}
            y={houseCenter.y + (showLabels ? 15 : 0) - (houseNumbers[planet.house] ? 8 : 0)}
            fontSize="16"
            fontWeight="bold"
            textAnchor="middle"
            fill="darkblue"
          >
            {planetSymbols[planet.name] || planet.name}
          </text>
        )
      })}

      {/* Draw numbers in houses */}
      {Object.entries(houseNumbers).map(([houseStr, number]) => {
        const houseNum = parseInt(houseStr)
        const houseIndex = houseNum - 1
        const houseCenter = houses[houseIndex]?.center
        if (!houseCenter) return null

        const hasPlanet = planets.some(p => p.house === houseNum)
        return (
          <text
            key={`number-${houseNum}`}
            x={houseCenter.x}
            y={houseCenter.y + (showLabels ? 15 : 0) + (hasPlanet ? 8 : 0)}
            fontSize="14"
            fontWeight="bold"
            textAnchor="middle"
            fill="darkblue"
          >
            {number}
          </text>
        )
      })}

      {/* Draw crosses in specified houses */}
      {crossHouses.map((houseNum) => {
        const houseIndex = houseNum - 1
        const houseCenter = houses[houseIndex]?.center
        if (!houseCenter) return null

        const crossSize = 8
        return (
          <g key={`cross-${houseNum}`}>
            <line
              x1={houseCenter.x - crossSize}
              y1={houseCenter.y - crossSize}
              x2={houseCenter.x + crossSize}
              y2={houseCenter.y + crossSize}
              stroke="black"
              strokeWidth="2"
            />
            <line
              x1={houseCenter.x - crossSize}
              y1={houseCenter.y + crossSize}
              x2={houseCenter.x + crossSize}
              y2={houseCenter.y - crossSize}
              stroke="black"
              strokeWidth="2"
            />
          </g>
        )
      })}

      {/* Draw check marks in specified houses */}
      {checkHouses.map((houseNum) => {
        const houseIndex = houseNum - 1
        const houseCenter = houses[houseIndex]?.center
        if (!houseCenter) return null

        const checkSize = 8
        return (
          <g key={`check-${houseNum}`}>
            <path
              d={`M ${houseCenter.x - checkSize} ${houseCenter.y} L ${houseCenter.x - checkSize * 0.3} ${houseCenter.y + checkSize * 0.7} L ${houseCenter.x + checkSize} ${houseCenter.y - checkSize * 0.7}`}
              stroke="black"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )
      })}
      </svg>
    </div>
  )
}

