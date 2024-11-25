"use client"

import React, { useState, useEffect, useCallback, useRef } from 'react'
import ReactPlayer from 'react-player'
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, ChevronDown } from 'lucide-react'

interface VideoPlayerProps {
  url: string
  title: string
  description: string
}

export function VideoPlayer({ url, title, description }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [loading, setLoading] = useState(true)
  const [showControls, setShowControls] = useState(true)
  const [showSpeedOptions, setShowSpeedOptions] = useState(false)

  const playerRef = useRef<ReactPlayer>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const speedOptionsRef = useRef<HTMLDivElement>(null)

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
    <div className="w-full max-w-4xl mx-auto" ref={containerRef}>
      <div 
        className="relative aspect-video bg-black"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onTouchStart={() => setShowControls(true)}
        onTouchEnd={() => setTimeout(() => setShowControls(false), 3000)}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
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
        {showControls && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 z-10">
            <Slider
              value={[progress]}
              onValueChange={handleSeek}
              max={1}
              step={0.001}
              className="w-full"
            />
            <div className="flex flex-wrap items-center justify-between mt-2 gap-2">
              <div className="flex items-center space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={handlePlayPause} className="text-white hover:text-primary">
                        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{playing ? 'Pause' : 'Play'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <span className="text-xs sm:text-sm text-white">
                  {formatTime(progress * duration)} / {formatTime(duration)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative" ref={speedOptionsRef}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSpeedOptions(!showSpeedOptions)}
                    className="text-white hover:text-primary"
                  >
                    {playbackRate}x <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                  {showSpeedOptions && (
                    <div className="absolute bottom-full left-0 mb-2 bg-black rounded-md shadow-lg">
                      {[0.5, 1, 1.5, 2].map((rate) => (
                        <Button
                          key={rate}
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePlaybackRateChange(rate)}
                          className="block w-full text-left text-white hover:bg-gray-700"
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
                      <Button variant="ghost" size="icon" onClick={handleFullscreenToggle} className="text-white hover:text-primary">
                        {fullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div className="flex items-center space-x-2">
                  {volume > 0 ? (
                    <Volume2 className="h-4 w-4 text-white" />
                  ) : (
                    <VolumeX className="h-4 w-4 text-white" />
                  )}
                  <Slider
                    value={[volume]}
                    onValueChange={handleVolumeChange}
                    max={1}
                    step={0.01}
                    className="w-16 sm:w-24"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
        <p className="text-sm sm:text-base text-gray-600">{description}</p>
      </div>
    </div>
  )
}

