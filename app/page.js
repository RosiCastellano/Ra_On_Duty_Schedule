'use client'
import { useState } from 'react'

// 9-RA Schedule (2 RAs per night)
const schedule9RA = {
  week1: [
    { day: 1, ras: ['A', 'B'] },
    { day: 2, ras: ['C', 'D'] },
    { day: 3, ras: ['E', 'F'] },
    { day: 4, ras: ['G', 'H'] },
    { day: 5, ras: ['I', 'A'] },
    { day: 6, ras: ['B', 'C'] },
    { day: 7, ras: ['D', 'E'] },
  ],
  week2: [
    { day: 8, ras: ['F', 'G'] },
    { day: 9, ras: ['H', 'I'] },
    { day: 10, ras: ['A', 'B'] },
    { day: 11, ras: ['C', 'D'] },
    { day: 12, ras: ['E', 'F'] },
    { day: 13, ras: ['G', 'H'] },
    { day: 14, ras: ['I', 'A'] },
  ],
  week3: [
    { day: 15, ras: ['B', 'C'] },
    { day: 16, ras: ['D', 'E'] },
    { day: 17, ras: ['F', 'G'] },
    { day: 18, ras: ['H', 'I'] },
    { day: 19, ras: ['A', 'B'] },
    { day: 20, ras: ['C', 'D'] },
    { day: 21, ras: ['E', 'F'] },
  ],
  week4: [
    { day: 22, ras: ['G', 'H'] },
    { day: 23, ras: ['I', 'A'] },
    { day: 24, ras: ['B', 'C'] },
    { day: 25, ras: ['D', 'E'] },
    { day: 26, ras: ['F', 'G'] },
    { day: 27, ras: ['H', 'I'] },
    { day: 28, ras: ['A', 'B'] },
  ],
  final: [
    { day: 29, ras: ['C', 'D'] },
    { day: 30, ras: ['E', 'F'] },
    { day: 31, ras: ['G', 'H'] },
  ],
}

// 3-Person Schedule (1 RA per night)
const schedule3RA = {
  week1: [
    { day: 1, ras: ['A'] },
    { day: 2, ras: ['B'] },
    { day: 3, ras: ['C'] },
    { day: 4, ras: ['A'] },
    { day: 5, ras: ['B'] },
    { day: 6, ras: ['C'] },
    { day: 7, ras: ['A'] },
  ],
  week2: [
    { day: 8, ras: ['B'] },
    { day: 9, ras: ['C'] },
    { day: 10, ras: ['A'] },
    { day: 11, ras: ['B'] },
    { day: 12, ras: ['C'] },
    { day: 13, ras: ['A'] },
    { day: 14, ras: ['B'] },
  ],
  week3: [
    { day: 15, ras: ['C'] },
    { day: 16, ras: ['A'] },
    { day: 17, ras: ['B'] },
    { day: 18, ras: ['C'] },
    { day: 19, ras: ['A'] },
    { day: 20, ras: ['B'] },
    { day: 21, ras: ['C'] },
  ],
  week4: [
    { day: 22, ras: ['A'] },
    { day: 23, ras: ['B'] },
    { day: 24, ras: ['C'] },
    { day: 25, ras: ['A'] },
    { day: 26, ras: ['B'] },
    { day: 27, ras: ['C'] },
    { day: 28, ras: ['A'] },
  ],
  final: [
    { day: 29, ras: ['B'] },
    { day: 30, ras: ['C'] },
    { day: 31, ras: ['A'] },
  ],
}

