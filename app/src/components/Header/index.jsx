import React, { useState } from "react";
import PropTypes from "prop-types";
import { Col, Container, Row } from "reactstrap";
import { NavLink, useHistory } from "react-router-dom";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { useAuth } from '../../context/auth.context';
import "./style.scss";
import Avatar from '@material-ui/core/Avatar';
import MiniCart from "../MiniCart";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';


Header.propTypes = {
  listProductCart: PropTypes.array,
  onRemoveProductCart: PropTypes.func,
  onSearch: PropTypes.func,
};

Header.defaultProps = {
  listProductCart: [],
  onRemoveProductCart: null,
  onSearch: null,
};

function Header(props) {
  const AuthContext = useAuth();
  let history = useHistory();
  let { authenticated, user } = AuthContext;
  const { listProductCart, onRemoveProductCart, onSearch } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function handleClickLogin() {
    history.push("/signin");
  }
  const handleOnSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.searchTerm.value;
    if (searchTerm) onSearch(searchTerm);
    e.target.reset();
  };
  const handleCloseMyself = () => {
    history.push('/myself')
  };
  const handleCloseLogout = () => {
    AuthContext.signOut();
    return history.push('/signin')
  };
  return (
    <header className="header">
      <Container>
        <div className="header__container">
          <NavLink to="/" className="header__logo">
            Lexe
          </NavLink>
          <input type="checkbox" name="" id="showSearchMobile" hidden />
          <form
            className="header__search"
            onSubmit={handleOnSearch}
            autoComplete="off"
          >
            <input
              type="text"
              className="header__search__input"
              placeholder="Tìm sản phẩm ..."
              name="searchTerm"
            />
            <button className="header__search__btn">
              <AiOutlineSearch />
            </button>
          </form>

          <div className="header__action">
            <label
              htmlFor="showSearchMobile"
              className="mobile header__action__item"
            >
              <AiOutlineSearch />
            </label>

            <button className="header__action__item">
              <div className="header__cart">
                <AiOutlineShoppingCart />
                <span className="header__cart__number">
                  {listProductCart.length}
                </span>
              </div>
              <MiniCart
                listProduct={listProductCart}
                onRemoveProductCart={onRemoveProductCart}
              />
            </button>

            {authenticated === true ? <div>
              <button className="header__account header__action__item" onClick={handleClick}>
                <FiUser />
              </button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleCloseMyself}>My account</MenuItem>
                <MenuItem onClick={handleCloseLogout}>Logout</MenuItem>
              </Menu>
            </div> :
              <Button onClick={handleClickLogin} variant="contained" color="primary">
                Login
              </Button>
            }


          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
