import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment'
import './style.css'
const columns = [
    { id: 'name', label: 'OrderId', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
];

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
];

const useStyles = makeStyles({
    root: {
        width: '100%',
        minHeight: 640,
    },
    container: {
        maxHeight: 640,
    },
    large: {
        width: 200,
        height: 200,
    },
    paper: {
        marginTop: 20,
        minHeight: 320,
        minWidth: 250,
    }
});

export default function Profile() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [order, setOrder] = React.useState([]);
    let [user, setUser] = React.useState({});
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    let a;
    useEffect(() => {
        const DataUser = JSON.parse(localStorage.getItem('modern_user'));
        setUser(DataUser);
        if (DataUser.order) {
            setOrder(DataUser.order);
        }

    }, [])

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    let status = {
        3: 'Đã giao',
        1: 'Chờ lấy hàng',
        0: 'Chờ xác nhận',
        2: 'Đang giao',
        4: 'Đã huy'
    }
    return (
        <Paper className={classes.root}>


            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <div className="container mt-5 d-flex justify-content-center">
                            <div className="card p-3">
                                <div className="d-flex align-items-center">
                                    <div className="image"> <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" className="rounded" width={155} /> </div>
                                    <div className="ml-3 w-100" style={{ padding: '1px', marginLeft: '8px' }}>
                                        <h4 className="mb-0 mt-0">{user.username ? user.username : ''}</h4> <span>Senior Journalist</span>
                                        <div className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                                            <div className="d-flex flex-column"> <span className="articles">Articles</span> <span className="number1">38</span> </div>
                                            <div className="d-flex flex-column" > <span className="followers">Followers</span> <span className="number2">980</span> </div>
                                            <div className="d-flex flex-column"> <span className="rating">Rating</span> <span className="number3">8.9</span> </div>
                                        </div>
                                        <div className="button mt-2 d-flex flex-row align-items-center"> <button className="btn btn-sm btn-outline-primary w-100">Information</button> <button className="btn btn-sm btn-primary w-100 ml-2" style={{ marginLeft: '8px' }}>Story</button> </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Paper>

                </Grid>





                {order.map((item) => (




                    <Grid item xs={8}>
                        <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>OrderId</TableCell>
                                        <TableCell >Total</TableCell>
                                        <TableCell >Status</TableCell>
                                        <TableCell >Time</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>

                                    <TableRow hover role="checkbox" >

                                        <TableCell >
                                            {item.orderId}
                                        </TableCell>
                                        <TableCell >
                                            {item.totalMoney}
                                        </TableCell>
                                        <TableCell >
                                            {status[item.status]}
                                        </TableCell>
                                        <TableCell >
                                            {moment(item.create_time).format('YYYY-MM-DD HH:mm:ss')}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>



                        {item.items.map((sp) => (
                            <TableContainer className='right' style={{ maxWidth: '400px' }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ProductId</TableCell>
                                            <TableCell >Price</TableCell>
                                            <TableCell >Product name</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>

                                        <TableRow hover role="checkbox" >

                                            <TableCell >
                                                {sp.productId}
                                            </TableCell>
                                            <TableCell >
                                                {sp.price}
                                            </TableCell>
                                            <TableCell >
                                                {sp.productName}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ))}


                    </Grid>
                ))}
                <h4 style={{marginTop:'60px'}}>{
                    order.length == 0 ? 'Không có order nào': ''
                }</h4>
            </Grid>
        </Paper>
    );
}