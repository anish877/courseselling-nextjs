// 'use client'

// //small one
// import React, { useEffect, useRef, useState, useCallback } from "react";
// import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaCompress } from "react-icons/fa";
// import { Button } from "./ui/button";
// import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./ui/tooltip";
// import { Slider } from "./ui/slider";

// interface VideoPlayerProps {
//   videoSrc: string;
//   poster?: string;
//   width?: string;
//   height?: string;
// }

// const VideoPlayer: React.FC<VideoPlayerProps> = ({
//   videoSrc,
//   poster = "",
//   width = "100%",
//   height = "auto",
// }) => {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [volume, setVolume] = useState(1);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);

//   // Sync volume with mute toggle
//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.muted = isMuted;
//     }
//   }, [isMuted]);

//   // Set duration when metadata is loaded
//   useEffect(() => {
//     const video = videoRef.current;
//     if (video) {
//       const handleLoadedMetadata = () => {
//         setDuration(video.duration || 0);
//       };

//       video.addEventListener("loadedmetadata", handleLoadedMetadata);
//       return () => video.removeEventListener("loadedmetadata", handleLoadedMetadata);
//     }
//   }, []);

//   // Update currentTime on timeupdate
//   useEffect(() => {
//     const video = videoRef.current;
//     if (video) {
//       const handleTimeUpdate = () => setCurrentTime(video.currentTime);
//       video.addEventListener("timeupdate", handleTimeUpdate);
//       return () => video.removeEventListener("timeupdate", handleTimeUpdate);
//     }
//   }, []);

//   const togglePlay = useCallback(() => {
//     const video = videoRef.current;
//     if (video) {
//       if (isPlaying) {
//         video.pause();
//       } else {
//         video.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   }, [isPlaying]);

//   const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const volumeValue = parseFloat(e.target.value);
//     setVolume(volumeValue);
//     if (videoRef.current) {
//       videoRef.current.volume = volumeValue;
//       setIsMuted(volumeValue === 0); // Automatically mute when volume is 0
//     }
//   };

//   const toggleMute = useCallback(() => {
//     setIsMuted((prevMuted) => !prevMuted);
//   }, []);


//   const handleProgressBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const seekTime = parseFloat(e.target.value);
//     if (videoRef.current) {
//       videoRef.current.currentTime = seekTime;
//       setCurrentTime(seekTime);
//     }
//   };

//   const formatTime = (time: number) => {
//     const minutes = Math.floor(time / 60)
//       .toString()
//       .padStart(2, "0");
//     const seconds = Math.floor(time % 60)
//       .toString()
//       .padStart(2, "0");
//     return `${minutes}:${seconds}`;
//   };

//   return (
//     <div className="video-player-container relative" style={{ width, height }}>
//       <video
//         ref={videoRef}
//         className="w-full max-h-[400px]"
//         src={videoSrc}
//         poster={poster}
//         onClick={togglePlay}
//       ></video>

//       {/* Controls */}
//       <div className="absolute -bottom-20 w-full p-4">
//         <div className="flex items-center justify-between">
//           {/* Play/Pause Button */}
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Button onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"} variant="outline" className="rounded-full">
//                   {isPlaying ? <FaPause className="" /> : <FaPlay className="" />}
//                 </Button>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>{isPlaying ? "Pause" : "Play"}</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>

//           {/* Progress Bar */}
//           <div className="flex items-center w-1/2 mx-4">
//             <span className="text-xs text-white font-bold">{formatTime(currentTime)}</span>
//             <input
//               type="range"
//               value={currentTime}
//               max={duration || 0}
//               step="0.1"
//               onChange={handleProgressBarChange}
//               className="mx-2 flex-1"
//             />
//             <span className="text-xs text-white font-bold">{formatTime(duration)}</span>
//           </div>

//           {/* Volume Control */}
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Button onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"} variant="ghost" className="rounded-full">
//                   {isMuted ? (
//                     <FaVolumeMute  />
//                   ) : (
//                     <FaVolumeUp  />
//                   )}
//                 </Button>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>{isMuted ? "Unmute" : "Mute"}</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//           <input
//             type="range"
//             value={volume}
//             onChange={handleVolumeChange}
//             step="0.01"
//             min="0"
//             max="1"
//             className="ml-2 w-16"
//           />

//           {/* Fullscreen Button */}
//           {/* <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Button onClick={toggleFullscreen} aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
//                   {isFullscreen ? <FaCompress className="" /> : <FaExpand className="" />}
//                 </Button>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoPlayer;
