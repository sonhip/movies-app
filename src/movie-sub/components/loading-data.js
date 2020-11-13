import React from 'react';
import {Spin} from 'antd';
import './loading-data.css'
const LoadingData = () =>{
    return(
        <div className="loading-data">
            <Spin/>
        </div>
    )
}
export default React.memo(LoadingData);