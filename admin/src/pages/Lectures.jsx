
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
    const classes = useStyles();
    const [lec, setLec] = useState([]);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [showAddAcc, setShowAddAcc] = useState(false);
    const [isShowUpdatePass, setisShowUpdatePass] = useState(false);
    const [idUpdate, setIdUpdate] = useState(0);
    const [valueUpdate, setValueUpdate] = useState('');
    let context = useAdmin();
    useEffect(() => {
        const fetchProduct = async () => {
            if (lec.length == 0) {
                try {
                    let res = await context.getLectures();
                    for (let item of res) {
                        let count = await context.totalCoursesOfLec(item._id);
                        item.count = count;
                    }
                    setLec(res);
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
    const handleUpdatePass = () => {
        context.updatePassAccLecturers(idUpdate, {password: valueUpdate}).then((res)=>{
            alert('Update successfully');
            return;
        }).catch(()=>{
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
                Lecturers
            </h2>
            {lec.length == 0 ? <BoxLoading /> : ''}
            {showAddAcc ? <div className='addcatre'>
                <TextField id="standard-basic" name='email' onChange={evt => updateInputValue(evt)} label="Email" style={{ minWidth: '300px' }} />
                <TextField id="standard-basic" name='password' type='password' onChange={evt => updateInputValue(evt)} label="Password" style={{ minWidth: '300px' }} style={{ marginLeft: '10px' }} />
                <Button variant="contained" color="primary" href="#contained-buttons" style={{ marginTop: '13px', marginLeft: '10px', backgroundColor: '#62b4ff', minWidth: '90px' }} onClick={createAccLecturers}>
                    Add
                </Button>
                <Button variant="contained" style={{ marginTop: '13px', marginLeft: '10px' }} onClick={handleCloseAccout}>Cancel</Button>
            </div> : <Button variant="contained" color="primary" style={{ marginBottom: '20px', backgroundColor: '#62b4ff' }} href="#contained-buttons" onClick={handleOpenAccout}>
                Add lecturer
            </Button>}
            <TableContainer component={Paper}>
                <Table className={classes} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Full name</TableCell>
                            <TableCell align="left">Total courses</TableCell>
                            <TableCell align="left">Update password</TableCell>
                            <TableCell align="left">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {lec.map((row) => (
                            <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                    {row._id}
                                </TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell align="left" > {row.full_name}</TableCell>
                                <TableCell align="left" > {row.count}</TableCell>
                                <TableCell align="left" data-item={row._id} className="pointer" onClick={handleOpenUpdatePass}> *********</TableCell>
                                <TableCell align="left" data-item={row._id} className="pointer" onClick={handleDelete}>Delete</TableCell>
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


