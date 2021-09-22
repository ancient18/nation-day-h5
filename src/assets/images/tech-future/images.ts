import juanjuanSrc from "./juanjuan.png"
import backgroundSrc from "./background.png"
import item1 from "./1.png"
import item2 from "./2.png"
import item3 from "./3.png"
import item4 from "./4.png"
import item5 from "./5.png"
import item6 from "./6.png"
import item7 from "./7.png"
import item8 from "./8.png"
import item9 from "./9.png"
import item10 from "./10.png"
import item11 from "./11.png"
import item12 from "./12.png"
import item13 from "./13.png"
import item14 from "./14.png"


const juanjuan = new Image();
juanjuan.src = juanjuanSrc;

const background = new Image();
background.src = backgroundSrc;

const itemImages = Array.from({ length: 14}, () => new Image());
itemImages[0].src = item1;
itemImages[1].src = item2;
itemImages[2].src = item3;
itemImages[3].src = item4;
itemImages[4].src = item5;
itemImages[5].src = item6;
itemImages[6].src = item7;
itemImages[7].src = item8;
itemImages[8].src = item9;
itemImages[9].src = item10;
itemImages[10].src = item11;
itemImages[11].src = item12;
itemImages[12].src = item13;
itemImages[13].src = item14;

export {
    juanjuan,
    background,
    itemImages
}