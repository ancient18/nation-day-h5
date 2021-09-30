import { ReactElement, useEffect, useRef } from "react";
import "../assets/styles/share.less";

const Share = (): ReactElement => {
	let endRef = useRef();

	useEffect(() => {
		let end = endRef.current;
		let day = end.querySelector(".day");
		let left = end.querySelector(".left");
		let right = end.querySelector(".right");
		let img = end.querySelector(".img");
		let code = img.querySelector("img");

		let arrImg = [0, 1];

		function randomSort(a: number, b: number) {
			return Math.random() > 0.5 ? 1 : -1;
		}

		arrImg.sort(randomSort);

		if (arrImg[0] === 0) {
			day.style.backgroundImage = "url(/src/assets/images/share/day.png)";
		} else {
			day.style.backgroundImage = "url(/src/assets/images/share/day1.png)";
			day.style.height = "75vh";
		}

		left.addEventListener("click", function () {
			location.href = "/#/selection";
		});

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
			<div className="left"></div>
			<div className="right"></div>
			<div className="img">
				<img src="/src/assets/images/share/code.png" alt="" />
			</div>
		</div>
	);
};

export default Share;
