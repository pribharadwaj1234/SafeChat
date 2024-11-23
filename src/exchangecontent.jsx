import React from 'react';
import ReactDOM from 'react-dom';
function ExchangeContent() {
    return(
        ReactDOM.createPortal(
            <div>
                <h1>header</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis aut laudantium a sit expedita deserunt accusantium, ut reiciendis, nulla dignissimos maiores.</p>
                <ul>
                    <li>Lorem, ipsum.</li>
                    <li>Lorem, ipsum dolor.</li>
                </ul>
            </div>, 
            document.getElementById("next-root")
        )
    )
}

export default ExchangeContent; 