
import React, { createContext, useContext, useEffect, useState } from 'react';
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
const Lectures = () => {
    const storedDataUser = localStorage.getItem('account-admin');
    const classes = useStyles();
    const [lec, setLec] = useState([]);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [showAddAcc, setShowAddAcc] = useState(false);
    const [isShowUpdatePass, setisShowUpdatePass] = useState(false);
    const [shopId, setShopId] = useState(JSON.parse(storedDataUser).shopInfo.shopId);
    const [idUpdate, setIdUpdate] = useState(0);
    const [valueUpdate, setValueUpdate] = useState('');
    const [order, setOrder] = useState([]);
    let context = useAdmin();
    useEffect(() => {
        const fetchProduct = async () => {
            if (order.length == 0) {
                try {
                    let res = await context.getAllOrder({ shopId: shopId });
                    if (res.shopInfo.shopOrder) {
                        var backToArray = Array.from(new Set(res.shopInfo.shopOrder.map(JSON.stringify))).map(JSON.parse);
                        setOrder(backToArray);
                    }
                } catch (error) {
                    console.log("Failed to fetch data product at: ", error);
                }
            };
        }
        fetchProduct();
        return;
    }, []);
    let handleDelete = ((e) => {
        let id = e.target.getAttribute('data-item');
        //TODO
        context.deleteAccLecturers(id).then((res) => {
            let temp = lec;
            temp = temp.filter(e => e._id != id);
            setLec(temp);
            return;
        }).catch((err) => {
            alert("Something wrong!");
            return;
        })
    })
    const updateInputValue = async (event) => {
        event.preventDefault();
        if (event.target.name == 'email') { setEmail(event.target.value) }

        if (event.target.name == 'valueUpdate') { setValueUpdate(event.target.value) }
        if (event.target.name == 'password') { setPass(event.target.value) }
    }
    const handleOpenAccout = () => {
        setShowAddAcc(true);
    }
    const handleCloseAccout = () => {
        setShowAddAcc(false);
        setisShowUpdatePass(false);
    }
    const createAccLecturers = () => {
        let entity = {
            email: email,
            password: pass,
            role: 1
        }
        context.createAccLecturers(entity).then((res) => {
            let temp = lec;
            if (temp.filter(e => e._id == res._id).length > 0) {
                console.log('ok co nha');
                return;
            } else {
                temp.push(res);
                setLec(temp);
                return;
            }
        }).catch((err) => {
            alert("Something wrong!");
            return;
        })
        //   console.log(entity);
    }

    let status = {
        3: '???? giao',
        1: 'Ch??? l???y h??ng',
        0: 'Ch??? x??c nh???n',
        2: '??ang giao',
        4: '???? huy'
    }
    const handleUpdatePass = () => {
        context.updatePassAccLecturers(idUpdate, { password: valueUpdate }).then((res) => {
            alert('Update successfully');
            return;
        }).catch(() => {
            alert("Something wrong!");
        })

    }
    const handleOpenUpdatePass = (e) => {
        setIdUpdate(e.target.getAttribute('data-item'));
        setisShowUpdatePass(true);
        let newdata = lec.filter(function (element) { return element._id == e.target.getAttribute('data-item') });
        setValueUpdate(newdata[0].name);
    }
    return (
        <div>
            <h2 className="page-header">
                Orders
            </h2>

            <TableContainer component={Paper}>
                <Table className={classes} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>OrderId</TableCell>
                            <TableCell align="left">CustomerId</TableCell>
                            <TableCell align="left">Product name</TableCell>
                            <TableCell align="left">Total</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">ShopId</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {order.map((row) => (
                            <TableRow key={row.orderId}>
                                <TableCell component="th" scope="row">
                                    {row.orderId}
                                </TableCell>
                                <TableCell align="left">{row.customerId}</TableCell>
                                <TableCell align="left" > {row.productName}</TableCell>
                                <TableCell align="left" > {row.total}</TableCell>
                                <TableCell align="left" data-item={row._id} className="pointer" onClick={handleOpenUpdatePass}>{status[row.statusOrder]}</TableCell>
                                <TableCell align="left" data-item={row._id} className="pointer" onClick={handleDelete}>{row.shopId}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>



            {
                isShowUpdatePass ?
                    <div style={{ marginTop: '50px', marginLeft: '30px' }}>
                        <TextField id="standard-basic" name='id_cate' label={idUpdate} style={{ width: '50px' }} disabled /> <br />
                        <TextField id="standard-basic" name='valueUpdate' type='password' onChange={evt => updateInputValue(evt)} label='Password' style={{ minWidth: '300px' }} />
                        <Button variant="contained" color="primary" href="#contained-buttons" style={{ marginTop: '13px', marginLeft: '10px', backgroundColor: '#62b4ff', minWidth: '90px' }} onClick={handleUpdatePass}>
                            Update
                        </Button>
                        <Button variant="contained" style={{ marginTop: '13px', marginLeft: '10px' }} onClick={handleCloseAccout}>Cancel</Button>
                    </div> : ''
            }
        </div>
    )
}

export default Lectures


