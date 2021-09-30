import { ReactElement, useState } from "react";
import '../assets/styles/music.less'
import bgm from '../assets/music/bgm.mp3'

const Music = (): ReactElement => {
    let music = new Audio(bgm);
    let isMusic = false;
    let touchTimes = 0; // 针对以Chromium为内核的浏览器的不允许自动播放音频，采取点击两次
    let musicBtnNode: HTMLDivElement | null;

    document.body.addEventListener('touchstart', playMusicFirstAndSecond)

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

    function playMusicFirstAndSecond(): void {
        touchTimes++;
        playMusic()
        if (touchTimes === 2)
            document.body.removeEventListener('touchstart', playMusicFirstAndSecond)
    }

    return (
        <div className="musicBtn" onTouchEnd={controlMusic} ref={currentNode => musicBtnNode = currentNode}>
        </div >
    )
}

export default Music;