
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCategory } from '../contexts/category';
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
const customerTableHead = [
    '',
    'Category name',
    'Update',
    'Delete',
]



const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
const Categories = () => {
    const classes = useStyles();
    let { categories } = useCategory();
    console.log(categories);
    let context = useCategory();
    const [CateGo, setCateGo] = useState([]);
    useEffect(() => {
        if (CateGo.length == 0)
            setCateGo(categories);
    });
    const [showaddCate, setShowaddCate] = useState(false);
    const [isShowUpdate, setisShowUpdate] = useState(false);
    const [idUpdate, setIdUpdate] = useState(0);
    const [valueUpdate, setValueUpdate] = useState('');
    const [newcate, setnewcate] = useState(false);
    const renderHead = (item, index) => <th key={index}>{item}</th>

    const handleEdit = ((e) => {
        setIdUpdate(e.target.getAttribute('data-item'));
        setisShowUpdate(true);
        let newdata = CateGo.filter(function (element) { return element._id == e.target.getAttribute('data-item') });
        setValueUpdate(newdata[0].name);
    })
    const handleDelete = ((e) => {
        let id_cate = e.target.getAttribute('data-item');
        // TODO process delete with api
        context.deleteCategory(id_cate).then((res) => {
            let newdata = CateGo.filter(function (element) { return element._id != id_cate });
            setCateGo(newdata);
        }).catch((err) => {
            alert("This category cannot be deleted because there is a course");
        })

    })
    const handleUpdate = (() => {
        let entity = {
            name: valueUpdate
        }
        context.updateCategory(idUpdate, entity).then((res) => {
            window.location.reload(false);
            return;
        }).catch((err) => {
            alert("This category cannot be updated because there is a course");
        })
        console.log(entity);
        // TODO
    })
    const handleOpenAdd = (() => {
        setShowaddCate(true);
    })
    const handleCloseAdd = (() => {
        setShowaddCate(false);
        setisShowUpdate(false);
    })
    const handleAddNewCate = (() => {
        // TODO: handle cate
        if (!newcate) { alert('empty'); return; }
        context.createCategory({ name: newcate }).then((res) => {
            window.location.reload(false);
            return;
        }).catch((err) => {
            alert('Something wrong');
            console.log(err);
        })
    })
    const updateInputValue = async (event) => {
        event.preventDefault();
        if (event.target.name == 'category') setnewcate(event.target.value);
        if (event.target.name == 'valueUpdate') setValueUpdate(event.target.value);
    }
    return (
        <div>
            <h2 className="page-header">
                Categories
            </h2>
            {showaddCate ? <div className='addcatre'><TextField id="standard-basic" name='category' onChange={evt => updateInputValue(evt)} label="Category name" style={{ minWidth: '300px' }} />
                <Button variant="contained" color="primary" href="#contained-buttons" style={{ marginTop: '13px', marginLeft: '10px', backgroundColor: '#62b4ff', minWidth: '90px' }} onClick={handleAddNewCate}>
                    Add
                </Button>
                <Button variant="contained" style={{ marginTop: '13px', marginLeft: '10px' }} onClick={handleCloseAdd}>Cancel</Button>
            </div> : <Button variant="contained" color="primary" style={{ marginBottom: '20px', backgroundColor: '#62b4ff' }} href="#contained-buttons" onClick={handleOpenAdd}>
                Add Category
            </Button>}
            <TableContainer component={Paper}>
                <Table className={classes} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell align="left">Category name</TableCell>
                            <TableCell align="right">Update</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {CateGo.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.categoryId}
                                </TableCell>
                                <TableCell align="left">{row.categoryName}</TableCell>
                                <TableCell align="right" data-item={row.categoryId} className="pointer" onClick={handleEdit}> Edit</TableCell>
                                <TableCell align="right" data-item={row.categoryId} className="pointer" onClick={handleDelete}> Delete</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {
                isShowUpdate ?
                    <div style={{ marginTop: '50px', marginLeft: '30px' }}>
                        <TextField id="standard-basic" name='id_cate' label=" " style={{ width: '50px' }} value={idUpdate} />
                        <TextField id="standard-basic" name='valueUpdate' onChange={evt => updateInputValue(evt)} label={valueUpdate} style={{ minWidth: '300px' }} />
                        <Button variant="contained" color="primary" href="#contained-buttons" style={{ marginTop: '13px', marginLeft: '10px', backgroundColor: '#62b4ff', minWidth: '90px' }} onClick={handleUpdate}>
                            Update
                        </Button>
                        <Button variant="contained" style={{ marginTop: '13px', marginLeft: '10px' }} onClick={handleCloseAdd}>Cancel</Button>
                    </div> : ''
            }

        </div>
    )
}

export default Categories
