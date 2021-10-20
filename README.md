## 项目名

欢乐邮你 玩转国庆



## 项目简介

由喜庆丰收、星际遨游、全民抗疫、科技未来组成的国庆综合游戏H5



## 目录结构

```
.national-day-h5-2021
│  .gitignore
│  .gitlab-ci.yml
│  babel.config.js
│  global.d.ts
│  package-lock.json
│  package.json
│  README.md
│  tsconfig.json
│  webpack.config.js
│  
├─mocker
│      index.js
│      
├─src
│  │  App.tsx
│  │  index.tsx
│  │  
│  ├─assets
│  │  ├─font
│  │  │      LianMengQiYiLuShuaiZhengRuiHeiTi.ttf
│  │  │      ZhanKuQingKeHuangYouTi.ttf
│  │  │      
│  │  ├─images
│  │  │  ├─AntiEpidemic
│  │  │  │      again.png
│  │  │  │      arrow.png
│  │  │  │      back.png
│  │  │  │      background.png
│  │  │  │      choose.png
│  │  │  │      defate.png
│  │  │  │      front.png
│  │  │  │      mask.png
│  │  │  │      victory.png
│  │  │  │      
│  │  │  ├─countDown
│  │  │  │      background.png
│  │  │  │      go.png
│  │  │  │      one.png
│  │  │  │      three.png
│  │  │  │      two.png
│  │  │  │      
│  │  │  ├─harvest
│  │  │  │      background-image.png
│  │  │  │      branch.png
│  │  │  │      click-1.png
│  │  │  │      click-2.png
│  │  │  │      click-3.png
│  │  │  │      click-4.png
│  │  │  │      click-5.png
│  │  │  │      click-6.png
│  │  │  │      click-7.png
│  │  │  │      click-8.png
│  │  │  │      click-9.png
│  │  │  │      gameover-bgimage.png
│  │  │  │      gameover-choose.png
│  │  │  │      gameover-onemore.png
│  │  │  │      insect1.png
│  │  │  │      insect2.png
│  │  │  │      maple.png
│  │  │  │      mushroom.png
│  │  │  │      star.png
│  │  │  │      success-back-btn.png
│  │  │  │      success.png
│  │  │  │      vine.png
│  │  │  │      wheat1.png
│  │  │  │      wheat2.png
│  │  │  │      
│  │  │  ├─home
│  │  │  │      home-background-image.png
│  │  │  │      home-button1.png
│  │  │  │      home-button2.png
│  │  │  │      home-loginPop-confirm.png
│  │  │  │      home-loginPop-noID.png
│  │  │  │      home-loginPop.png
│  │  │  │      home-music.png
│  │  │  │      home-rule-close.png
│  │  │  │      home-rule-ok.png
│  │  │  │      home-rule.png
│  │  │  │      home-stuID.png
│  │  │  │      
│  │  │  ├─interstellarTrip
│  │  │  │      again.png
│  │  │  │      bgc.png
│  │  │  │      choose.png
│  │  │  │      failure_page.png
│  │  │  │      light.png
│  │  │  │      mask.png
│  │  │  │      Spacecraft.png
│  │  │  │      stone1.png
│  │  │  │      stone10.png
│  │  │  │      stone11.png
│  │  │  │      stone12.png
│  │  │  │      stone13.png
│  │  │  │      stone14.png
│  │  │  │      stone15.png
│  │  │  │      stone16.png
│  │  │  │      stone17.png
│  │  │  │      stone18.png
│  │  │  │      stone19.png
│  │  │  │      stone2.png
│  │  │  │      stone20.png
│  │  │  │      stone21.png
│  │  │  │      stone22.png
│  │  │  │      stone23.png
│  │  │  │      stone24.png
│  │  │  │      stone25.png
│  │  │  │      stone26.png
│  │  │  │      stone27.png
│  │  │  │      stone3.png
│  │  │  │      stone4.png
│  │  │  │      stone5.png
│  │  │  │      stone6.png
│  │  │  │      stone7.png
│  │  │  │      stone8.png
│  │  │  │      stone9.png
│  │  │  │      success_button.png
│  │  │  │      success_page.png
│  │  │  │      
│  │  │  ├─loading
│  │  │  │      bgc.png
│  │  │  │      clouds.png
│  │  │  │      flag.png
│  │  │  │      loading_content.png
│  │  │  │      loading_frame.png
│  │  │  │      rolls.png
│  │  │  │      
│  │  │  ├─selection
│  │  │  │      anti-epidemic-done.png
│  │  │  │      anti-epidemic.png
│  │  │  │      background.png
│  │  │  │      harvest-done.png
│  │  │  │      harvest.png
│  │  │  │      index.ts
│  │  │  │      interstellar-trip-done.png
│  │  │  │      interstellar-trip.png
│  │  │  │      start-game.png
│  │  │  │      tech-future-done.png
│  │  │  │      tech-future.png
│  │  │  │      triangle.png
│  │  │  │      
│  │  │  ├─share
│  │  │  │      background1.png
│  │  │  │      background2.png
│  │  │  │      cha.png
│  │  │  │      end.png
│  │  │  │      share.png
│  │  │  │      
│  │  │  └─tech-future
│  │  │          1.png
│  │  │          10.png
│  │  │          11.png
│  │  │          12.png
│  │  │          13.png
│  │  │          14.png
│  │  │          2.png
│  │  │          3.png
│  │  │          4.png
│  │  │          5.png
│  │  │          6.png
│  │  │          7.png
│  │  │          8.png
│  │  │          9.png
│  │  │          back.png
│  │  │          background.jpg
│  │  │          failure.png
│  │  │          images.ts
│  │  │          juanjuan.png
│  │  │          play_again.png
│  │  │          select_game.png
│  │  │          success.png
│  │  │          
│  │  ├─music
│  │  │      bgm.mp3
│  │  │      
│  │  └─styles
│  │      │  countDown.less
│  │      │  font.less
│  │      │  harvest.less
│  │      │  home.less
│  │      │  interstellarTrip.module.less
│  │      │  loading.module.less
│  │      │  main.less
│  │      │  music.less
│  │      │  selection.less
│  │      │  share.css
│  │      │  share.less
│  │      │  techFuture.less
│  │      │  
│  │      └─AntiEpidemic
│  │              AntiEpidemic.css
│  │              AntiEpidemic.less
│  │              
│  ├─components
│  │      CountDown.tsx
│  │      index.tsx
│  │      Loading.tsx
│  │      Music.tsx
│  │      Share.tsx
│  │      
│  ├─config
│  │      index.ts
│  │      
│  └─views
│      │  games.tsx
│      │  Home.tsx
│      │  
│      ├─games
│      │  │  Harvest.tsx
│      │  │  
│      │  ├─AntiEpidemic
│      │  │      BigDiv.tsx
│      │  │      index.tsx
│      │  │      
│      │  ├─interstellarTrip
│      │  │  │  index.tsx
│      │  │  │  
│      │  │  ├─cpns
│      │  │  │      Failure.tsx
│      │  │  │      index.tsx
│      │  │  │      Mask.tsx
│      │  │  │      Success.tsx
│      │  │  │      
│      │  │  ├─type
│      │  │  │      baseItem.tsx
│      │  │  │      index.tsx
│      │  │  │      stones.tsx
│      │  │  │      
│      │  │  └─utils
│      │  │          index.tsx
│      │  │          
│      │  └─TechFuture
│      │      │  index.tsx
│      │      │  tech-future.d.ts
│      │      │  
│      │      ├─components
│      │      │      FailureWindow.tsx
│      │      │      SuccessWindow.tsx
│      │      │      
│      │      ├─data
│      │      │      index.ts
│      │      │      
│      │      └─utils
│      │              graphical.ts
│      │              items.ts
│      │              physical.ts
│      │              
│      └─Selection
│              index.tsx
│              sentakushi.tsx
│              
└─template
        index.html
```



## 技术栈

- React
- React Router
- TypeScript
- Less



## 项目运行方式

```bash
# 运行
npm run serve

# 打包
npm run build
```



## 项目亮点/难点

### 喜庆丰收

......

### 星际遨游

......

### 全民抗疫
**难点：**
1. 在做点击事件时，由于ios浏览器内核的一些属性与Android不同导致出现了一些问题
2. 移动动画在ios设备上出现闪屏的情况

### 科技未来

......

### ......



## 项目存在的不足、优化

### 喜庆丰收

......

### 星际遨游

......
### 全民抗疫
**不足：**
1. 在不同手机上的适配还有些欠缺
2. 代码比较冗杂，没来得及更好的去优化

### 科技未来

......

### ......



## 接口文档

https://www.showdoc.com.cn/1606788020053482/



## 参与项目成员

路明瑞、李沁钰、周文轩、马樱仪



## 项目上线时间

2021.10.1



## 代码的 GitHub/GitLab 地址

https://gitlab.redrock.team/web/fe/national-day-h5-2021



## 项目的线上地址

https://fe-prod.redrock.cqupt.edu.cn/national-day-h5-2021/#/
