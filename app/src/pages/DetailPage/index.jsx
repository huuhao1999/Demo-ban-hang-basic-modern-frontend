import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import productApi from "../../api/productApi";
import categoryApi from "../../api/categoriesApi";
import { Col, Container, Row } from "reactstrap";
import DetailImage from "../../components/DetailImage";
import DetailInfo from "../../components/DetailInfo";
import { addProduct } from "../../storeSlice/miniCartSlice";
import { InputNumber, Rate } from "antd";
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import Grid from '@material-ui/core/Grid';

import './style.css';
import moment from 'moment';
DetailPage.propTypes = {};

function DetailPage(props) {
  
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    if (product) dispatch(addProduct(product));
  };
  //set title
  useEffect(() => {
    document.title = `Sản phẩm ${product.name}`;
  }, [product]);
  //get product by id
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productApi.get(id);
        console.log(response)
        setProduct(response);
        const responseBrand = await categoryApi.get(response.brandId);
        setProduct({ ...response, brand: responseBrand.name });
      } catch (error) {
        console.log("Failed to fetch data product at: ", error);
      }
    };
    fetchProduct();
  }, []);
  return (
    <div className="detail-page mt-5">
      <Container>
        <Row lg="2" md="2" sm="1" xs="1">
          <Col>
            <DetailImage images={[product.image, product.image2]} />
          </Col>
          <Col>
            <DetailInfo product={product} onAddToCart={handleAddToCart} />
          </Col>
        </Row>
      </Container>
      <Grid container spacing={3}>
        <Comment.Group>
          <div className='commentTi'>ĐÁNH GIÁ SẢN PHẨM</div>
          {product.comments ? product.comments.map((item) => {
            return (
              <Comment>
                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                <div className="detail-info__rating">
                  <Rate
                    allowHalf
                    disabled
                    defaultValue={item.rating}
                    className="detail-info__rating__value"
                  /></div>
                <Comment.Content>
                  <Comment.Author as='a'>{item.username}</Comment.Author>
                  <Comment.Text>{item.content}</Comment.Text>
                  <Comment.Metadata>
                    <div>{moment(new Date(item.created_time)).format('YYYY-MM-DD HH:mm:ss')}</div>
                  </Comment.Metadata>
                </Comment.Content>
                <div className='txteach_comment'>------------------------------------</div>
              </Comment>
            );
          }) : ''}
        </Comment.Group>
      </Grid>
    </div>
  );
}

export default DetailPage;
