import { ReactElement, useState } from "react";
import '../assets/styles/music.less'
// import bgm from '../assets/music/bgm.mp3'
const Music = (): ReactElement => {
    let music = new Audio('../assets/music/bgm.mp3');
    music.play();
    let musicNode;
    console.log(musicNode);
    return (
        <div className="musicBtn">
            <audio autoPlay loop title="" ref={currentNode => musicNode = currentNode}>
                <source src='' type="audio/mp3" />
            </audio>
        </div >
    )
}

export default Music;