const getOrdinal = (n) => {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

function DayCard({ day, ras, small = false }) {
  return (
    <div className={`bg-trent-green rounded-lg flex flex-col items-center ${small ? 'p-2 sm:p-3' : 'p-3 sm:p-4'}`}>
      <span className="text-trent-light text-xs">DAY</span>
      <span className={`text-white font-bold ${small ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'}`}>{day}</span>
      <span className="text-trent-light text-xs mb-2">{getOrdinal(day)}</span>
      <div className="w-full h-px bg-green-700 mb-2"></div>
      <div className="flex gap-1">
        {ras.map((ra, i) => (
          <span key={i} className={`text-white font-bold ${small ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'}`}>{ra}</span>
        ))}
      </div>
    </div>
  )
}

function WeekSection({ title, subtitle, days, hours9RA, hours3RA, is3Person }) {
  const hours = is3Person ? hours3RA : hours9RA
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-trent-green">{title}</h2>
        <span className="text-gray-500 text-sm">{subtitle}</span>
      </div>
      <div className="grid grid-cols-7 gap-2 sm:gap-3 mb-4">
        {days.map((d, i) => (
          <DayCard key={i} day={d.day} ras={d.ras} small={true} />
        ))}
      </div>
      <div className="bg-trent-bg border-l-4 border-trent-green rounded-r-lg p-4">
        <h4 className="text-trent-green font-bold text-sm mb-3">Hours This Week</h4>
        <div className={`grid ${is3Person ? 'grid-cols-3' : 'grid-cols-9'} gap-4`}>
          {Object.entries(hours).map(([ra, hrs]) => (
            <div key={ra} className="text-center">
              <div className="text-trent-green font-bold">{ra}</div>
              <div className="text-gray-600">{hrs}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('9ra')
  const is3Person = activeTab === '3ra'
  const schedule = is3Person ? schedule3RA : schedule9RA

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-trent-green text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-trent-light tracking-widest text-sm mb-4">TRENT UNIVERSITY RESIDENCE LIFE</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">On Duty – Annexes</h1>
          <p className="text-xl text-white/90 mb-2">Lady Eaton • Champlain • Gzowski</p>
          <div className="w-20 h-1 bg-trent-light mx-auto my-6"></div>
          <p className="text-trent-light">8:00 PM – 10:00 PM Daily | 31-Day Rotation</p>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('9ra')}
              className={`py-4 px-6 font-medium border-b-2 transition-colors ${
                activeTab === '9ra'
                  ? 'border-trent-green text-trent-green'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              9-RA Team (2 per night)
            </button>
            <button
              onClick={() => setActiveTab('3ra')}
              className={`py-4 px-6 font-medium border-b-2 transition-colors ${
                activeTab === '3ra'
                  ? 'border-trent-green text-trent-green'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              3-Person Team (1 per night)
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-trent-green mb-4">Schedule Overview</h2>
          <div className="bg-trent-bg border-l-4 border-trent-green rounded-r-lg p-4 mb-6">
            <p className="text-gray-700">
              {is3Person
                ? 'This schedule uses a 3-person team with one RA on duty each night. The simple 3-day rotation ensures 2 days off between each shift.'
                : 'This recommended schedule ensures fair distribution of duty nights while maintaining consistent coverage. The 9-day rotation cycle guarantees 3-4 days off between each RA\'s shifts.'}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white border rounded-lg p-4">
              <p className="text-trent-green font-bold text-sm">SHIFT DETAILS</p>
              <p className="text-2xl font-bold text-trent-green mt-2">8 PM – 10 PM</p>
              <p className="text-gray-500 text-sm">{is3Person ? '1 RA per night' : '2 RAs per night'}</p>
            </div>
            <div className="bg-white border rounded-lg p-4">
              <p className="text-trent-green font-bold text-sm">{is3Person ? '3-DAY CYCLE' : '9-DAY CYCLE'}</p>
              <p className="text-2xl font-bold text-trent-green mt-2">{is3Person ? '2 Days' : '3-4 Days'}</p>
              <p className="text-gray-500 text-sm">Off between shifts</p>
            </div>
            <div className="bg-white border rounded-lg p-4">
              <p className="text-trent-green font-bold text-sm">MONTHLY</p>
              <p className="text-2xl font-bold text-trent-green mt-2">{is3Person ? '20-22 hrs' : '~14 hrs'}</p>
              <p className="text-gray-500 text-sm">Per RA per month</p>
            </div>
          </div>
        </section>

        {/* RAs Legend */}
        <section className="mb-12">
          <div className="bg-white border rounded-lg p-4">
            <p className="text-trent-green font-bold text-sm mb-3">THE {is3Person ? '3' : '9'} RESIDENCE ASSISTANTS</p>
            <div className={`grid ${is3Person ? 'grid-cols-3' : 'grid-cols-9'} gap-4`}>
              {(is3Person ? ['A', 'B', 'C'] : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']).map((ra, i) => (
                <div key={ra} className="text-center">
                  <span className="text-trent-green font-bold">{ra}</span>
                  <span className="text-gray-500"> = RA {i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Weekly Schedules */}
        <WeekSection
          title="Week 1"
          subtitle={`Days 1–7 | ${is3Person ? '3-Person' : '9-RA'} Team`}
          days={schedule.week1}
          hours9RA={{ A: 4, B: 4, C: 4, D: 4, E: 4, F: 2, G: 2, H: 2, I: 2 }}
          hours3RA={{ A: 6, B: 4, C: 4 }}
          is3Person={is3Person}
        />

        <WeekSection
          title="Week 2"
          subtitle={`Days 8–14 | ${is3Person ? '3-Person' : '9-RA'} Team`}
          days={schedule.week2}
          hours9RA={{ A: 4, B: 2, C: 2, D: 2, E: 2, F: 4, G: 4, H: 4, I: 4 }}
          hours3RA={{ A: 4, B: 6, C: 4 }}
          is3Person={is3Person}
        />

        <WeekSection
          title="Week 3"
          subtitle={`Days 15–21 | ${is3Person ? '3-Person' : '9-RA'} Team`}
          days={schedule.week3}
          hours9RA={{ A: 2, B: 4, C: 4, D: 4, E: 4, F: 4, G: 2, H: 2, I: 2 }}
          hours3RA={{ A: 4, B: 4, C: 6 }}
          is3Person={is3Person}
        />

        <WeekSection
          title="Week 4"
          subtitle={`Days 22–28 | ${is3Person ? '3-Person' : '9-RA'} Team`}
          days={schedule.week4}
          hours9RA={{ A: 4, B: 4, C: 2, D: 2, E: 2, F: 2, G: 4, H: 4, I: 4 }}
          hours3RA={{ A: 6, B: 4, C: 4 }}
          is3Person={is3Person}
        />

        {/* Final Days */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-trent-green">Final Days</h2>
            <span className="text-gray-500 text-sm">Days 29–31</span>
          </div>
          <div className="flex gap-4 mb-4">
            {schedule.final.map((d, i) => (
              <div key={i} className="w-32">
                <DayCard day={d.day} ras={d.ras} />
              </div>
            ))}
            <div className="flex-1 bg-trent-bg border-2 border-trent-green rounded-lg p-4">
              <p className="text-trent-green font-bold">MONTH COMPLETE</p>
              <div className="w-10 h-1 bg-trent-green my-2"></div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-2xl font-bold text-trent-green">31</p>
                  <p className="text-gray-500 text-xs">Days</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-trent-green">{is3Person ? '31' : '62'}</p>
                  <p className="text-gray-500 text-xs">Shifts</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-trent-green">{is3Person ? '62' : '124'}</p>
                  <p className="text-gray-500 text-xs">Hours</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-trent-bg border-l-4 border-trent-green rounded-r-lg p-4">
            <h4 className="text-trent-green font-bold text-sm mb-3">Hours These Days</h4>
            <div className={`grid ${is3Person ? 'grid-cols-3' : 'grid-cols-9'} gap-4`}>
              {is3Person ? (
                <>
                  <div className="text-center"><div className="text-trent-green font-bold">A</div><div className="text-gray-600">2</div></div>
                  <div className="text-center"><div className="text-trent-green font-bold">B</div><div className="text-gray-600">2</div></div>
                  <div className="text-center"><div className="text-trent-green font-bold">C</div><div className="text-gray-600">2</div></div>
                </>
              ) : (
                <>
                  <div className="text-center"><div className="text-trent-green font-bold">A</div><div className="text-gray-600">0</div></div>
                  <div className="text-center"><div className="text-trent-green font-bold">B</div><div className="text-gray-600">0</div></div>
                  <div className="text-center"><div className="text-trent-green font-bold">C</div><div className="text-gray-600">2</div></div>
                  <div className="text-center"><div className="text-trent-green font-bold">D</div><div className="text-gray-600">2</div></div>
                  <div className="text-center"><div className="text-trent-green font-bold">E</div><div className="text-gray-600">2</div></div>
                  <div className="text-center"><div className="text-trent-green font-bold">F</div><div className="text-gray-600">2</div></div>
                  <div className="text-center"><div className="text-trent-green font-bold">G</div><div className="text-gray-600">2</div></div>
                  <div className="text-center"><div className="text-trent-green font-bold">H</div><div className="text-gray-600">2</div></div>
                  <div className="text-center"><div className="text-trent-green font-bold">I</div><div className="text-gray-600">0</div></div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Monthly Summary */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-trent-green mb-4">RA Monthly Commitment</h2>
          <div className={`grid ${is3Person ? 'grid-cols-3' : 'grid-cols-3 sm:grid-cols-9'} gap-4 mb-6`}>
            {is3Person ? (
              <>
                <div className="bg-trent-green rounded-xl p-6 text-center">
                  <p className="text-3xl font-bold text-white">A</p>
                  <div className="w-10 h-0.5 bg-trent-light mx-auto my-3"></div>
                  <p className="text-2xl font-bold text-white">11</p>
                  <p className="text-trent-light text-sm">shifts/mo</p>
                  <p className="text-xl font-bold text-trent-light mt-2">22 hrs</p>
                </div>
                <div className="bg-trent-green rounded-xl p-6 text-center">
                  <p className="text-3xl font-bold text-white">B</p>
                  <div className="w-10 h-0.5 bg-trent-light mx-auto my-3"></div>
                  <p className="text-2xl font-bold text-white">10</p>
                  <p className="text-trent-light text-sm">shifts/mo</p>
                  <p className="text-xl font-bold text-trent-light mt-2">20 hrs</p>
                </div>
                <div className="bg-trent-green rounded-xl p-6 text-center">
                  <p className="text-3xl font-bold text-white">C</p>
                  <div className="w-10 h-0.5 bg-trent-light mx-auto my-3"></div>
                  <p className="text-2xl font-bold text-white">10</p>
                  <p className="text-trent-light text-sm">shifts/mo</p>
                  <p className="text-xl font-bold text-trent-light mt-2">20 hrs</p>
                </div>
              </>
            ) : (
              ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].map((ra) => (
                <div key={ra} className="bg-trent-green rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-white">{ra}</p>
                  <div className="w-8 h-0.5 bg-trent-light mx-auto my-2"></div>
                  <p className="text-xl font-bold text-white">7</p>
                  <p className="text-trent-light text-xs">shifts/mo</p>
                  <p className="text-lg font-bold text-trent-light mt-1">14 hrs</p>
                </div>
              ))
            )}
          </div>
          <div className="bg-trent-bg border-l-4 border-trent-green rounded-r-lg p-4">
            <p className="text-trent-green font-bold text-sm">MONTHLY HOURS BREAKDOWN</p>
            <p className="text-gray-700 mt-2">
              {is3Person
                ? 'Each RA works 20-22 hours/month across 10-11 shifts. Total: 31 shifts = 62 hours. RA A works one extra shift due to the 31-day month not dividing evenly by 3.'
                : 'Each RA works approximately 14 hours per month (7 shifts × 2 hours). With 9 RAs sharing 62 shifts, the workload is evenly distributed. Total monthly coverage: 124 hours.'}
            </p>
          </div>
        </section>

        {/* Summary Stats */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-trent-green mb-4">Schedule Summary</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-trent-green rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-white">{is3Person ? '31' : '62'}</p>
              <p className="text-trent-light text-sm">Shifts/Month</p>
            </div>
            <div className="bg-trent-green rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-white">{is3Person ? '62' : '124'} hrs</p>
              <p className="text-trent-light text-sm">Total Coverage</p>
            </div>
            <div className="bg-trent-green rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-white">{is3Person ? '3' : '9'}</p>
              <p className="text-trent-light text-sm">RAs in Rotation</p>
            </div>
            <div className="bg-trent-green rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-white">{is3Person ? '2' : '3-4'} days</p>
              <p className="text-trent-light text-sm">Off Between</p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 text-center text-gray-500">
        <p>RA On Duty Schedule • Trent University Annexes</p>
        <p className="text-sm mt-2">Lady Eaton • Champlain • Gzowski</p>
      </footer>
    </main>
  )
}
