import { ReactElement, useEffect, useRef } from "react";
import "../assets/styles/share.less";
import {
	Link
} from "react-router-dom";

import day1 from "../assets/images/share/day.png"
import day2 from "../assets/images/share/day1.png"
import code1 from "../assets/images/share/code.png"
import back from "../assets/images/share/back.png"

const Share = (): ReactElement => {
	let endRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let end = endRef.current;
		let day = end?.querySelector(".day");
		let left = end?.querySelector(".left");
		let right = end?.querySelector(".right");
		let img = end?.querySelector(".img");
		let code = img?.querySelector("img");

		let arrImg = [0, 1];

		function randomSort(a: number, b: number) {
			return Math.random() > 0.5 ? 1 : -1;
		}

		arrImg.sort(randomSort);

		if (arrImg[0] === 0) {
			day.style.backgroundImage = `url(${day1})`

		} else {
			day.style.backgroundImage = `url(${day2})`;

			day.style.height = "75vh";
		}

		// left.addEventListener("click", function () {
		// 	location.href = "/#/selection";
		// });

		right.addEventListener("click", function () {
			img.style.display = "table";
		});

		img.addEventListener("click", function () {
			img.style.display = "none";
		});

		code.style.marginTop =
			document.body.clientHeight * 0.5 - document.body.clientWidth * 0.5 + "px";
	}, []);

	return (
		<div className="end" ref={endRef}>
			<div className="day">
				<div className="juan">
					<div className="code"></div>
				</div>
			</div>
			<div className="left">
				<Link to="/selection">
					<img src={back} alt="" />
				</Link>
			</div>
			<div className="right"></div>


			<div className="img">
				<img src={code1} alt="" />
			</div>
		</div>
	);
};

export default Share;
