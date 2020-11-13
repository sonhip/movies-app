import React, {useState} from 'react';
import {Row, Col, Input, Pagination} from 'antd';
import LayoutComponent from '../components/layout';
import {SearchMoviesByKeywords} from '../services/api';
import LoadingData from '../components/loading-data';
import ListMoviesComponent from '../components/list-movies';

const {Search} = Input;
const SearchMoviePage = () =>{
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [keywords, setKeywords] = useState('');
    const [movies, setMovies] = useState([]);

    const changeInput = (event) =>{
       const input = event.target.value;
       setKeywords(input);
    }
    const SearchMovies = async ( keyword='', currentPage='1') => {
        if(keyword.length>0){
            setLoadingSearch(true);
            const data = await SearchMoviesByKeywords(keyword, currentPage);
            if(data){
                setMovies(data.results);
                setTotalItems(data.total_results);
                setLoadingSearch(false);
                window.scrollTo(0, 0);
            }
        }
    }
    if(loadingSearch && movies.length===0){
        return(
            <LayoutComponent>
                <LoadingData/>
            </LayoutComponent>
        )
    }

    return(
        <LayoutComponent>
            <Row style={{marginBottom:'20px', marginTop:'20px'}}>
                <Col span={12} offset={6} >
                     <Search 
                        placeholder="input search text" 
                        onChange={changeInput}
                        onSearch={(val)=>SearchMovies(val, page)}
                        enterButton  
                        />
                </Col>
            </Row>
            <Row>
                <ListMoviesComponent movies={movies} />
            </Row>
            {movies.length>0 && (
                <Row>
                <Col span={24} style={{textAlign:'center', marginTop:'20px'}}>
                    <Pagination
                            current={page}
                            total={totalItems}
                            pageSize={10}
                            onChange={(pages)=>SearchMovies(keywords, pages)}
                        />
                </Col>
            </Row>
            )}
        </LayoutComponent>
    )
}
export default React.memo(SearchMoviePage);