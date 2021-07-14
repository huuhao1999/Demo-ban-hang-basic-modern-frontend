
import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { useAdmin } from '../contexts/admin';
import './style.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useCategory } from '../contexts/category';
import { BoxLoading } from 'react-loadingg';
import moment from 'moment'
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
const Courses = () => {
    const product = useRef('');
    const detail = useRef('');
    const price = useRef('');
    const quantity = useRef('');
    const classes = useStyles();
    const [courses, setCourses] = useState([]);
    let { categories } = useCategory();
    const [CateGo, setCateGo] = useState([]);
    const [selectCate, setSelectCate] = useState({value: 'C001'});
    useEffect(() => {
        if (CateGo.length == 0) {

            context.getCategories().then(res => {
                setCateGo(res);
            }).catch((error) => {
                console.log("Failed to fetch data product at: ", error);
            });

        }
    }, []);
    let context = useAdmin();
    useEffect(() => {
        const fetchProduct = async () => {
            if (courses.length == 0) {

                try {
                    let res = await context.getProducts();

                    setCourses(res);
                } catch (error) {
                    console.log("Failed to fetch data product at: ", error);
                }
            };
        }
        fetchProduct();
    }, []);
    let getCategoryName = ((id) => {
        let newdata = CateGo.filter(function (element) { return element.categoryId == id });
        if (newdata.length != 0)
            return newdata[0].categoryName;
    })
    const handleAddvalue = () => {
        let entity = {
            productName: product.current.value,
            detail: detail.current.value,
            price: price.current.value,
            quantity: quantity.current.value,
            categoryId: selectCate.value
        }
        context.createProduct(entity).then(res => {
            alert("Add product success");
        }).catch((error) => {
            console.log("Failed to fetch data product at: ", error);
        });
        
    }
    const _handleChangeSelect = (event)=>{
        setSelectCate({ value: event.target.value })
    }
    return (
        <div>
            <h2 className="page-header">
                Products
            </h2>
            {courses.length == 0 ? <BoxLoading /> : ''}
            <div className='addcatre'>
                <TextField id="standard-basic" name='product' label="Product name" style={{ minWidth: '300px' }} inputRef={product} />
                <TextField id="standard-basic" name='detail' label="Detail" style={{ minWidth: '300px' }} inputRef={detail} />
                <TextField id="standard-basic" name='price' label="Price" style={{ minWidth: '300px' }} inputRef={price} />
                <TextField id="standard-basic" name='quantity' label="Quantity" style={{ minWidth: '300px' }} inputRef={quantity} />
                <br />
                <div style={{ marginTop: '20px' }}>
                    <label for="cars">Category: </label>
                    <select name="cars" id="cars" onChange={_handleChangeSelect}>
                        {CateGo.map((row) => (
                            <option value={row.categoryId}>{row.categoryName}</option>
                        ))}

                    </select>
                </div>
                <br />
                <Button variant="contained" color="primary" href="#contained-buttons" style={{ marginTop: '13px', marginLeft: '10px', backgroundColor: '#62b4ff', minWidth: '90px' }} onClick={handleAddvalue}>
                    Add
                </Button>
                <Button variant="contained" style={{ marginTop: '13px', marginLeft: '10px' }} >Cancel</Button>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ProductId</TableCell>
                            <TableCell align="left">Product name</TableCell>
                            <TableCell align="left">Detail</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="left">Quantity</TableCell>
                            <TableCell align="left">Category</TableCell>
                            <TableCell align="left">Rating</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {courses.map((row) => (
                            <TableRow key={row.productId}>
                                <TableCell component="th" scope="row">
                                    {row.productId}
                                </TableCell>
                                <TableCell align="left">{row.productName}</TableCell>
                                <TableCell align="left" > {(row.detail).substring(0, 10)}...</TableCell>
                                <TableCell align="left" > {row.price}</TableCell>
                                <TableCell align="left" > {row.quantity}</TableCell>
                                <TableCell align="left" > {getCategoryName(row.categoryId)}</TableCell>
                                <TableCell align="left" > {row.rating}</TableCell>
                            </TableRow>
                        ))}


                    </TableBody>
                </Table>
            </TableContainer>


        </div>
    )
}

export default Courses


