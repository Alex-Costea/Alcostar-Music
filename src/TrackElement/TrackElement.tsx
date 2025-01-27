import {Link} from "react-router-dom";
import {Track} from "../Album/Album.tsx";
import {AlbumMetadata} from "../App/App.tsx";
import { useGlobalAudioPlayer } from 'react-use-audio-player';
import "./Track.css"
import {useContext} from "react";
import {PlayerContext} from "../PlayerContext/PlayerContext.tsx";

interface TrackProps{
    album? : AlbumMetadata
    track : Track
    isCurrentTrack : boolean
}

function TrackElement({track, album, isCurrentTrack} : TrackProps)
{
    const playerData = useContext(PlayerContext)!
    const playingTrack = playerData?.playingTrack
    const setPlayingTrack = playerData?.setPlayingTrack
    const {load, pause, play, playing} = useGlobalAudioPlayer()

    function onPlay() {
        if(playingTrack !== track.folder)
        {
            setPlayingTrack(track.folder)
            load(track.url, {autoplay: true})
        }
        else if(!playing)
            play()
    }

    function onPause() {
        pause()
    }

    return <div className={"trackDiv"}>
        <li><h3>
                            <span className={"trackNr"}>
                                {isCurrentTrack?'':`${track.numberDisplayed ?? track.number}. `}
                            </span>
            <Link to={`/${album?.folder}/${track.folder}`} data-title-hidden={album?.titleHidden}>
                {track.title}
            </Link>
        </h3></li>
        <div className={"controls"}>
            <button onClick={onPlay} className={"controlButton"}>▶︎</button>
            <button onClick={onPause} className={"controlButton"}>⏸︎</button>
        </div>
    </div>
}

export default TrackElement