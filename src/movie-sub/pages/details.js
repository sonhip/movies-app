import React, {useState, useEffect} from 'react';
import {Row, Col, Card} from 'antd';
import LayoutComponent from '../components/layout';
import {useParams} from 'react-router-dom';
import {getDataDetailslMovies} from '../services/api';
import LoadingData from '../components/loading-data';

const {Meta} =Card;

const DetailsMoviePage = () =>{
    const { id } = useParams();

    const [loadingDetails, setLoadingDetails] = useState(false);
    const [details, setDetails] = useState({});

    useEffect(()=>{
        setLoadingDetails(true);
        const getData = async ()=>{
            const data = await getDataDetailslMovies(id);
            if(data){
                setDetails(data);
                setLoadingDetails(false);
            }
        }
        getData();
    },[id]);
   if(loadingDetails){
       return(
           <LayoutComponent>
               <LoadingData/>
           </LayoutComponent>
       )
   }

    return(
        <LayoutComponent>
            <Row style={{marginBottom:'20px', marginTop:'20px'}}>
                <Col span={6}>
                      <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt={details.title} src={`http://image.tmdb.org/t/p/w300/${details.poster_path}`} />}
                    >
                        <Meta title={details.tagline} />
                    </Card>
                </Col>
                <Col span={12}>
                    <h1>{details.title}</h1>
                    <p>{details.overview}</p>
                </Col>
                <Col span={6}>
                  <Row>
                  {details.images !== undefined ? details.images.backdrops.map((item, index)=>(
                        <Col span={24} key={index} >
                                <Card
                                bordered = {false}
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt={details.title} src={`http://image.tmdb.org/t/p/w300/${item.file_path}`} />}
                            >
                            </Card>
                        </Col>
                        )) : null}
                  </Row>
                </Col>
            </Row>
        </LayoutComponent>
    )
}
export default React.memo(DetailsMoviePage);