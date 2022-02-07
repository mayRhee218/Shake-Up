import React ,{ useState, useEffect } from "react";
import { css } from "@emotion/react";
import { useScript } from "../../../../hooks";
// Can be a string as well. Need to ensure each key-value pair ends with ;
// const override = css`
//     display: block;
//     margin: 0 auto;
//     border-color: red;
// `;



function Danddaloading() {
    // let [loading, setLoading] = useState(true);
    // let [color, setColor] = useState("#ffffff");
    const status = useScript("https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");

    //다은이가 만든 함수들
    
    useEffect(() => {
		if(status === "ready"){
				// sdk 초기화하기
				window.SomeThingSDK();
		}
	})

    return (
        <div></div>
        // <div className="sweet-loading">
        //     <button onClick={() => setLoading(!loading)}>Toggle Loader</button>
        //     <input
        //         value={color}
        //         onChange={(input) => setColor(input.target.value)}
        //         placeholder="Color of the loader"
        //     />
            

        //     <ClipLoader color={color} loading={loading} css={override} size={150} />
        // </div>
    );
}
export default Danddaloading;