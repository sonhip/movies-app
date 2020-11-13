import React from 'react';
import {Card, Col} from 'antd';
import {Link} from 'react-router-dom';
import slugify from 'react-slugify';

const {Meta} = Card;

const ListDataMovies = (props) => {
    return (
        <>
            {props.movies.map((item, index) =>(
            <Col span={6} key={index} >
                <Link to={`/movies/${slugify(item.title)}~${item.id}`}>
                    <Card
                        hoverable
                        style={{ width: 300, marginBottom:'30px', marginTop:'20px', marginRight:'8px' }}
                        cover={<img alt={item.title} src={`http://image.tmdb.org/t/p/w300/${item.poster_path}`} />}
                    >
                        <Meta title={item.title}/>
                    </Card>
                </Link>
            </Col>
        ))}
        </>
    )
}
export default React.memo(ListDataMovies);