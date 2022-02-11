import React ,{ useState, useEffect } from "react";
import { css } from "@emotion/react";
import { useScript } from "../../../../hooks";
import ClipLoader from "react-spinners/ClipLoader";
import { getDatabase, ref, onValue} from "firebase/database";
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;



function Danddaloading() {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    const database = getDatabase();

    const message = ref(database, 'message');
    onValue(message, (snapshot) => {
        const data = snapshot.val();
        console.log("데이터베이스안의 값 : " + data);
    });

    
    
    return (
        <div className="sweet-loading" style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center' 
            , width: '100%', height: '88vh'
        }}>
            
            <ClipLoader color={color} loading={loading} css={override} size={150} />
        </div>
    );
}
export default Danddaloading;