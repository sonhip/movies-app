import React, {useState, useEffect} from 'react';
import {Row, Col, Pagination} from 'antd';
import LayoutComponent from '../components/layout';
import {getDataMovies} from '../services/api';
import LoadingData from '../components/loading-data';
import ListMoviesComponent from '../components/list-movies'

const HomePage = () =>{
    const [loadingHome, setLoadingHome] = useState(false);
    const [movies, setMovies] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const getData = async () =>{
            setLoadingHome(true);
            const data = await getDataMovies(page);
            if(data){
                setMovies(data.results);
                setTotalItems(data.total_results);
                if(page > data.total_pages){
                    setPage(data.total_pages)
                }else if(page < 1){
                    setPage(1);
                }
                setLoadingHome(false);
                
            }
        }
        getData();
    },[page]);

    if(loadingHome || movies.length===0){
        <LayoutComponent>
            <LoadingData/>
        </LayoutComponent>
    }
    const changePage = (pages) =>{
        setPage(pages);
    }

    return(
        <LayoutComponent>
            <Row style={{marginBottom:'20px', marginTop:'20px'}}>
                <ListMoviesComponent movies={movies} />
            </Row>

            <Row style={{textAlign:'center', marginTop:'20px'}} >
                <Col span={24}>
                    <Pagination
                        pageSize={20}
                        currentPage={page}
                        total={totalItems}
                        onChange={(pages)=>changePage(pages)}
                    />
                </Col>
            </Row>
        </LayoutComponent>
    )
}
export default React.memo(HomePage);