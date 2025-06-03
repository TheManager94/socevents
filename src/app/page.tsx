"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Event {
  id: number
  title: string
  subtitle: string
  venue: string
  date: string
  price: string
  status: string
  image: string
  cardType: 'blue' | 'green' | 'red'
  buttonStyle: 'default' | 'dark' | 'light'
  description: string
  fullDate: string
  startTime: string
  endTime: string
  category: string
  ageRestriction: string
  ticketsAvailable: number
}

const upcomingEvents: Event[] = [
  {
    id: 1,
    title: "Booster",
    subtitle: "2025",
    venue: "S12",
    date: "Juho 1.22",
    price: "553",
    status: "Art",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&q=80",
    cardType: 'blue',
    buttonStyle: 'default',
    description: "Ein unvergessliches Konzert-Erlebnis mit internationalen Künstlern und einer spektakulären Bühnenshow. Freuen Sie sich auf eine Nacht voller Energie, großartiger Musik und unvergesslicher Momente.",
    fullDate: "1. Juli 2022",
    startTime: "20:00",
    endTime: "02:00",
    category: "Konzert",
    ageRestriction: "18+",
    ticketsAvailable: 1250
  },
  {
    id: 2,
    title: "Italienische",
    subtitle: "Nacht Iserlohn",
    venue: "5.0",
    date: "Luiho 1.20",
    price: "20",
    status: "echt",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
    cardType: 'green',
    buttonStyle: 'dark',
    description: "Erleben Sie eine magische italienische Nacht mit authentischer Musik, traditionellem Essen und einer warmen, einladenden Atmosphäre. Perfekt für Familien und Freunde.",
    fullDate: "1. Juli 2020",
    startTime: "19:00",
    endTime: "23:30",
    category: "Kulturell",
    ageRestriction: "Alle Altersgruppen",
    ticketsAvailable: 800
  },
  {
    id: 3,
    title: "Italienische",
    subtitle: "Nacht Lüdend",
    venue: "F&T",
    date: "Juhre 1.22",
    price: "49",
    status: "dgd",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&q=80",
    cardType: 'red',
    buttonStyle: 'light',
    description: "Eine exklusive italienische Nacht in Lüdenscheid mit Live-Musik, kulinarischen Köstlichkeiten und einer eleganten Atmosphäre. Ein Abend für Genießer.",
    fullDate: "1. Juli 2022",
    startTime: "18:30",
    endTime: "01:00",
    category: "Gala",
    ageRestriction: "21+",
    ticketsAvailable: 300
  }
]

