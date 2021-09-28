import { ReactElement, useState } from "react";
import '../assets/styles/music.less'
import bgm from '../assets/music/bgm.mp3'

const Music = (): ReactElement => {
    let music = new Audio(bgm);
    let isMusic = false;
    document.body.addEventListener('touchstart', () => {
        playMusic()
        isMusic = true;
    })
    function controlMusic() {
        if (!isMusic) {
            isMusic = true;
            playMusic()
            console.log(isMusic);
        } else {
            isMusic = false;
            stopMusic()
        }
    }
    // document!.querySelector('.musicBtn')!.addEventListener('touchmove', () => {
    // })
    function playMusic(): void {
        music.play()
    }
    function stopMusic(): void {
        music.pause()
    }
    // setTimeout(() => {
    //     musicNode.pause()
    //     musicNode.load()
    // }, 10)
    return (
        <div className="musicBtn" onClick={controlMusic}>
        </div >
    )
}

export default Music;