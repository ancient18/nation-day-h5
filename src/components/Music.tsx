import { ReactElement, useState } from "react";
import '../assets/styles/music.less'
import bgm from '../assets/music/bgm.mp3'

const Music = (): ReactElement => {
    let music = new Audio(bgm);
    let isMusic = false;
    let musicBtnNode: HTMLDivElement | null;

    document.body.addEventListener('touchstart', playMusicFirst)

    const controlMusic = () => isMusic ? stopMusic() : playMusic()

    function playMusic(): void {
        music.play()
        isMusic = true
        musicBtnNode!.classList.add('musicBtn-play')
    }

    function stopMusic(): void {
        music.pause()
        isMusic = false
        musicBtnNode!.classList.remove('musicBtn-play')
    }

    function playMusicFirst(): void {
        playMusic()
        document.body.removeEventListener('touchstart', playMusicFirst)
    }

    return (
        <div className="musicBtn" onTouchEnd={controlMusic} ref={currentNode => musicBtnNode = currentNode}>
        </div >
    )
}

export default Music;