const pastEvents: Event[] = [
  {
    id: 4,
    title: "Summer",
    subtitle: "Festival 2024",
    venue: "Stadtpark",
    date: "Aug 15.24",
    price: "75",
    status: "Sold Out",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80",
    cardType: 'blue',
    buttonStyle: 'default',
    description: "Ein unvergessliches Sommerfestival mit über 20 Künstlern aus verschiedenen Genres. Drei Tage voller Musik, Kunst und Gemeinschaft unter freiem Himmel.",
    fullDate: "15. August 2024",
    startTime: "14:00",
    endTime: "02:00",
    category: "Festival",
    ageRestriction: "16+",
    ticketsAvailable: 0
  },
  {
    id: 5,
    title: "Jazz Night",
    subtitle: "Deluxe",
    venue: "Blue Note",
    date: "Sep 22.24",
    price: "35",
    status: "Finished",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&q=80",
    cardType: 'green',
    buttonStyle: 'dark',
    description: "Eine elegante Jazz-Nacht mit lokalen und internationalen Künstlern. Genießen Sie erstklassige Musik in einer intimen und stilvollen Atmosphäre.",
    fullDate: "22. September 2024",
    startTime: "19:30",
    endTime: "23:00",
    category: "Jazz",
    ageRestriction: "Alle Altersgruppen",
    ticketsAvailable: 0
  },
  {
    id: 6,
    title: "Electronic",
    subtitle: "Underground",
    venue: "Warehouse X",
    date: "Oct 31.24",
    price: "45",
    status: "Past",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80",
    cardType: 'red',
    buttonStyle: 'light',
    description: "Eine intensive elektronische Nacht mit Underground-DJs und einer hypnotischen Lichtshow. Perfekt für Liebhaber von Techno und elektronischer Musik.",
    fullDate: "31. Oktober 2024",
    startTime: "22:00",
    endTime: "06:00",
    category: "Electronic",
    ageRestriction: "18+",
    ticketsAvailable: 0
  }
]

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const scrollToEvents = () => {
    const eventsSection = document.getElementById('events-section')
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return (
    <main className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-4 md:px-8 py-6">
        <div className="text-white text-lg md:text-xl font-bold">
          SOC EVENTS.DE
        </div>
        <div className="flex items-center space-x-4 md:space-x-8">
          <div className="hidden md:flex items-center space-x-8">
            <button type="button" className="text-white hover:text-gray-300 transition-colors">Events</button>
            <button type="button" className="text-white hover:text-gray-300 transition-colors">Tickets</button>
            <button type="button" className="text-white hover:text-gray-300 transition-colors">FAQ</button>
            <button type="button" className="text-white hover:text-gray-300 transition-colors">Contact</button>
          </div>
          <Button variant="secondary" className="bg-blue-200 text-black hover:bg-blue-100 px-4 py-2">
            Search
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-bg min-h-[80vh] flex items-center justify-center text-center relative">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Entdecke
            <br />
            unsere events
          </h1>
          <Button
            size="lg"
            onClick={scrollToEvents}
            className="bg-lime-400 text-black hover:bg-lime-300 text-lg px-8 py-4 rounded-full font-semibold"
          >
            Entdecke unsere events
          </Button>
        </div>
      </section>

      {/* Events Section */}
      <section id="events-section" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Upcoming Events */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
              Upcoming Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className={`event-card-${event.cardType} rounded-3xl p-6 text-white relative overflow-hidden`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-2xl font-bold">{event.price}</span>
                  <span className="text-sm opacity-80">{event.status}</span>
                </div>

                <div className="mb-6">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-2xl mb-4"
                  />
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-1">{event.title}</h3>
                  <h4 className="text-xl font-semibold mb-3">{event.subtitle}</h4>
                  <div className="flex justify-between text-sm opacity-90">
                    <span>{event.venue}</span>
                    <span>{event.date}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => alert(`Redirecting to tickets for ${event.title} ${event.subtitle}...`)}
                    className={`w-full rounded-full py-3 font-semibold text-lg ${
                      event.buttonStyle === 'dark'
                        ? 'bg-black text-white hover:bg-gray-800'
                        : event.buttonStyle === 'light'
                        ? 'bg-lime-400 text-black hover:bg-lime-300'
                        : 'bg-lime-400 text-black hover:bg-lime-300'
                    }`}
                  >
                    Buy Tickets
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full rounded-full py-3 font-semibold text-lg bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                      >
                        More Info
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 text-white border-gray-700 max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-lime-400">
                          {event.title} {event.subtitle}
                        </DialogTitle>
                        <DialogDescription className="text-gray-300 text-lg">
                          {event.category} • {event.venue}
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-6">
                        <div className="aspect-video relative overflow-hidden rounded-lg">
                          <img
                            src={event.image}
                            alt={`${event.title} ${event.subtitle}`}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-lime-400 mb-2">Event Details</h4>
                              <div className="space-y-2 text-sm">
                                <p><span className="text-gray-400">Datum:</span> {event.fullDate}</p>
                                <p><span className="text-gray-400">Zeit:</span> {event.startTime} - {event.endTime}</p>
                                <p><span className="text-gray-400">Venue:</span> {event.venue}</p>
                                <p><span className="text-gray-400">Kategorie:</span> {event.category}</p>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold text-lime-400 mb-2">Ticket Info</h4>
                              <div className="space-y-2 text-sm">
                                <p><span className="text-gray-400">Preis:</span> €{event.price}</p>
                                <p><span className="text-gray-400">Verfügbar:</span> {event.ticketsAvailable} Tickets</p>
                                <p><span className="text-gray-400">Altersfreigabe:</span> {event.ageRestriction}</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-lime-400 mb-2">Beschreibung</h4>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {event.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                          <Button
                            onClick={() => alert(`Redirecting to tickets for ${event.title} ${event.subtitle}...`)}
                            className="flex-1 bg-lime-400 text-black hover:bg-lime-300 font-semibold"
                          >
                            Tickets Kaufen
                          </Button>
                          <Button
                            variant="outline"
                            className="px-6 border-gray-600 text-gray-300 hover:bg-gray-800"
                          >
                            Teilen
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              ))}
            </div>
          </div>

          {/* Past Events */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
              Past Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <div
                  key={event.id}
                  className={`event-card-${event.cardType} rounded-3xl p-6 text-white relative overflow-hidden opacity-60 hover:opacity-80 transition-opacity`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-2xl font-bold">{event.price}</span>
                    <span className="text-sm opacity-80">{event.status}</span>
                  </div>

                  <div className="mb-6">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded-2xl mb-4 grayscale"
                    />
                  </div>

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-1">{event.title}</h3>
                    <h4 className="text-xl font-semibold mb-3">{event.subtitle}</h4>
                    <div className="flex justify-between text-sm opacity-90">
                      <span>{event.venue}</span>
                      <span>{event.date}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      disabled
                      className="w-full rounded-full py-3 font-semibold text-lg bg-gray-600 text-gray-300 cursor-not-allowed"
                    >
                      Event Finished
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full rounded-full py-3 font-semibold text-lg bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                        >
                          More Info
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-900 text-white border-gray-700 max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold text-lime-400">
                            {event.title} {event.subtitle}
                          </DialogTitle>
                          <DialogDescription className="text-gray-300 text-lg">
                            {event.category} • {event.venue} • Vergangenes Event
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6">
                          <div className="aspect-video relative overflow-hidden rounded-lg">
                            <img
                              src={event.image}
                              alt={`${event.title} ${event.subtitle}`}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-lime-400 mb-2">Event Details</h4>
                                <div className="space-y-2 text-sm">
                                  <p><span className="text-gray-400">Datum:</span> {event.fullDate}</p>
                                  <p><span className="text-gray-400">Zeit:</span> {event.startTime} - {event.endTime}</p>
                                  <p><span className="text-gray-400">Venue:</span> {event.venue}</p>
                                  <p><span className="text-gray-400">Kategorie:</span> {event.category}</p>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold text-lime-400 mb-2">Event Info</h4>
                                <div className="space-y-2 text-sm">
                                  <p><span className="text-gray-400">Preis war:</span> €{event.price}</p>
                                  <p><span className="text-gray-400">Status:</span> {event.status}</p>
                                  <p><span className="text-gray-400">Altersfreigabe:</span> {event.ageRestriction}</p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold text-lime-400 mb-2">Beschreibung</h4>
                              <p className="text-gray-300 text-sm leading-relaxed">
                                {event.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-3 pt-4">
                            <Button
                              disabled
                              className="flex-1 bg-gray-600 text-gray-300 cursor-not-allowed"
                            >
                              Event Beendet
                            </Button>
                            <Button
                              variant="outline"
                              className="px-6 border-gray-600 text-gray-300 hover:bg-gray-800"
                            >
                              Teilen
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm text-center md:text-left">
            Copyright © MEIN SEHR SPC ECHT<br />
            Enverd Nachtigkent
          </div>
          <div className="text-gray-400 text-sm text-center md:text-left">
            Safe Nachschrift Namig Unvelt Ploeifentrichtsgift<br />
            wason Fonna.
          </div>
          <div className="flex space-x-2">
            <Button size="sm" className="bg-lime-400 text-black hover:bg-lime-300 w-8 h-8 rounded-full p-0">
              +
            </Button>
            <Button size="sm" className="bg-lime-400 text-black hover:bg-lime-300 w-8 h-8 rounded-full p-0">
              +
            </Button>
          </div>
        </div>
      </footer>
    </main>
  )
}
