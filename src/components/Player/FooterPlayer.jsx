"use client";

import React, { useState } from "react";
import { Box, IconButton, Dialog, List, ListItem, ListItemText } from "@mui/material";
import { Icon } from "@iconify/react";
import { loFi, hipHop, rnb, jazz, krnb } from "../../data/songData"; 
import { tokyo, lofiGirl, videoGame } from "src/data/youtubePlaylistData";
import ReactPlayer from "react-player";
import styles from "./FooterPlayer.module.css"; 

const FooterPlayer = () => {
    const [play, setPlay] = useState(false);
    const [playlist, setPlaylist] = useState(loFi); // Default to loFi playlist
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [musicVolume, setMusicVolume] = useState(0.5);

    const currentTrack = playlist?.[currentTrackIndex] || { title: "No Track", artist: "", mood: "", url: "" };

    const selectPlaylist = (playlistName) => {
        let newPlaylist;
        switch (playlistName) {
            case "tokyo":
                newPlaylist = tokyo;
                break;
            case "lofiGirl":
                newPlaylist = lofiGirl;
                break;
            case "videoGame":
                newPlaylist = videoGame;
                break;
            case "jazz":
                newPlaylist = jazz;
                break;
            case "hiphop":
                newPlaylist = hipHop;
                break;
            case "krnb":
                newPlaylist = krnb;
                break;
            default:
                newPlaylist = loFi;
        }
        setPlaylist(newPlaylist);
        setCurrentTrackIndex(0); // Reset track index when switching playlists
        setPlay(false);
        setOpenDialog(false);
    };

    const togglePlay = () => setPlay(!play);

    const nextTrack = () => {
        if (playlist.length > 0) {
            setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
        }
    };

    const selectTrack = (index) => {
        if (playlist.length > 0) {
            setCurrentTrackIndex(index);
            setPlay(true);
            setOpenDialog(false);
        }
    };

    return (
        <div className={styles.music_player}>
            <p className={styles.title}>{currentTrack.title}</p>
            <p className={styles.artist}>{currentTrack.artist}</p>
            <p className={styles.mood}>{currentTrack.mood}</p>
            
            <Box className={styles.btnContainer}>
                <IconButton onClick={togglePlay}>
                    <Icon icon={play ? "akar-icons:pause" : "akar-icons:play"} width={30} height={30} />
                </IconButton>
                <IconButton onClick={nextTrack}>
                    <Icon icon="akar-icons:next" width={30} height={30} />
                </IconButton>
                <IconButton onClick={() => setOpenDialog(true)}>
                    <Icon icon="akar-icons:playlist" width={30} height={30} />
                </IconButton>
            </Box>

            <ReactPlayer
                url={currentTrack.url}
                playing={play}
                volume={musicVolume}
                onEnded={nextTrack}
                width="0"
                height="0"
            />

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <List>
                    {playlist.map((track, index) => (
                        <ListItem key={index} onClick={() => selectTrack(index)}>
                            <ListItemText primary={track.title} />
                        </ListItem>
                    ))}
                </List>
            </Dialog>
        </div>
    );
};

export default FooterPlayer;
