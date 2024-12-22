import React, { useState, useEffect, useCallback, useRef } from 'react'
import ReactPlayer from 'react-player'
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, ChevronDown, Settings } from 'lucide-react'

interface VideoPlayerProps {
  url: string
  title: string
  description: string
  userId: string
  videoId: string
}

export function VideoPlayer({ url, title, description, userId, videoId }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [loading, setLoading] = useState(true)
  const [showControls, setShowControls] = useState(true)
  const [showSpeedOptions, setShowSpeedOptions] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [completed, setCompleted] = useState(false)

  const playerRef = useRef<ReactPlayer>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const speedOptionsRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  const handlePlayPause = () => setPlaying(!playing)
  const handleVolumeChange = (value: number[]) => setVolume(value[0])
  const handleProgress = (state: { played: number }) => setProgress(state.played)
  const handleDuration = (duration: number) => setDuration(duration)
  
  const handleSeek = (value: number[]) => {
    setProgress(value[0])
    playerRef.current?.seekTo(value[0])
  }

  const handleFullscreenToggle = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setFullscreen(true)
    } else {
      document.exitFullscreen()
      setFullscreen(false)
    }
  }

  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate)
    setShowSpeedOptions(false)
    if (playerRef.current) {
      playerRef.current.getInternalPlayer().playbackRate = rate
    }
  }

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = date.getUTCSeconds().toString().padStart(2, '0')
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`
    }
    return `${mm}:${ss}`
  }

  const handleMouseMove = () => {
    setShowControls(true)
    setHovering(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (!hovering) {
        setShowControls(false)
      }
    }, 2000)
  }

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case ' ':
        handlePlayPause()
        break
      case 'ArrowLeft':
        playerRef.current?.seekTo(progress - 0.05)
        break
      case 'ArrowRight':
        playerRef.current?.seekTo(progress + 0.05)
        break
      case 'f':
        handleFullscreenToggle()
        break
    }
  }, [progress])

  const handleVideoEnd = () => {
    setPlaying(false)
    setCompleted(true)  // Update the completion state
    
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (speedOptionsRef.current && !speedOptionsRef.current.contains(event.target as Node)) {
        setShowSpeedOptions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl" ref={containerRef}>
      <div 
        className="relative aspect-video bg-black"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => {
          setHovering(false)
          setShowControls(false)
        }}
        onClick={handlePlayPause}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
          </div>
        )}
        
        <ReactPlayer
          ref={playerRef}
          url={url}
          width="100%"
          height="100%"
          playing={playing}
          volume={volume}
          playbackRate={playbackRate}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onReady={() => setLoading(false)}
          onBuffer={() => setLoading(true)}
          onBufferEnd={() => setLoading(false)}
          onEnded={handleVideoEnd}
          progressInterval={100}
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload',
              },
              forceVideo: true,
              forceAudio: true,
            },
          }}
        />

        {/* Play/Pause overlay button */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${playing ? 'opacity-0' : 'opacity-100'}`}>
          <Button
            variant="ghost"
            size="icon"
            className="w-20 h-20 rounded-full bg-primary/20 hover:bg-primary/40 backdrop-blur-sm transition-all duration-300 text-white"
            onClick={(e) => {
              e.stopPropagation()
              handlePlayPause()
            }}
          >
            {playing ? (
              <Pause className="h-10 w-10" />
            ) : (
              <Play className="h-10 w-10 ml-1" />
            )}
          </Button>
        </div>

        {/* Controls overlay */}
        <div 
          className={`absolute inset-x-0 bottom-0 transition-all duration-300 ${
            showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Progress bar */}
          <div className="absolute bottom-full w-full px-4 mb-2">
            <Slider
              value={[progress]}
              onValueChange={handleSeek}
              max={1}
              step={0.001}
              className="w-full"
            />
          </div>

          {/* Controls bar */}
          <div className="bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 backdrop-blur-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePlayPause()
                        }}
                        className="text-white hover:text-primary transition-colors"
                      >
                        {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{playing ? 'Pause' : 'Play'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      setVolume(volume === 0 ? 0.5 : 0)
                    }}
                    className="text-white hover:text-primary transition-colors"
                  >
                    {volume > 0 ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                  </Button>
                  <Slider
                    value={[volume]}
                    onValueChange={handleVolumeChange}
                    max={1}
                    step={0.01}
                    className="w-24"
                  />
                </div>

                <span className="text-sm text-white/90">
                  {formatTime(progress * duration)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <div className="relative" ref={speedOptionsRef}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowSpeedOptions(!showSpeedOptions)
                    }}
                    className="text-white hover:text-primary transition-colors"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    {playbackRate}x
                  </Button>
                  {showSpeedOptions && (
                    <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl">
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                        <Button
                          key={rate}
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePlaybackRateChange(rate)
                          }}
                          className={`block w-full text-left text-white hover:bg-white/10 transition-colors ${
                            playbackRate === rate ? 'bg-primary text-white' : ''
                          }`}
                        >
                          {rate}x
                        </Button>
                      ))}
                    </div>
                  )}
                </div>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleFullscreenToggle()
                        }}
                        className="text-white hover:text-primary transition-colors"
                      >
                        {fullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3 px-4 pb-6">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}